    document.addEventListener("DOMContentLoaded", function() {
  var note = `Değerli Jüri Üyeleri,

    Bu projedeki amacım, LLM (Gemini AI) vasıtasyla SOYUTLAMALAR (özellikle büyük yazdım.) kullanarak çocuklara hızlı, modern ve güvenli bir öğrenme ortamı sunmaktı. Arayüzü ve tüm akışı, çocukların ve yetişkinlerin kolayca kullanabilmesi için sadeleştirdim. Renkler, butonlar ve UX prensipleri özellikle çocukların anlayabileceği şekilde düzenlendi. Bilhassa kullandığım renk paletleri, sarı ve siyah CTA (Call to Action) butonları bunu hedefliyordu. Göz kolaylığı için içeriği minimum tutmaya çalıştım.

    Her soruda, hikayede veya bulmacada  LLM tarafından üretilen içerik, tekrar etmeyen, müfredata uygun ve seviyeye göre değişen nitelikte. Hardcode sorular yerine, dinamik, interaktif bir yapı oluşturuldu. Bu sayede çocuklar, her seferinde yeni ve ilgi çekici içeriklerle karşılaşıyor. 

    Projemi sıradan bir LLM entegrasyonundan ayıran fark nedir?

    -> LLM'i sadece Chatbot olarak değil, etkili SOYUTLAMA aracı olarak kullanmak. Biz yetişkin yazılımcıların kullanabileceği arayüzleri çocuklar için çok daha basit, soyutlanmış hale getirmek.
    -> Arayüz ve UX tasarımını çocukların kullanımına uygun hale getirmek.
    -> Çocukların ve ebeveynlerin güvenliğini ön planda tutmak.

    Hatalar veya eksiklikler için: Tüm seçimlerimi açıklayabilirim; ana odak noktası gerçek kullanıcı deneyimi ve sürdürülebilir bir sistem kurmaktı.

    Sadece demo değil; arkasındaki yaklaşım ve sistem tasarımını da dikkate aldığınız için teşekkürler.`;

    new Typewriter('#jury-note-typewriter', {
        strings: [note],
    autoStart: true,
    delay: 20,
    cursor: '|',
  });
});
