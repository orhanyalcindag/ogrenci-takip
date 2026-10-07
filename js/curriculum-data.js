/**
 * curriculum-data.js - MEB Mesleki ve Teknik Anadolu Lisesi (MTAL)
 * Bilişim Teknolojileri Alanı Çerçeve Öğretim Programı Müfredat Veritabanı
 * 
 * Dersler:
 * 1. Web Tabanlı Uygulama Geliştirme (WTÜG - 11. Sınıf)
 * 2. Bilgisayarlı Tasarım Uygulamaları (BTU - 10./11. Sınıf)
 * 3. Robotik Kodlama (10./11. Sınıf)
 */

const MEB_CURRICULUM = {
    // ==========================================
    // 1. WEB TABANLI UYGULAMA GELİŞTİRME (11. SINIF)
    // ==========================================
    'crs_wtug': {
        id: 'crs_wtug',
        code: 'WTÜG',
        name: 'Web Tabanlı Uygulama Geliştirme',
        gradeLevel: '11. Sınıf',
        hoursPerWeek: 8,
        description: 'HTML5, CSS3, JavaScript, Responsive Tasarım ve Temel Backend/Veritabanı Müfredatı',
        weeks: [
            // --- 1. DÖNEM ---
            {
                week: 1,
                term: 1,
                unit: 'Öğrenme Birimi 1: HTML5 Temelleri',
                topic: 'Web standartları, geliştirme ortamları ve HTML temel etiket yapısı',
                outcome: 'Web standartlarına uygun HTML5 sayfa iskeletini (doctype, html, head, body, meta) oluşturur.',
                suggestedPractice: 'İlk web sayfası: Kişisel tanıtım ve temel metin biçimlendirme etiketleri (h1-h6, p, b, i, hr, br).',
                criteria: 'Doğru etiket yapısı: 40p | Kod düzeni: 30p | Sayfa önizleme uyumu: 30p'
            },
            {
                week: 2,
                term: 1,
                unit: 'Öğrenme Birimi 1: HTML5 Temelleri',
                topic: 'Bağlantılar, Görseller ve Listeler',
                outcome: 'Web sayfalarında mutlak/göreli bağlantılar (a), görseller (img) ve sıralı/sırasız listeler (ul, ol, li) kullanır.',
                suggestedPractice: 'Ders çalışma kılavuzu: Sayfa içi çapalar (#id), dış bağlantılar ve resimli menü listesi tasarımı.',
                criteria: 'Link doğrulukları: 35p | Liste ve görsel kullanımı: 35p | Validasyon: 30p'
            },
            {
                week: 3,
                term: 1,
                unit: 'Öğrenme Birimi 1: HTML5 Temelleri',
                topic: 'Tablo Tasarımı ve Tablo Yönetimi',
                outcome: 'Verileri organize etmek için semantic tablo etiketlerini (table, thead, tbody, tr, th, td, colspan, rowspan) uygular.',
                suggestedPractice: 'Haftalık ders programı tablosu ve e-Okul not çizelgesi şablonunun tablolarla kodlanması.',
                criteria: 'Colspan/Rowspan kullanımı: 40p | Semantic etiketler: 30p | Tablo düzeni: 30p'
            },
            {
                week: 4,
                term: 1,
                unit: 'Öğrenme Birimi 2: HTML5 Formları',
                topic: 'Form Etiketleri ve Input Tipleri',
                outcome: 'Kullanıcıdan veri almak için form elemanlarını (form, input tipleri: text, email, tel, date, number, password) kullanır.',
                suggestedPractice: 'Öğrenci kulüp başvuru formu: Tüm modern HTML5 input tiplerini içeren kullanıcı giriş arayüzü.',
                criteria: 'Doğru input tipleri: 40p | Label eşleştirmeleri (for/id): 30p | Form hiyerarşisi: 30p'
            },
            {
                week: 5,
                term: 1,
                unit: 'Öğrenme Birimi 2: HTML5 Formları',
                topic: 'Seçim Kutuları ve Form Doğrulama Nitelikleri',
                outcome: 'Formlarda textarea, select, option, radio, checkbox kullanır; HTML5 validasyon (required, pattern, min, max) kurallarını uygular.',
                suggestedPractice: 'Donanım arıza kayıt formu: Açıklama alanı, arıza kategorisi açılır listesi ve zorunlu alan doğrulamaları.',
                criteria: 'Doğrulama kuralları: 40p | Seçim kutuları: 30p | Gönderim/sıfırlama butonları: 30p'
            },
            {
                week: 6,
                term: 1,
                unit: 'Öğrenme Birimi 3: CSS3 Temelleri',
                topic: 'CSS Giriş, Renkler ve Tipografi',
                outcome: 'Stil sayfası türlerini (dahili, harici, satır içi) ve temel CSS seçicilerini (etiket, sınıf, kimlik) uygular.',
                suggestedPractice: 'Harici CSS dosyası oluşturma: Renk paletleri, Google Fonts entegrasyonu ve metin biçimlendirme stilleri.',
                criteria: 'Harici CSS bağlantısı: 30p | Seçici kullanımı: 40p | Tipografik düzen: 30p'
            },
            {
                week: 7,
                term: 1,
                unit: 'Öğrenme Birimi 3: CSS3 Temelleri',
                topic: 'CSS Kutu Modeli (Box Model)',
                outcome: 'Margin, padding, border ve content kavramlarını kavrar; box-sizing özelliğini web mizanpajında kullanır.',
                suggestedPractice: 'Haber/Duyuru kartı tasarımı: İç boşluk, dış boşluk, kenarlık ve gölge (box-shadow) parametrelerinin uygulanması.',
                criteria: 'Kutu modeli dengesi: 40p | Box-sizing kullanımı: 30p | Görsel estetik: 30p'
            },
            {
                week: 8,
                term: 1,
                unit: 'Öğrenme Birimi 4: CSS Yerleşim ve Flexbox',
                topic: 'CSS Flexbox ile Esnek Düzen',
                outcome: 'Flex konteyner ve flex öğeleri kullanarak esnek, tek boyutlu sayfa yerleşimleri (flex-direction, justify-content, align-items) tasarlar.',
                suggestedPractice: 'Modern navigasyon menüsü ve yan yana sıralanan duyuru kartlarının Flexbox ile hizalanması.',
                criteria: 'Flexbox özellikleri: 40p | Hizalama doğruluğu: 35p | Kod temizliği: 25p'
            },
            {
                week: 9,
                term: 1,
                unit: 'Öğrenme Birimi 4: CSS Yerleşim ve Flexbox',
                topic: 'Flexbox İleri Düzey ve Kart Mizanpajı',
                outcome: 'Flexbox ile çok satırlı (flex-wrap), esnek büyüme/küçülme (flex-grow, flex-shrink) özellikleriyle kart galerisi oluşturur.',
                suggestedPractice: 'E-Ticaret ürün listeleme sayfası: Flex-wrap ile ekran genişliğine göre alt satıra geçen responsive ürün kartları.',
                criteria: 'Flex-wrap kurgusu: 40p | Kart hiyerarşisi: 30p | Tasarım bütünlüğü: 30p'
            },
            {
                week: 10,
                term: 1,
                unit: 'Öğrenme Birimi 5: Duyarlı Tasarım (Responsive Design)',
                topic: 'Medya Sorguları (Media Queries)',
                outcome: 'Farklı ekran çözünürlükleri için @media kurallarını tanımlar; mobil öncelikli responsive tasarımlar üretir.',
                suggestedPractice: 'Masaüstü, tablet ve mobil ekran genişliklerine göre menüsü ve sütun sayısı değişen blog şablonu.',
                criteria: 'Media query breakpoint doğruluğu: 40p | Mobil uyumluluk: 35p | Taşma olmaması: 25p'
            },
            {
                week: 11,
                term: 1,
                unit: 'Öğrenme Birimi 6: 1. Dönem 1. Sınav ve Uygulama Telafisi',
                topic: 'HTML5 & CSS3 1. Dönem Uygulama Değerlendirmesi',
                outcome: 'HTML5 ve CSS3 kazanımlarını bütüncül bir projede uygulayarak performansını ölçer.',
                suggestedPractice: '1. Uygulama Sınavı: Belirtilen tel kafes (wireframe) çizimine uygun responsive web sayfasının kodlanması.',
                criteria: 'HTML iskeleti: 30p | CSS stilleri: 30p | Responsive uyum: 40p'
            },
            {
                week: 12,
                term: 1,
                unit: 'Öğrenme Birimi 7: JavaScript Programlama Temelleri',
                topic: 'JavaScript Giriş, Değişkenler ve Veri Tipleri',
                outcome: 'Web sayfalarına JS bağlar; let, const anahtar kelimeleriyle değişken ve veri tiplerini (string, number, boolean) tanımlar.',
                suggestedPractice: 'Konsol ve alert uygulaması: Kullanıcıdan prompt ile alınan iki sayının aritmetik işlemlerini hesaplama.',
                criteria: 'Değişken tanımlamaları: 40p | Tip dönüşümleri: 30p | Konsol çıktısı: 30p'
            },
            {
                week: 13,
                term: 1,
                unit: 'Öğrenme Birimi 7: JavaScript Programlama Temelleri',
                topic: 'Karar Yapıları (if, else if, switch)',
                outcome: 'Şartlı durumları kontrol etmek için mantıksal operatörler ve if/else karar yapılarını uygular.',
                suggestedPractice: 'Not hesaplama aracı: 0-100 arası girilen puana göre 5\'lik sistem notu ve geçti/kaldı durumu belirleme.',
                criteria: 'Koşul ifadelerinin doğruluğu: 40p | Mantıksal operatörler: 30p | Hata kontrolü: 30p'
            },
            {
                week: 14,
                term: 1,
                unit: 'Öğrenme Birimi 7: JavaScript Programlama Temelleri',
                topic: 'Döngüler (for, while, forEach)',
                outcome: 'Tekrarlayan işlemler için döngü yapılarını ve dizi (array) yöntemlerini kullanır.',
                suggestedPractice: 'Öğrenci listesi dizisi üzerinde döngü kurarak sınıf ortalaması ve en yüksek puanı hesaplama.',
                criteria: 'Dizi işlemleri: 40p | Döngü algoritması: 35p | Çıktı doğruluğu: 25p'
            },
            {
                week: 15,
                term: 1,
                unit: 'Öğrenme Birimi 8: JavaScript Fonksiyonlar',
                topic: 'Fonksiyon Tanımlama, Parametreler ve Return',
                outcome: 'Modüler kodlama için parametre alan ve değer döndüren fonksiyonlar (geleneksel ve arrow functions) oluşturur.',
                suggestedPractice: 'KDV ve indirim tutarı hesaplayan modüler yardımcı fonksiyonlar kütüphanesi hazırlama.',
                criteria: 'Fonksiyon mimarisi: 40p | Parametre/Return yönetimi: 35p | Kod okunabilirliği: 25p'
            },
            {
                week: 16,
                term: 1,
                unit: 'Öğrenme Birimi 9: DOM Manipülasyonu',
                topic: 'HTML Elemanlarına JS ile Erişim ve İçerik Değiştirme',
                outcome: 'getElementById, querySelector gibi yöntemlerle DOM elemanlarına erişir; innerHTML, textContent ve stilleri değiştirir.',
                suggestedPractice: 'Karanlık/Aydınlık Mod (Dark Mode) geçiş butonu ve dinamik sayaç uygulaması.',
                criteria: 'DOM seçicileri: 40p | Dinamik stil/sınıf değişimi: 35p | Akıcı kullanıcı deneyimi: 25p'
            },
            {
                week: 17,
                term: 1,
                unit: 'Öğrenme Birimi 9: DOM Manipülasyonu',
                topic: 'Olay Dinleyicileri (Event Listeners)',
                outcome: 'Kullanıcı etkileşimlerini yakalamak için addEventListener ile click, input, submit, keydown olaylarını yönetir.',
                suggestedPractice: 'Yapılacaklar Listesi (To-Do List): Enter tuşu ile görev ekleme, tamamlandı işaretleme ve silme.',
                criteria: 'Olay yönetimi: 40p | Dinamik eleman üretme (createElement): 35p | Validasyon: 25p'
            },
            {
                week: 18,
                term: 1,
                unit: 'Öğrenme Birimi 10: 1. Dönem Değerlendirmesi',
                topic: '1. Dönem Sonu Proje ve Portfolyo Sunumu',
                outcome: 'Dönem boyunca geliştirilen HTML, CSS ve JavaScript bileşenlerini tek bir mini web uygulamasında birleştirir.',
                suggestedPractice: 'Dönem Sonu Projesi: Etkileşimli mini e-ticaret sepeti veya interaktif soru-cevap yarışması uygulaması.',
                criteria: 'HTML/CSS kalitesi: 30p | JavaScript mantığı: 40p | Proje sunumu: 30p'
            },

            // --- 2. DÖNEM ---
            {
                week: 19,
                term: 2,
                unit: 'Öğrenme Birimi 11: Tarayıcı Depolama ve JSON',
                topic: 'LocalStorage ve SessionStorage ile Veri Saklama',
                outcome: 'Kullanıcı verilerini tarayıcıda kalıcı olarak saklamak için LocalStorage ve JSON.stringify/JSON.parse işlemlerini uygular.',
                suggestedPractice: 'Kalıcı Not Defteri: Sayfa yenilense dahi silinmeyen ders notları kayıt ve silme arayüzü.',
                criteria: 'JSON dönüşümleri: 40p | LocalStorage CRUD: 35p | Sayfa açılışında geri yükleme: 25p'
            },
            {
                week: 20,
                term: 2,
                unit: 'Öğrenme Birimi 12: Asenkron JavaScript ve API',
                topic: 'Fetch API ve Asenkron Veri Çekme (Promises, Async/Await)',
                outcome: 'Harici REST API servislerine GET isteği atarak JSON formatındaki verileri web sayfasına dinamik olarak çeker.',
                suggestedPractice: 'Hava Durumu veya Döviz Kuru Uygulaması: Ücretsiz açık API üzerinden güncel verileri çekip kartlara basma.',
                criteria: 'Fetch/Await kullanımı: 40p | JSON verisini ayrıştırma: 30p | Hata yakalama (try/catch): 30p'
            },
            {
                week: 21,
                term: 2,
                unit: 'Öğrenme Birimi 13: Web Backend Giriş',
                topic: 'Sunucu Mimarisi, HTTP İstekleri ve Sunucu Ortamı Kurulumu',
                outcome: 'İstemci-sunucu (Client-Server) mimarisini kavrar; yerel sunucu ortamını (XAMPP / Node.js) yapılandırır.',
                suggestedPractice: 'Yerel sunucu kurulumu, localhost testi ve ilk sunucu tarafı "Merhaba Dünya" komutunun çalıştırılması.',
                criteria: 'Sunucu yapılandırması: 40p | Port ve servis kontrolleri: 30p | Dizin hiyerarşisi: 30p'
            },
            {
                week: 22,
                term: 2,
                unit: 'Öğrenme Birimi 14: Form Verilerini Sunucuda İşleme',
                topic: 'GET ve POST Metotları ile Veri Alma',
                outcome: 'HTML formlarından gönderilen verileri sunucu tarafında güvenli bir şekilde yakalar ve doğrular.',
                suggestedPractice: 'İletişim formu: Formdan gelen ad, soyad, mesaj verilerinin sunucuda alınıp ekrana filtrelenerek yazdırılması.',
                criteria: 'POST/GET doğruluğu: 40p | XSS/Güvenlik temizliği: 30p | Başarı mesajı: 30p'
            },
            {
                week: 23,
                term: 2,
                unit: 'Öğrenme Birimi 15: Veritabanı Temelleri (SQL)',
                topic: 'İlişkisel Veritabanı, Tablo Oluşturma ve Veri Tipleri',
                outcome: 'Veritabanı yönetim sisteminde (MySQL/SQLite) tablo oluşturur; birincil anahtar (Primary Key) ve veri tiplerini tanımlar.',
                suggestedPractice: 'Öğrenci takip sistemi veritabanı tasarımı: ogrenciler ve dersler tablolarının şemasının oluşturulması.',
                criteria: 'Tablo şeması: 40p | Birincil anahtar: 30p | Veri tipi uygunluğu: 30p'
            },
            {
                week: 24,
                term: 2,
                unit: 'Öğrenme Birimi 15: Veritabanı Temelleri (SQL)',
                topic: 'Temel SQL Sorguları: SELECT, INSERT',
                outcome: 'Tablolara yeni kayıt eklemek (INSERT) ve kayıtları filtreleyerek listelemek (SELECT, WHERE, ORDER BY) için SQL sorguları yazar.',
                suggestedPractice: 'Öğrenci kayıt sorguları: Belirli sınıftaki öğrencileri ada göre alfabetik listeleyen SQL komutları.',
                criteria: 'SQL sözdizimi: 40p | Filtreleme (WHERE): 30p | Sıralama: 30p'
            },
            {
                week: 25,
                term: 2,
                unit: 'Öğrenme Birimi 15: Veritabanı Temelleri (SQL)',
                topic: 'SQL Sorguları: UPDATE, DELETE',
                outcome: 'Veritabanındaki mevcut kayıtları güncellemek (UPDATE) ve güvenli şekilde silmek (DELETE) için parametreli sorgular yazar.',
                suggestedPractice: 'Öğrenci iletişim bilgilerini güncelleme ve mezun öğrencileri silme sorgusu senaryoları.',
                criteria: 'WHERE şartı güvenliği: 45p | Güncelleme komutları: 30p | Doğrulama: 25p'
            },
            {
                week: 26,
                term: 2,
                unit: 'Öğrenme Birimi 16: Web - Veritabanı Bağlantısı',
                topic: 'Sunucu Betiği ile Veritabanı Bağlantısı ve Hata Yönetimi',
                outcome: 'Sunucu betiği üzerinden veritabanına bağlanır (PDO/MySQLi/ORM); bağlantı hatalarını güvenle yönetir.',
                suggestedPractice: 'Veritabanı bağlantı dosyası (db.php / db.js) hazırlama ve bağlantı hatasında kullanıcıya temiz uyarı verme.',
                criteria: 'Bağlantı güvenliği: 40p | Hata yakalama: 30p | Modüler yapı: 30p'
            },
            {
                week: 27,
                term: 2,
                unit: 'Öğrenme Birimi 17: Veritabanı CRUD - Listeleme (Read)',
                topic: 'Veritabanındaki Kayıtları Web Sayfasında Tablo ile Listeleme',
                outcome: 'Veritabanından çekilen kayıt setini döngü ile dinamik bir HTML tablosuna dönüştürür.',
                suggestedPractice: 'Ürün envanter tablosu: Veritabanındaki ürünlerin fiyat, stok ve durum bilgisiyle sayfada listelenmesi.',
                criteria: 'Sorgu çalıştırma: 35p | Döngüyle HTML basma: 35p | Tablo düzeni: 30p'
            },
            {
                week: 28,
                term: 2,
                unit: 'Öğrenme Birimi 17: Veritabanı CRUD - Kayıt Ekleme (Create)',
                topic: 'Web Formu Aracılığıyla Veritabanına Kayıt Ekleme',
                outcome: 'Kullanıcının formdan girdiği verileri sunucu üzerinden veritabanına yeni kayıt olarak ekler.',
                suggestedPractice: 'Yeni ürün/öğrenci ekleme formu: Girilen verilerin anında veritabanına kaydedilmesi ve listeye yönlendirme.',
                criteria: 'SQL Injection koruması: 40p | Veri kaydetme: 30p | Geri bildirim: 30p'
            },
            {
                week: 29,
                term: 2,
                unit: 'Öğrenme Birimi 18: 2. Dönem 1. Sınav ve Performans Değerlendirme',
                topic: '2. Dönem 1. Uygulama Sınavı',
                outcome: 'Veritabanı tasarımı, SQL sorguları ve web form bağlantısı kazanımlarını sınav ortamında sergiler.',
                suggestedPractice: 'Uygulama Sınavı: Verilen şemaya göre tablo oluşturan ve webden veri kaydedip listeleyen uygulama.',
                criteria: 'Veritabanı mimarisi: 30p | Listeleme: 35p | Kayıt ekleme: 35p'
            },
            {
                week: 30,
                term: 2,
                unit: 'Öğrenme Birimi 19: Veritabanı CRUD - Güncelleme ve Silme (Update/Delete)',
                topic: 'Kayıt Düzenleme ve Onaylı Silme Mekanizması',
                outcome: 'Belirli bir ID\'ye sahip kaydın formda düzenlenmesini ve onay kutusu ile silinmesini sağlar.',
                suggestedPractice: 'Kullanıcı düzenleme ve silme: Sil butonuna basıldığında onay uyarısı ile kaydın silinmesi.',
                criteria: 'ID parametre aktarımı: 35p | Güncelleme formu: 35p | Silme onayı: 30p'
            },
            {
                week: 31,
                term: 2,
                unit: 'Öğrenme Birimi 20: Kullanıcı Oturumu ve Güvenlik',
                topic: 'Kullanıcı Girişi (Login), Session ve Cookie Yönetimi',
                outcome: 'Kullanıcı kimlik doğrulamasını (Login) gerçekleştirir; oturum (Session) değişkenleri ile sayfaları yetkilendirir.',
                suggestedPractice: 'Yönetim Paneli Girişi: Doğru kullanıcı adı/şifre ile giriş yapanların panoya erişmesi, çıkış (logout) butonu.',
                criteria: 'Session kontrolü: 40p | Yetkisiz erişim engelleme: 35p | Çıkış işlemi: 25p'
            },
            {
                week: 32,
                term: 2,
                unit: 'Öğrenme Birimi 20: Kullanıcı Oturumu ve Güvenlik',
                topic: 'Şifre Kriptolama (Hash) ve Temel Web Güvenliği',
                outcome: 'Kullanıcı şifrelerini veritabanına açık metin yerine özet fonksiyonları (bcrypt/hash) ile kaydeder; temel güvenlik önlemlerini uygular.',
                suggestedPractice: 'Güvenli kullanıcı kayıt ekranı: Şifrenin hashlenerek kaydedilmesi ve giriş ekranında hash doğrulaması.',
                criteria: 'Hash algoritması: 40p | SQL injection koruması: 30p | Temiz oturum yönetimi: 30p'
            },
            {
                week: 33,
                term: 2,
                unit: 'Öğrenme Birimi 21: Web Projesi Yayına Alma (Deploy)',
                topic: 'Web Barındırma (Hosting), Alan Adı (Domain) ve Yayınlama',
                outcome: 'Geliştirilen web uygulamasını bulut platformlarına (Vercel, Netlify veya cPanel hosting) yükleyerek canlıya alır.',
                suggestedPractice: 'GitHub reposu oluşturma, projeyi commit/push etme ve Vercel/Netlify üzerinden ücretsiz canlıya alma.',
                criteria: 'Git yönetimi: 40p | Canlı deployment: 35p | URL kontrolü: 25p'
            },
            {
                week: 34,
                term: 2,
                unit: 'Öğrenme Birimi 22: Kapsamlı Yıl Sonu Projesi Geliştirme',
                topic: 'Takım Çalışması, Proje Mimarisi ve Kodlama',
                outcome: 'Öğrenilen tüm teknolojileri (HTML, CSS, JS, Veritabanı, Backend) birleştiren kapsamlı bir web projesi üretir.',
                suggestedPractice: 'Okul Kütüphane Takip Sistemi veya Kantin Sipariş Arayüzü projesinin prototiplenmesi.',
                criteria: 'Proje kurgusu: 30p | Veritabanı entegrasyonu: 40p | Arayüz kalitesi: 30p'
            },
            {
                week: 35,
                term: 2,
                unit: 'Öğrenme Birimi 22: Kapsamlı Yıl Sonu Projesi Geliştirme',
                topic: 'Proje Hata Ayıklama (Debug) ve Test Süreci',
                outcome: 'Geliştirilen projede tarayıcı geliştirici araçları ile konsol ve ağ hatalarını tespit eder, giderir.',
                suggestedPractice: 'Kod refactor, responsive mobil kontrolleri ve hız optimizasyonlarının yapılması.',
                criteria: 'Hatasız çalışma: 40p | Mobil testler: 30p | Kod temizliği: 30p'
            },
            {
                week: 36,
                term: 2,
                unit: 'Öğrenme Birimi 22: Kapsamlı Yıl Sonu Projesi Geliştirme',
                topic: 'Yıl Sonu Proje Değerlendirmesi ve Portfolyo Teslimi',
                outcome: 'Tamamlanan projeyi akranlarına ve öğretmene sunarak savunur; GitHub portfolyosunu teslim eder.',
                suggestedPractice: 'Öğrenci proje sunumları ve canlı web bağlantılarının jüri değerlendirmesi.',
                criteria: 'Sunum başarısı: 30p | Proje fonksiyonelliği: 40p | Portfolyo düzeni: 30p'
            }
        ]
    },

    // ==========================================
    // 2. BİLGİSAYARLI TASARIM UYGULAMALARI (10/11. SINIF)
    // ==========================================
    'crs_btu': {
        id: 'crs_btu',
        code: 'BTU',
        name: 'Bilgisayarlı Tasarım Uygulamaları',
        gradeLevel: '10/11. Sınıf',
        hoursPerWeek: 4,
        description: 'Vektörel Çizim, Piksel Tabanlı Görsel İşleme, Tipografi ve Kurumsal Kimlik Tasarımı',
        weeks: [
            // --- 1. DÖNEM: VEKTÖREL TASARIM & İLLÜSTRASYON ---
            {
                week: 1,
                term: 1,
                unit: 'Öğrenme Birimi 1: Grafik Tasarımın Temelleri',
                topic: 'Tasarım İlkeleri, Çözünürlük ve Renk Modelleri (RGB / CMYK)',
                outcome: 'Grafik tasarımın temel ilkelerini (denge, zıtlık, hiyerarşi, oran) ve renk modellerini (RGB, CMYK) açıklar.',
                suggestedPractice: 'Baskı ve ekran için uygun çözünürlük (72 dpi vs 300 dpi) ve renk modlarında yeni çalışma alanı açma.',
                criteria: 'Doğru renk modu: 40p | Çözünürlük standardı: 30p | Çalışma alanı ayarı: 30p'
            },
            {
                week: 2,
                term: 1,
                unit: 'Öğrenme Birimi 2: Vektörel Çizim Yazılımı Arayüzü',
                topic: 'Çalışma Alanı, Cetveller, Kılavuz Çizgileri ve Temel Şekiller',
                outcome: 'Vektörel çizim yazılımında araç çubuğunu kullanır; temel geometrik şekiller (dikdörtgen, elips, çokgen) çizer.',
                suggestedPractice: 'Kılavuz çizgileri ve temel geometrik şekilleri birleştirerek basit simgeler (ev, araba, kamera) çizimi.',
                criteria: 'Geometrik uyum: 40p | Cetvel/Kılavuz kullanımı: 30p | Seçim araçları doğruluğu: 30p'
            },
            {
                week: 3,
                term: 1,
                unit: 'Öğrenme Birimi 3: Çizim Araçları ve Yol (Path) Düzenleme',
                topic: 'Kalem Aracı (Pen Tool) ile Serbest ve Eğrisel Çizim',
                outcome: 'Kalem aracını (Pen Tool) kullanarak düz çizgi, açı ve Bezier eğrileriyle serbest vektörel çizimler yapar.',
                suggestedPractice: 'Verilen karmaşık vektörel nesneleri ve organik formları (elma, yaprak, nota) Pen Tool ile kusursuz çizme.',
                criteria: 'Eğri kontrolü (Bezier): 45p | Düğüm noktası azaltma: 30p | Çizgi pürüzsüzlüğü: 25p'
            },
            {
                week: 4,
                term: 1,
                unit: 'Öğrenme Birimi 4: Şekil Birleştirme ve Biçimlendirme',
                topic: 'Pathfinder (Yol Bulucu) ve Şekil Oluşturucu (Shape Builder) Aracı',
                outcome: 'Şekilleri birleştirme (Unite), çıkarma (Minus Front) ve kesiştirme yöntemleriyle yeni nesneler üretir.',
                suggestedPractice: 'Geometrik bulut, hilal ve karmaşık uygulama ikonlarını Shape Builder aracı ile hızlıca oluşturma.',
                criteria: 'Pathfinder komutları: 40p | Shape Builder hakimiyeti: 35p | Temiz vektör çıktısı: 25p'
            },
            {
                week: 5,
                term: 1,
                unit: 'Öğrenme Birimi 5: Renk, Degrade ve Desen',
                topic: 'Dolgu, Çizgi (Stroke) ve Degrade (Gradient) Uygulamaları',
                outcome: 'Nesnelere renk paletleri, degrade geçişler (lineer, radyal) ve kontur kalınlıkları uygular.',
                suggestedPractice: 'Güneş batımı manzarasını zengin degrade tonları ve şeffaflık (opacity) efektleriyle vektörel tasarlama.',
                criteria: 'Degrade uyumu: 40p | Kontur estetiği: 30p | Renk armonisi: 30p'
            },
            {
                week: 6,
                term: 1,
                unit: 'Öğrenme Birimi 6: Tipografi ve Yazı Düzenlemeleri',
                topic: 'Yazı Tipleri (Serif / Sans-serif), Karakter ve Paragraf Ayarları',
                outcome: 'Tipografik hiyerarşiyi uygular; yazı karakteri seçimi, satır/harf aralığı (leading, kerning) düzenlemeleri yapar.',
                suggestedPractice: 'Tipografik alıntı/özlü söz afişi: Farklı font ağırlıkları ve kontrast renklerle estetik metin kompozisyonu.',
                criteria: 'Tipografik hiyerarşi: 40p | Kerning/Leading dengesi: 30p | Okunabilirlik: 30p'
            },
            {
                week: 7,
                term: 1,
                unit: 'Öğrenme Birimi 6: Tipografi ve Yazı Düzenlemeleri',
                topic: 'Yazıyı Çizime Dönüştürme (Create Outlines) ve Şekillendirme',
                outcome: 'Metinleri vektörel yollara dönüştürür; harf formlarını modifiye ederek özgün tipografik grafikler oluşturur.',
                suggestedPractice: 'Bir kelimenin harflerini sembolik olarak uzatıp bükerek tematik kelime illüstrasyonu yapma.',
                criteria: 'Outline kalitesi: 40p | Yaratıcılık: 35p | Vektör pürüzsüzlüğü: 25p'
            },
            {
                week: 8,
                term: 1,
                unit: 'Öğrenme Birimi 7: Logo ve Amblem Tasarımı',
                topic: 'Logo Türleri, Minimalizm ve Eskizden Vektöre Aktarım',
                outcome: 'Bir marka veya kurum için konsept geliştirir; eskiz çizimlerini vektörel logoya dönüştürür.',
                suggestedPractice: 'Teknoloji veya spor kulübü için modern, sade ve akılda kalıcı logo tasarımı.',
                criteria: 'Özgünlük: 40p | Geometrik oran/ölçek: 30p | Tek renkte çalışabilirlik: 30p'
            },
            {
                week: 9,
                term: 1,
                unit: 'Öğrenme Birimi 7: Logo ve Amblem Tasarımı',
                topic: 'Logo Kılavuzu: Güvenli Alan, Renk Kodları ve Boyutlandırma',
                outcome: 'Hazırlanan logonun kurumsal renk kodlarını (HEX, RGB, CMYK, Pantone) ve kullanım kurallarını belirler.',
                suggestedPractice: 'Logo sunum paftası: Logonun koyu ve açık zeminlerdeki versiyonları ve minimum kullanım boyutu tablosu.',
                criteria: 'Kılavuz kuralları: 40p | Renk kodları doğruluğu: 30p | Pafta düzeni: 30p'
            },
            {
                week: 10,
                term: 1,
                unit: 'Öğrenme Birimi 8: Kurumsal Kimlik Tasarımı',
                topic: 'Kartvizit, Antetli Kağıt ve Zarf Tasarımı',
                outcome: 'Kurumsal kimlik standartlarına uygun baskıya hazır kartvizit (85x55mm) ve antetli kağıt (A4) tasarlar.',
                suggestedPractice: 'Bilişim öğretmenliği veya yazılım ajansı için çift taraflı kartvizit ve antetli form tasarımı.',
                criteria: 'Baskı payı (Bleed): 40p | Tipografik hizalama: 35p | Kurumsal bütünlük: 25p'
            },
            {
                week: 11,
                term: 1,
                unit: 'Öğrenme Birimi 9: 1. Dönem 1. Sınav ve Performans',
                topic: '1. Dönem Uygulama Sınavı: Vektörel Kurumsal Tasarım',
                outcome: 'Vektörel çizim, logo ve kurumsal kimlik kazanımlarını sınav uygulamasında zaman kısıtı altında sergiler.',
                suggestedPractice: 'Uygulama Sınavı: Belirlenen hayali şirket için 2 saatte logo ve kartvizit tasarımı yapılması.',
                criteria: 'Logo özgünlüğü: 35p | Kartvizit standartları: 35p | Zaman yönetimi ve teslim: 30p'
            },
            {
                week: 12,
                term: 1,
                unit: 'Öğrenme Birimi 10: Vektörel İllüstrasyon ve Maskeleme',
                topic: 'Kırpma Maskesi (Clipping Mask) ve Şeffaflık Maskesi',
                outcome: 'Görselleri ve desenleri belirli vektörel şekillerin içine hapsetmek için Clipping Mask yöntemini kullanır.',
                suggestedPractice: 'Harflerin ve geometrik portrelerin içine soyut manzara/desen giydirme çalışması.',
                criteria: 'Maskeleme doğruluğu: 40p | Kompozisyon dengesi: 30p | Temiz katman yapısı: 30p'
            },
            {
                week: 13,
                term: 1,
                unit: 'Öğrenme Birimi 11: Sosyal Medya Grafik Tasarımı',
                topic: 'Instagram / YouTube Görsel Ölçüleri ve Banner Tasarımı',
                outcome: 'Sosyal medya platform standartlarına (1080x1080, 1920x1080) uygun dikkat çekici görsel içerikler üretir.',
                suggestedPractice: 'Okul bilişim festivali veya semineri için Instagram gönderi (post) ve hikaye (story) tasarımı.',
                criteria: 'Platform ölçü uyumu: 35p | Odak noktası oluşturma: 35p | Metin/görsel dengesi: 30p'
            },
            {
                week: 14,
                term: 1,
                unit: 'Öğrenme Birimi 12: İnfografik Tasarımı',
                topic: 'Veri Görselleştirme, İkonlar ve Akış Şemaları',
                outcome: 'Karmaşık bilgileri sadeleştirmek için grafiksel göstergeler, istatistik diyagramları ve ikonlar kullanır.',
                suggestedPractice: '"Yapay Zekanın Tarihi" veya "Bilgisayar Güvenliği Kuralları" konulu dikey infografik afişi hazırlama.',
                criteria: 'Bilgi hiyerarşisi: 40p | İkon uyumu: 30p | Okuma akışı: 30p'
            },
            {
                week: 15,
                term: 1,
                unit: 'Öğrenme Birimi 13: Ambalaj ve Etiket Tasarımı',
                topic: 'Kutu Bıçak İzi (Die-cut), Kırım Çizgileri ve Ürün Etiketi',
                outcome: 'Baskı sonrası katlanacak kutu veya şişe etiketi için bıçak izi şablonu üzerinde tasarım yapar.',
                suggestedPractice: 'Meyve suyu kutusu veya kahve paketi etiket tasarımı (barkod, içindekiler, besin değerleri tablosu).',
                criteria: 'Bıçak izi uyumu: 40p | Kanuni zorunlu alanlar: 30p | Çekicilik: 30p'
            },
            {
                week: 16,
                term: 1,
                unit: 'Öğrenme Birimi 14: İhracat Formatları ve Baskıya Hazırlık',
                topic: 'PDF/X Standartları, Taşma Payı (Bleed) ve Kesim Çizgileri',
                outcome: 'Vektörel çalışmaları matbaa ve dijital mecralar için uygun formatlarda (PDF, SVG, EPS, PNG) dışa aktarır.',
                suggestedPractice: 'Tasarlanan afişin matbaaya gönderilecek şekilde kros çizgili ve CMYK yüksek çözünürlüklü PDF ihracı.',
                criteria: 'PDF standartları: 40p | Yazıların outline olması: 30p | Taşma payı kontrolü: 30p'
            },
            {
                week: 17,
                term: 1,
                unit: 'Öğrenme Birimi 15: Mockup (Gerçekçi Sunum) Hazırlama',
                topic: 'Tasarımı 3 Boyutlu Ürün Yüzeylerine Giydirme',
                outcome: '2 boyutlu tasarımları tişört, kupa, tabela veya telefon ekranı mockup şablonlarına akıllı nesneyle giydirir.',
                suggestedPractice: 'Dönem boyu tasarlanan logoyu ofis duvarı tabelası ve kahve kupası üzerinde profesyonelce sergileme.',
                criteria: 'Perspektif uyumu: 40p | Işık/Gölge gerçekçiliği: 30p | Sunum estetiği: 30p'
            },
            {
                week: 18,
                term: 1,
                unit: 'Öğrenme Birimi 16: 1. Dönem Portfolyo Değerlendirmesi',
                topic: 'Vektörel Tasarım Portfolyosunun Derlenmesi',
                outcome: '1. Dönem boyunca üretilen tüm tasarım çalışmalarını dijital portfolyo kitapçığı haline getirir.',
                suggestedPractice: 'Behance / PDF portfolyo hazırlığı ve sınıf içi tasarım eleştirisi (kritik).',
                criteria: 'Portfolyo bütünlüğü: 40p | Çalışma çeşitliliği: 35p | Sunum dili: 25p'
            },

            // --- 2. DÖNEM: PİKSEL TABANLI GÖRSEL İŞLEME & MANİPÜLASYON ---
            {
                week: 19,
                term: 2,
                unit: 'Öğrenme Birimi 17: Piksel Tabanlı Görsel İşleme Giriş',
                topic: 'Görsel Çözünürlüğü, Katmanlar (Layers) ve Çalışma Alanı',
                outcome: 'Piksel mantığını, katman hiyerarşisini, kilitli/görünür katmanları ve temel seçim araçlarını kullanır.',
                suggestedPractice: 'Farklı fotoğraflardan öğeleri katman katman bir araya getirerek ilk kolaj çalışmasını yapma.',
                criteria: 'Katman organizasyonu: 40p | İsimlendirme/Gruplama: 30p | Seçim hassasiyeti: 30p'
            },
            {
                week: 20,
                term: 2,
                unit: 'Öğrenme Birimi 18: Seçim ve Dekupe Teknikleri',
                topic: 'Hızlı Seçim, Manyetik Kement ve Nesne Seçim Araçları',
                outcome: 'Fotoğraflardaki nesneleri arka plandan hassas bir şekilde ayırır (dekupe eder).',
                suggestedPractice: 'Ürün fotoğrafı dekupe etme: Arka planı beyazlatma veya şeffaf PNG olarak dışa aktarma.',
                criteria: 'Kenar pürüzsüzlüğü: 40p | Dekupe hızı: 30p | Şeffaf çıktı: 30p'
            },
            {
                week: 21,
                term: 2,
                unit: 'Öğrenme Birimi 18: İleri Dekupe: Saç ve Detay Ayıklama',
                topic: 'Seç ve Maskele (Select and Mask) ve Kenar İyileştirme',
                outcome: 'Saç, kürk, tül gibi karmaşık kenarlara sahip fotoğrafları Select and Mask fırçasıyla arka plandan ayırır.',
                suggestedPractice: 'Rüzgarda savrulan saçlı portreyi arka plandan ayırıp farklı bir stüdyo fonuna kusursuz yerleştirme.',
                criteria: 'Saç teli detayları: 45p | Renk sızıntısını temizleme: 30p | Maske bütünlüğü: 25p'
            },
            {
                week: 22,
                term: 2,
                unit: 'Öğrenme Birimi 19: Katman Maskeleri (Layer Masks)',
                topic: 'Tahribatsız Düzenleme (Non-destructive Editing) ve Fırça ile Maskeleme',
                outcome: 'Fotoğrafları silmeden, katman maskesi (siyah/beyaz fırça) ile gizleme ve görünür kılma yöntemini uygular.',
                suggestedPractice: 'İki farklı manzara fotoğrafını yumuşak geçişli gradyan maske ile tek karede kaynaştırma.',
                criteria: 'Maske mantığı (siyah/beyaz): 40p | Yumuşak geçiş kalitesi: 30p | Orijinal pikseli koruma: 30p'
            },
            {
                week: 23,
                term: 2,
                unit: 'Öğrenme Birimi 20: Renk Düzeltme ve Ton Ayarları',
                topic: 'Levels (Düzeyler), Curves (Eğriler), Hue/Saturation (Ton/Doygunluk)',
                outcome: 'Ayar katmanları (Adjustment Layers) ile fotoğrafların kontrastını, ışığını ve renk dengesini optimize eder.',
                suggestedPractice: 'Karanlık/soluk çekilmiş tarihi bina fotoğrafını renk ve ışık düzeltmeleriyle canlı hale getirme.',
                criteria: 'Doğal ışık dengesi: 40p | Ayar katmanı kullanımı: 30p | Patlama/kararma olmaması: 30p'
            },
            {
                week: 24,
                term: 2,
                unit: 'Öğrenme Birimi 21: Fotoğraf Rötuşlama ve Onarım',
                topic: 'Spot Healing Brush, Clone Stamp ve Patch Aracı',
                outcome: 'Portrelerdeki cilt kusurlarını, eski yıpranmış fotoğraflardaki çizik ve yırtıkları onarır.',
                suggestedPractice: 'Eski siyah-beyaz aile fotoğrafındaki kırışıklık ve yırtıkları doku klonlama ile restore etme.',
                criteria: 'Doku doğallığı: 45p | İzsiz onarım: 30p | Detay hassasiyeti: 25p'
            },
            {
                week: 25,
                term: 2,
                unit: 'Öğrenme Birimi 22: Karışım Modları (Blending Modes)',
                topic: 'Multiply, Screen, Overlay, Soft Light Modları ve Işık Efektleri',
                outcome: 'Katman karışım modlarını kullanarak fotoğraflara doku, ışık sızıntısı ve duman/ateş efektleri ekler.',
                suggestedPractice: 'Fotoğrafa neon ışık ve yağmur/sis efekti giydirerek sinematik atmosfer oluşturma.',
                criteria: 'Karışım modu seçimi: 40p | Atmosfer uyumu: 35p | Opacity dengesi: 25p'
            },
            {
                week: 26,
                term: 2,
                unit: 'Öğrenme Birimi 23: Çift Pozlama (Double Exposure)',
                topic: 'Silüet ile Doğa Fotoğraflarını Sanatsal Olarak Birleştirme',
                outcome: 'İnsan portresi silüeti içerisine şehir veya orman manzarasını sanatsal olarak harmanlar.',
                suggestedPractice: 'Sanatsal müzik albüm kapağı için çift pozlama tekniğiyle etkileyici afiş tasarımı.',
                criteria: 'Konsept yaratıcılığı: 40p | Işık ve kontrast uyumu: 35p | Kompozisyon: 25p'
            },
            {
                week: 27,
                term: 2,
                unit: 'Öğrenme Birimi 24: Tipografi ve Görsel Birleşimi (Poster Tasarımı)',
                topic: 'Film ve Etkinlik Afişlerinde Başlık Yerleşimi ve Görsel Odak',
                outcome: 'Film veya tiyatro oyunu için dikkat çekici bir görsel odak ve tipografik hiyerarşi oluşturur.',
                suggestedPractice: 'Bilimkurgu veya festival afişi tasarımı: Başlık fontu, oyuncu isimleri ve görsel manipülasyon.',
                criteria: 'Tipografik etki: 40p | Afiş okunabilirliği: 30p | Görsel dramatik etki: 30p'
            },
            {
                week: 28,
                term: 2,
                unit: 'Öğrenme Birimi 25: Akıllı Nesneler (Smart Objects) ve Filtreler',
                topic: 'Akıllı Filtreler, Gaussian Blur, Motion Blur ve Kamera Ham Filtresi',
                outcome: 'Akıllı nesneler üzerinde geri dönüşümlü filtreler (Camera Raw, Hareket Bulanıklığı vb.) uygular.',
                suggestedPractice: 'Hareketsiz bir araba fotoğrafına hız hissi veren Motion Blur ve tekerlek dönme efekti ekleme.',
                criteria: 'Akıllı filtre kullanımı: 40p | Hareket gerçekçiliği: 35p | Temiz maskeleme: 25p'
            },
            {
                week: 29,
                term: 2,
                unit: 'Öğrenme Birimi 26: 2. Dönem 1. Sınav ve Performans',
                topic: '2. Dönem Uygulama Sınavı: Foto Manipülasyon',
                outcome: 'Dekupe, maskeleme, renk düzeltme ve filtre kazanımlarını sınav uygulamasında birleştirir.',
                suggestedPractice: 'Uygulama Sınavı: Verilen 4 farklı fotoğrafı 2 saatte birleştirip gerçekçi bir fantastik sahne üretme.',
                criteria: 'Dekupe temizliği: 25p | Renk uyumu: 25p | Işık/Gölge: 25p | Zamanında teslim: 25p'
            },
            {
                week: 30,
                term: 2,
                unit: 'Öğrenme Birimi 27: Fantastik Foto Manipülasyon',
                topic: 'Perspektif, Işık-Gölge Çizimi ve Ortam Rengi Eşleme',
                outcome: 'Farklı açılardan çekilmiş nesneleri perspektif kurallarına göre dizip gerçekçi fırça gölgeleri çizer.',
                suggestedPractice: 'Okyanus ortasında yüzen fantastik ada veya dev şişe içinde mini ev kompozisyonu.',
                criteria: 'Gölge gerçekçiliği: 40p | Renk tonu eşleme: 35p | İkna edicilik: 25p'
            },
            {
                week: 31,
                term: 2,
                unit: 'Öğrenme Birimi 28: GIF ve Basit Animasyon',
                topic: 'Zaman Çizelgesi (Timeline) ve Kare Kare Animasyon',
                outcome: 'Web banner veya sosyal medya için hareketli GIF grafikleri ve animasyonlu butonlar tasarlar.',
                suggestedPractice: 'İndirim duyurusu için yanıp sönen buton ve hareketli metin içeren 3 saniyelik banner GIF.',
                criteria: 'Kare akıcılığı (fps): 40p | Döngü kusursuzluğu (loop): 30p | Dosya boyutu optimizasyonu: 30p'
            },
            {
                week: 32,
                term: 2,
                unit: 'Öğrenme Birimi 29: Dijital İllüstrasyon ve Dijital Boyama',
                topic: 'Grafik Tablet Kullanımı, Özel Fırçalar ve Katmanlı Boyama',
                outcome: 'Çizim tableti ve özel fırça uçları ile çizgi çizme ve gölgelendirme tekniklerini uygular.',
                suggestedPractice: 'Çizgi roman karakteri veya oyun avatarı için temel hat çizimi ve renklendirme.',
                criteria: 'Çizgi kalınlık duyarlılığı: 40p | Işık/gölge boyama: 30p | Katman ayrımı: 30p'
            },
            {
                week: 33,
                term: 2,
                unit: 'Öğrenme Birimi 30: UI/UX Arayüz Tasarımı Temelleri',
                topic: 'Mobil Uygulama Arayüzü, Grid Sistemi ve Bileşenler (Buttons, Cards)',
                outcome: 'Kullanıcı dostu mobil arayüz prototipleri tasarlar; 8px grid sistemini uygular.',
                suggestedPractice: 'Müzik çalar veya yemek sipariş mobil uygulaması açılış ekranı (Splash) ve ana sayfa tasarımı.',
                criteria: 'Grid düzeni: 40p | Buton/ikon standartları: 30p | Kullanıcı deneyimi (UX): 30p'
            },
            {
                week: 34,
                term: 2,
                unit: 'Öğrenme Birimi 31: Kapsamlı Yıl Sonu Tasarım Projesi',
                topic: 'Bütünleşik Marka ve İletişim Tasarımı Kampanyası',
                outcome: 'Bir marka için logo, ambalaj, sosyal medya ve web arayüzünü kapsayan bütünleşik kampanya tasarlar.',
                suggestedPractice: 'Öğrencinin kendi seçeceği yeni bir içecek veya teknoloji markası için eksiksiz kurumsal kimlik seti.',
                criteria: 'Bütünleşik vizyon: 40p | Tasarım zenginliği: 30p | Matbaa/ekran ihracı: 30p'
            },
            {
                week: 35,
                term: 2,
                unit: 'Öğrenme Birimi 31: Kapsamlı Yıl Sonu Tasarım Projesi',
                topic: 'Mockup Sunumları ve Paftalama',
                outcome: 'Kampanya çalışmalarını gerçekçi ortamlara giydirerek müşteri sunum paftası haline getirir.',
                suggestedPractice: 'Marka kılavuzunun A3 yatay paftalara dizilmesi ve profesyonel sunum slaytı hazırlanması.',
                criteria: 'Pafta estetiği: 40p | Detay zenginliği: 30p | Sunum kalitesi: 30p'
            },
            {
                week: 36,
                term: 2,
                unit: 'Öğrenme Birimi 31: Kapsamlı Yıl Sonu Tasarım Projesi',
                topic: 'Yıl Sonu Tasarım Sergisi ve Portfolyo Değerlendirmesi',
                outcome: 'Yıl boyu üretilen en iyi tasarımları okul panosu/sergisinde sergiler ve portfolyo olarak teslim eder.',
                suggestedPractice: 'Laboratuvar yıl sonu grafik sergisi ve basılı/dijital portfolyo puanlaması.',
                criteria: 'Sergi katılımı: 35p | Portfolyo kalitesi: 40p | Öz değerlendirme: 25p'
            }
        ]
    },

    // ==========================================
    // 3. ROBOTİK KODLAMA (10/11. SINIF)
    // ==========================================
    'crs_robotik': {
        id: 'crs_robotik',
        code: 'ROBOTİK',
        name: 'Robotik Kodlama',
        gradeLevel: '10/11. Sınıf',
        hoursPerWeek: 4,
        description: 'Temel Elektronik, Mikrodenetleyiciler (Arduino), Sensörler, Motorlar ve Otonom Robotik Sistemler',
        weeks: [
            // --- 1. DÖNEM: TEMEL ELEKTRONİK & MİKRODENETLEYİCİ GİRİŞ ---
            {
                week: 1,
                term: 1,
                unit: 'Öğrenme Birimi 1: Robotik ve Kodlamaya Giriş',
                topic: 'Robot Nedir? Sensör, Karar Verici ve Eyleyici (Aktüatör) Kavramları',
                outcome: 'Robotik sistemlerin bileşenlerini (algılama, karar verme, hareket) ve endüstrideki kullanım alanlarını açıklar.',
                suggestedPractice: 'Endüstriyel robot kolları ve otonom araçların çalışma blok diyagramının tahtada/defterde çizilmesi.',
                criteria: 'Kavramsal anlama: 40p | Blok şema doğruluğu: 30p | Örnek çeşitliliği: 30p'
            },
            {
                week: 2,
                term: 1,
                unit: 'Öğrenme Birimi 2: Temel Elektronik ve İş Güvenliği',
                topic: 'Voltaj, Akım, Direnç, Ohm Kanunu ve Breadboard Kullanımı',
                outcome: 'Ohm kanununu (V = I * R) hesaplar; devre tahtasının (Breadboard) iç bağlantı yapısını kavrar.',
                suggestedPractice: 'Multimetre ile pil gerilimi ve direnç değerlerini ölçme; breadboard üzerinde seri/paralel direnç kurma.',
                criteria: 'Multimetre kullanımı: 40p | Breadboard mantığı: 30p | Güvenlik kuralları: 30p'
            },
            {
                week: 3,
                term: 1,
                unit: 'Öğrenme Birimi 3: Mikrodenetleyici Kartı ve IDE Kurulumu',
                topic: 'Mikrodenetleyici Mimarisi, Pinler (Dijital / Analog) ve Kodlama Arayüzü',
                outcome: 'Mikrodenetleyici kartının (Arduino Uno vb.) pin yapısını tanır; geliştirme ortamını (IDE) kurup karta yükleme yapar.',
                suggestedPractice: 'Arduino IDE port ve kart seçimi; yerleşik 13. pindeki LED\'i yakıp söndüren Blink kodunu yükleme.',
                criteria: 'IDE ve sürücü kurulumu: 40p | Kart-port bağlantısı: 35p | Başarılı kod yükleme: 25p'
            },
            {
                week: 4,
                term: 1,
                unit: 'Öğrenme Birimi 4: Dijital Çıkışlar ile LED Kontrolü',
                topic: 'pinMode(), digitalWrite(), delay() Fonksiyonları ve LED Bağlama',
                outcome: 'Dijital çıkış pinlerini yapılandırır; uygun ön direnç (220-330 ohm) ile harici LED devreleri kurup kodlar.',
                suggestedPractice: 'Trafik Işıkları Simülasyonu: Kırmızı, sarı ve yeşil LED\'lerin standart bekleme süreleriyle sıralı yanması.',
                criteria: 'Doğru direnç ve LED yönü: 40p | Zamanlama doğruluğu: 30p | Temiz devre: 30p'
            },
            {
                week: 5,
                term: 1,
                unit: 'Öğrenme Birimi 4: Dijital Çıkışlar ile LED Kontrolü',
                topic: 'Dizi (Array) ve Döngü ile Çoklu LED (Kara Şimşek / Knight Rider)',
                outcome: 'Döngü (for) ve dizi mantığı ile birden fazla dijital pini az kod satırıyla sırayla kontrol eder.',
                suggestedPractice: 'Kara Şimşek devresi: 6 adet LED\'in for döngüsü kullanılarak soldan sağa ve sağdan sola akması.',
                criteria: 'For döngüsü kullanımı: 45p | Dizi indeksleme: 30p | Donanım kablolaması: 25p'
            },
            {
                week: 6,
                term: 1,
                unit: 'Öğrenme Birimi 5: Dijital Girişler ve Buton Kontrolü',
                topic: 'digitalRead(), Pull-up / Pull-down Direnç Mantığı',
                outcome: 'Basma butonundan (Push button) dijital okuma yapar; yüzen pini önlemek için pull-up/pull-down direnç bağlar.',
                suggestedPractice: 'Aç/Kapa Butonlu Lamba: Butona basıldığında yanan, tekrar basıldığında sönen kilitli buton algoritması.',
                criteria: 'Pull-up/down doğruluğu: 40p | Buton arkı (debounce) önleme: 30p | Algoritma mantığı: 30p'
            },
            {
                week: 7,
                term: 1,
                unit: 'Öğrenme Birimi 6: Seri İletişim (Serial Monitor)',
                topic: 'Serial.begin(), Serial.print(), Serial.read() ve Hata Ayıklama',
                outcome: 'Mikrodenetleyici ile bilgisayar arasında seri haberleşme kurar; sensör ve değişken değerlerini ekrana yazdırır.',
                suggestedPractice: 'Bilgisayar klavyesinden gönderilen "A" harfiyle LED yakan, "K" harfiyle söndüren seri kontrol sistemi.',
                criteria: 'Baud hızı uyumu: 35p | Seri veri okuma kontrolü: 35p | Konsol bilgilendirme: 30p'
            },
            {
                week: 8,
                term: 1,
                unit: 'Öğrenme Birimi 7: Analog Girişler ve Potansiyometre',
                topic: 'ADC (Analog-Dijital Dönüştürücü), analogRead() ve 0-1023 Değer Aralığı',
                outcome: 'Analog pinlerden (A0-A5) 10-bit analog veri okur; potansiyometre ile değişken direnç kontrolü sağlar.',
                suggestedPractice: 'Potansiyometre ile LED yanıp sönme hızını veya seri ekrandaki sayaç değerini canlı ayarlama.',
                criteria: 'Analog okuma formülü: 40p | Seri ekranda takip: 30p | Devre bağlantısı: 30p'
            },
            {
                week: 9,
                term: 1,
                unit: 'Öğrenme Birimi 8: PWM (Darbe Genişlik Modülasyonu) ve Analog Çıkış',
                topic: 'analogWrite(), 0-255 Çıkış Değeri ve map() Fonksiyonu',
                outcome: 'PWM destekli pinlerle (~) LED parlaklığını ayarlar; 0-1023 aralığını map() ile 0-255 aralığına oranlar.',
                suggestedPractice: 'Dimmer devresi: Potansiyometreyi çevirdikçe LED\'in ışık şiddetini pürüzsüzce artıran/azaltan sistem.',
                criteria: 'PWM pin seçimi: 35p | map() fonksiyonu: 35p | Pürüzsüz parlaklık kontrolü: 30p'
            },
            {
                week: 10,
                term: 1,
                unit: 'Öğrenme Birimi 8: RGB LED ile Renk Karışımı',
                topic: 'Ortak Anot / Katot RGB LED ve Renk Kodları',
                outcome: 'RGB LED\'in kırmızı, yeşil, mavi bacaklarına farklı PWM değerleri vererek milyonlarca ara renk üretir.',
                suggestedPractice: 'Ruh Hali Lambası (Mood Lamp): Renkler arasında rastgele yumuşak geçişler yapan dekoratif RGB aydınlatma.',
                criteria: 'Ortak bacak tespiti: 35p | Renk karışım PWM kodları: 35p | Yumuşak geçiş algoritması: 30p'
            },
            {
                week: 11,
                term: 1,
                unit: 'Öğrenme Birimi 9: 1. Dönem 1. Sınav ve Performans',
                topic: '1. Dönem Uygulama Sınavı: Temel Robotik Devre',
                outcome: 'Dijital/analog pinler, seri monitör ve buton kontrollerini sınav uygulamasında devre kurarak kodlar.',
                suggestedPractice: 'Uygulama Sınavı: Buton ve potansiyometre ile 3 farklı LED modunu kontrol eden devrenin kurulması.',
                criteria: 'Devre doğruluğu: 35p | Kod mimarisi: 35p | Çalışma başarısı: 30p'
            },
            {
                week: 12,
                term: 1,
                unit: 'Öğrenme Birimi 10: Işık Sensörü (LDR) ile Ortam Algılama',
                topic: 'Fotodirenç (LDR), Gerilim Bölücü Devre ve Eşik Değeri',
                outcome: 'LDR ile ortamın ışık seviyesini ölçer; eşik değerine (threshold) göre otomatik eylemler başlatır.',
                suggestedPractice: 'Akıllı Sokak Lambası: Hava karardığında (ışık azaldığında) otomatik yanan, aydınlıkta sönen gece lambası.',
                criteria: 'Gerilim bölücü direnç seçimi: 40p | Eşik değeri kalibrasyonu: 35p | Kararlı çalışma: 25p'
            },
            {
                week: 13,
                term: 1,
                unit: 'Öğrenme Birimi 11: Sesli Uyarıcı (Buzzer) ve Melodi',
                topic: 'tone(), noTone() Fonksiyonları ve Pasif/Aktif Buzzer',
                outcome: 'Buzzer kullanarak farklı frekanslarda ses tonları ve uyarı sesleri (bip) üretir.',
                suggestedPractice: 'Hırsız Alarmı: LDR üzerine düşen ışık kesildiğinde (biri geçtiğinde) kesik kesik siren çalan buzzer devresi.',
                criteria: 'Frekans yönetimi: 40p | Sensör-alarm entegrasyonu: 35p | Devre bağlantısı: 25p'
            },
            {
                week: 14,
                term: 1,
                unit: 'Öğrenme Birimi 12: Sıcaklık ve Nem Sensörü (DHT11)',
                topic: 'Harici Kütüphane Kurulumu ve Dijital Sensör Protokolü',
                outcome: 'Arduino IDE\'ye harici kütüphane ekler; DHT11 sensöründen sıcaklık (°C) ve bağıl nem (%) verilerini okur.',
                suggestedPractice: 'Laboratuvar Sıcaklık Takipçisi: Sıcaklık 28°C\'yi aştığında kırmızı LED yakan ve seri ekranda uyaran sistem.',
                criteria: 'Kütüphane yönetimi: 40p | Veri okuma kararlılığı: 35p | Uyarı koşulu: 25p'
            },
            {
                week: 15,
                term: 1,
                unit: 'Öğrenme Birimi 13: Ultrasonik Mesafe Sensörü (HC-SR04)',
                topic: 'Ses Dalgalarıyla Mesafe Ölçümü (Echo/Trig Pinleri)',
                outcome: 'Ultrasonik sensör ile sesin gidiş-dönüş süresini (pulseIn) ölçer; mesafeyi santimetreye çevirir.',
                suggestedPractice: 'Araç Park Sensörü: Engel yaklaştıkça buzzer sesinin sıklaşması ve LED\'lerin yeşilden kırmızıya dönmesi.',
                criteria: 'Mesafe formülü (t * 0.034 / 2): 45p | Kademe mantığı (if-else): 30p | Devre kablolaması: 25p'
            },
            {
                week: 16,
                term: 1,
                unit: 'Öğrenme Birimi 14: Karakter LCD Ekran (16x2 I2C)',
                topic: 'I2C Haberleşme Protokolü (SDA / SCL) ve LiquidCrystal_I2C',
                outcome: 'I2C modüllü 16x2 LCD ekrana sadece 2 iletişim piniyle yazı, sensör verisi ve özel karakter basar.',
                suggestedPractice: 'Dijital Termometre Ekranı: 1. satırda "Sicaklik: 24 C", 2. satırda "Mesafe: 15 cm" yazan gösterge paneli.',
                criteria: 'I2C adresi tespiti: 35p | Ekran koordinatları (setCursor): 35p | Türkçe/özel karakter çözümü: 30p'
            },
            {
                week: 17,
                term: 1,
                unit: 'Öğrenme Birimi 15: Hareket Sensörü (PIR) ve Röle Kontrolü',
                topic: 'Kızılötesi Vücut Algılama ve Yüksek Gerilim Kontrolü (Röle)',
                outcome: 'PIR sensörü ile insan hareketini algılar; röle kartı tetikleyerek 220V lamba simülasyonu yapar.',
                suggestedPractice: 'Akıllı Bina Merdiven Otomatiği: Hareket algılandığında röleyi 10 saniye açık tutan aydınlatma.',
                criteria: 'PIR hassasiyet ayarı: 35p | Röle tetikleme mantığı: 35p | Güvenlik önlemleri: 30p'
            },
            {
                week: 18,
                term: 1,
                unit: 'Öğrenme Birimi 16: 1. Dönem Sonu Proje ve Değerlendirme',
                topic: '1. Dönem Akıllı Ev / Akıllı Laboratuvar Maketi',
                outcome: 'Tüm sensör, gösterge ve uyarıcıları birleştirerek çalışan mini bir akıllı ev prototipi tamamlar.',
                suggestedPractice: 'Grup Projesi: LDR, Park Sensörü, DHT11, LCD ve Buzzer içeren akıllı çevre izleme istasyonu.',
                criteria: 'Entegrasyon başarısı: 40p | Kod temizliği: 30p | Maket sunumu: 30p'
            },

            // --- 2. DÖNEM: MOTORLAR & OTONOM ROBOTLAR ---
            {
                week: 19,
                term: 2,
                unit: 'Öğrenme Birimi 17: Servo Motor Kontrolü',
                topic: 'PWM Sinyali ile Açı Kontrolü (0 - 180 Derece) ve Servo.h',
                outcome: 'Servo motoru kütüphane ile sürer; potansiyometre veya sensör verisine göre istenen açıya konumlandırır.',
                suggestedPractice: 'Otomatik Bariyer Sistemi: Ultrasonik sensör araç gördüğünde servo motor kolunu 90 derece açan sistem.',
                criteria: 'Servo kütüphanesi: 40p | Açı sınırları (0-180): 35p | Mekanik montaj: 25p'
            },
            {
                week: 20,
                term: 2,
                unit: 'Öğrenme Birimi 18: DC Motorlar ve Sürücü Kartları (L298N)',
                topic: 'H-Köprüsü Mantığı, Yön ve Hız Kontrolü, Harici Besleme',
                outcome: 'DC motorları L298N sürücü modülü ile ileri, geri ve PWM ile değişken hızlarda sürmeyi kavrar.',
                suggestedPractice: 'Motor test devresi: İki adet DC motorun sırayla ileri, geri dönmesi ve hızlanıp yavaşlaması.',
                criteria: 'Harici pil beslemesi ve GND birleştirme: 45p | ENA/ENB hız pinleri: 30p | Yön pinleri: 25p'
            },
            {
                week: 21,
                term: 2,
                unit: 'Öğrenme Birimi 19: 2 Tekerlekli Robot Şasisi Montajı',
                topic: 'Şasi Mekaniği, Sarhoş Tekerlek, Motor Montajı ve Ağırlık Merkezi',
                outcome: 'Robot gövdesini (şasi) mekanik parçalar, motorlar ve tekerleklerle dengeli şekilde birleştirir.',
                suggestedPractice: 'Robot şasisinin mekanik montajı ve kablo karmaşasını önleyecek lehim/terminal bağlantıları.',
                criteria: 'Mekanik sağlamlık: 40p | Kablo düzeni: 35p | Ağırlık dengesi: 25p'
            },
            {
                week: 22,
                term: 2,
                unit: 'Öğrenme Birimi 20: Temel Robot Sürüş Fonksiyonları',
                topic: 'İleri, Geri, Sağa Dönüş, Sola Dönüş ve Durma Fonksiyonları',
                outcome: 'Robotun hareketini modüler fonksiyonlar (ileri(), donSag(), dur()) halinde kodlar.',
                suggestedPractice: 'Labirentte veya pistte belirlenen kare güzergahı (1 metre ileri, 90 derece sağa) takip eden robot kodu.',
                criteria: 'Fonksiyon mimarisi: 40p | Dönüş açı kalibrasyonu: 35p | Kararlı sürüş: 25p'
            },
            {
                week: 23,
                term: 2,
                unit: 'Öğrenme Birimi 21: Çizgi İzleyen Sensörleri (TCRT5000 / Kızılötesi)',
                topic: 'Siyah ve Beyaz Yüzeylerde Işık Yansıması, Dijital/Analog Çıkış',
                outcome: 'Kızılötesi çizgi sensörünün beyaz zemindeki siyah çizgiyi algılama prensibini kavrar ve kalibre eder.',
                suggestedPractice: '2\'li çizgi sensörü devresi kurup beyaz zemin ve siyah elektrik bandı üzerinde sensör çıkışlarını test etme.',
                criteria: 'Potansiyometre eşik kalibrasyonu: 40p | Tepki süresi: 35p | Zemin testi: 25p'
            },
            {
                week: 24,
                term: 2,
                unit: 'Öğrenme Birimi 22: Temel Çizgi İzleyen Robot Algoritması',
                topic: 'Karar Tablosu (İki Sensör: Beyaz-Beyaz, Siyah-Beyaz, Beyaz-Siyah)',
                outcome: 'Sol ve sağ çizgi sensörlerinden gelen verilere göre robotun çizgiyi ortalayarak ilerlemesini kodlar.',
                suggestedPractice: 'Kapalı devre siyah çizgi pistinde kesintisiz 1 tam tur atan çizgi izleyen robot denemeleri.',
                criteria: 'Çizgiden çıkmama başarısı: 40p | Hız optimizasyonu: 30p | Sarsıntısız dönüş: 30p'
            },
            {
                week: 25,
                term: 2,
                unit: 'Öğrenme Birimi 23: Engelden Kaçan Robot',
                topic: 'Ön Tampon Ultrasonik Sensör ile Dinamik Engel Tespiti',
                outcome: 'Robot ilerlerken önündeki engeli (HC-SR04) tespit eder; durup yön değiştirerek yoluna devam eder.',
                suggestedPractice: 'Önüne engel çıktığında geri çekilip sağa dönerek labirentten kaçan otonom gezgin robot.',
                criteria: 'Engeli erken fark etme: 40p | Çarpışma önleme kararı: 35p | Akıcı hareket: 25p'
            },
            {
                week: 26,
                term: 2,
                unit: 'Öğrenme Birimi 24: Taramalı Engelden Kaçan Robot (Servo + Mesafe)',
                topic: 'Servo Üzerine Monte Edilmiş Ultrasonik Sensör ile Çevre Taraması',
                outcome: 'Robot durduğunda servoyu sola ve sağa çevirerek en boş yönü seçen akıllı yön bulma algoritması yazar.',
                suggestedPractice: 'Engel görünce duran, kafasını (servoyu) sağa-sola çevirip en uzak mesafeye yönelen robot.',
                criteria: 'Sensör tarama algoritması: 45p | Karşılaştırma mantığı: 30p | Otonom başarı: 25p'
            },
            {
                week: 27,
                term: 2,
                unit: 'Öğrenme Birimi 25: Kablosuz İletişim - Bluetooth Modülü (HC-05 / HC-06)',
                topic: 'UART Seri Haberleşme, TX/RX Çapraz Bağlantısı ve Eşleşme',
                outcome: 'Bluetooth modülünü karta bağlar; cep telefonu ile mikrodenetleyici arasında kablosuz veri iletir.',
                suggestedPractice: 'Telefondaki Bluetooth terminal uygulamasından komut göndererek LED açıp kapatma.',
                criteria: 'TX-RX çapraz bağlantı doğruluğu: 40p | Eşleşme başarısı: 30p | Veri iletimi: 30p'
            },
            {
                week: 28,
                term: 2,
                unit: 'Öğrenme Birimi 26: Bluetooth Kontrollü Mobil Robot (RC Car)',
                topic: 'Akıllı Telefon Uygulaması ile Robot Sürüşü',
                outcome: 'Akıllı telefondaki joystick/buton uygulaması üzerinden gelen yön komutlarıyla robotu uzaktan yönetir.',
                suggestedPractice: 'Android/iOS telefonla kablosuz olarak yönlendirilen ve parkurda yarışan Bluetooth robot.',
                criteria: 'Gecikmesiz tepki süresi: 40p | Yön komutları doğruluğu: 35p | Sürüş akıcılığı: 25p'
            },
            {
                week: 29,
                term: 2,
                unit: 'Öğrenme Birimi 27: 2. Dönem 1. Sınav ve Performans',
                topic: '2. Dönem Uygulama Sınavı: Motor Sürüş ve Sensör Entegrasyonu',
                outcome: 'DC motor sürücü, sensörler ve karar algoritmalarını sınav uygulamasında canlı robot üzerinde gösterir.',
                suggestedPractice: 'Uygulama Sınavı: Belirtilen pistte robotun engeli aşıp çizgiyi takip etmesi görev performansı.',
                criteria: 'Görevi tamamlama: 40p | Kod kalitesi: 30p | Donanım stabilitesi: 30p'
            },
            {
                week: 30,
                term: 2,
                unit: 'Öğrenme Birimi 28: Işık İzleyen / Işıktan Kaçan Robot',
                topic: 'Ön Sol ve Sağ LDR Sensörleri ile Işık Kaynağını Takip Etme',
                outcome: 'İki LDR sensöründen gelen ışık şiddetini kıyaslayarak el feneri ışığına doğru koşan robot tasarlar.',
                suggestedPractice: 'El feneri tutulan yöne doğru hızla yönelen fototropik (ışık yönelimli) böcek robotu.',
                criteria: 'Işık farkı eşiği (Delta): 40p | Orantısal dönüş: 35p | Donanım montajı: 25p'
            },
            {
                week: 31,
                term: 2,
                unit: 'Öğrenme Birimi 29: Adım Motoru (Step Motor) ve Hassas Konumlama',
                topic: '28BYJ-48 Step Motor, ULN2003 Sürücü ve Adım Açısı',
                outcome: 'Step motorun faz bobinlerini sırayla tetikleyerek derece ve adım bazında hassas açısal dönüşler sağlar.',
                suggestedPractice: 'Saat kadranı veya radar ibresi gibi tam 360 derece ve belirli adımlarla dönen mekanizma.',
                criteria: 'Adım dizilimi (Half/Full step): 40p | Açısal hassasiyet: 35p | Tork kontrolü: 25p'
            },
            {
                week: 32,
                term: 2,
                unit: 'Öğrenme Birimi 30: Nesnelerin İnterneti (IoT) Temelleri',
                topic: 'ESP8266 / ESP32 ile Wi-Fi Ağına Bağlanma ve Bulut İletişimi',
                outcome: 'Mikrodenetleyiciyi yerel Wi-Fi ağına bağlar; sensör verilerini bulut sunucusuna (ThingSpeak vb.) gönderir.',
                suggestedPractice: 'İnternet üzerinden dünyanın her yerinden cep telefonuyla takip edilen akıllı sera izleme paneli.',
                criteria: 'Wi-Fi bağlantısı: 40p | HTTP/MQTT isteği: 35p | Bulut veri görselleştirme: 25p'
            },
            {
                week: 33,
                term: 2,
                unit: 'Öğrenme Birimi 31: Kapsamlı Yıl Sonu Robotik Projesi',
                topic: 'Proje Planlama, Şasi Tasarımı ve Malzeme Seçimi',
                outcome: 'Sosyal fayda veya yarışma odaklı (Mini Sumo, Yangın Söndüren vb.) özgün bir robotik proje tasarlar.',
                suggestedPractice: 'Yıl sonu projesi: Alev algılayıp pervaneyle yangını söndüren otonom yangın söndürme robotu prototipi.',
                criteria: 'Proje özgünlüğü: 40p | Donanım mimarisi: 30p | İş takvimi planlaması: 30p'
            },
            {
                week: 34,
                term: 2,
                unit: 'Öğrenme Birimi 31: Kapsamlı Yıl Sonu Robotik Projesi',
                topic: 'Gövde Entegrasyonu, Güç Yönetimi ve Batarya Koruma',
                outcome: 'Li-Po veya 18650 pillerle robotun güç yönetimini regüle eder; koruma devreleri (BMS) uygular.',
                suggestedPractice: 'Robotun nihai lehimleme, sıcak silikon/3D baskı montajı ve bağımsız pil beslemesi kurulumu.',
                criteria: 'Güç güvenliği ve regülasyon: 40p | Montaj kalitesi: 35p | Kablo estetiği: 25p'
            },
            {
                week: 35,
                term: 2,
                unit: 'Öğrenme Birimi 31: Kapsamlı Yıl Sonu Robotik Projesi',
                topic: 'Saha Testleri, Kalibrasyon ve Hata Giderme (Tuning)',
                outcome: 'Robotu gerçek zemin koşullarında test eder; sensör gecikmelerini ve motor sapmalarını kodda kalibre eder.',
                suggestedPractice: 'Zorlu test parkurunda robotun arka arkaya 3 denemede de hata yapmadan görevi bitirmesini sağlama.',
                criteria: 'Kararlılık testi: 40p | Algoritma iyileştirmesi: 35p | Hata dayanıklılığı: 25p'
            },
            {
                week: 36,
                term: 2,
                unit: 'Öğrenme Birimi 31: Kapsamlı Yıl Sonu Robotik Projesi',
                topic: 'Yıl Sonu Robot Turnuvası ve Proje Değerlendirmesi',
                outcome: 'Geliştirilen robotu okul robotik turnuvasında yarıştırarak çalışmasını ve algoritmasını savunur.',
                suggestedPractice: 'Laboratuvar robot yarışması/sergisi ve teknik rapor teslimi.',
                criteria: 'Turnuva performansı: 40p | Teknik savunma: 35p | Rapor düzeni: 25p'
            }
        ]
    }
};
