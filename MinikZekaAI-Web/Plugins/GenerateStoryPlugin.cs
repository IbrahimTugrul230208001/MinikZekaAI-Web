using System.ComponentModel;
using System.Threading.Tasks;
using Microsoft.SemanticKernel;

public class GenerateStoryPlugin
{
    [KernelFunction("generate_random_story")]
    [Description("Rastgele bir çocuk hikayesi oluşturur.")]
    [return: Description("Üretilen rastgele hikaye metnini döndürür.")]
    public string GenerateRandomStory()
    {
        // Dummy random direction: you can add more randomness as needed.
        var stories = new[]
        {
            "Bir gün, küçük bir tavşan ormanda kayboldu ve yeni arkadaşlar buldu.",
            "Cesur bir robot, yıldızlara yolculuk ederek bilinmeyen bir gezegen keşfetti.",
            "Zeki bir çocuk, gizemli bir kitap buldu ve büyülü bir dünyaya açıldı.",
            "Sevimli bir köpek, kayıp topunu bulmak için şehrin altını üstüne getirdi.",
            "Bir grup arkadaş, yaz kampında sıradışı bir macera yaşadı."
        };
        // Choose randomly
        var random = new Random();
        int index = random.Next(stories.Length);
        return stories[index];
    }
}
