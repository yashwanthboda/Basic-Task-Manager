# Quick Deployment Reference

## 🚀 Quick Steps

### Backend (Render)
1. Push code to GitHub
2. Create Web Service on Render
3. Connect GitHub repo
4. Configure:
   - Root Directory: `Backend/TaskManagerAPI`
   - Build Command: `dotnet publish -c Release -o out`
   - Start Command: `dotnet out/TaskManagerAPI.dll`
5. Add env var: `ASPNETCORE_ENVIRONMENT=Production`
6. Deploy and copy the URL

### Frontend (GitHub Pages)
1. Update `Frontend/.env.production` with your Render URL
2. Enable GitHub Pages (Settings > Pages > Source: GitHub Actions)
3. Add GitHub Secret: `VITE_API_URL` with your Render API URL
4. Push to GitHub - auto-deploys via GitHub Actions

## 🔗 Your URLs

After deployment:
- **Frontend**: https://yashwanthboda.github.io/Basic-Task-Manager/
- **Backend**: https://your-app-name.onrender.com
- **API Endpoint**: https://your-app-name.onrender.com/api/tasks

## 📝 Important Files Modified

- ✅ `Backend/TaskManagerAPI/Program.cs` - Added CORS and port config
- ✅ `Frontend/vite.config.ts` - Added base path for GitHub Pages
- ✅ `Frontend/src/api/taskApi.ts` - Environment variable support
- ✅ `.github/workflows/deploy.yml` - Auto-deployment workflow
- ✅ `Frontend/.env.production` - Production API URL (UPDATE THIS!)

## ⚠️ Don't Forget

1. Update `Frontend/.env.production` with your actual Render URL
2. Add `VITE_API_URL` secret in GitHub repository settings
3. Enable GitHub Pages in repository settings
4. Push all changes to trigger deployment

## 🔄 To Redeploy

- **Backend**: Push to GitHub (Render auto-deploys)
- **Frontend**: Push to GitHub (GitHub Actions auto-deploys)
