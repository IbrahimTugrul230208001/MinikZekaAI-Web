using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MinikZekaAI_Web.Entities.Concrete
{
    public class Infant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Grade { get; set; }
        [NotMapped]
        public int AgeYears => CalculateAgeYears();

        [NotMapped]
        public int AgeMonths => CalculateAgeMonths();

        private int CalculateAgeYears()
        {
            var today = DateTime.UtcNow.Date;
            var yrs = today.Year - DateOfBirth.Year;
            return today < DateOfBirth.AddYears(yrs) ? yrs - 1 : yrs;
        }

        private int CalculateAgeMonths()
        {
            var span = DateTime.UtcNow.Date - DateOfBirth.Date;
            return (int)(span.TotalDays / 30);
        }
    }
}
