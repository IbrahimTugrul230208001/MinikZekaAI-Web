    document.addEventListener("DOMContentLoaded", function() {
        var note = `Değerli BTK Akademi Jüri Üyeleri,<br><br>
Bu projedeki amacım, LLM (Gemini AI) vasıtasıyla <b>SOYUTLAMALAR</b> (özellikle büyük yazdım.) kullanarak çocuklara hızlı, modern ve güvenli bir öğrenme ortamı sunmaktı. Arayüzü ve tüm akışı, çocukların ve yetişkinlerin kolayca kullanabilmesi için sadeleştirdim. Renkler, butonlar ve UX prensipleri özellikle çocukların anlayabileceği şekilde düzenlendi. Bilhassa kullandığım renk paletleri, sarı ve siyah CTA (Call to Action) butonları bunu hedefliyordu. Göz kolaylığı için içeriği minimum tutmaya çalıştım.<br><br>

Projemi sıradan bir LLM entegrasyonundan ayıran fark nedir?<br><br>

-&gt; LLM'i sadece Chatbot olarak değil, etkili SOYUTLAMA aracı olarak kullanmak. Biz yetişkin yazılımcıların kullanabileceği arayüzleri çocuklar için çok daha basit, soyutlanmış hale getirmek.<br>
-&gt; Arayüz ve UX tasarımını çocukların kullanımına uygun hale getirmek.<br>
-&gt; Çocukların ve ebeveynlerin güvenliğini ön planda tutmak.<br><br>

Hatalar veya eksiklikler için: Tüm seçimlerimi açıklayabilirim; ana odak noktası gerçek kullanıcı deneyimi ve sürdürülebilir bir sistem kurmaktı.<br><br>

Sadece demo değil; arkasındaki yaklaşım ve sistem tasarımını da dikkate aldığınız için teşekkürler.`;

    new Typewriter('#jury-note-typewriter', {
        strings: [note],
        autoStart: true,
        delay: 20,
        cursor: '|',
        html: true,    
  });
});
