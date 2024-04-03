import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";
import "./globals.css";
import { inter } from "@/app/_components/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Goal Guardian</title>
          {/* TODO: Generate an actual description */}
          <meta
            name="description"
            content="Goal Guardian is a hockey team management system"
          />
        </head>
        <body className="bg-purple-50 {`${inter.className} antialiased`}">
          <Navbar />
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
