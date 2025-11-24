# Admin Authentication Flow - Debug Guide

## What I Fixed

### 1. Added Debug Logging to Middleware (`src/middleware.js`)
- Logs every request to admin routes
- Shows whether a token is found
- Displays token validation results
- Shows redirect decisions

### 2. Created `/admin/dashboard` Route
- Created `src/app/admin/dashboard/page.js`
- Redirects `/admin/dashboard` → `/admin` (the actual dashboard)
- This allows the login redirect to work correctly

### 3. Enhanced Login Page Logging (`src/app/admin/login/page.js`)
- Added detailed console logs for the login flow
- Shows request/response details
- Displays cookie state after login
- Traces the redirect process

### 4. Fixed Hydration Mismatch
- Implemented client-only mounting for the login form
- Prevents browser extensions from causing hydration errors
- Shows a brief "Loading..." before the form appears

## How to Test the Complete Flow

### Step 1: Start the Dev Server
```powershell
npm run dev
```

### Step 2: Open Browser DevTools
- Press F12 to open DevTools
- Go to the **Console** tab (to see logs)
- Keep the **Network** tab open (to see requests)

### Step 3: Create an Admin Account (if needed)
1. Navigate to: `http://localhost:3000/admin/signup`
2. Fill in the form:
   - Name: Your name
   - Email: your@email.com
   - Password: yourpassword (8+ characters)
   - Confirm Password: yourpassword
   - Admin Secret: (check your .env.local for ADMIN_SECRET value)
3. Click "Create admin"
4. You'll be redirected to `/admin/login`

### Step 4: Log In
1. On `/admin/login`, enter:
   - Email: the email you just created
   - Password: the password you just created
2. Click "Login"
3. Watch the console logs:
   ```
   [Login] Starting login for: your@email.com
   [Login] Response status: 200
   [Login] Response data: {success: true, message: "Login successful"}
   [Login] Login successful, checking cookies...
   [Login] Cookies: token=eyJhbGc...
   [Login] Redirecting to /admin/dashboard...
   ```
4. Watch the middleware logs:
   ```
   [Middleware] Request: /admin/dashboard
   [Middleware] Token found: YES
   [Middleware] Valid token, allowing access to: /admin/dashboard
   [Middleware] Request: /admin
   [Middleware] Token found: YES
   [Middleware] Valid token, allowing access to: /admin
   ```

### Step 5: Verify Dashboard Access
- You should now be on `/admin` (the dashboard)
- You should see:
  - Sidebar on the left
  - Header at the top
  - Dashboard content with stats cards, charts, etc.

## Troubleshooting

### Issue: Still redirects to /admin/login after login

**Check 1: Is the token being set?**
```javascript
// Run in browser console after login
document.cookie.split(';').find(c => c.trim().startsWith('token='))
```
- If `undefined` → API is not setting the cookie
- If shows token → Cookie is set correctly

**Check 2: DevTools → Application → Cookies**
- Navigate to `http://localhost:3000`
- Open DevTools → Application tab → Cookies
- Look for a cookie named `token`
- Check its properties:
  - Domain: `localhost`
  - Path: `/`
  - HttpOnly: ✓
  - Secure: (depends on your setup)

**Check 3: Network tab**
- After clicking Login, check the Network tab
- Find the `/api/admin/login` request
- Check the Response Headers
- Look for `Set-Cookie: token=...`

### Issue: Hydration mismatch warning still appears

**Quick Fix:**
- Test in Incognito/Private window
- Disable browser extensions (password managers, Grammarly, etc.)

**Permanent Fix (if extension-related):**
- The current fix (client-only mounting) should prevent this
- If it still happens, check console for the specific element causing the mismatch

### Issue: "Invalid credentials" on login

**Possible causes:**
1. Wrong email/password
2. Email case mismatch (the API converts to lowercase)
3. Admin account doesn't exist in database

**Test with a fresh account:**
- Go to `/admin/signup` and create a new account
- Immediately log in with those exact credentials

### Issue: JWT_SECRET warning in console

**Fix:**
Create or update `.env.local`:
```
JWT_SECRET=your-super-secret-key-here-change-this-in-production
ADMIN_SECRET=your-admin-signup-secret-key
```

Then restart the dev server.

## Console Logs You Should See

### Successful Login Flow:
```
[Login] Starting login for: admin@example.com
[Login] Response status: 200
[Login] Response data: {success: true, message: "Login successful"}
[Login] Login successful, checking cookies...
[Login] Cookies: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
[Login] Redirecting to /admin/dashboard...
[Middleware] Request: /admin/dashboard
[Middleware] Token found: YES
[Middleware] Valid token, allowing access to: /admin/dashboard
[Middleware] Request: /admin
[Middleware] Token found: YES
[Middleware] Valid token, allowing access to: /admin
```

### Failed Login (wrong credentials):
```
[Login] Starting login for: wrong@example.com
[Login] Response status: 401
[Login] Response data: {success: false, message: "Invalid credentials"}
[Login] Login failed: Invalid credentials
```

### No Token (trying to access /admin):
```
[Middleware] Request: /admin
[Middleware] Token found: NO
[Middleware] No token, redirecting to /admin/login
```

## Quick Commands

### Check if server is running:
```powershell
Get-Process | Where-Object {$_.ProcessName -like "*node*"}
```

### Clear cookies and test fresh:
```javascript
// Run in browser console
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
```

### Restart dev server:
```powershell
# Press Ctrl+C to stop
npm run dev
```

## Next Steps

1. **Test the flow** using the steps above
2. **Check the console logs** - they will show you exactly what's happening
3. **Verify cookies** in DevTools → Application
4. **If still having issues**, send me:
   - The console logs (both client and server)
   - Screenshot of DevTools → Application → Cookies
   - The exact error message

The debug logs will make it very clear where the issue is occurring!
