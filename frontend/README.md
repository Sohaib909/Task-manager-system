# Frontend Application

Next.js + React frontend for Task Management Application.

## Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment:**
   Create a `.env.local` file in the `frontend/` folder:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/              # Next.js app directory
│   ├── page.tsx      # Home page (Create Task)
│   ├── tasks/        # Tasks listing page
│   └── layout.tsx    # Root layout
├── components/       # React components
├── public/           # Static assets
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── package.json      # Frontend dependencies
```

## Features

- Task creation form
- Task listing with pagination
- Search and filtering
- Inline editing
- Dark mode
- Responsive design

