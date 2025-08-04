using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel.Services;
using MinikZekaAI_Web.Models;
using MinikZekaAI_Web.Services;

namespace MinikZekaAI_Web.Controllers
{
    public class PlatformController : Controller
    {
        private readonly IAIServices _aiService;

        public PlatformController(IAIServices AIService)
        {
            _aiService = AIService;

        }
        public IActionResult AnaSayfa()
        {
            return View();
        }
        public IActionResult AileKontrolu()
        {
            return View();
        }
        public IActionResult Hikayeler()
        {
                       return View();
        }
        public async Task<IActionResult> Sohbet([FromBody] ChatRequest chatRequest, CancellationToken cancellationToken)
        {
            if (chatRequest == null || string.IsNullOrEmpty(chatRequest.Prompt))
            {
                return BadRequest("Invalid request data.");
            }

            // Use the AIService to get a message stream
            await _aiService.GetMessageStreamAsync(chatRequest.Prompt, chatRequest.ConnectionId, cancellationToken);

            // You can choose how to return the response - here, returning as JSON
            return Ok();
        }
    }
}
