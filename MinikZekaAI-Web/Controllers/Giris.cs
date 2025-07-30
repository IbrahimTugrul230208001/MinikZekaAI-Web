using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace MinikZekaAI_Web.Controllers
{
    public class Giris : Controller
    {
        private readonly ILogger<Giris> _logger;

        public Giris(ILogger<Giris> logger)
        {
            _logger = logger;
        }

        public IActionResult Anket()
        {
            return View();
        }
    }
}
