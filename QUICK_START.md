# Quick Start Guide - Running the Applications

This guide will help you run and test the Permit Request Service Portal.

## Prerequisites

- Node.js (v18 or higher)
- Docker Desktop (for PostgreSQL)
- npm or yarn

## Step-by-Step Instructions

### 1. Start PostgreSQL Database

First, make sure Docker Desktop is running on your machine.

```bash
# From the project root directory
docker-compose up -d
```

This will:

- Start PostgreSQL in a Docker container
- Create the database `permit_db`
- Expose PostgreSQL on port `5432`

**Verify it's running:**

```bash
docker ps
```

You should see a container named `permit-db` running.

---

### 2. Set Up Backend Environment

```bash
cd backend

# Create .env file from example (if it doesn't exist)
# The .env file should contain:
cat > .env << EOF
# Database Configuration (TypeORM)
DB_HOST=localhost
DB_PORT=5432
DB_USER=permit_user
DB_PASSWORD=permit_password
DB_NAME=permit_db

# Backend Configuration
BACKEND_PORT=3001
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
EOF
```

---

### 3. Start Backend Server

```bash
# Make sure you're in the backend directory
cd backend

# Install dependencies (if not already installed)
npm install

# Start the backend in development mode
npm run start:dev
```

**Expected output:**

```
🚀 Backend is running on: http://localhost:3001
📚 Swagger documentation: http://localhost:3001/api
```

**What happens:**

- TypeORM will automatically create the `permit_applications` table in the database
- The backend API will be available at `http://localhost:3001`
- Swagger API documentation will be available at `http://localhost:3001/api`
- CORS is enabled for the frontend

**Test the backend:**

```bash
# In another terminal, test if backend is running
curl http://localhost:3001
```

---

### 4. Set Up Frontend Environment

Open a **new terminal window** and:

```bash
cd nuxt-app

# Create .env file (if it doesn't exist)
cat > .env << EOF
# Backend API URL (used by Nuxt Server Routes)
BACKEND_URL=http://localhost:3001

# Frontend Port
NUXT_PORT=3000
EOF
```

---

### 5. Start Frontend Server

```bash
# Make sure you're in the nuxt-app directory
cd nuxt-app

# Install dependencies (if not already installed)
npm install

# Start the frontend in development mode
npm run dev
```

**Expected output:**

```
✔ Nuxt is ready
  ➜ Local:   http://localhost:3000/
```

**What happens:**

- Nuxt dev server starts on port 3000
- RTL (Right-to-Left) support is enabled
- Frontend will be available at `http://localhost:3000`

---

## Accessing the Application

### Frontend

- **URL**: http://localhost:3000
- **Home Page**: http://localhost:3000/ (will show permit applications list)
- **Apply Page**: http://localhost:3000/apply (will show application form)

### Backend API

- **Base URL**: http://localhost:3001
- **API Endpoints**: http://localhost:3001/permits
- **Swagger Documentation**: http://localhost:3001/api
- **Health Check**: http://localhost:3001 (should return basic NestJS response)

---

## Testing the Setup

### 1. Check Database Connection

The backend should automatically create tables when it starts. You can verify by checking the backend logs for TypeORM connection messages.

### 2. Test Backend API

Once the backend is running, you can test it:

**Option 1: Using Swagger UI (Recommended)**

1. Open http://localhost:3001/api in your browser
2. Explore all available endpoints
3. Use the "Try it out" feature to test endpoints interactively
4. View request/response schemas and examples

**Option 2: Using cURL**

```bash
# Test GET endpoint
curl http://localhost:3001/permits

# Test POST endpoint
curl -X POST http://localhost:3001/permits \
  -H "Content-Type: application/json" \
  -d '{
    "applicant_name": "Test User",
    "applicant_email": "test@example.com",
    "permit_type": "Building Permit"
  }'
```

### 3. Test Frontend

Open your browser and navigate to:

- http://localhost:3000

You should see the Nuxt application (currently showing the default app.vue).

---

## Troubleshooting

### Docker Issues

**Problem**: `Cannot connect to the Docker daemon`

- **Solution**: Make sure Docker Desktop is running

**Problem**: Port 5432 already in use

- **Solution**: Stop any existing PostgreSQL instances or change the port in `docker-compose.yml`

### Backend Issues

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

- **Solution**: Make sure PostgreSQL container is running: `docker-compose up -d`

**Problem**: Database connection errors

- **Solution**: Check that `.env` file exists in `backend/` directory with correct credentials

### Frontend Issues

**Problem**: Cannot connect to backend

- **Solution**:
  1. Make sure backend is running on port 3001
  2. Check `nuxt-app/.env` has `BACKEND_URL=http://localhost:3001`

**Problem**: Port 3000 already in use

- **Solution**: Change `NUXT_PORT` in `nuxt-app/.env` or stop the process using port 3000

---

## Development Workflow

### Running Everything Together

You'll need **3 terminal windows**:

1. **Terminal 1 - Database:**

   ```bash
   docker-compose up -d
   # Keep it running, or run in background
   ```

2. **Terminal 2 - Backend:**

   ```bash
   cd backend
   npm run start:dev
   ```

3. **Terminal 3 - Frontend:**
   ```bash
   cd nuxt-app
   npm run dev
   ```

### Stopping the Applications

- **Frontend**: Press `Ctrl+C` in the frontend terminal
- **Backend**: Press `Ctrl+C` in the backend terminal
- **Database**: `docker-compose down` (or `docker-compose stop` to keep data)

---

## Next Steps

After successfully running the applications:

1. ✅ Phase 1 is complete - Infrastructure is set up
2. ✅ Phase 2 is complete - Backend API with Swagger documentation
   - DTOs with validation
   - Permits Service with CRUD operations
   - Permits Controller with REST endpoints
   - Swagger/OpenAPI documentation at `/api`
3. ⏭️ Proceed to Phase 3: Frontend Development
   - Create Nuxt Server Routes (API Gateway)
   - Build Home page with permit list
   - Build Apply page with form
   - Implement status visualization

---

## Useful Commands

```bash
# Check Docker containers
docker ps

# View database logs
docker-compose logs postgres

# Stop database
docker-compose down

# Restart database
docker-compose restart

# View backend logs (in backend directory)
npm run start:dev

# View frontend logs (in nuxt-app directory)
npm run dev
```

---

## Ports Summary

| Service               | Port | URL                       |
| --------------------- | ---- | ------------------------- |
| Frontend (Nuxt)       | 3000 | http://localhost:3000     |
| Backend (NestJS)      | 3001 | http://localhost:3001     |
| Swagger Documentation | 3001 | http://localhost:3001/api |
| PostgreSQL            | 5432 | localhost:5432            |

---

**Note**: Phase 1 (infrastructure) and Phase 2 (backend API with Swagger) are complete. The frontend pages will be implemented in Phase 3.
