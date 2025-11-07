# Permit Request Service Portal - Detailed Implementation Plan

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Design](#architecture-design)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Implementation Phases](#implementation-phases)
6. [Detailed Implementation Steps](#detailed-implementation-steps)
7. [Testing Strategy](#testing-strategy)
8. [Deployment Considerations](#deployment-considerations)

---

## Project Overview

### Goal

Build a simplified Permit Request Service Portal that allows citizens to submit and view permit applications.

### Key Features

- Submit new permit applications via web form
- View all submitted permit applications
- Visual status indicators (Pending, Approved, Rejected)
- RTL support for Arabic language
- Responsive design

---

## Architecture Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Nuxt 4 Frontend                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Home Page  │  │  Apply Page  │  │   Components │  │
│  │      (/)     │  │    (/apply)  │  │  (SNDS)      │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │           │
│         └─────────────────┴──────────────────┘           │
│                           │                               │
│                    useAsyncData/useFetch                  │
└───────────────────────────┼───────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────┐
│              Nuxt Server Routes (API Gateway)              │
│         ~/server/api/permits.ts                           │
│         ~/server/api/permits/[id].ts                      │
└───────────────────────────┼───────────────────────────────┘
                            │
                            │ HTTP Requests
                            │
┌───────────────────────────▼───────────────────────────────┐
│                    NestJS Backend                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Controllers  │  │   Services   │  │     DTOs     │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                  │            │
│         └─────────────────┴──────────────────┘            │
│                           │                                │
│                    TypeORM                                 │
└───────────────────────────┼───────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────┐
│                    PostgreSQL Database                    │
│              Permit Application Table                      │
└────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **API Gateway Pattern**: All frontend API calls go through Nuxt Server Routes
2. **Separation of Concerns**: Frontend (Nuxt) → API Gateway (Nuxt Server) → Backend (NestJS) → Database (PostgreSQL)
3. **RESTful API**: NestJS provides REST endpoints for CRUD operations
4. **Design System**: Saudi National Design System for consistent UI/UX

---

## Technology Stack

### Frontend/Server

- **Framework**: Nuxt 4.x (Latest)
- **Directory Structure**: `app/` directory (Nuxt 4 convention)
- **Data Fetching**: `useAsyncData` / `useFetch`
- **Server Routes**: `~/server/api/` directory

### Backend

- **Framework**: NestJS 11.x (Latest)
- **Database ORM**: TypeORM (standard for NestJS with PostgreSQL)
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI (@nestjs/swagger)
- **API Style**: RESTful

### Database

- **Type**: PostgreSQL (Latest)
- **Connection**: Connection pooling via ORM

### Design System

- **System**: Saudi National Design System (Platforms Code)
- **Features**: RTL support, Responsive design
- **Reference**: Figma community profile

---

## Project Structure

```
practice-nestjs/
├── README.md
├── IMPLEMENTATION_PLAN.md
├── .gitignore
├── docker-compose.yml              # PostgreSQL container
├── nuxt-app/                       # Nuxt 4 Frontend
│   ├── app/
│   │   ├── page.vue                # Home page (/)
│   │   ├── apply/
│   │   │   └── page.vue            # Application form (/apply)
│   │   ├── components/
│   │   │   ├── PermitCard.vue      # Permit application card
│   │   │   ├── StatusBadge.vue     # Status indicator
│   │   │   └── PermitForm.vue      # Application form
│   │   └── layouts/
│   │       └── default.vue         # Default layout
│   ├── server/
│   │   └── api/
│   │       ├── permits/
│   │       │   ├── index.get.ts    # GET /api/permits
│   │       │   ├── index.post.ts   # POST /api/permits
│   │       │   └── [id].get.ts     # GET /api/permits/:id
│   │       └── health.ts            # Health check
│   ├── nuxt.config.ts
│   ├── package.json
│   └── tsconfig.json
├── backend/                        # NestJS Backend
│   ├── src/
│   │   ├── main.ts                 # Application entry
│   │   ├── app.module.ts           # Root module
│   │   ├── permits/
│   │   │   ├── permits.controller.ts
│   │   │   ├── permits.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-permit.dto.ts
│   │   │   │   └── update-permit.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── permit.entity.ts
│   │   │   └── permits.module.ts
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   └── database.service.ts
│   │   └── config/
│   │       └── database.config.ts
│   ├── src/
│   │   ├── permits/
│   │   │   └── entities/
│   │   │       └── permit.entity.ts  # TypeORM entity
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
├── .env.example                    # Environment variables template
└── .env                            # Actual environment variables (gitignored)
```

---

## Implementation Phases

### Phase 1: Project Setup & Infrastructure

1. Initialize Git repository
2. Set up PostgreSQL database (Docker)
3. Initialize NestJS backend project
4. Initialize Nuxt 4 frontend project
5. Configure environment variables
6. Set up database connection

### Phase 2: Backend Development

1. Design database schema (TypeORM)
2. Create Permit entity/model
3. Implement DTOs (validation)
4. Create Permits service (business logic)
5. Create Permits controller (REST endpoints)
6. Set up Swagger/OpenAPI documentation
7. Test API endpoints (Swagger UI or Postman/Thunder Client)

### Phase 3: Frontend Development

1. Set up Saudi National Design System
2. Configure RTL support
3. Create Nuxt Server Routes (API Gateway)
4. Build Home page with permit list
5. Build Apply page with form
6. Implement status visualization
7. Add responsive design

### Phase 4: Integration & Testing

1. Connect frontend to backend via Server Routes
2. End-to-end testing
3. RTL testing
4. Responsive design testing
5. Error handling
6. Form validation

### Phase 5: Documentation & Polish

1. Write comprehensive README.md
2. Add code comments
3. Prepare presentation
4. Final testing and bug fixes

---

## Detailed Implementation Steps

### Phase 1: Project Setup & Infrastructure

#### 1.1 Initialize Repository

```bash
git init
git add .
git commit -m "Initial commit: Project setup"
```

#### 1.2 Set Up PostgreSQL with Docker

- Create `docker-compose.yml`:
  - PostgreSQL service
  - Environment variables for database credentials
  - Volume for data persistence
  - Port mapping (5432:5432)

#### 1.3 Initialize NestJS Backend

```bash
cd backend
npx @nestjs/cli new . --package-manager npm
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/config
npm install @nestjs/swagger swagger-ui-express
npm install class-validator class-transformer
npm install --save-dev @types/node @types/pg
```

#### 1.4 Initialize Nuxt 4 Frontend

```bash
cd nuxt-app
npx nuxi@latest init .
npm install
```

#### 1.5 Environment Variables

Create `.env.example` and `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/permit_db

# Backend
BACKEND_URL=http://localhost:3001
BACKEND_PORT=3001

# Frontend
NUXT_PORT=3000
```

---

### Phase 2: Backend Development

#### 2.1 Database Schema Design

**Using TypeORM (`permit.entity.ts`):**

```typescript
@Entity('permit_applications')
export class PermitApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  applicant_name: string;

  @Column()
  applicant_email: string;

  @Column()
  permit_type: string;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  })
  application_status: 'Pending' | 'Approved' | 'Rejected';

  @CreateDateColumn()
  submitted_at: Date;
}
```

#### 2.2 DTOs (Data Transfer Objects)

**`create-permit.dto.ts`:**

```typescript
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermitDto {
  @IsString()
  @IsNotEmpty()
  applicant_name: string;

  @IsEmail()
  @IsNotEmpty()
  applicant_email: string;

  @IsString()
  @IsNotEmpty()
  permit_type: string;

  @IsOptional()
  @IsString()
  application_status?: 'Pending' | 'Approved' | 'Rejected';
}
```

**`update-permit.dto.ts`:**

```typescript
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdatePermitDto {
  @IsOptional()
  @IsString()
  applicant_name?: string;

  @IsOptional()
  @IsEmail()
  applicant_email?: string;

  @IsOptional()
  @IsString()
  permit_type?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Approved', 'Rejected'])
  application_status?: 'Pending' | 'Approved' | 'Rejected';
}
```

#### 2.3 Service Layer (`permits.service.ts`)

- `create(createPermitDto: CreatePermitDto)` - Create new permit
- `findAll()` - Get all permits
- `findOne(id: number)` - Get permit by ID
- `update(id: number, updatePermitDto: UpdatePermitDto)` - Update permit
- `remove(id: number)` - Delete permit

#### 2.4 Controller Layer (`permits.controller.ts`)

- `POST /permits` - Create permit
- `GET /permits` - Get all permits
- `GET /permits/:id` - Get permit by ID
- `PATCH /permits/:id` - Update permit
- `DELETE /permits/:id` - Delete permit

**Swagger Documentation:**

- All endpoints are documented with Swagger/OpenAPI
- API documentation available at `/api` endpoint
- Interactive API testing via Swagger UI
- Response schemas and examples included

#### 2.5 Swagger/OpenAPI Documentation

- Install `@nestjs/swagger` and `swagger-ui-express`
- Configure Swagger in `main.ts`
- Add API decorators to controller (`@ApiTags`, `@ApiOperation`, `@ApiResponse`)
- Add property decorators to DTOs (`@ApiProperty`, `@ApiPropertyOptional`)
- Access documentation at `/api` endpoint

#### 2.6 Module Configuration

- Import TypeORM module
- Configure database connection
- Register Permits module

---

### Phase 3: Frontend Development

#### 3.1 Saudi National Design System Setup

1. Install SNDS package (if available via npm)
2. OR integrate via CDN/static assets
3. Configure Nuxt to use SNDS components
4. Set up RTL support in `nuxt.config.ts`:
   ```typescript
   export default defineNuxtConfig({
     app: {
       head: {
         htmlAttrs: {
           dir: 'rtl',
           lang: 'ar',
         },
       },
     },
   });
   ```

#### 3.2 Nuxt Server Routes (API Gateway)

**`server/api/permits/index.get.ts`:**

```typescript
export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  const response = await $fetch(`${backendUrl}/permits`);
  return response;
});
```

**`server/api/permits/index.post.ts`:**

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  const response = await $fetch(`${backendUrl}/permits`, {
    method: 'POST',
    body,
  });
  return response;
});
```

#### 3.3 Home Page (`app/page.vue`)

- Use `useAsyncData` to fetch permits from `/api/permits`
- Display list using `PermitCard` component
- Show status with `StatusBadge` component
- Implement loading and error states

#### 3.4 Apply Page (`app/apply/page.vue`)

- Create form with fields:
  - Applicant Name (text input)
  - Applicant Email (email input)
  - Permit Type (text input or select)
- Use `useFetch` to POST to `/api/permits`
- Show success/error messages
- Redirect to home page on success

#### 3.5 Components

**`PermitCard.vue`:**

- Display permit information
- Include status badge
- Responsive card layout

**`StatusBadge.vue`:**

- Color-coded status:
  - Pending: Yellow/Orange
  - Approved: Green
  - Rejected: Red
- Icon support

**`PermitForm.vue`:**

- Form validation
- Error handling
- Loading states

#### 3.6 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Test on multiple screen sizes

---

### Phase 4: Integration & Testing

#### 4.1 API Integration Testing

- Test all endpoints via Nuxt Server Routes
- Verify data flow: Frontend → Server Routes → Backend → Database
- Test error scenarios

#### 4.2 Frontend Testing

- Form validation
- Status visualization
- RTL layout
- Responsive design

#### 4.3 End-to-End Testing

- Submit new permit
- View permit list
- Verify status display

---

### Phase 5: Documentation & Polish

#### 5.1 README.md Structure

1. **Project Description**
2. **Technology Stack**
3. **Prerequisites**
4. **Installation Steps**
   - Clone repository
   - Set up PostgreSQL
   - Backend setup
   - Frontend setup
5. **Running the Application**
   - Start database
   - Start backend
   - Start frontend
6. **API Documentation**
   - Swagger UI available at `http://localhost:3001/api`
   - Interactive API testing
   - Complete endpoint documentation
7. **Project Structure**
8. **Architecture Decisions**
9. **Contributing**

#### 5.2 Code Quality

- Add JSDoc comments
- Follow TypeScript best practices
- Consistent code formatting (Prettier)
- Linting (ESLint)

---

## Testing Strategy

### Backend Testing

- Unit tests for services
- Integration tests for controllers
- Database tests

### Frontend Testing

- Component tests
- E2E tests (optional)
- Visual regression tests (status badges)

### Manual Testing Checklist

- [ ] Submit new permit application
- [ ] View all permits on home page
- [ ] Status colors are distinct and clear
- [ ] RTL layout works correctly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Form validation works
- [ ] Error messages display properly
- [ ] Loading states work

---

## Deployment Considerations

### Development Environment

- Local PostgreSQL (Docker)
- Backend: `localhost:3001`
- Frontend: `localhost:3000`

### Production Considerations

- Environment variables for production
- Database connection pooling
- CORS configuration
- Error logging
- Security headers
- Rate limiting (optional)

---

## Key Implementation Notes

### Critical Requirements

1. ✅ All API calls must go through Nuxt Server Routes
2. ✅ Use `app/` directory structure in Nuxt 4
3. ✅ Use `useAsyncData` or `useFetch` for data fetching
4. ✅ Saudi National Design System for UI
5. ✅ RTL support and responsiveness
6. ✅ PostgreSQL as database
7. ✅ REST API with DTOs in NestJS

### Design System Integration

- Reference: https://design.dga.gov.sa/
- Figma: https://www.figma.com/@sdga
- Ensure components follow SNDS guidelines
- Test RTL thoroughly

### API Gateway Pattern

- Never call backend directly from frontend
- All requests: Frontend → Nuxt Server Route → Backend
- Server Routes handle authentication, error handling, data transformation

---

## Resources

- Saudi National Design System: https://design.dga.gov.sa/
- DGA Figma Profile: https://www.figma.com/@sdga
- Nuxt 4 Documentation: https://nuxt.com/docs/4.x/getting-started/introduction
- NestJS Documentation: https://docs.nestjs.com/
- Strapi 5 Documentation: https://docs.strapi.io/
