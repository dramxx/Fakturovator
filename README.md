# Fakturovator - Demo Application

A minimal, full-stack demo application showcasing clean architecture with .NET 8 Web API backend, React frontend, and PostgreSQL database.

## Project Structure

```
Fakturovator/
├── backend/
│   ├── Fakturovator.API/              # Main API project
│   │   ├── Controllers/               # API controllers
│   │   ├── Data/                      # DbContext & EF Core configuration
│   │   ├── DTOs/                      # Data Transfer Objects
│   │   ├── Migrations/                # EF Core Code-First migrations
│   │   ├── Models/                    # Domain entities
│   │   ├── appsettings.json           # Configuration
│   │   └── Program.cs                 # App bootstrap & DI configuration
│   └── Fakturovator.API.Tests/        # Unit tests
├── frontend/
│   ├── src/
│   │   ├── api/                       # TanStack Query hooks & API client
│   │   ├── store/                     # Redux store & slices
│   │   ├── App.jsx                    # Main application component
│   │   └── index.jsx                  # App entry with providers
│   ├── package.json
│   └── vitest.config.js               # Test configuration
└── Fakturovator.sln                   # Solution file
```

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or later)
- [PostgreSQL](https://www.postgresql.org/download/) (v14 or later)
- npm (comes with Node.js)

## Quick Start

### 1. Database Setup

The project uses **EF Core Code-First Migrations** for database schema management.

#### Initial Setup (First Time)

```bash
# Ensure PostgreSQL is running and create the database
psql -U postgres -c "CREATE DATABASE fakturovator;"

# Create the application user (or use postgres for local dev)
psql -U postgres -c "CREATE USER fakturovator_app WITH PASSWORD 'app_password123';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE fakturovator TO fakturovator_app;"

# Apply migrations to create tables
cd backend/Fakturovator.API
dotnet tool restore
dotnet tool run dotnet-ef database update
```

#### Migration Workflow

**Add a new migration after model changes:**
```bash
cd backend/Fakturovator.API
dotnet tool run dotnet-ef migrations add MigrationName --output-dir Migrations
```

**Apply pending migrations:**
```bash
dotnet tool run dotnet-ef database update
```

**Revert to previous migration:**
```bash
dotnet tool run dotnet-ef database update PreviousMigrationName
```

**Generate SQL script (for production deployment):**
```bash
dotnet tool run dotnet-ef migrations script
```

**What this does:**
- Uses EF Core Code-First Migrations for version-controlled schema changes
- Creates `demos` table with proper PostgreSQL types
- Tracks migration history in `__EFMigrationsHistory` table
- Supports incremental updates without data loss

### 2. Backend Setup

**Environment Configuration:**
```bash
cd backend/Fakturovator.API
cp .env.example .env
# Edit .env with your database credentials
```

**Run the application:**
```bash
dotnet restore
dotnet run
```

**API Endpoints:**
- API: `http://localhost:5000`
- Swagger UI: `http://localhost:5000/swagger`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**Frontend:** `http://localhost:5173`

---

## How This Works - Architecture Deep Dive

### Backend Architecture (.NET 8)

#### Minimal Architecture Pattern

We use a **simplified architecture** with direct database access:

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│      (Controllers - HTTP in/out)     │
├─────────────────────────────────────┤
│          Data Layer                 │
│  (DbContext - direct data access)   │
└─────────────────────────────────────┘
```

**Why this approach:**
- **Simplicity**: Direct DbContext usage for straightforward CRUD operations
- **Performance**: No unnecessary abstraction layers
- **Maintainability**: Easy to understand and modify
- **Perfect for demos**: Scales well when features are added later

#### Key Components

**DemoController**: Handles HTTP requests/responses
```csharp
[HttpGet]
public async Task<ActionResult<IEnumerable<Demo>>> GetDemos()
{
    var demos = await _context.Demos.OrderByDescending(d => d.CreatedAt).ToListAsync();
    return Ok(demos);
}
```

**ApplicationDbContext**: EF Core configuration
```csharp
public DbSet<Demo> Demos { get; set; }

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Demo>(entity =>
    {
        entity.ToTable("demos");
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Content).IsRequired();
        entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
    });
}
```

### Frontend Architecture (React 18)

#### 1. State Management Strategy

We use a **hybrid approach** - Redux for UI state, TanStack Query for server state:

```
┌────────────────────────────────────────┐
│           UI State (Redux)             │
│  - Form inputs                         │
│  - UI visibility flags                 │
│  - User preferences                    │
├────────────────────────────────────────┤
│         Server State (TanStack)        │
│  - API data (demos)                    │
│  - Loading states                      │
│  - Cache management                    │
└────────────────────────────────────────┘
```

**Why split state?**
- **Server state** (API data): Needs caching, synchronization, background updates
- **UI state** (form inputs): Needs predictable, synchronous updates

#### 2. Redux Toolkit (RTK)

**What is it?** The modern, official way to write Redux - less boilerplate, built-in best practices.

```javascript
// Slice combines actions + reducer
const demoSlice = createSlice({
  name: 'demo',
  initialState: { content: '' },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;  // Immer allows "mutating" syntax
    },
  },
});
```

**Why Redux Toolkit?**
- **Less Boilerplate**: No action constants, no switch statements
- **Immer Integration**: Write "mutating" code that produces immutable updates
- **DevTools**: Time-travel debugging out of the box
- **Predictable**: Single source of truth for UI state

**Implementation:** `frontend/src/store/`

#### 3. TanStack Query (React Query)

**What is it?** A data-fetching library that handles caching, synchronization, and server state management.

```javascript
// Custom hook for fetching demos
export const useDemos = () => {
  return useQuery({
    queryKey: ['demos'],           // Unique cache key
    queryFn: fetchDemos,           // Function to fetch data
    staleTime: 5 * 60 * 1000,      // Data fresh for 5 minutes
  });
};

