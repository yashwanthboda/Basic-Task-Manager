# Task Manager - Full Stack Application

A modern, responsive task management application built with .NET 8 and React + TypeScript. Manage your daily tasks with an intuitive interface and real-time updates.

🌐 **Live Demo**: [View Application](https://yashwanthboda.github.io/Basic-Task-Manager/)

---

## ✨ Features

- ✅ **Create Tasks** - Add new tasks with descriptions
- ✅ **Edit Tasks** - Update task details on the fly
- ✅ **Delete Tasks** - Remove completed or unwanted tasks
- ✅ **Toggle Completion** - Mark tasks as complete/incomplete
- ✅ **Real-time Updates** - Instant UI feedback
- ✅ **RESTful API** - Clean, documented API endpoints
- ✅ **Swagger Documentation** - Interactive API testing
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Modern Tech Stack** - Built with latest technologies

---

## 📁 Project Structure

```
Basic-Task-Manager/
├── Backend/
│   └── TaskManagerAPI/          # .NET 8 Web API
│       ├── Controllers/         # API Controllers
│       │   └── TasksController.cs
│       ├── Models/              # Data Models
│       │   └── TaskItem.cs
│       └── Program.cs           # Application entry point
│
├── Frontend/
│   ├── src/
│   │   ├── api/                 # API Integration Layer
│   │   │   └── taskApi.ts
│   │   ├── App.tsx              # Main Application Component
│   │   ├── App.css              # Application Styles
│   │   └── main.tsx             # React Entry Point
│   ├── vite.config.ts           # Vite Configuration
│   └── package.json             # Dependencies
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD Pipeline
│
├── Dockerfile                    # Docker Configuration
└── README.md                     # This file
```

---

---

## 🛠️ Technologies Used

### Backend
- **[.NET 8](https://dotnet.microsoft.com/)** - Modern, high-performance framework
- **ASP.NET Core Web API** - RESTful API development
- **Swagger/OpenAPI** - API documentation and testing
- **In-Memory Storage** - Fast, lightweight data storage

### Frontend
- **[React 18](https://react.dev/)** - Modern UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[Axios](https://axios-http.com/)** - HTTP client for API calls
- **CSS3** - Modern styling

### DevOps & Deployment
- **GitHub Actions** - CI/CD automation
- **GitHub Pages** - Frontend hosting
- **Render** - Backend hosting
- **Docker** - Containerization

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### For Backend Development
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or higher
- A code editor (VS Code, Visual Studio, or Rider)

### For Frontend Development
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js) or yarn

### Optional
- [Git](https://git-scm.com/) - For version control
- [Docker](https://www.docker.com/) - For containerization

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/yashwanthboda/Basic-Task-Manager.git
cd Basic-Task-Manager
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend/TaskManagerAPI
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

4. The API will be available at:
   - **API**: `http://localhost:5000`
   - **Swagger UI**: `http://localhost:5000/swagger`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at:
   - **Frontend**: `http://localhost:3000`

### Using Docker (Optional)

Build and run with Docker:

```bash
# Build the image
docker build -t task-manager-api .

# Run the container
docker run -p 5000:5000 task-manager-api
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Retrieve all tasks |
| `GET` | `/api/tasks/{id}` | Retrieve a specific task |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/{id}` | Update an existing task |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

### Example Request

**Create a Task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description": "Complete project documentation"}'
```

**Response:**
```json
{
  "id": 1,
  "description": "Complete project documentation",
  "isCompleted": false
}
```

---

## 🎮 Usage

1. **Start the Backend**: Run the .NET API server
2. **Start the Frontend**: Run the React development server
3. **Open Your Browser**: Navigate to `http://localhost:3000`
4. **Manage Tasks**:
   - Click "Add Task" to create a new task
   - Click the checkbox to mark tasks as complete
   - Click "Edit" to modify task descriptions
   - Click "Delete" to remove tasks

---

---

## 🚀 Deployment

This application is deployed and running in production!

- **Frontend**: [GitHub Pages](https://yashwanthboda.github.io/Basic-Task-Manager/)
- **Backend**: [Render](https://basic-task-manager-gwfn.onrender.com)

### Deployment Architecture

```
┌─────────────────────────────────────────┐
│         GitHub Pages (Frontend)         │
│     React SPA - Static Hosting          │
│                                         │
└──────────────┬──────────────────────────┘
               │
               │ HTTPS REST API
               │
               ▼
┌─────────────────────────────────────────┐
│         Render (Backend API)            │
│     .NET 8 Web API - Docker             │
│                                         │
└─────────────────────────────────────────┘
```

## 👤 Author

**Yashwanth Boda**

- GitHub: [@yashwanthboda](https://github.com/yashwanthboda)
- Project Link: [https://github.com/yashwanthboda/Basic-Task-Manager](https://github.com/yashwanthboda/Basic-Task-Manager)
