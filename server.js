const express      = require('express');
const basicAuth    = require('express-basic-auth');
const rateLimit    = require('express-rate-limit');
const path         = require('path');
const { Pool }     = require('pg');

const app  = express();
const PORT = process.env.PORT || 3000;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234';
const adminAuth = basicAuth({
  users: { 'admin': ADMIN_PASSWORD },
  challenge: true,
  realm: 'Güven Emlak Admin'
});

// ---- DB bağlantısı ----
const pool = new Pool({
  host:     process.env.PGHOST     || 'localhost',
  port:     parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE || 'postgres',
  user:     process.env.PGUSER     || 'postgres',
  password: process.env.PGPASSWORD || 'example',
});

// ---- Tablolar yoksa oluştur ----
async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS config (
      key   TEXT PRIMARY KEY,
      value JSONB NOT NULL
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ilanlar (
      id   INTEGER PRIMARY KEY,
      data JSONB NOT NULL
    );
  `);
  console.log('DB migration OK');
}

app.use(express.json({ limit: '2mb' }));

// ---- Rate limiters ----
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 dakika
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Çok fazla istek. Lütfen 15 dakika sonra tekrar deneyin.' },
});

const saveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Çok fazla kayıt isteği. Lütfen 15 dakika sonra tekrar deneyin.' },
});

// ---- Admin sayfasını şifre ile koru ----
app.use('/admin.html', adminAuth);

// ---- GET /api/config ----
app.get('/api/config', publicLimiter, async (req, res) => {
  try {
    const result = await pool.query(`SELECT value FROM config WHERE key = 'main'`);
    if (result.rows.length === 0) return res.json({});
    res.json(result.rows[0].value);
  } catch (e) {
    console.error('Config fetch error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// ---- GET /api/ilanlar ----
app.get('/api/ilanlar', publicLimiter, async (req, res) => {
  try {
    const result = await pool.query(`SELECT data FROM ilanlar ORDER BY id ASC`);
    res.json(result.rows.map(r => r.data));
  } catch (e) {
    console.error('İlanlar fetch error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// ---- GET /api/ilanlar/:id ----
app.get('/api/ilanlar/:id', publicLimiter, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Geçersiz ilan id.' });
  }

  try {
    const result = await pool.query(`SELECT data FROM ilanlar WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }
    res.json(result.rows[0].data);
  } catch (e) {
    console.error('İlan fetch error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// ---- POST /api/save ----
app.post('/api/save', saveLimiter, adminAuth, async (req, res) => {
  const { config, ilanlar } = req.body;
  if (!Array.isArray(ilanlar)) {
    return res.status(400).json({ ok: false, msg: 'Geçersiz veri.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Config kaydet
    await client.query(`
      INSERT INTO config (key, value)
      VALUES ('main', $1)
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `, [JSON.stringify(config || {})]);

    // Mevcut ilanları temizle, yenilerini ekle
    await client.query('DELETE FROM ilanlar');
    for (const ilan of ilanlar) {
      await client.query(
        `INSERT INTO ilanlar (id, data) VALUES ($1, $2)`,
        [ilan.id, JSON.stringify(ilan)]
      );
    }

    await client.query('COMMIT');
    res.json({ ok: true, msg: `${ilanlar.length} ilan kaydedildi.` });
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Save error:', e.message);
    res.status(500).json({ ok: false, msg: 'Hata: ' + e.message });
  } finally {
    client.release();
  }
});

// ---- Statik dosyaları sun ----
app.use(express.static(path.join(__dirname)));

migrate()
  .then(() => app.listen(PORT, () => console.log(`Sunucu çalışıyor: http://localhost:${PORT}`)))
  .catch(e => { console.error('Migration hatası:', e.message); process.exit(1); });
