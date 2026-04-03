### "Prisma is my data access tool"

### When to use Prisma ?

- your app has _structured data_
- you use _SQL database_
- you want _type-safe DB access_

### It only solves:

- data modeling
- database querying
- schema migrations

- So good architectural question in head should be
  —> _Dose this app need a relational database, and do I want a clean TypeScript way to access it?_

### Prisma setup mental model:

1.  Define models in Prisma schema.
2.  Generate migrations.
3.  Create shared `prisma` client.
4.  Use Prisma in server action, route handlers, or backend services.
5.  Keep the UI separate from the DB logic
