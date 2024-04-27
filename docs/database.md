# Database

For the database, we use 2 main technologies:

1. [Turso](https://turso.tech)
2. [Prisma](https://prisma.io)

## Running the migrations

Before the application can run, you need to run the migrations. You need to setup turso locally and identify the database you will be signing in to.

`turso db shell goalguardian < ./prisma/migrations/000000000000_squashed_migrations/migration.sql `

`turso db shell goalguardian < ./prisma/migrations/20240410041118_add_chats/migration.sql `

Then, log into the database using `turso db shell goalguardian`. From there, you will need to manually create 3 roles for the application to work. Execute the following SQL from the CLI: `INSERT INTO Roles ("Name") VALUES ("Admin"), ("Staff"), ("Player");`