using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManagerAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to listen on the port provided by Render
builder.WebHost.ConfigureKestrel(options =>
{
    var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
    options.ListenAnyIP(int.Parse(port));
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy to allow frontend to access the API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000", 
                "http://localhost:5173",
                "https://yashwanthboda.github.io"  // Add your GitHub Pages URL
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

// Add singleton for in-memory storage
builder.Services.AddSingleton<TaskStorage>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();

// In-memory storage class
public class TaskStorage
{
    private readonly List<TaskItem> _tasks = new();
    private int _nextId = 1;

    public List<TaskItem> GetAllTasks() => _tasks;

    public TaskItem? GetTaskById(int id) => _tasks.FirstOrDefault(t => t.Id == id);

    public TaskItem AddTask(string description)
    {
        var task = new TaskItem
        {
            Id = _nextId++,
            Description = description,
            IsCompleted = false
        };
        _tasks.Add(task);
        return task;
    }

    public bool UpdateTask(int id, string description, bool isCompleted)
    {
        var task = GetTaskById(id);
        if (task == null) return false;

        task.Description = description;
        task.IsCompleted = isCompleted;
        return true;
    }

    public bool DeleteTask(int id)
    {
        var task = GetTaskById(id);
        if (task == null) return false;

        _tasks.Remove(task);
        return true;
    }
}
