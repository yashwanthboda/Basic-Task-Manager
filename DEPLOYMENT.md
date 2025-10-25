# Deployment Guide

This guide provides step-by-step instructions for deploying your Task Manager application with the **frontend on GitHub Pages** and the **backend on Render**.

---

## 📋 Prerequisites

- A GitHub account
- A Render account (free tier available at https://render.com)
- Git installed on your local machine
- Your code pushed to GitHub repository

---

## 🚀 Part 1: Deploy Backend to Render

### Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub:
   ```powershell
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** button and select **"Web Service"**
3. Connect your GitHub repository (authorize Render if needed)
4. Select your **Basic-Task-Manager** repository

### Step 3: Configure the Web Service

Fill in the following settings:

- **Name**: `task-manager-api` (or any name you prefer)
- **Region**: Choose the closest region to you
- **Branch**: `main`
- **Root Directory**: `Backend/TaskManagerAPI`
- **Runtime**: `Docker` or `.NET`
- **Build Command**: 
  ```bash
  dotnet publish -c Release -o out
  ```
- **Start Command**:
  ```bash
  dotnet out/TaskManagerAPI.dll
  ```
- **Instance Type**: `Free` (or choose a paid plan)

### Step 4: Add Environment Variables

In the **Environment Variables** section, add:

- **Key**: `ASPNETCORE_ENVIRONMENT`
- **Value**: `Production`

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for the deployment to complete (5-10 minutes for first deployment)
3. Once deployed, you'll see a URL like: `https://task-manager-api-xxxx.onrender.com`
4. **Save this URL** - you'll need it for the frontend configuration!

### Step 6: Test Your Backend

Test your API by visiting:
```
https://your-app-name.onrender.com/api/tasks
```

You should see an empty array `[]` or your tasks.

---

## 🌐 Part 2: Deploy Frontend to GitHub Pages

### Step 1: Update Frontend Configuration

1. Open `Frontend/.env.production` file
2. Replace the placeholder with your actual Render backend URL:
   ```env
   VITE_API_URL=https://your-app-name.onrender.com/api
   ```
   Replace `your-app-name` with your actual Render app name.

### Step 2: Update Backend CORS Settings

The backend has already been configured to allow your GitHub Pages URL. Make sure `Program.cs` includes your GitHub Pages domain:

```csharp
policy.WithOrigins(
    "http://localhost:3000", 
    "http://localhost:5173",
    "https://yashwanthboda.github.io"  // Your GitHub Pages URL
)
```

After updating, commit and push the changes. Render will automatically redeploy your backend.

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/yashwanthboda/Basic-Task-Manager`
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Source**: GitHub Actions
5. Click **Save**

### Step 4: Add GitHub Secret for API URL

1. In your repository, go to **Settings** > **Secrets and variables** > **Actions**
2. Click **"New repository secret"**
3. Add the following secret:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-app-name.onrender.com/api`
4. Click **"Add secret"**

### Step 5: Verify Vite Configuration

Make sure `Frontend/vite.config.ts` has the correct base path:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/Basic-Task-Manager/', // Should match your repository name
  // ... rest of config
})
```

### Step 6: Create package-lock.json (if not exists)

If you don't have `package-lock.json` in your Frontend folder, create it:

```powershell
cd Frontend
npm install
cd ..
```

### Step 7: Commit and Push Changes

```powershell
git add .
git commit -m "Configure deployment settings"
git push origin main
```

### Step 8: Trigger Deployment

The GitHub Action will automatically trigger on push to main. You can also:

1. Go to **Actions** tab in your GitHub repository
2. Click on **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** > **"Run workflow"**

### Step 9: Monitor Deployment

1. Go to **Actions** tab to watch the deployment progress
2. Wait for both "build" and "deploy" jobs to complete (green checkmarks)
3. Deployment typically takes 2-5 minutes

### Step 10: Access Your Application

Once deployed, your frontend will be available at:
```
https://yashwanthboda.github.io/Basic-Task-Manager/
```

---

## ✅ Verification Checklist

### Backend (Render)
- [ ] Backend service is running (green status in Render dashboard)
- [ ] API endpoint is accessible: `https://your-app.onrender.com/api/tasks`
- [ ] Swagger UI is accessible (if enabled): `https://your-app.onrender.com/swagger`
- [ ] CORS is properly configured

