# Goal Guardian

tbd.

## Getting Started

First, you will need credentials from [clerk.com](https://clerk.com), the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
and the `CLERK_SECRET_KEY`. Copy the file `.env.example` to `.env`, and fill it in with the credentials
from the **API Keys** section of your Clerk application.

Then, you can install the packages using the command in your terminal:

```bash
npm i # or npm install
```

Then, run the development server:

```bash
npm run dev
```

_npm, yarn, and pnpm may be used here, however was only tested with npm._

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design decisions

To keep the folder structure clean, we opted to put components into a [private folder](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders), called **app/\_components**. This makes it somewhat obvious that it is not a part of the routing system, which the **app** folder is used for _(see: [Next.js routing fundamentals](https://nextjs.org/docs/app/building-your-application/routing))_.

## Credits

This project was started by another project group from [MNSU's Computer Science Program](https://cset.mnsu.edu/cs). Their work can be found on GitHub: [Cole-Harp/MNSU-Hockey-Management-App](https://github.com/Cole-Harp/MNSU-Hockey-Management-App).
