# Troubleshooting Common Deployment Issues

## 🚨 Backend Issues (Render)

### Issue 1: Build Fails on Render

**Symptoms:**
- Render shows "Build failed" status
- Red error messages in logs

**Solutions:**
```
1. Check build command is correct:
   dotnet publish -c Release -o out

2. Verify root directory:
   Backend/TaskManagerAPI

3. Check .csproj file exists in root directory

4. Review Render logs for specific error

5. Try building locally:
   cd Backend/TaskManagerAPI
   dotnet publish -c Release
```

### Issue 2: Backend Returns 404

**Symptoms:**
- Can't access API endpoints
- Render dashboard shows "Live" but API doesn't respond

**Solutions:**
```
1. Check start command:
   dotnet out/TaskManagerAPI.dll

2. Verify the DLL is in the 'out' folder

3. Check Render logs for startup errors

4. Try accessing /api/tasks directly

5. Restart the service in Render dashboard
```

### Issue 3: Backend Keeps Sleeping

**Symptoms:**
- First request takes 30-60 seconds
- "Service is starting up" message

**This is normal for Render free tier!**
```
Free tier services sleep after 15 minutes of inactivity.

Solutions:
- Wait for service to wake up (30-60s)
- Upgrade to paid tier ($7/month) for always-on
- Use a ping service to keep it awake
- Accept the limitation for free hosting
```

### Issue 4: CORS Errors from Backend

**Symptoms:**
- Browser console shows: "CORS policy: No 'Access-Control-Allow-Origin'"
- API works in Postman but not browser

**Solutions:**
```
1. Check Program.cs includes your GitHub Pages URL:
   policy.WithOrigins(
       "https://yashwanthboda.github.io"
   )

2. Ensure the URL matches exactly (no trailing slash)

3. Commit and push changes

4. Wait for Render to auto-deploy (or manually redeploy)

5. Clear browser cache

6. Test in incognito mode
```

---

## 🚨 Frontend Issues (GitHub Pages)

### Issue 1: GitHub Action Fails

**Symptoms:**
- Red X on GitHub Actions
- Build or deploy job failed

**Check Build Job:**
```
1. Go to Actions tab in GitHub
2. Click failed workflow
3. Click "build" job
4. Review error messages

Common fixes:
- npm install fails: Delete node_modules, npm install, commit package-lock.json
- TypeScript errors: Fix in VS Code, test with npm run build
- Missing files: Ensure all files are committed
```

**Check Deploy Job:**
```
1. Ensure GitHub Pages is enabled
2. Check Pages source is "GitHub Actions"
3. Verify VITE_API_URL secret is added
4. Try re-running the workflow
```

### Issue 2: Page Shows 404

**Symptoms:**
- GitHub Pages URL returns "404 - File not found"
- Actions completed successfully

**Solutions:**
```
1. Wait 5 minutes (propagation delay)

2. Check vite.config.ts has correct base:
   base: '/Basic-Task-Manager/'  // Must match repo name

3. Verify GitHub Pages settings:
   Settings > Pages > Source: GitHub Actions

4. Check the workflow uploaded artifact:
   Actions > Deploy workflow > build job > Artifacts

5. Try visiting with exact path:
   https://yashwanthboda.github.io/Basic-Task-Manager/
   (note the trailing slash)
```

### Issue 3: Page Loads but Blank

**Symptoms:**
- Page loads but shows nothing
- White screen

**Solutions:**
```
1. Open browser console (F12)

2. Look for errors:
   - 404 on JS files: Check base path in vite.config
   - Module errors: Rebuild: npm run build
   - Syntax errors: Fix and redeploy

3. Check Network tab:
   - Are files loading?
   - What's the path?

4. Verify build output:
   npm run build
   Check dist/index.html references correct paths

5. Clear browser cache:
   Ctrl + Shift + Delete
```

### Issue 4: Assets Not Loading

**Symptoms:**
- Page partially loads
- CSS or images missing
- Console shows 404 for assets

**Solutions:**
```
1. Verify base path in vite.config.ts:
   base: '/Basic-Task-Manager/'

2. Check asset imports use relative paths

3. Rebuild and redeploy:
   npm run build
   git add dist (if tracking)
   git commit -m "Fix asset paths"
   git push

4. Clear CDN cache (wait 5-10 minutes)
```

---

## 🚨 Integration Issues

### Issue 1: Frontend Can't Reach Backend

**Symptoms:**
- Frontend loads but can't fetch tasks
- Console: "Network Error" or "Failed to fetch"

**Solutions:**
```
1. Check .env.production has correct URL:
   VITE_API_URL=https://your-app.onrender.com/api
   (must include /api at the end)

2. Verify GitHub secret VITE_API_URL is set

3. Check backend is running on Render

4. Test API directly in browser:
   https://your-app.onrender.com/api/tasks

5. Check browser console for exact error

6. Verify API URL in deployed app:
   console.log(import.meta.env.VITE_API_URL)
```

### Issue 2: CORS Errors

**Symptoms:**
- Console: "CORS policy: No 'Access-Control-Allow-Origin'"
- Same error repeated on every request

