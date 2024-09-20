using BackendForms.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackendForms.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Form> Forms { get; set; }
        public DbSet<Input> Inputs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Form>().HasMany(f => f.Inputs).WithOne(i => i.Form).HasForeignKey(i => i.FormId);
	    modelBuilder.Entity<Form>().HasData(
			    new Form{Id=1, Name="persona"},
			    new Form{Id=2, Name="mascota"}
	    );
	    modelBuilder.Entity<Input>().HasData(
		new Input {Id=1,Name ="Nombre", Type="text", FormId=1},
		new Input {Id=2,Name ="Correo", Type="email", FormId=1},
		new Input {Id=3,Name ="Nombre", Type="text", FormId=2},	
		new Input {Id=4,Name ="Raza", Type="text", FormId=2}
	   );
        }
    }


    
}
