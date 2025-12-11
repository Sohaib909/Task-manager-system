# Docker Setup Guide

This guide explains how to run the Task Management application using Docker and Docker Compose.

## Prerequisites

- Docker Desktop installed and running (or Docker Engine + Docker Compose)
- At least 2GB of free disk space
- Ports 3000, 5000, and 27017 available

## Quick Start

### 1. Build and Start All Services

```bash
docker-compose up --build
```

This command will:
- Build the backend and frontend Docker images
- Start MongoDB, backend, and frontend services
- Create a Docker network for service communication
- Set up persistent storage for MongoDB data

### 2. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MongoDB**: localhost:27017

### 3. Stop All Services

```bash
docker-compose down
```

To also remove volumes (deletes MongoDB data):

```bash
docker-compose down -v
```

## Individual Service Management

### Start Services in Detached Mode

```bash
docker-compose up -d
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Restart a Service

```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart mongodb
```

### Rebuild a Service

```bash
docker-compose up --build backend
docker-compose up --build frontend
```

## Development Mode

For development, you may want to run services individually:

### Backend Only

```bash
cd backend
docker build -t task-management-backend .
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb://localhost:27017/taskmanagement \
  task-management-backend
```

### Frontend Only

```bash
cd frontend
docker build -t task-management-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:5000/api \
  task-management-frontend
```

## Environment Variables

Create a `.env` file in the root directory (optional, defaults are used):

```env
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/taskmanagement
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Note**: When using Docker Compose, the backend connects to MongoDB using the service name `mongodb` instead of `localhost`.

## Troubleshooting

### Port Already in Use

If ports 3000, 5000, or 27017 are already in use:

1. Stop the conflicting service, or
2. Modify port mappings in `docker-compose.yml`:
   ```yaml
   ports:
     - "3001:3000"  # Change host port
   ```

### MongoDB Connection Issues

1. Check if MongoDB container is healthy:
   ```bash
   docker-compose ps
   ```

2. Check MongoDB logs:
   ```bash
   docker-compose logs mongodb
   ```

3. Verify MongoDB is accessible:
   ```bash
   docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
   ```

### Build Failures

1. Clear Docker cache:
   ```bash
   docker-compose build --no-cache
   ```

2. Remove old images:
   ```bash
   docker system prune -a
   ```

### Frontend Can't Connect to Backend

Ensure `NEXT_PUBLIC_API_URL` is set correctly. In Docker Compose, use:
- `http://localhost:5000/api` (for browser access)
- Or `http://backend:5000/api` (for internal Docker network access)

## Production Deployment

For production, consider:

1. **Use environment-specific `.env` files**:
   ```bash
   docker-compose --env-file .env.production up
   ```

2. **Use Docker secrets** for sensitive data

3. **Enable HTTPS** with a reverse proxy (nginx, Traefik)

4. **Use managed MongoDB** (MongoDB Atlas) instead of containerized MongoDB

5. **Set resource limits** in `docker-compose.yml`:
   ```yaml
   services:
     backend:
       deploy:
         resources:
           limits:
             cpus: '0.5'
             memory: 512M
   ```

## Health Checks

All services include health checks. View health status:

```bash
docker-compose ps
```

Healthy services will show `(healthy)` status.

## Data Persistence

MongoDB data is persisted in a Docker volume named `mongodb_data`. To backup:

```bash
docker-compose exec mongodb mongodump --out /data/backup
```

To restore:

```bash
docker-compose exec mongodb mongorestore /data/backup
```

## Clean Up

Remove all containers, networks, and volumes:

```bash
docker-compose down -v
docker system prune -a
```

