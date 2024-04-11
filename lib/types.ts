// We'll define a custom user type that only has the properties we need
type CustomUser = {
  // ID from our database
  id: number;
  // Clerk ID from the Clerk user object
  clerkId: string;
  role: string;
  name: string;
  emailAddress: string;
  lastSignIn: number | null;
};
