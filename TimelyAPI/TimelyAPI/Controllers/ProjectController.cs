using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimelyAPI.Data;

namespace TimelyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly DataContext _context;
        public ProjectController(DataContext context)
        {
            _context = context; 
            
        }

        [HttpGet]
        public async Task<ActionResult<List<Project>>> GetProjects() 
        {
            return Ok(await _context.Projects.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Project>>> CreateProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync(); 

            return Ok(await _context.Projects.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Project>>> UpdateProject(Project project)
        {
            var dbProject= await _context.Projects.FindAsync(project.Id);
            if(dbProject==null)
            {
                return BadRequest("Project not found");
            }

            dbProject.Name = project.Name;
            dbProject.Start = project.Start;
            dbProject.Stop = project.Stop;
            dbProject.Duration = project.Duration;

            await _context.SaveChangesAsync();

            return Ok(await _context.Projects.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Project>>> DeleteProject(int id)
        {
            var dbProject = await _context.Projects.FindAsync(id);
            if(dbProject==null)
            {
                return BadRequest("Project not found");
            }

            _context.Projects.Remove(dbProject);
            await _context.SaveChangesAsync();

            return Ok(await _context.Projects.ToListAsync());
        }
         
    }
}
