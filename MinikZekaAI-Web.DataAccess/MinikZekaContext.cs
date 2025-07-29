using Microsoft.EntityFrameworkCore;

namespace MinikZekaAI_Web.DataAccess
{
    public class MinikZekaContext :DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Username=postgres;Password=ibrahim06;Database=MinikZekaDB;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