### Frontend (GitHub Pages)
- [ ] GitHub Actions workflow completed successfully
- [ ] Website is accessible at GitHub Pages URL
- [ ] Can view tasks (initially empty)
- [ ] Can add new tasks
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] Can toggle task completion

---

## 🔧 Troubleshooting

### Common Issues

#### 1. **CORS Errors**
If you see CORS errors in browser console:
- Verify your GitHub Pages URL is added to CORS policy in `Program.cs`
- Redeploy your backend on Render
- Clear browser cache and reload

#### 2. **API Not Responding**
- Check if Render service is running (not sleeping)
- Free tier Render services sleep after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up the service

#### 3. **404 Errors on GitHub Pages**
- Verify the `base` path in `vite.config.ts` matches your repository name
- Make sure GitHub Pages is enabled in repository settings
- Check that the GitHub Action completed successfully

#### 4. **Environment Variables Not Loading**
- Ensure `VITE_API_URL` secret is added in GitHub repository settings
- Variable names must start with `VITE_` to be exposed to the frontend
- Redeploy the GitHub Action after adding secrets

#### 5. **Build Fails on GitHub Actions**
- Check if `package-lock.json` exists in Frontend folder
- Verify Node.js version compatibility (18 or higher)
- Review build logs in Actions tab for specific errors

---

## 📝 Important Notes

### Render Free Tier Limitations
- Service sleeps after 15 minutes of inactivity
- 750 free hours per month
- First request after sleep takes 30-60 seconds
- Consider upgrading to paid tier for production apps

### GitHub Pages Limitations
- Static files only (perfect for React apps)
- 1 GB soft limit on repository size
- 100 GB soft bandwidth limit per month
- HTTPS is enforced

### Data Persistence
⚠️ **Important**: Your current backend uses in-memory storage, meaning:
- Data will be lost when Render service restarts
- Data will be lost when service goes to sleep (free tier)

To persist data, consider:
- Adding a database (PostgreSQL, MongoDB, etc.)
- Using Render's free PostgreSQL instance
- Implementing file-based storage

---

## 🔄 Making Updates

### Updating Frontend
1. Make your changes in the `Frontend` folder
2. Test locally: `npm run dev`
3. Commit and push to GitHub
4. GitHub Actions will automatically redeploy

### Updating Backend
1. Make your changes in the `Backend/TaskManagerAPI` folder
2. Test locally: `dotnet run`
3. Commit and push to GitHub
4. Render will automatically redeploy (if auto-deploy is enabled)

---

## 🎉 Next Steps

After successful deployment:

1. **Add a Custom Domain** (Optional)
   - Configure custom domain in Render dashboard
   - Set up custom domain for GitHub Pages

2. **Set Up a Database**
   - Add PostgreSQL on Render (free tier available)
   - Update backend to use Entity Framework Core
   - Migrate from in-memory storage to database

3. **Add Authentication**
   - Implement JWT authentication
   - Add user registration/login

4. **Monitoring and Analytics**
   - Set up application monitoring
   - Add error tracking (e.g., Sentry)
   - Implement analytics

5. **Improve Performance**
   - Add caching
   - Optimize API responses
   - Implement pagination for large task lists

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [.NET Core Deployment](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/)

---

## 💬 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review deployment logs (Render dashboard / GitHub Actions)
3. Verify all configuration files are correct
4. Check browser console for frontend errors

---

**Congratulations!** 🎊 Your Task Manager is now live on the internet!

- Frontend: https://yashwanthboda.github.io/Basic-Task-Manager/
- Backend: https://your-app-name.onrender.com
