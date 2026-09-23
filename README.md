# Meslek Lisesi Öğrenci Takip ve Uygulama Notlandırma Sistemi 💻

Mesleki ve Teknik Anadolu Liselerinde görev yapan öğretmenlerimizin bilgisayar laboratuvarında öğrencilerin yaptıkları uygulamalara güvenli, hızlı ve düzenli bir şekilde not verebilmesi için geliştirilmiş ultra modern web uygulamasıdır.

---

## 🔐 Giriş Bilgileri

Uygulama açıldığında sizi modern ve şık bir **Öğretmen Giriş Paneli** karşılar:

- **Varsayılan Kullanıcı Adı:** `admin`
- **Varsayılan Şifre:** `1234`

> 💡 **İpucu:** Giriş ekranındaki **"Hızlı Doldur"** butonuna basarak bilgileri tek tıkla doldurup giriş yapabilirsiniz. Şifrenizi ve kullanıcı adınızı dilediğiniz zaman **⚙️ Ayarlar & Şifre** sekmesinden değiştirebilirsiniz.

---

## 🚀 Nasıl Çalıştırılır?

Herhangi bir kurulum (Node.js, Python, sunucu vb.) gerektirmez:
1. Flash belleğinizdeki veya klasördeki **`index.html`** dosyasına çift tıklayın.
2. Google Chrome, Microsoft Edge veya tercih ettiğiniz herhangi bir tarayıcıda anında açılır.
3. **Tamamen Çevrimdışı (Offline) Çalışır:** Laboratuvarda internet kesilse dahi verileriniz güvendedir.

---

## 📋 Kullanım Adımları ve Sistem Mimarisi

Sistem meslek lisesi müfredat yapısına uygun olarak şu hiyerarşiyle çalışır:

```text
[1. DERSLER] ───> [2. UYGULAMALAR / GÖREVLER]
      │
      └───> [3. SINIFLAR] ───> [4. ÖĞRENCİLER]
                  │
                  └───> [5. HIZLI NOT GİRİŞİ & MEB ÇİZELGESİ]
```

### 1. 📚 Ders Tanımlama
- **Dersler** sekmesinden okuttuğunuz dersleri ekleyin (Örn: *Web Tabanlı Uygulama Geliştirme*, *Programlama Temelleri*, *Grafik ve Canlandırma*).

### 2. 📋 Derslere Uygulama Görevi Ekleme
- **Uygulamalar / Görevler** sekmesinden derse ait laboratuvar görevlerini belirleyin.
- Uygulama Adı, Konusu, Tarihi, Maksimum Puanı ve Kriterlerini (Rubrik) kaydedin (Örn: *Uygulama 1: HTML Form & Tablo*).

### 3. 🏫 Sınıf Oluşturma ve 👥 Öğrenci Ekleme
- **Sınıflar** sekmesinden sınıflarınızı tanımlayın (Örn: *11-A Bilişim*, *11-B Bilişim*).
- **Öğrenciler** sekmesinde **"📋 Toplu Öğrenci Ekle"** butonuna tıklayarak e-Okul veya Excel'den kopyaladığınız listeyi doğrudan yapıştırıp saniyeler içinde tüm sınıfı sisteme aktarın.

### 4. 📝 Hızlı Laboratuvar Notlandırma
- Laboratuvarda bilgisayarlar arasında gezerken:
  1. **Ders Seçin**
  2. **Sınıf Seçin**
  3. **Uygulama Seçin**
- Öğrencilerin puanını yazıp **`Enter`** veya **`Aşağı Ok (↓)`** tuşuna basarak sıradaki öğrenciye anında geçin.
- **`G`** tuşuna basarak gelmeyen veya yapmayan öğrenciyi tek tuşla işaretleyin.
- Puanlar anlık olarak otomatik kaydedilir.

### 5. 📊 MEB Uyumlu Not Çizelgesi & Excel Çıktısı
- **Not Çizelgesi & Raporlar** sekmesinden sınıfın tüm uygulamalarını ve ortalamalarını matris olarak görüntüleyin.
- **🖨️ Yazdır / PDF:** Okul adı, ders adı, alan/dal ve altında **Ders Öğretmeni** ile **Okul Müdürü** imza alanları olan resmi MEB çizelge çıktısını alın.
- **📥 Excel / CSV:** Tek tıkla e-Okul'a işlemek veya arşivlemek üzere Türkçe karakter uyumlu Excel dosyası olarak indirin.

---

## 💾 Flash Bellek ile Taşıma ve Yedekleme

- Laboratuvar bilgisayarından ayrılmadan önce **Ayarlar & Şifre** sekmesinden **"Yedek Dosyasını İndir (.json)"** butonuna basarak tüm veritabanınızı flash belleğe kaydedebilirsiniz.
- Evdeki bilgisayarınızda veya başka bir sınıfta **"Yedek Dosyası Seç"** diyerek kaldığınız yerden çalışmaya devam edebilirsiniz.
