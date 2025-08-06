
const lessonConcepts = {
    "Matematik": ["Çarpma", "Bölme", "Toplama", "Çıkarma"],
    "Türkçe": ["Cümle Türleri", "Okuduğunu Anlama", "Yazım Kuralları"],
    "Hayat Bilgisi": ["Çevre", "Sağlık", "Güvenlik"],
    "Diğer": ["Genel Kültür", "Mantık Soruları"]
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