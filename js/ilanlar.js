// ============================================================
//  ⚙️  KONFİGÜRASYON — Kendi bilgilerinizi buraya girin
// ============================================================
const CONFIG = {
  telefon: "+90 532 000 00 00",
  whatsappNo: "905320000000",        // Başında + olmadan, 90 ile başlayarak
  isim: "Ad Soyad",
  unvan: "Gayrimenkul Danışmanı",
  sirket: "Emlak Vitrin",
  slogan: "Güvenilir Gayrimenkul Danışmanlığı",
  adres: "Örnek Mah. Örnek Cad. No:1, İstanbul",
  email: "info@example.com",
};

// ============================================================
//  🏠  İLANLAR — Yeni ilan eklemek için bu diziye eleman ekleyin
//  Fotoğrafları: fotograflar[] dizisine gerçek fotoğraf yollarını yazın
//  Kapak fotoğrafını: kapakFoto alanına yazın
// ============================================================
const ILANLAR = [
  {
    id: 1,
    baslik: "Kadıköy'de Satılık Lüks 3+1 Daire",
    tip: "Satılık",       // "Satılık" veya "Kiralık"
    kategori: "Daire",    // "Daire" | "Villa" | "Dükkan" | "Arsa" | "Bina"
    fiyat: 4500000,       // Sayısal değer (sıralama için)
    fiyatText: "4.500.000 ₺",
    konum: "Kadıköy, İstanbul",
    metrekare: 135,
    oda: "3+1",
    banyo: 2,
    kat: "5/8",
    binaYasi: 3,
    isitma: "Doğalgaz Kombi",
    aciklama: `Kadıköy'ün merkezinde, tüm ulaşım olanaklarına yakın, yeni yapım lüks daire. Güney cepheli, bol ışık alan dairemiz; geniş salon, modern amerikan mutfak, iki yatak odası ve bir çalışma odası ile ihtiyaçlarınızı karşılıyor.

Ebeveyn banyosu ve giyinme odası gibi konforlu detaylara sahip dairemiz binanın 5. katında yer almakta olup şehir manzarası sunmaktadır. Güvenlikli site içerisinde asansör, kapalı otopark ve 7/24 güvenlik hizmetleri mevcuttur.

Daire full eşyalı olarak satışa sunulmaktadır. Acil satılıktır, fiyat negosiyasyona açıktır.`,
    ozellikler: [
      "Asansör", "Güvenlik", "Kapalı Otopark", "Balkon",
      "Doğalgaz", "Ebeveyn Banyosu", "Amerikan Mutfak",
      "Çelik Kapı", "Isıcamlı Pencere", "Beyaz Eşya",
      "Giyinme Odası", "Zemin Isıtma"
    ],
    fotograflar: [
      "https://picsum.photos/id/1068/900/600",
      "https://picsum.photos/id/164/900/600",
      "https://picsum.photos/id/234/900/600",
      "https://picsum.photos/id/260/900/600",
      "https://picsum.photos/id/225/900/600",
    ],
    kapakFoto: "https://picsum.photos/id/1068/640/430",
    tarih: "2026-04-15",
    aktif: true,
    oneCikan: true,
  },
  {
    id: 2,
    baslik: "Beşiktaş'ta Kiralık Modern 2+1 Daire",
    tip: "Kiralık",
    kategori: "Daire",
    fiyat: 35000,
    fiyatText: "35.000 ₺/ay",
    konum: "Beşiktaş, İstanbul",
    metrekare: 95,
    oda: "2+1",
    banyo: 1,
    kat: "3/5",
    binaYasi: 8,
    isitma: "Doğalgaz Kombi",
    aciklama: `Beşiktaş'ın kalbinde, her şeye yürüme mesafesinde tamamen yenilenmiş modern daire. Yeni boyalı, yeni tadilatlı dairemiz; geniş oturma odası, modern mutfak ve iki yatak odasıyla konforlu bir yaşam sunuyor.

Metro, otobüs ve vapur duraklarına yakın konumuyla ulaşım son derece kolaydır. Daire boş olup hemen teslim edilebilir durumdadır.`,
    ozellikler: [
      "Asansör", "Balkon", "Doğalgaz", "Amerikan Mutfak",
      "Çelik Kapı", "Isıcamlı Pencere", "Yeni Tadilat"
    ],
    fotograflar: [
      "https://picsum.photos/id/336/900/600",
      "https://picsum.photos/id/338/900/600",
      "https://picsum.photos/id/340/900/600",
      "https://picsum.photos/id/342/900/600",
    ],
    kapakFoto: "https://picsum.photos/id/336/640/430",
    tarih: "2026-04-20",
    aktif: true,
    oneCikan: false,
  },
  {
    id: 3,
    baslik: "Sarıyer'de Satılık Lüks Villa",
    tip: "Satılık",
    kategori: "Villa",
    fiyat: 12000000,
    fiyatText: "12.000.000 ₺",
    konum: "Sarıyer, İstanbul",
    metrekare: 350,
    oda: "5+2",
    banyo: 4,
    kat: "Müstakil 3 Katlı",
    binaYasi: 2,
    isitma: "Yerden Isıtma + Klima",
    aciklama: `Sarıyer'in en prestijli konumlarından birinde, Boğaz manzaralı muhteşem müstakil villa. Özel yüzme havuzu, geniş yeşil bahçe ve çağdaş mimarisiyle hayalinizdeki yaşamı sunuyor.

5 yatak odası, 4 banyo, sinema odası ve spor salonu ile donatılmış villada akıllı ev sistemi ve jeneratör mevcuttur. Ulaşımı kolay, güvenli ve sakin bir sitede yer almaktadır.`,
    ozellikler: [
      "Özel Havuz", "Geniş Bahçe", "Boğaz Manzarası",
      "Kapalı Garaj (3 Araç)", "Akıllı Ev Sistemi", "Yerden Isıtma",
      "Jeneratör", "Sinema Odası", "Spor Salonu", "Barbekü Alanı",
      "Jakuzi", "Güvenlik Sistemi", "7/24 Güvenlik"
    ],
    fotograflar: [
      "https://picsum.photos/id/429/900/600",
      "https://picsum.photos/id/430/900/600",
      "https://picsum.photos/id/431/900/600",
      "https://picsum.photos/id/432/900/600",
      "https://picsum.photos/id/433/900/600",
    ],
    kapakFoto: "https://picsum.photos/id/429/640/430",
    tarih: "2026-03-01",
    aktif: true,
    oneCikan: true,
  },
  {
    id: 4,
    baslik: "Ataşehir'de Kiralık Ticari Dükkan",
    tip: "Kiralık",
    kategori: "Dükkan",
    fiyat: 45000,
    fiyatText: "45.000 ₺/ay",
    konum: "Ataşehir, İstanbul",
    metrekare: 200,
    oda: "Açık Plan",
    banyo: 2,
    kat: "Zemin + 1. Bodrum",
    binaYasi: 5,
    isitma: "VRV Klima Sistemi",
    aciklama: `Ataşehir'in en işlek caddesinde, yüksek yaya trafiğine sahip zemin katta ticari dükkan. İş merkezlerine ve AVM'lere yakın konumuyla çeşitli iş kollarına uygun bu alan, bodrum katıyla birlikte toplam 200 m² kullanım sunmaktadır.

Kapalı otopark, yüksek tavan ve güçlü altyapısıyla her türlü ticari faaliyete uygundur.`,
    ozellikler: [
      "Zemin Kat + Bodrum", "Yüksek Tavan (4m)", "Otopark",
      "Güvenlik Kamerası", "VRV Klima", "İnternet Altyapısı",
      "3 Fazlı Elektrik", "Depo Alanı"
    ],
    fotograflar: [
      "https://picsum.photos/id/1060/900/600",
      "https://picsum.photos/id/1062/900/600",
      "https://picsum.photos/id/1063/900/600",
    ],
    kapakFoto: "https://picsum.photos/id/1060/640/430",
    tarih: "2026-04-05",
    aktif: true,
    oneCikan: false,
  },
  {
    id: 5,
    baslik: "Çekmeköy'de Satılık Konut İmarlı Arsa",
    tip: "Satılık",
    kategori: "Arsa",
    fiyat: 3200000,
    fiyatText: "3.200.000 ₺",
    konum: "Çekmeköy, İstanbul",
    metrekare: 850,
    oda: "—",
    banyo: 0,
    kat: "—",
    binaYasi: 0,
    isitma: "—",
    aciklama: `Çekmeköy'de hızla gelişen bölgede, konut imarlı köşe parsel. Asfalt cepheli ve tüm altyapısı hazır olan parselde yapılaşma izni mevcuttur.

Toplu taşımaya yakın, değer kazanmaya devam eden bir lokasyonda yatırımlık veya kendi projenizi hayata geçirmek için eşsiz bir fırsat.`,
    ozellikler: [
      "Konut İmarlı", "Köşe Parsel", "İki Cepheli",
      "Asfalt Yol", "Altyapı Hazır", "İmar Durumu Alındı",
      "Yatırımlık"
    ],
    fotograflar: [
      "https://picsum.photos/id/15/900/600",
      "https://picsum.photos/id/16/900/600",
      "https://picsum.photos/id/17/900/600",
    ],
    kapakFoto: "https://picsum.photos/id/15/640/430",
    tarih: "2026-02-20",
    aktif: true,
    oneCikan: false,
  },
  {
    id: 6,
    baslik: "Bakırköy'de Satılık 1+1 Daire — Yatırımlık",
    tip: "Satılık",
    kategori: "Daire",
    fiyat: 1800000,
    fiyatText: "1.800.000 ₺",
    konum: "Bakırköy, İstanbul",
    metrekare: 65,
    oda: "1+1",
    banyo: 1,
    kat: "2/6",
    binaYasi: 12,
    isitma: "Doğalgaz Kombi",
    aciklama: `Bakırköy'de merkezi konumda, piyasa altı fiyata satılık yatırımlık daire. Düzenli kira getirisi olan daire, kiracısı çıktığında satışa sunulmuştur. Ulaşım akslarına, okul ve hastanelere yakın konumuyla her zaman kiracı bulmak kolay olmaktadır.`,
    ozellikler: [
      "Asansör", "Balkon", "Doğalgaz", "Güneş Cepheli",
      "Merkezi Konum", "Piyasa Altı Fiyat"
    ],
    fotograflar: [
      "https://picsum.photos/id/239/900/600",
      "https://picsum.photos/id/240/900/600",
      "https://picsum.photos/id/241/900/600",
    ],
    kapakFoto: "https://picsum.photos/id/239/640/430",
    tarih: "2026-05-01",
    aktif: true,
    oneCikan: false,
  },
];

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
