namespace MinikZekaAI_Web.Services
{
    public interface IAIServices
    {
        Task GetMessageStreamAsync(string prompt, string connectionId, CancellationToken? cancellationToken = default!);

    }
}
