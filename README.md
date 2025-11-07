# Permit Request Service Portal

A simplified Permit Request Service Portal that allows citizens to submit and view permit applications. Built with NestJS backend and Nuxt 4 frontend, featuring RTL support for Arabic language and responsive design.

## Documentation

For more detailed information, please refer to:

- **[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** - Detailed implementation plan with architecture, phases, and step-by-step instructions
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide for running and testing the application

## Project Description

This application provides a web-based portal for managing permit applications. Citizens can submit new permit requests through a web form and view all submitted applications with visual status indicators (Pending, Approved, Rejected).

### Key Features

- Submit new permit applications via web form
- View all submitted permit applications
- Visual status indicators (Pending, Approved, Rejected)
- RTL support for Arabic language
- Responsive design for mobile, tablet, and desktop
- Full CRUD operations for permit management
- Interactive API documentation via Swagger

---

## Technology Stack

### Frontend/Server

- **Framework**: Nuxt 4.x
- **Directory Structure**: `app/` directory (Nuxt 4 convention)
- **Data Fetching**: `useAsyncData` / `useFetch`
- **Server Routes**: `~/server/api/` directory (API Gateway pattern)
- **Styling**: Tailwind CSS
- **Form Validation**: Vee-Validate with Yup

### Backend

- **Framework**: NestJS 11.x
- **Database ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI (@nestjs/swagger)
- **API Style**: RESTful

### Database

- **Type**: PostgreSQL (Latest)
- **Connection**: Connection pooling via TypeORM

### Design System

- **Note**: The Saudi National Design System (SNDS) reference link is currently broken. The application uses Tailwind CSS with custom styling that follows RTL best practices and responsive design principles, but does not strictly follow SNDS guidelines due to the unavailable reference.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Docker Desktop** (for PostgreSQL)
- **npm** or **pnpm** (package manager)
- **Git**

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd permit-portal
```

### 2. Set Up PostgreSQL Database

Start the PostgreSQL database using Docker:

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

### 3. Backend Setup

Navigate to the backend directory and set up environment variables:

```bash
cd backend
```

**Create `.env` file from `.env.example`:**

The `.env.example` file in the `backend/` directory contains a template for all required environment variables. Copy it to create your `.env` file:

```bash
cp .env.example .env
```

Then edit `.env` with your configuration:

```env
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
```

**Install dependencies and start the backend:**

```bash
npm install
npm run start:dev
```

The backend will:

- Automatically create the `permit_applications` table in the database
- Start the API server on `http://localhost:3001`
- Make Swagger documentation available at `http://localhost:3001/api`

### 4. Frontend Setup

Open a **new terminal window** and navigate to the frontend directory:

```bash
cd nuxt-app
```

**Create `.env` file from `.env.example`:**

The `.env.example` file in the `nuxt-app/` directory contains a template for all required environment variables. Copy it to create your `.env` file:

```bash
cp .env.example .env
```

Then edit `.env` with your configuration:

```env
# Backend API URL (used by Nuxt Server Routes)
BACKEND_URL=http://localhost:3001

# Frontend Port
NUXT_PORT=3000
```

**Install dependencies and start the frontend:**

```bash
npm install
npm run dev
```

The frontend will start on `http://localhost:3000` with RTL support enabled.

---

## Running the Application

You'll need **3 terminal windows** to run everything:

### Terminal 1 - Database

```bash
# From project root
docker-compose up -d
```

### Terminal 2 - Backend

```bash
cd backend
npm run start:dev
```

**Expected output:**

```
🚀 Backend is running on: http://localhost:3001
📚 Swagger documentation: http://localhost:3001/api
```

### Terminal 3 - Frontend

```bash
cd nuxt-app
npm run dev
```

**Expected output:**

```
✔ Nuxt is ready
  ➜ Local:   http://localhost:3000/
```

---

## Accessing the Application

### Frontend

- **URL**: http://localhost:3000
- **Home Page**: http://localhost:3000/ (shows permit applications list)
- **Apply Page**: http://localhost:3000/apply (shows application form)
- **Permit Details**: http://localhost:3000/permits/:id (shows individual permit details)

### Backend API

- **Base URL**: http://localhost:3001
- **API Endpoints**: http://localhost:3001/permits
- **Swagger Documentation**: http://localhost:3001/api
- **Health Check**: http://localhost:3001 (returns basic NestJS response)

---

## API Documentation

The backend API is fully documented using Swagger/OpenAPI. Once the backend is running, you can:

1. **Access Swagger UI**: Open http://localhost:3001/api in your browser
2. **Explore Endpoints**: View all available API endpoints with request/response schemas
3. **Test Interactively**: Use the "Try it out" feature to test endpoints directly from the browser
4. **View Examples**: See example requests and responses for each endpoint

### Available Endpoints

- `POST /permits` - Create a new permit application
- `GET /permits` - Get all permit applications
- `GET /permits/:id` - Get a permit application by ID
- `PATCH /permits/:id` - Update a permit application
- `DELETE /permits/:id` - Delete a permit application

---

## Project Structure

```
permit-portal/
├── README.md                    # This file
├── IMPLEMENTATION_PLAN.md       # Detailed implementation plan
├── QUICK_START.md               # Quick start guide
├── .gitignore                   # Git ignore rules
├── docker-compose.yml           # PostgreSQL container configuration
├── nuxt-app/                    # Nuxt 4 Frontend
│   ├── app/
│   │   ├── pages/               # Application pages
│   │   │   ├── index.vue        # Home page (/)
│   │   │   ├── apply.vue        # Application form (/apply)
│   │   │   └── permits/
│   │   │       └── [id].vue     # Permit details page
│   │   ├── components/          # Vue components
│   │   │   ├── PermitCard.vue
│   │   │   ├── StatusBadge.vue
│   │   │   └── PermitForm.vue
│   │   ├── assets/
│   │   │   └── css/
│   │   │       └── main.css
│   │   └── utils/
│   │       └── sleep.ts
│   ├── server/
│   │   └── api/
│   │       └── permits/         # Nuxt Server Routes (API Gateway)
│   │           ├── index.get.ts
│   │           ├── index.post.ts
│   │           ├── [id].get.ts
│   │           ├── [id].patch.ts
│   │           └── [id].delete.ts
│   ├── .env.example             # Environment variables template
│   ├── nuxt.config.ts
│   ├── package.json
│   └── tsconfig.json
└── backend/                     # NestJS Backend
    ├── src/
    │   ├── main.ts              # Application entry point
    │   ├── app.module.ts        # Root module
    │   ├── permits/
    │   │   ├── permits.controller.ts
    │   │   ├── permits.service.ts
    │   │   ├── permits.module.ts
    │   │   ├── dto/
    │   │   │   ├── create-permit.dto.ts
    │   │   │   └── update-permit.dto.ts
    │   │   └── entities/
    │   │       └── permit.entity.ts
    │   └── database/
    │       └── database.module.ts
    ├── .env.example             # Environment variables template
    ├── package.json
    ├── tsconfig.json
    └── nest-cli.json
```

---

## Architecture Decisions

### API Gateway Pattern

All frontend API calls go through Nuxt Server Routes, which act as an API Gateway. This pattern provides:

- **Separation of Concerns**: Frontend never directly calls the backend
- **Error Handling**: Centralized error handling in server routes
- **Data Transformation**: Ability to transform data before sending to frontend
- **Security**: Backend URL is kept private (server-side only)

**Request Flow:**

```
Frontend → Nuxt Server Route → NestJS Backend → PostgreSQL Database
```

### RTL Support

The application is configured for Right-to-Left (RTL) layout to support Arabic language:

- HTML `dir="rtl"` attribute set in `nuxt.config.ts`
- Arabic language (`lang="ar"`) configured
- RTL-aware CSS styling
- Arabic date formatting using `Intl.DateTimeFormat`

### Design System

**Important Note**: The Saudi National Design System (SNDS) reference link (https://design.dga.gov.sa/) is currently broken and unavailable. As a result:

- The application uses **Tailwind CSS** with custom styling
- RTL best practices are implemented
- Responsive design principles are followed
- The application does **not** strictly follow SNDS guidelines due to the unavailable reference

If the SNDS becomes available in the future, the styling can be updated to match the official design system.

### Database Schema

The `permit_applications` table includes:

- `id` - Primary key (auto-generated)
- `applicant_name` - Name of the applicant
- `applicant_email` - Email address
- `permit_type` - Type of permit requested
- `application_status` - Status enum (Pending, Approved, Rejected)
- `submitted_at` - Timestamp of submission (auto-generated)

---

## Environment Variables

### Backend Environment Variables

Located in `backend/.env` (use `backend/.env.example` as template):

- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_USER` - Database username (default: permit_user)
- `DB_PASSWORD` - Database password (default: permit_password)
- `DB_NAME` - Database name (default: permit_db)
- `BACKEND_PORT` - Backend server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)

### Frontend Environment Variables

Located in `nuxt-app/.env` (use `nuxt-app/.env.example` as template):

- `BACKEND_URL` - Backend API URL (default: http://localhost:3001)
- `NUXT_PORT` - Frontend server port (default: 3000)

**Note**: Make sure to create `.env` files from `.env.example` templates in both `backend/` and `nuxt-app/` directories before running the application.

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

### Code Quality

The project uses:

- **Prettier** for code formatting (backend)
- **ESLint** for linting (backend)
- **TypeScript** for type safety (both frontend and backend)

**Backend formatting:**

```bash
cd backend
npm run format  # Format code with Prettier
npm run lint    # Lint code with ESLint
```

### Stopping the Applications

- **Frontend**: Press `Ctrl+C` in the frontend terminal
- **Backend**: Press `Ctrl+C` in the backend terminal
- **Database**: `docker-compose down` (or `docker-compose stop` to keep data)

---

## Ports Summary

| Service               | Port | URL                       |
| --------------------- | ---- | ------------------------- |
| Frontend (Nuxt)       | 3000 | http://localhost:3000     |
| Backend (NestJS)      | 3001 | http://localhost:3001     |
| Swagger Documentation | 3001 | http://localhost:3001/api |
| PostgreSQL            | 5432 | localhost:5432            |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is private and unlicensed.

---

## Resources

- [Nuxt 4 Documentation](https://nuxt.com/docs/4.x/getting-started/introduction)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vee-Validate Documentation](https://vee-validate.logaretm.com/v4/)

---

## Support

For issues and questions, please open an issue in the repository.
