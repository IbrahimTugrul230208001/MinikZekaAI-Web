using Microsoft.AspNetCore.Mvc;
using MinikZekaAI_Web.Models;
using MinikZekaAI_Web.Services;
using System.Diagnostics;

namespace MinikZekaAI_Web.Controllers
{
    public class GirisController : Controller
    {
        private readonly IUserService _userService;
        public GirisController(IUserService userService)
        {
            _userService = userService;
        }
        public IActionResult Anket()
        {
            return View();
        }
        public IActionResult AileGiris()
        {
            return View();
        }
        public IActionResult AileKayit()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Cevap([FromBody]SurveyAnswerDTO dto)
        {
            if(dto.question == "Ýsmin nedir?")
            {
                _userService.StudentName = dto.answer;
                return Json(new { success = true });
            }
            else if (dto.question == "Kaçýncý Sýnýfsýn?")
            {
                if (int.TryParse(dto.answer, out int grade))
                {
                    _userService.StudentGrade = grade;
                    return Json(new { success = true });
                }
                else
                {
                    return Json(new { success = false, error = "Invalid grade format." });
                }
            }
            else
            {
                return Json(new { success = false });

            }
        }

    }
}
