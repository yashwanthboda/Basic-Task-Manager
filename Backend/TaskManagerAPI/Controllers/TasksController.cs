using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly TaskStorage _storage;

        public TasksController(TaskStorage storage)
        {
            _storage = storage;
        }

        // GET /api/tasks
        [HttpGet]
        public ActionResult<List<TaskItem>> GetAllTasks()
        {
            return Ok(_storage.GetAllTasks());
        }

        // POST /api/tasks
        [HttpPost]
        public ActionResult<TaskItem> CreateTask([FromBody] CreateTaskRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Description))
            {
                return BadRequest("Description is required");
            }

            var task = _storage.AddTask(request.Description);
            return CreatedAtAction(nameof(GetAllTasks), new { id = task.Id }, task);
        }

        // PUT /api/tasks/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateTask(int id, [FromBody] UpdateTaskRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Description))
            {
                return BadRequest("Description is required");
            }

            var success = _storage.UpdateTask(id, request.Description, request.IsCompleted);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE /api/tasks/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteTask(int id)
        {
            var success = _storage.DeleteTask(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }

    public class CreateTaskRequest
    {
        public string Description { get; set; } = string.Empty;
    }

    public class UpdateTaskRequest
    {
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
    }
}
