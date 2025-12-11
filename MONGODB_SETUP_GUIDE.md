# MongoDB Setup Guide - Quick Fix

## 🚨 Current Issue
Your application is showing MongoDB connection errors. This guide will help you fix it.

## ✅ Solution Options

### Option 1: Use MongoDB Atlas (Cloud - Recommended for Quick Start)

**MongoDB Atlas is free and doesn't require local installation!**

1. **Create a free MongoDB Atlas account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free (no credit card required)

2. **Create a Cluster:**
   - Click "Build a Database"
   - Choose "FREE" (M0) tier
   - Select a cloud provider and region (closest to you)
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Username: `taskmanager` (or any name)
   - Password: Create a strong password (save it!)
   - Database User Privileges: "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP:**
   - Go to "Network Access" → "Add IP Address"
   - Click "Add Current IP Address" (or use `0.0.0.0/0` for development - less secure)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with your actual password
   - Add database name at the end: `/taskmanagement`

6. **Update your `.env` file:**
   ```
   MONGODB_URI=mongodb+srv://taskmanager:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanagement
   PORT=5000
   ```

7. **Restart your server:**
   ```bash
   node server.js
   ```

---

### Option 2: Install and Run MongoDB Locally (Windows)

#### Step 1: Install MongoDB

1. **Download MongoDB Community Server:**
   - Go to https://www.mongodb.com/try/download/community
   - Select: Windows, MSI package
   - Download and run the installer

2. **Installation Options:**
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Service Name: `MongoDB`
   - Check "Run service as Network Service user"
   - Check "Install MongoDB Compass" (GUI tool - optional but helpful)

#### Step 2: Start MongoDB Service

**Method A: Using Windows Services (Recommended)**
1. Press `Win + R`, type `services.msc`, press Enter
2. Find "MongoDB" service
3. Right-click → "Start" (if not running)

**Method B: Using Command Prompt (Run as Administrator)**
```bash
net start MongoDB
```

**Method C: Using PowerShell (Run as Administrator)**
```powershell
Start-Service MongoDB
```

#### Step 3: Verify MongoDB is Running

```bash
# Test connection
mongosh
# Or if mongosh is not installed:
mongo
```

If you see `>` prompt, MongoDB is running! Type `exit` to leave.

#### Step 4: Update `.env` file (if needed)

Your `.env` should already have:
```
MONGODB_URI=mongodb://localhost:27017/taskmanagement
PORT=5000
```

#### Step 5: Restart Your Server

```bash
node server.js
```

You should see: `✅ MongoDB connected successfully`

---

### Option 3: Use Docker (If you have Docker installed)

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify it's running
docker ps

# Your .env file should have:
# MONGODB_URI=mongodb://localhost:27017/taskmanagement
```

---

## 🔍 Troubleshooting

### Error: "MongoDB connection error"

**Check 1: Is MongoDB running?**
```bash
# Windows - Check service status
sc query MongoDB

# Or check if port 27017 is in use
netstat -an | findstr 27017
```

**Check 2: Connection String Format**
- Local: `mongodb://localhost:27017/taskmanagement`
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/taskmanagement`
- No spaces, no quotes needed in `.env` file

**Check 3: Firewall/Antivirus**
- Make sure port 27017 is not blocked
- Temporarily disable firewall to test

### Error: "Operation buffering timed out"

This means MongoDB is not connected. The server will now show a clear error message:
- Check the server console for connection status
- Follow the troubleshooting steps above

### Error: "Address already in use" (Port 5000)

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

## ✅ Verification Steps

1. **Check Server Console:**
   - Should see: `✅ MongoDB connected successfully`
   - Should see: `Server running on http://localhost:5000`

2. **Test API Endpoint:**
   ```bash
   curl http://localhost:5000/api/tasks
   ```
   Should return `[]` (empty array) or tasks, not an error.

3. **Check Frontend:**
   - Open browser console
   - Should NOT see 500 errors
   - Should be able to create tasks

---

## 📝 Quick Reference

### Start MongoDB (Windows Service)
```bash
net start MongoDB
```

### Stop MongoDB (Windows Service)
```bash
net stop MongoDB
```

### Check MongoDB Status
```bash
sc query MongoDB
```

### View MongoDB Logs
```bash
# Default location on Windows:
C:\Program Files\MongoDB\Server\<version>\log\mongod.log
```

---

## 🎯 Recommended: MongoDB Atlas

For development, **MongoDB Atlas is the easiest option** because:
- ✅ No installation required
- ✅ Works immediately
- ✅ Free tier available
- ✅ Accessible from anywhere
- ✅ Automatic backups
- ✅ No local setup needed

Just follow **Option 1** above!

---

## Need More Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Installation: https://docs.mongodb.com/manual/installation/
- MongoDB Compass (GUI): https://www.mongodb.com/products/compass

