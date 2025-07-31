using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace MinikZekaAI_Web.Controllers
{
    public class GirisController : Controller
    {
        private readonly ILogger<GirisController> _logger;

        public GirisController(ILogger<GirisController> logger)
        {
            _logger = logger;
        }

        public IActionResult Anket()
        {
            return View();
        }
    }
}
