# The main framework

We use [Next.js](https://nextjs.org) due to it being the [recommended framework by React itself](https://react.dev/learn/start-a-new-react-project#nextjs-pages-router). There is also the added benefit of deploying to Vercel which makes deployments super simple,

# Database

The database is hosted on a MySQL database on [Planetscale](https://planetscale.com/). This is a very quick solution which keeps our database reads very quick (p99 usually under 10 milliseconds)

# Authentication

We use [clerk](https://clerk.com) to manage users, authentication, etc. We plan to also use this to manage groups, limiting
sign ups to `@mnsu.edu` emails, and more.

# Styling

For styling, we use [tailwindcss](https://www.tailwindcss.com), as it provides many sensible defaults and it is quick for us to create responsive UIs.
