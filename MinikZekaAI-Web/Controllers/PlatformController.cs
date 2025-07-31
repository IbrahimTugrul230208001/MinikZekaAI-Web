using Microsoft.AspNetCore.Mvc;

namespace MinikZekaAI_Web.Controllers
{
    public class PlatformController : Controller
    {
        public IActionResult AnaSayfa()
        {
            return View();
        }
    }
}
