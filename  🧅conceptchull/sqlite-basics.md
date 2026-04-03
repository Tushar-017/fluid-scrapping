## SQLite Basics

### "SQLite is a file based SQL database"

- SQLite stores the whole database in a single file
- In this project Prisma connects to it with:
  - `provider = "sqlite"`
  - `url = "file:./dev.db"`

### How Prisma uses SQLite

1. Define your models in `schema.prisma`
2. Prisma maps those models to SQLite tables
3. Prisma migrations update the database file structure
4. Prisma Client gives you typed queries from your Next.js server code

### Good mental model

- Prisma is the developer layer
- SQLite is the storage layer
- Your app code should talk to Prisma, not raw SQL by default
- Keep database logic in server actions, route handlers, or backend services

### Architectural thinking

- SQLite is best when your app has one main server process and simple relational data
- Think of it as a very good app database for local development, prototypes, internal tools, MVPs, and small products
- It is strong when setup should stay simple and cheap
- It is not designed like a heavy multi-user network database such as PostgreSQL

### Best for

- local development
- learning Prisma and SQL basics
- small apps with low to moderate traffic
- internal dashboards
- prototypes and MVPs
- apps where simple deployment matters more than database scale

### Avoid or rethink SQLite when

- many users will write data at the same time very often
- you need advanced concurrency and scaling
- your database must be shared across many app servers
- you need complex production operations like replication, heavy analytics, or strong multi-service DB workflows
- your product is already growing into a larger SaaS architecture

### Simple rule in your head

- Use SQLite when you want the easiest relational database setup
- Move to PostgreSQL when the app becomes more concurrent, shared, and production-heavy