**Solutions:**
```
1. Verify GitHub Pages URL in Program.cs:
   "https://yashwanthboda.github.io"

2. NO trailing slash in Program.cs

3. Exact match required (check your username)

4. Commit backend changes:
   git add Backend/TaskManagerAPI/Program.cs
   git commit -m "Fix CORS for GitHub Pages"
   git push

5. Wait for Render to redeploy (check dashboard)

6. Hard refresh browser:
   Ctrl + Shift + R

7. Test in incognito mode
```

### Issue 3: Mixed Content Warning

**Symptoms:**
- Console: "Mixed Content" warning
- HTTPS page loading HTTP resources

**Solutions:**
```
1. Ensure backend URL uses HTTPS:
   VITE_API_URL=https://... (not http://)

2. Render provides HTTPS by default

3. Update .env.production

4. Rebuild and redeploy frontend

5. Clear browser cache
```

### Issue 4: API Calls Timeout

**Symptoms:**
- Requests take forever
- Eventually fail with timeout

**Solutions:**
```
1. Check backend is awake:
   - Free tier sleeps after 15 min
   - First request takes 30-60s

2. Check Render service status:
   - Green = running
   - Gray = sleeping
   - Red = error

3. Test API directly:
   https://your-app.onrender.com/api/tasks

4. Check Render logs for errors

5. Verify network connectivity

6. Try from different network/device
```

---

## 🚨 Environment Variable Issues

### Issue 1: Environment Variables Not Loading

**Symptoms:**
- API URL is undefined
- Falls back to localhost

**Solutions:**
```
1. Check file names:
   - .env.development (dev)
   - .env.production (prod)

2. Verify VITE_ prefix:
   VITE_API_URL (correct)
   API_URL (wrong - won't work)

3. Check GitHub secret:
   - Name: VITE_API_URL
   - Value: https://...

4. Rebuild after adding secret:
   Re-run GitHub Action workflow

5. Check vite-env.d.ts exists:
   Defines TypeScript types
```

### Issue 2: Using Wrong Environment

**Symptoms:**
- Production site connects to localhost
- Can't determine which env is active

**Solutions:**
```
1. GitHub Actions uses .env.production automatically

2. Local dev uses .env.development

3. Verify in browser console:
   console.log(import.meta.env.VITE_API_URL)
   console.log(import.meta.env.MODE)

4. Check build command includes environment:
   npm run build (uses production)
   npm run dev (uses development)
```

---

## 🛠️ Debugging Tools

### Backend Debugging
```powershell
# Test backend locally
cd Backend/TaskManagerAPI
dotnet run

# Test API
curl http://localhost:5000/api/tasks

# Check logs on Render
# Dashboard > Your Service > Logs tab
```

### Frontend Debugging
```powershell
# Test frontend locally
cd Frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for TypeScript errors
npx tsc --noEmit
```

### Browser Debugging
```
1. Open DevTools (F12)

2. Console tab:
   - Check for JavaScript errors
   - Look for CORS messages
   - Verify API URL

3. Network tab:
   - Filter: XHR/Fetch
   - Check API requests
   - Look at status codes
   - View request/response

4. Application tab:
   - Check Local Storage
   - Verify loaded resources
```

---

## 📞 Still Stuck?

### Check These Documents
1. **DEPLOYMENT.md** - Full deployment guide
2. **CHECKLIST.md** - Step-by-step checklist
3. **QUICK-DEPLOY.md** - Quick reference

### Check Logs
1. **Render**: Dashboard > Your Service > Logs
2. **GitHub**: Actions > Failed workflow > Job logs
3. **Browser**: Console (F12)

### Common Commands
```powershell
# Test backend locally
cd Backend/TaskManagerAPI
dotnet run

# Test frontend locally
cd Frontend
npm install
npm run dev

# Build frontend
npm run build

# Check git status
git status

# View recent commits
git log --oneline -5

# Check remote URL
git remote -v
```

### Reset and Retry
```powershell
# Frontend clean install
cd Frontend
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run build

# Clear git cache
git rm -r --cached .
git add .
git commit -m "Clean commit"
git push
```

---

## ✅ Verification Commands

After fixing issues, verify everything works:

```powershell
# 1. Test backend locally
cd Backend/TaskManagerAPI
dotnet run
# Visit: http://localhost:5000/api/tasks

# 2. Test frontend locally
cd Frontend
npm run dev
# Visit: http://localhost:3000

# 3. Build frontend
npm run build
# Check: dist folder created

# 4. Check environment files
Get-Content Frontend\.env.production
Get-Content Frontend\.env.development

# 5. Verify git status
git status
git log --oneline -3

# 6. Test production deployment
# Visit: https://yashwanthboda.github.io/Basic-Task-Manager/
# Check browser console (F12)
```

---

## 🆘 Emergency Reset

If everything is broken and you need to start over:

```powershell
# 1. Save your work
git stash

# 2. Get clean copy
git fetch origin
git reset --hard origin/main

# 3. Restore your changes
git stash pop

# 4. Rebuild everything
cd Frontend
npm install
npm run build
cd ../Backend/TaskManagerAPI
dotnet build

# 5. Recommit
git add .
git commit -m "Fresh deployment configuration"
git push -f origin main
```

⚠️ **Warning**: This will overwrite local changes!

---

**Remember**: Most issues are caused by:
1. Wrong environment variables
2. CORS misconfiguration
3. Incorrect file paths
4. Backend sleeping (free tier)
5. Missing GitHub secrets

Check these first! 🎯
