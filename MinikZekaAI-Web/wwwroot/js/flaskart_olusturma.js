const lessonConcepts = {
    "Matematik": ["Sayıları Tanıma ve Yazma", "Sayıları Sıralama", "Toplama İşlemi (Basit)", "Çıkarma İşlemi (Basit)", "Geometrik Şekiller (Kare, Daire, Üçgen, Dikdörtgen)", "Ritmik Sayma", "Çarpma İşlemine Giriş", "Uzunluk Ölçme", "Para Birimleri", "Saat Okuma (Tam ve Yarım Saatler)", "Doğal Sayılar ve Bölükler", "Toplama İşlemi ve Problemleri", "Çıkarma İşlemi ve Problemleri", "Çarpma İşlemi ve Problemleri", "Bölme İşlemi ve Problemleri", "Kesirler", "Zamanı Ölçme (Saat, Takvim)", "Ağırlıkları Ölçme", "Sıvıları Ölçme", "Paralarımız", "Geometrik Cisimler ve Şekiller", "Veri Toplama ve Değerlendirme", "Bölme İşleminde Kalanlı Sonuçlar", "Kesirlerle İşlemler", "Alan ve Çevre Ölçme", "Simetri", "Uzunluk Ölçü Birimleri Dönüşümü", "Zaman Problemleri", "Veri Analizi"],
    "Türkçe": ["Sesleri Tanıma ve Yazma", "Kısa Cümle Kurma", "Dinleme Kuralları", "Metin Okuma ve Anlama", "Kelime Anlamı", "Basit Paragraf Kurma", "Noktalama İşaretlerine Giriş", "Okuduğunu Anlama", "Kelime ve Kavram Bilgisi", "Cümle Bilgisi", "Paragraf Anlama ve Oluşturma", "Yazım Kuralları", "Noktalama İşaretleri", "Anlatım Türleri", "Söz Varlığı (Deyim, Atasözü)", "Dinleme ve Konuşma Becerileri", "Metin Türleri (Hikaye, Masal, Şiir, Bilgilendirici Metin)", "Görsel Okuma ve Anlama", "Ana Fikir Bulma", "Olay, Zaman, Mekan ve Kişi", "Paragrafta Akış ve Bütünlük", "Yazılı Anlatım Türleri (Mektup, Dilekçe)", "Sebep-Sonuç ve Amaç Sonuç Cümleleri"],
    "Hayat Bilgisi": ["Kendimi Tanıyorum", "Ailem", "Okulumu Tanıyorum", "Günlük Yaşam Kuralları", "Arkadaşlık ve İletişim", "Güvenli Davranışlar", "Doğayı Koruma", "Sağlık ve Temizlik", "Birey ve Toplum", "Aile ve Ev Yaşamı", "Okul Hayatı", "Güvenli Hayat", "Doğa ve Çevre Bilinci", "Sağlıklı Yaşam ve Beslenme", "Duygularımız ve Sosyal İlişkiler", "Ülkemizi Tanıyalım", "Tasarruf ve Ekonomi", "Zamanı Doğru Kullanma", "Haklar ve Sorumluluklar", "Çevremizdeki Meslekler", "Yardımlaşma ve Dayanışma", "Afet Bilinci ve Güvenlik", "Trafik Kuralları", "Doğal Kaynaklar ve Korunması", "Projeler ve Girişimcilik"]
};
function updateConcepts(lesson) {
    const select = document.getElementById("flash-concept");
    select.innerHTML = "";
    (lessonConcepts[lesson] || ["Konu bulunamadı"]).forEach(c => {
        const opt = document.createElement("option");
        opt.textContent = c;
        select.appendChild(opt);
    });
}
document.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', function () {
        const lesson = this.getAttribute('data-lesson');
        updateConcepts(lesson);
        document.getElementById('flashcard-criteria').classList.remove('hidden');
        document.querySelector('main').style.display = "none";
    });
});
var hubConnection = new signalR.HubConnectionBuilder().withUrl("/ai-hub").build();
hubConnection.start();
hubConnection.on("ReceiveMessage", raw => {
    const jsonStr = raw.trim().replace(/^```json|```$/g, "").trim();
    let data; try { data = JSON.parse(jsonStr); } catch (e) { console.error("Bad JSON", e); return; }
    document.getElementById("flashcard-criteria").classList.add("hidden");
    document.getElementById("flashcard-container").classList.remove("hidden");
    document.getElementById("flash-question").innerText = `Soru: ${data.soru}`;
    const ansEl = document.getElementById("flash-answer");
    ansEl.innerText = `Cevap: ${data.cevap}`;
    ansEl.classList.add("hidden");
});
function generateFlashcard() {
    if (!hubConnection.connectionId) { console.error("SignalR Connection ID is not available."); return; }
    const concept = document.getElementById("flash-concept").value;
    const difficulty = document.getElementById("flash-difficulty").value;
    let prompt = `${concept} konusunda ${difficulty} seviyesinde bir flash kart için soru ve kısa cevabını oluştur. Sadece geçerli JSON dön:\n{\n"soru":"<SORU>",\n"cevap":"<CEVAP>"\n}`;
    fetch("/Platform/Sohbet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt, connectionId: hubConnection.connectionId })
    });
}
document.getElementById("show-answer").onclick = () => {
    document.getElementById("flash-answer").classList.remove("hidden");
};
document.getElementById("regenerate").onclick = () => {
    generateFlashcard();
};