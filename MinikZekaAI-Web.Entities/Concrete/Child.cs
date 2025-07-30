using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MinikZekaAI_Web.Entities.Concrete
{
    public class Child
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Grade { get; set; }
    }
}
