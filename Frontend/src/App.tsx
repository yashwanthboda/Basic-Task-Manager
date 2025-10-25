import { useState, useEffect } from 'react'
import './App.css'
import { TaskItem, getTasks, createTask, updateTask, deleteTask } from './api/taskApi'

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null)
  const [editDescription, setEditDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load tasks on component mount
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedTasks = await getTasks()
      setTasks(fetchedTasks)
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend API is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async () => {
    if (!newTaskDescription.trim()) {
      alert('Please enter a task description')
      return
    }

    try {
      setError(null)
      const newTask = await createTask(newTaskDescription)
      setTasks([...tasks, newTask])
      setNewTaskDescription('')
    } catch (err) {
      setError('Failed to create task')
      console.error(err)
    }
  }

  const handleToggleComplete = async (task: TaskItem) => {
    try {
      setError(null)
      await updateTask(task.id, task.description, !task.isCompleted)
      setTasks(tasks.map(t => 
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      ))
    } catch (err) {
      setError('Failed to update task')
      console.error(err)
    }
  }

  const handleStartEdit = (task: TaskItem) => {
    setEditingTask(task)
    setEditDescription(task.description)
  }

  const handleSaveEdit = async () => {
    if (!editingTask || !editDescription.trim()) {
      alert('Please enter a task description')
      return
    }

    try {
      setError(null)
      await updateTask(editingTask.id, editDescription, editingTask.isCompleted)
      setTasks(tasks.map(t => 
        t.id === editingTask.id ? { ...t, description: editDescription } : t
      ))
      setEditingTask(null)
      setEditDescription('')
    } catch (err) {
      setError('Failed to update task')
      console.error(err)
    }
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    setEditDescription('')
  }

  const handleDeleteTask = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      setError(null)
      await deleteTask(id)
      setTasks(tasks.filter(t => t.id !== id))
    } catch (err) {
      setError('Failed to delete task')
      console.error(err)
    }
  }

  return (
    <div className="App">
      <h1>📝 Task Manager</h1>
      
      {error && <div className="error">{error}</div>}
      
      <div className="add-task-section">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Add one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
                {editingTask?.id === task.id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                    />
                    <div className="edit-buttons">
                      <button onClick={handleSaveEdit} className="save-btn">Save</button>
                      <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="task-content">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleToggleComplete(task)}
                      />
                      <span className="task-description">{task.description}</span>
                    </div>
                    <div className="task-actions">
                      <button onClick={() => handleStartEdit(task)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default App
