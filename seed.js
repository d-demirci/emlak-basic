// Mevcut ilan verilerini DB'ye yukler -- bir kez calistirin
// Kullanim: node seed.js

const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.PGHOST     || 'localhost',
  port:     parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE || 'postgres',
  user:     process.env.PGUSER     || 'postgres',
  password: process.env.PGPASSWORD || 'example',
});

const CONFIG = {
  telefon:    "+90 532 000 00 00",
  whatsappNo: "905320000000",
  isim:       "Ad Soyad",
  unvan:      "Gayrimenkul Danismani",
  sirket:     "Emlak Basic",
  slogan:     "Guvenilir Gayrimenkul Danismanlik",
  adres:      "Ornek Mah. Ornek Cad. No:1, Istanbul",
  email:      "info@example.com",
};

const ILANLAR = [
  {
    id: 1,
    baslik: "Kadikoy'de Satilik Luks 3+1 Daire",
    tip: "Satilik",
    kategori: "Daire",
    fiyat: 4500000,
    fiyatText: "4.500.000 TL",
    konum: "Kadikoy, Istanbul",
    metrekare: 135,
    oda: "3+1",
    banyo: 2,
    kat: "5/8",
    binaYasi: 3,
    isitma: "Dogalgaz Kombi",
    aciklama: "Kadikoy'un merkezinde, tum ulasim olanaklarina yakin, yeni yapim luks daire. Guney cepheli, bol isik alan dairemiz; genis salon, modern amerikan mutfak, iki yatak odasi ve bir calisma odasi ile ihtiyaclarinizi karsilıyor.\n\nEbeveyn banyosu ve giyinme odasi gibi konforlu detaylara sahip dairemiz binanin 5. katinda yer almakta olup sehir manzarasi sunmaktadir. Guvenlikli site icerisinde asansor, kapali otopark ve 7/24 guvenlik hizmetleri mevcuttur.\n\nDaire full esyali olarak satisa sunulmaktadir. Acil satilik, fiyat negosiyasyona aciktir.",
    ozellikler: ["Asansor","Guvenlik","Kapali Otopark","Balkon","Dogalgaz","Ebeveyn Banyosu","Amerikan Mutfak","Celik Kapi","Isicamli Pencere","Beyaz Esya","Giyinme Odasi","Zemin Isitma"],
    fotograflar: ["https://picsum.photos/id/1068/900/600","https://picsum.photos/id/164/900/600","https://picsum.photos/id/234/900/600","https://picsum.photos/id/260/900/600","https://picsum.photos/id/225/900/600"],
    kapakFoto: "https://picsum.photos/id/1068/640/430",
    tarih: "2026-04-15",
    aktif: true,
    oneCikan: true,
  },
  {
    id: 2,
    baslik: "Besiktas'ta Kiralik Modern 2+1 Daire",
    tip: "Kiralik",
    kategori: "Daire",
    fiyat: 35000,
    fiyatText: "35.000 TL/ay",
    konum: "Besiktas, Istanbul",
    metrekare: 95,
    oda: "2+1",
    banyo: 1,
    kat: "3/5",
    binaYasi: 8,
    isitma: "Dogalgaz Kombi",
    aciklama: "Besiktas'in kalbinde, her seye yurume mesafesinde tamamen yenilenmis modern daire. Yeni boyali, yeni tadilath dairemiz; genis oturma odasi, modern mutfak ve iki yatak odasiyla konforlu bir yasam sunuyor.\n\nMetro, otobus ve vapur duraklarina yakin konumuyla ulasim son derece kolaydir. Daire bos olup hemen teslim edilebilir durumdadir.",
    ozellikler: ["Asansor","Balkon","Dogalgaz","Amerikan Mutfak","Celik Kapi","Isicamli Pencere","Yeni Tadilat"],
    fotograflar: ["https://picsum.photos/id/336/900/600","https://picsum.photos/id/338/900/600","https://picsum.photos/id/340/900/600","https://picsum.photos/id/342/900/600"],
    kapakFoto: "https://picsum.photos/id/336/640/430",
    tarih: "2026-04-20",
    aktif: true,
    oneCikan: false,
  },
  {
    id: 3,
    baslik: "Sariyer'de Satilik Luks Villa",
    tip: "Satilik",
    kategori: "Villa",
    fiyat: 12000000,
    fiyatText: "12.000.000 TL",
    konum: "Sariyer, Istanbul",
    metrekare: 350,
    oda: "5+2",
    banyo: 4,
    kat: "Mustakil 3 Katli",
    binaYasi: 2,
    isitma: "Yerden Isitma + Klima",
    aciklama: "Sariyer'in en prestijli konumlarindan birinde, Bogaz manzarali muhtesem mustakil villa. Ozel yuzme havuzu, genis yesil bahce ve cagdas mimarisiyle hayalinizdeki yasami sunuyor.\n\n5 yatak odasi, 4 banyo, sinema odasi ve spor salonu ile donatilmis villada akilli ev sistemi ve jenerator mevcuttur. Ulasimi kolay, guvenli ve sakin bir sitede yer almaktadir.",
    ozellikler: ["Ozel Havuz","Genis Bahce","Bogaz Manzarasi","Kapali Garaj (3 Arac)","Akilli Ev Sistemi","Yerden Isitma","Jenerator","Sinema Odasi","Spor Salonu","Barbeku Alani","Jakuzi","Guvenlik Sistemi","7/24 Guvenlik"],
    fotograflar: ["https://picsum.photos/id/429/900/600","https://picsum.photos/id/430/900/600","https://picsum.photos/id/431/900/600","https://picsum.photos/id/432/900/600","https://picsum.photos/id/433/900/600"],
    kapakFoto: "https://picsum.photos/id/429/640/430",
    tarih: "2026-03-01",
    aktif: true,
    oneCikan: true,
  },
  {
    id: 4,
    baslik: "Atasehir'de Kiralik Ticari Dukkan",
    tip: "Kiralik",
    kategori: "Dukkan",
    fiyat: 45000,
    fiyatText: "45.000 TL/ay",
    konum: "Atasehir, Istanbul",
    metrekare: 200,
    oda: "Acik Plan",
    banyo: 2,
    kat: "Zemin + 1. Bodrum",
    binaYasi: 5,
    isitma: "VRV Klima Sistemi",
    aciklama: "Atasehir'in en islek caddesinde, yuksek yaya trafigine sahip zemin katta ticari dukkan. Is merkezlerine ve AVM'lere yakin konumuyla cesitli is kollarina uygun bu alan, bodrum katiyla birlikte toplam 200 m2 kullanim sunmaktadir.\n\nKapali otopark, yuksek tavan ve guclu altyapisiyla her turlu ticari faaliyete uygundur.",
    ozellikler: ["Zemin Kat + Bodrum","Yuksek Tavan (4m)","Otopark","Guvenlik Kamerasi","VRV Klima","Internet Altyapisi","3 Fazli Elektrik","Depo Alani"],
    fotograflar: ["https://picsum.photos/id/1060/900/600","https://picsum.photos/id/1062/900/600","https://picsum.photos/id/1063/900/600"],
    kapakFoto: "https://picsum.photos/id/1060/640/430",
    tarih: "2026-04-05",
    aktif: true,
    oneCikan: false,
  },
  {
    id: 5,
    baslik: "Cekmekoy'de Satilik Konut Imarli Arsa",
    tip: "Satilik",
    kategori: "Arsa",
    fiyat: 3200000,
    fiyatText: "3.200.000 TL",
    konum: "Cekmekoy, Istanbul",
    metrekare: 850,
    oda: "--",
    banyo: 0,
    kat: "--",
    binaYasi: 0,
    isitma: "--",
    aciklama: "Cekmekoy'de hizla gelisen bolgede, konut imarli kose parsel. Asfalt cepheli ve tum altyapisi hazir olan parselde yapilasma izni mevcuttur.\n\nToplu tasimaya yakin, deger kazanmaya devam eden bir lokasyonda yatirimlik veya kendi projenizi hayata gecirmek icin essiz bir firsat.",
    ozellikler: ["Konut Imarli","Kose Parsel","Iki Cepheli","Asfalt Yol","Altyapi Hazir","Imar Durumu Alindi","Yatirimlik"],
    fotograflar: ["https://picsum.photos/id/15/900/600","https://picsum.photos/id/16/900/600","https://picsum.photos/id/17/900/600"],
    kapakFoto: "https://picsum.photos/id/15/640/430",
    tarih: "2026-02-20",
    aktif: true,
    oneCikan: false,
  },
  {
    id: 6,
    baslik: "Bakirkoy'de Satilik 1+1 Daire -- Yatirimlik",
    tip: "Satilik",
    kategori: "Daire",
    fiyat: 1800000,
    fiyatText: "1.800.000 TL",
    konum: "Bakirkoy, Istanbul",
    metrekare: 65,
    oda: "1+1",
    banyo: 1,
    kat: "2/6",
    binaYasi: 12,
    isitma: "Dogalgaz Kombi",
    aciklama: "Bakirkoy'de merkezi konumda, piyasa alti fiyata satilik yatirimlik daire. Duzenli kira getirisi olan daire, kiracisi ciktiginda satisa sunulmustur. Ulasim akslarina, okul ve hastanelere yakin konumuyla her zaman kiraci bulmak kolay olmaktadir.",
    ozellikler: ["Asansor","Balkon","Dogalgaz","Gunes Cepheli","Merkezi Konum","Piyasa Alti Fiyat"],
    fotograflar: ["https://picsum.photos/id/239/900/600","https://picsum.photos/id/240/900/600","https://picsum.photos/id/241/900/600"],
    kapakFoto: "https://picsum.photos/id/239/640/430",
    tarih: "2026-05-01",
    aktif: true,
    oneCikan: false,
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS config (
        key   TEXT PRIMARY KEY,
        value JSONB NOT NULL
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS ilanlar (
        id   INTEGER PRIMARY KEY,
        data JSONB NOT NULL
      );
    `);

    await client.query(
      `INSERT INTO config (key, value) VALUES ('main', $1)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [JSON.stringify(CONFIG)]
    );

    for (const ilan of ILANLAR) {
      await client.query(
        `INSERT INTO ilanlar (id, data) VALUES ($1, $2)
         ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`,
        [ilan.id, JSON.stringify(ilan)]
      );
    }

    await client.query('COMMIT');
    console.log(`${ILANLAR.length} ilan ve config DB'ye yuklendi.`);
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Seed hatasi:', e.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
