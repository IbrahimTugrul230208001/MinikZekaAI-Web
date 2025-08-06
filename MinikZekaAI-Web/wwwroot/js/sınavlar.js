
const lessonConcepts = {
    "Matematik": [
        // 1st Grade
        "Sayıları Tanıma ve Yazma",
        "Sayıları Sıralama",
        "Toplama İşlemi (Basit)",
        "Çıkarma İşlemi (Basit)",
        "Geometrik Şekiller (Kare, Daire, Üçgen, Dikdörtgen)",
        // 2nd Grade
        "Ritmik Sayma",
        "Çarpma İşlemine Giriş",
        "Uzunluk Ölçme",
        "Para Birimleri",
        "Saat Okuma (Tam ve Yarım Saatler)",
        // 3rd Grade
        "Doğal Sayılar ve Bölükler",
        "Toplama İşlemi ve Problemleri",
        "Çıkarma İşlemi ve Problemleri",
        "Çarpma İşlemi ve Problemleri",
        "Bölme İşlemi ve Problemleri",
        "Kesirler",
        "Zamanı Ölçme (Saat, Takvim)",
        "Ağırlıkları Ölçme",
        "Sıvıları Ölçme",
        "Paralarımız",
        "Geometrik Cisimler ve Şekiller",
        "Veri Toplama ve Değerlendirme",
        // 4th Grade
        "Bölme İşleminde Kalanlı Sonuçlar",
        "Kesirlerle İşlemler",
        "Alan ve Çevre Ölçme",
        "Simetri",
        "Uzunluk Ölçü Birimleri Dönüşümü",
        "Zaman Problemleri",
        "Veri Analizi"
    ],
    "Türkçe": [
        // 1st Grade
        "Sesleri Tanıma ve Yazma",
        "Kısa Cümle Kurma",
        "Dinleme Kuralları",
        // 2nd Grade
        "Metin Okuma ve Anlama",
        "Kelime Anlamı",
        "Basit Paragraf Kurma",
        "Noktalama İşaretlerine Giriş",
        // 3rd Grade
        "Okuduğunu Anlama",
        "Kelime ve Kavram Bilgisi",
        "Cümle Bilgisi",
        "Paragraf Anlama ve Oluşturma",
        "Yazım Kuralları",
        "Noktalama İşaretleri",
        "Anlatım Türleri",
        "Söz Varlığı (Deyim, Atasözü)",
        "Dinleme ve Konuşma Becerileri",
        "Metin Türleri (Hikaye, Masal, Şiir, Bilgilendirici Metin)",
        "Görsel Okuma ve Anlama",
        // 4th Grade
        "Ana Fikir Bulma",
        "Olay, Zaman, Mekan ve Kişi",
        "Paragrafta Akış ve Bütünlük",
        "Yazılı Anlatım Türleri (Mektup, Dilekçe)",
        "Sebep-Sonuç ve Amaç Sonuç Cümleleri"
    ],
    "Hayat Bilgisi": [
        // 1st Grade
        "Kendimi Tanıyorum",
        "Ailem",
        "Okulumu Tanıyorum",
        "Günlük Yaşam Kuralları",
        // 2nd Grade
        "Arkadaşlık ve İletişim",
        "Güvenli Davranışlar",
        "Doğayı Koruma",
        "Sağlık ve Temizlik",
        // 3rd Grade
        "Birey ve Toplum",
        "Aile ve Ev Yaşamı",
        "Okul Hayatı",
        "Güvenli Hayat",
        "Doğa ve Çevre Bilinci",
        "Sağlıklı Yaşam ve Beslenme",
        "Duygularımız ve Sosyal İlişkiler",
        "Ülkemizi Tanıyalım",
        "Tasarruf ve Ekonomi",
        "Zamanı Doğru Kullanma",
        "Haklar ve Sorumluluklar",
        // 4th Grade
        "Çevremizdeki Meslekler",
        "Yardımlaşma ve Dayanışma",
        "Afet Bilinci ve Güvenlik",
        "Trafik Kuralları",
        "Doğal Kaynaklar ve Korunması",
        "Projeler ve Girişimcilik"
    ]
};

// Seçime göre konu select doldurma fonksiyonu
function updateConcepts(lesson) {
    const select = document.getElementById("question-concept");
    select.innerHTML = "";
    (lessonConcepts[lesson] || ["Konu bulunamadı"]).forEach(concept => {
        const opt = document.createElement("option");
        opt.textContent = concept;
        select.appendChild(opt);
    });
}

// Kartlara tıklama eventi bağlama
document.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', function () {
        const lesson = this.getAttribute('data-lesson');
        updateConcepts(lesson);
        document.getElementById('question-criteria').classList.remove('hidden');
        document.querySelector('main').style.display = "none";

    });
});