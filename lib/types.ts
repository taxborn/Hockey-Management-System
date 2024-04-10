// We'll define a custom user type that only has the properties we need
type CustomUser = {
  clerkId: string;
  role: string;
  name: string;
  emailAddress: string;
  lastSignIn: number | null;
};
