const express    = require('express');
const basicAuth  = require('express-basic-auth');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234';
const GITHUB_TOKEN   = process.env.GITHUB_TOKEN   || '';
const GITHUB_REPO    = process.env.GITHUB_REPO    || 'rascal97/emlak-vitrin';

app.use(express.json({ limit: '2mb' }));

// Admin sayfasını sunucu tarafında şifre ile koru
app.use('/admin.html', basicAuth({
  users: { 'admin': ADMIN_PASSWORD },
  challenge: true,
  realm: 'Emlak Vitrin Admin'
}));

// İlanları GitHub'a kaydet → Railway otomatik deploy tetiklenir
app.post('/api/save', async (req, res) => {
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ ok: false, msg: 'Sunucuda GITHUB_TOKEN ayarlanmamış.' });
  }

  const { config, ilanlar } = req.body;
  if (!Array.isArray(ilanlar)) {
    return res.status(400).json({ ok: false, msg: 'Geçersiz veri.' });
  }

  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/js/ilanlar.js`;
  const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': 'emlak-vitrin-admin'
  };

  try {
    // Mevcut dosyanın SHA'sını al (GitHub güncellemesi için zorunlu)
    const getRes  = await fetch(apiUrl, { headers });
    const getJson = await getRes.json();
    if (!getJson.sha) throw new Error('Dosya bilgisi alınamadı.');

    const newContent = buildIlanlarJS(config, ilanlar);
    const encoded    = Buffer.from(newContent, 'utf8').toString('base64');

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `Admin: ${ilanlar.length} ilan güncellendi`,
        content: encoded,
        sha: getJson.sha
      })
    });

    if (putRes.ok) {
      res.json({ ok: true, msg: `Kaydedildi! Site ~1 dakikada güncellenir.` });
    } else {
      const errBody = await putRes.json();
      throw new Error(errBody.message || 'GitHub hatası');
    }
  } catch (e) {
    console.error('Save error:', e.message);
    res.status(500).json({ ok: false, msg: 'Hata: ' + e.message });
  }
});

// Statik dosyaları sun
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => console.log(`Sunucu çalışıyor: http://localhost:${PORT}`));

// ---- Yardımcı ----
function buildIlanlarJS(config, ilanlar) {
  return `// ============================================================
//  ⚙️  KONFİGÜRASYON
// ============================================================
const CONFIG = ${JSON.stringify(config || {}, null, 2)};

// ============================================================
//  🏠  İLANLAR
// ============================================================
const ILANLAR = ${JSON.stringify(ilanlar, null, 2)};

// Admin panelinden yapılan değişiklikleri localStorage'dan yükle
(function () {
  try {
    const stored = localStorage.getItem("emlak_ilanlar");
    if (stored) {
      const parsed = JSON.parse(stored);
      ILANLAR.splice(0, ILANLAR.length, ...parsed);
    }
  } catch (e) {}
})();
`;
}
