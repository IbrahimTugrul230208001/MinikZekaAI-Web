using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace MinikZekaAI_Web.Controllers
{
    public class GirisController : Controller
    {
        public IActionResult Anket()
        {
            return View();
        }
        public IActionResult AileGiris()
        {
            return View();
        }
      
    }
}
