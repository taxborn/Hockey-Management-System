# Goal Guardian

tbd.

#### Tech used

See [USES.md](./USES.md)

## Getting Started

First, you will need credentials from [clerk.com](https://clerk.com), the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
and the `CLERK_SECRET_KEY`. Copy the file `.env.example` to `.env.local`, and fill it in with the credentials
from the **API Keys** section of your Clerk application.

Then, you can install the packages using the command in your terminal:

```bash
npm i # or npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Currently, we use [Vercel](https://vercel.com) to deploy.

If you want to host it on an alternative platform, it is a bit more difficult. There is work on [sst.dev](https://sst.dev/) and [OpenNext](https://open-next.js.org/). You are _technically_ able to host it anywhere, but you lose out on some benefits of serverless functions, server-side rendering, etc. We should do more analysis on exactly what can and cannot be done with this application in this regard if a user does not want to deploy to Vercel.

## Design decisions

To keep the folder structure clean, we opted to put components into a [private folder](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders), called **app/\_components**. This makes it somewhat obvious that it is not a part of the routing system, which the **app** folder is used for _(see: [Next.js routing fundamentals](https://nextjs.org/docs/app/building-your-application/routing))_.

## Credits

This project was started by another project group from [MNSU's Computer Science Program](). Their work can be found on GitHub: [Cole-Harp/MNSU-Hockey-Management-App](https://github.com/Cole-Harp/MNSU-Hockey-Management-App).
