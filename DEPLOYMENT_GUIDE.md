# Deployment Guide

## Backend Deployment

### Option 1: Render.com
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables:
   - \`MONGODB_URI\`: Your MongoDB connection string
   - \`PORT\`: 5000
5. Deploy

### Option 2: Vercel
1. Install Vercel CLI: \`npm i -g vercel\`
2. Run: \`vercel\`
3. Configure serverless function
4. Set environment variables

### Option 3: Railway.app
1. Connect GitHub repository
2. Deploy from railway.app
3. Add MongoDB service
4. Configure environment variables

## Frontend Deployment

### Option 1: Vercel
1. Build: \`npm run build\`
2. Connect GitHub to Vercel
3. Deploy automatically
4. Update API URL in environment variables

### Option 2: Netlify
1. Connect GitHub repository
2. Build command: \`npm run build\`
3. Publish directory: \`dist\`
4. Deploy

### Option 3: GitHub Pages
1. Update \`vite.config.ts\` with base path
2. Build: \`npm run build\`
3. Push dist folder to gh-pages branch

## Environment Variables

### Backend (.env)
\`\`\`
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/taskmanagement
PORT=5000
\`\`\`

### Frontend (.env.production)
\`\`\`
VITE_API_URL=https://your-backend-url/api
\`\`\`

Then update API_URL in App.tsx to use this variable.

## Database Setup

### MongoDB Atlas
1. Create account at mongodb.com/cloud/atlas
2. Create a cluster
3. Create database user
4. Get connection string
5. Update MONGODB_URI

## CORS Configuration

Make sure backend allows frontend origin:
\`\`\`js
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-url.com']
}));
\`\`\`

## Performance Tips

- Enable gzip compression
- Use CDN for static assets
- Optimize images
- Implement pagination for large task lists
- Add database indexes

## Monitoring

- Use service status pages
- Set up error logging (Sentry)
- Monitor performance (New Relic)
- Check API response times
\`\`\`

```json file="" isHidden