// Mutation for creating demos
export const useCreateDemo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createDemo,
    onSuccess: () => {
      // Automatically refresh list after creation
      queryClient.invalidateQueries({ queryKey: ['demos'] });
    },
  });
};
```

**Why TanStack Query?**
- **Automatic Caching**: Data cached by query key
- **Background Refetching**: Stale data refreshed automatically
- **Loading States**: Built-in `isLoading`, `isPending` flags
- **Optimistic Updates**: UI updates before server confirms
- **Error Handling**: Centralized error management
- **No More useEffect**: No manual data fetching in components

**Implementation:** `frontend/src/api/demoApi.js`

#### 4. API Layer Pattern

**Architecture:** Centralized API layer separates HTTP concerns from components.

```javascript
// apiClient.js - Axios instance with defaults
const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// demoApi.js - TanStack Query hooks
export const useDemos = () => useQuery({...});
export const useCreateDemo = () => useMutation({...});
```

**Why this pattern?**
- **DRY**: API logic not duplicated across components
- **Testable**: Easy to mock API calls
- **Configurable**: Central place for auth headers, error handling
- **Type-safe**: Can add TypeScript interfaces here

### Database Design Decisions

#### PostgreSQL with EF Core

**Case Sensitivity Strategy:**
PostgreSQL lowercases unquoted identifiers. We use **PascalCase with quotes** in SQL to match C# conventions:

```sql
-- PostgreSQL creates lowercase by default
CREATE TABLE demos (
    "Id" UUID PRIMARY KEY,      -- Quoted = preserves case
    "Content" TEXT NOT NULL,   -- Matches C# property names
    "CreatedAt" TIMESTAMP
);
```

**Why this matters:** EF Core expects PascalCase property names to match database columns exactly.

#### User Privilege Separation

```sql
-- Application user with limited permissions
CREATE USER fakturovator_app WITH PASSWORD 'app_password123';
GRANT ALL PRIVILEGES ON TABLE demos TO fakturovator_app;
```

**Security principle:** Application uses dedicated user (not postgres superuser), limiting blast radius if credentials leak.

---

## Current Features

### Backend
- **Minimal API** - Direct DbContext usage
- **Entity Framework Core** - PostgreSQL with proper mapping
- **CORS** - Configured for local development
- **Swagger/OpenAPI** - Auto-generated API docs
- **Code-First Migrations** - Version-controlled schema

### Frontend
- **Redux Toolkit** - Modern Redux with less boilerplate
- **TanStack Query** - Server state management with caching
- **API Layer** - Centralized HTTP with Axios
- **Material-UI** - Professional component library
- **Component Architecture** - Separation of concerns
- **Unit Testing** - Vitest + React Testing Library

### Database
- **PostgreSQL** - Robust relational database
- **Single Table** - `demos` table with Id, Content, CreatedAt
- **Migration Support** - Version-controlled schema changes

---

## API Endpoints

### Demo CRUD Operations

| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/demo` | Get all demos (ordered by creation date) |
| POST | `/api/demo` | Create new demo |
| DELETE | `/api/demo/{id}` | Delete demo by ID |

