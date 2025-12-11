# 🚀 Quick Start Guide - Fix MongoDB Connection

## ✅ Fixed Issues
1. ✅ Added `"type": "module"` to package.json (removes the warning)
2. ⚠️ MongoDB is not installed/running (needs to be fixed)

## 🎯 EASIEST SOLUTION: Use MongoDB Atlas (Cloud - 5 minutes)

### Step 1: Create Free MongoDB Atlas Account
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Click "Try Free" or "Sign Up"
3. Fill in your details (no credit card required for free tier)

### Step 2: Create a Free Cluster
1. After signing up, click **"Build a Database"**
2. Choose **"FREE" (M0)** tier
3. Select a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you
5. Click **"Create"** (takes 1-3 minutes)

### Step 3: Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `taskmanager` (or any name you like)
5. Password: Create a strong password (⚠️ **SAVE THIS PASSWORD!**)
6. Database User Privileges: Select **"Atlas admin"** or **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Whitelist Your IP Address
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Add Current IP Address"** (or use `0.0.0.0/0` for development - less secure but easier)
4. Click **"Confirm"**

### Step 5: Get Your Connection String
1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File
1. Open your `.env` file
2. Replace the `MONGODB_URI` line with your connection string
3. **Important:** Replace `<username>` and `<password>` with your actual credentials
4. Add `/taskmanagement` at the end (before the `?`)

**Example:**
```
MONGODB_URI=mongodb+srv://taskmanager:YourPassword123@cluster0.abc123.mongodb.net/taskmanagement?retryWrites=true&w=majority
PORT=5000
```

### Step 7: Restart Your Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
node server.js
```

You should now see:
```
✅ MongoDB connected successfully
📊 Database: taskmanagement
Server running on http://localhost:5000
```

---

## 🔧 ALTERNATIVE: Install MongoDB Locally (Windows)

### Step 1: Download MongoDB
1. Go to: **https://www.mongodb.com/try/download/community**
2. Select:
   - Version: Latest (7.0 or 6.0)
   - Platform: Windows
   - Package: MSI
3. Click **"Download"**

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. ✅ Check **"Install MongoDB as a Service"**
4. Service Name: `MongoDB` (default)
5. ✅ Check **"Run service as Network Service user"**
6. ✅ Check **"Install MongoDB Compass"** (optional GUI tool)
7. Click **"Install"**

### Step 3: Start MongoDB Service
**Option A: Using Services (Easiest)**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find **"MongoDB"** service
4. Right-click → **"Start"**

**Option B: Using PowerShell (Run as Administrator)**
```powershell
Start-Service MongoDB
```

**Option C: Using Command Prompt (Run as Administrator)**
```bash
net start MongoDB
```

### Step 4: Verify MongoDB is Running
```bash
# Test connection
mongosh
# If you see a > prompt, MongoDB is running!
# Type 'exit' to leave
```

### Step 5: Your .env File Should Already Be Correct
```
MONGODB_URI=mongodb://localhost:27017/taskmanagement
PORT=5000
```

### Step 6: Restart Your Server
```bash
node server.js
```

---

## ✅ Verification

After fixing MongoDB connection, you should see:
- ✅ No module type warning
- ✅ "MongoDB connected successfully" message
- ✅ Server running on http://localhost:5000
- ✅ Frontend can create/read tasks without errors

---

## 🆘 Still Having Issues?

### Check MongoDB Service Status
```powershell
Get-Service MongoDB
```

### Check if Port 27017 is in Use
```powershell
Test-NetConnection -ComputerName localhost -Port 27017
```

### View MongoDB Logs
Default location: `C:\Program Files\MongoDB\Server\<version>\log\mongod.log`

### Common Issues:
1. **Firewall blocking port 27017** - Temporarily disable firewall to test
2. **MongoDB service not starting** - Check Windows Event Viewer for errors
3. **Wrong connection string** - Make sure no spaces, correct username/password

---

## 💡 Recommendation

**Use MongoDB Atlas** - It's:
- ✅ Free (no credit card needed)
- ✅ No installation required
- ✅ Works immediately
- ✅ Accessible from anywhere
- ✅ Automatic backups
- ✅ Easy to set up (5 minutes)

