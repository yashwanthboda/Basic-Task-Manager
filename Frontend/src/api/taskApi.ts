import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

export interface TaskItem {
  id: number
  description: string
  isCompleted: boolean
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getTasks = async (): Promise<TaskItem[]> => {
  const response = await api.get<TaskItem[]>('/tasks')
  return response.data
}

export const createTask = async (description: string): Promise<TaskItem> => {
  const response = await api.post<TaskItem>('/tasks', { description })
  return response.data
}

export const updateTask = async (
  id: number,
  description: string,
  isCompleted: boolean
): Promise<void> => {
  await api.put(`/tasks/${id}`, { description, isCompleted })
}

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}
