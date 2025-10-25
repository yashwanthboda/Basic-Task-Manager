# Pre-Deployment Checklist

## ✅ Before You Start

### Prerequisites
- [ ] GitHub account created
- [ ] Render account created (free at render.com)
- [ ] Code committed to GitHub repository
- [ ] Node.js installed locally (for testing)
- [ ] .NET 8 SDK installed locally (for testing)

## ✅ Backend Checklist

### Code Configuration
- [ ] `Program.cs` updated with production CORS settings
- [ ] Port configuration added for Render
- [ ] GitHub Pages URL added to allowed origins

### Testing Locally
```powershell
cd Backend/TaskManagerAPI
dotnet run
```
- [ ] Backend runs without errors
- [ ] Can access http://localhost:5000/api/tasks
- [ ] API returns empty array or tasks

### Render Deployment
- [ ] Web Service created on Render
- [ ] Repository connected
- [ ] Root directory set to `Backend/TaskManagerAPI`
- [ ] Build command configured
- [ ] Start command configured
- [ ] Environment variables added
- [ ] Deployment successful (green status)
- [ ] Backend URL copied and saved

## ✅ Frontend Checklist

### Configuration Files
- [ ] `vite.config.ts` has correct base path (repository name)
- [ ] `.env.production` created with Render backend URL
- [ ] `src/api/taskApi.ts` uses environment variables
- [ ] `src/vite-env.d.ts` exists for TypeScript types

### Testing Locally
```powershell
cd Frontend
npm install
npm run dev
```
- [ ] Frontend runs without errors
- [ ] Can access http://localhost:3000
- [ ] Can see task list (empty initially)
- [ ] Can add, edit, delete tasks

### Build Test
```powershell
cd Frontend
npm run build
```
- [ ] Build completes without errors
- [ ] `dist` folder created

### GitHub Configuration
- [ ] All changes committed and pushed
- [ ] GitHub Pages enabled (Settings > Pages)
- [ ] Source set to "GitHub Actions"
- [ ] Secret `VITE_API_URL` added in repository settings
- [ ] `.github/workflows/deploy.yml` exists

### Deployment
- [ ] GitHub Action triggered (automatically or manually)
- [ ] Build job completed successfully
- [ ] Deploy job completed successfully
- [ ] Frontend accessible at GitHub Pages URL

## ✅ Post-Deployment Testing

### Backend Tests
- [ ] Visit: https://your-app.onrender.com/api/tasks
- [ ] Returns valid JSON response
- [ ] No CORS errors in browser console

### Frontend Tests
- [ ] Visit: https://yashwanthboda.github.io/Basic-Task-Manager/
- [ ] Page loads correctly
- [ ] No console errors
- [ ] Can add a new task
- [ ] Task appears in the list
- [ ] Can mark task as complete
- [ ] Can edit task description
- [ ] Can delete task
- [ ] Changes persist after page refresh

### Integration Tests
- [ ] Frontend can communicate with backend
- [ ] CORS working correctly
- [ ] All CRUD operations working
- [ ] No 404 or 500 errors

## 🔧 If Something Goes Wrong

### Backend Issues
1. Check Render logs in dashboard
2. Verify environment variables
3. Check build and start commands
4. Verify root directory path

### Frontend Issues
1. Check GitHub Actions logs
2. Verify base path in vite.config.ts
3. Check VITE_API_URL secret
4. Clear browser cache and retry
5. Check browser console for errors

### CORS Issues
1. Verify GitHub Pages URL in Program.cs
2. Redeploy backend on Render
3. Clear browser cache
4. Check Network tab in browser DevTools

## 📝 Important URLs to Save

- **GitHub Repository**: https://github.com/yashwanthboda/Basic-Task-Manager
- **Render Dashboard**: https://dashboard.render.com
- **Backend URL**: ___________________________________
- **Frontend URL**: https://yashwanthboda.github.io/Basic-Task-Manager/
- **API Endpoint**: ___________________________________/api/tasks

## 🎉 You're Done!

Once all checkboxes are complete, your application is successfully deployed!

Next steps:
- Share your app with friends
- Consider adding a database for data persistence
- Add authentication for user-specific tasks
- Implement additional features