### Request/Response Examples

**GET /api/demo**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "content": "Sample demo content",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

**POST /api/demo**
```json
// Request
{
  "content": "New demo content"
}

// Response (201 Created)
{
  "id": "456e7890-e89b-12d3-a456-426614174001",
  "content": "New demo content",
  "createdAt": "2024-01-15T10:35:00Z"
}
```

---

## Testing

### Backend Tests

```bash
cd backend/Fakturovator.API.Tests
dotnet test
```

**Architecture:**
- Uses **Moq** to mock service layer (true unit tests, no database)
- Tests controller behavior, not implementation details

### Frontend Tests

```bash
cd frontend
npm run test          # Watch mode
npm run test:run      # Single run
npm run test:ui       # Visual test runner
```

---

## Best Practices Analysis

### What We're Doing Right

1. **Separation of Concerns** - Each layer has single responsibility
2. **Dependency Inversion** - Interfaces allow swapping implementations
3. **DTO Pattern** - Entities never exposed to frontend
4. **Repository Abstraction** - Data access is testable/flexible
5. **Modern Frontend State** - Redux for UI, TanStack for server state
6. **Problem Details** - Standardized error format
7. **Database Security** - Separate app user with limited privileges
8. **Testability** - Mock-friendly architecture throughout

### Remaining TODOs for Production

#### High Priority
1. **Global Error Handling Middleware** - Catch unhandled exceptions
2. **Input Validation Middleware** - Validate at API boundary
3. **Logging & Observability** - Structured logging (Serilog), correlation IDs
4. **Health Checks** - `/health` endpoint for monitoring
5. **EF Core Migrations** - Replace init.sql with proper migration workflow
6. **Pagination** - For list endpoints (performance)
7. **API Versioning** - Support multiple API versions
8. **Rate Limiting** - Prevent abuse
9. **Authentication & Authorization** - JWT or OAuth2

#### Medium Priority
10. **Soft Deletes** - Mark deleted, don't remove data
11. **Audit Logging** - Who changed what and when
12. **Response Caching** - Cache frequently accessed data
13. **Request/Response Compression** - gzip/brotli
14. **Frontend Error Boundaries** - Graceful error handling
15. **Environment Variable Validation** - Fail fast on missing config
16. **Docker Compose** - One-command full stack startup
17. **CI/CD Pipeline** - GitHub Actions for build/test/deploy

#### Low Priority
18. **API Documentation** - Enhance Swagger with XML comments
19. **Localization** - Multi-language support
20. **Feature Flags** - Gradual rollout capability
21. **Analytics/Metrics** - Usage tracking, performance metrics

---

## Next Steps

Based on the best practices analysis, recommended implementation order:

### Phase 1: Foundation (Core Infrastructure)
1. Add global exception handling middleware with logging
2. Implement structured logging (Serilog) with correlation IDs
3. Add health checks endpoint (`/health`)
4. Set up EF Core Migrations workflow
5. Add input validation middleware (FluentValidation)

### Phase 2: Security & Performance
6. Implement JWT authentication
7. Add authorization policies
8. Implement pagination for all list endpoints
9. Add response caching
10. Configure rate limiting

### Phase 3: DevOps & Developer Experience
11. Create Docker Compose setup
12. Set up GitHub Actions CI/CD pipeline
13. Add environment variable validation
14. Implement soft deletes with audit logging
15. Add API versioning

### Phase 4: Features
16. Implement customer CRUD operations
17. Build invoice creation workflow
18. Add PDF generation for invoices
19. Create reporting dashboard
20. Add search and filtering

---

## Troubleshooting

### Backend won't start
```bash
# Check if PostgreSQL is running
pg_isready

# Check if .env file exists and has correct credentials
cat .env

# Ensure fakturovator_app user exists and has permissions
psql -U postgres -c "\du"
```

### Frontend shows API errors
```bash
# Ensure backend is running on port 5000
# Check CORS configuration in Program.cs matches frontend URL
```

### Database issues
```bash
# Reset database (WARNING: destroys data)
cd backend/Fakturovator.API
dotnet ef database drop
dotnet ef database update

# If connection issues persist, verify .env file has correct database credentials
# The .env file should contain: DB_CONNECTION_STRING=Host=localhost;Database=fakturovator;Username=fakturovator_app;Password=app_password123
```

---

## License

MIT License - feel free to use this as a learning resource or starting point for your own projects.
