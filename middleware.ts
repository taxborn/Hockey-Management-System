import { authMiddleware } from "@clerk/nextjs";
import { routeModule } from "next/dist/build/templates/app-page";
import { userAgent } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
