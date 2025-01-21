# Performance Metrics Dashboard

A comprehensive dashboard for managing and visualizing performance test metrics, built with Next.js, DrizzleORM, and support for both PostgreSQL and SQLite databases.

## Features

- 📊 Interactive data visualization with sortable columns and pagination
- 🔍 Advanced search and filtering capabilities
- 📱 Fully responsive design for all screen sizes
- 🌓 Dark mode support with system preference detection
- 🔄 Real-time updates with optimistic UI
- 🚀 Server-side rendering for optimal performance
- 🛠 Complete RESTful API endpoints
- 💾 Database agnostic (supports both PostgreSQL and SQLite)
- 🔒 Type-safe database operations with DrizzleORM
- 🎨 Beautiful UI with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: DrizzleORM with PostgreSQL/SQLite support
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **State Management**: React Server Components + Client Hooks
- **API**: REST endpoints with Next.js Route Handlers

## Prerequisites

- Node.js 18.x or higher
- npm or bun package manager
- PostgreSQL (optional, if not using SQLite)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/senthilsweb/perf-metrics.git
cd perf-metrics
```

### 2. Install Dependencies

```shellscript
npm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

For SQLite:

```plaintext
DATABASE_URL=sqlite://./local.db
```

For PostgreSQL:

```plaintext
DATABASE_URL=postgres://user:password@localhost:5432/perf_metrics
```

### 4. Database Setup

#### Option A: SQLite Setup (Recommended for Development)

1. Initialize the SQLite database:


```shellscript
npx tsx scripts/init-sqlite.ts
```

This will:

- Create the SQLite database file
- Run migrations
- Seed the database with sample data


#### Option B: PostgreSQL Setup

1. Create a PostgreSQL database:


```shellscript
createdb perf_metrics
```

2. Generate and run migrations:


```shellscript
npx drizzle-kit push:pg
```

3. Seed the database:


```shellscript
npx tsx scripts/seed.ts
```

### 5. Start the Development Server

```shellscript
npm run dev
# or
bun dev
```

Visit `http://localhost:3000` to see the application.

## API Documentation

### Endpoints

#### GET /api/metrics

Get paginated metrics with optional filtering and sorting.

Query Parameters:

- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 5)
- `sort`: Column to sort by
- `order`: Sort order ('asc' or 'desc')
- `search`: Search term for filtering


#### POST /api/metrics/add

Add a new metric.

#### PUT /api/metrics/[id]

Update an existing metric.

#### DELETE /api/metrics/[id]

Delete a metric.

#### GET /api/health

Check API and database health.

## Project Structure

```plaintext
perf-metrics/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── metrics/           # Metrics page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── metrics/          # Metrics-specific components
├── lib/                   # Utility functions
│   └── db/               # Database configuration
├── scripts/              # Setup and utility scripts
└── drizzle/              # Database migrations
```

## Development

### Code Style

The project uses ESLint and Prettier for code formatting:

```shellscript
# Lint the project
npm run lint

# Format the code
npm run format
```

### Database Migrations

When making changes to the schema:

1. Update `lib/db/schema.ts`
2. Generate migrations:


```shellscript
# For SQLite
npx drizzle-kit generate:sqlite

# For PostgreSQL
npx drizzle-kit generate:pg
```

3. Run migrations:


```shellscript
npx tsx scripts/migrate.ts
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set the required environment variables
4. Deploy


### Docker Deployment

1. Build the image:


```shellscript
docker build -t perf-metrics .
```

2. Run the container:


```shellscript
docker-compose up -d
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**

1. Verify DATABASE_URL is correctly set
2. Ensure database server is running
3. Check network connectivity



2. **Migration Errors**

1. Delete the SQLite database file and try again
2. Ensure drizzle directory exists
3. Check migration files for syntax errors



3. **Build Errors**

1. Clear .next directory
2. Delete node_modules and reinstall dependencies
3. Verify Node.js version compatibility





### Debug Mode

Enable debug logging by setting:

```plaintext
DEBUG=true
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:

1. Check the [issues](https://github.com/senthilsweb/perf-metrics/issues) page
2. Create a new issue if your problem isn't already listed
3. Join our [Discord community](https://discord.gg/your-server)


## Acknowledgments

- [Next.js](https://nextjs.org/)
- [DrizzleORM](https://orm.drizzle.team/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

