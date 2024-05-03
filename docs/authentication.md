# How Authentication Works

Authentication is provided by [Clerk](https://clerk.com), which handles the creation and management of users.

## Cost

We are well within the free-tier of Clerk (~10k monthly active users). There are several pro features, such as removing branding and limiting sign-ups to `@mnsu.edu` emails. We decided not to opt for these features this semester.

## Getting information

There are two ways we can interact with Clerk.

1. The Next.js package (@clerk/nextjs)
2. The backend api (@clerk/backend)

We use **#1** to quickly get user information and verifying authentication.
Method **#2** uses [Clerk's Backend API](https://clerk.com/docs/reference/backend-api) in order to get information on all users through an API.

## TODO here
- [ ] Additional work can be used to hook in the role system into Clerk. This might be able to be replaced with the organizations/roles in Clerk