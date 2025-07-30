namespace MinikZekaAI_Web.Services
{
    public interface IAIService
    {
        Task GetMessageStreamAsync(string prompt, string connectionId, CancellationToken? cancellationToken = default!);

    }
}
