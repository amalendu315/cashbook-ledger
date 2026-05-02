import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Extending NextAuth types to recognize our custom RBAC fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      companyIds: string[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    companyIds: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    companyIds: string[];
  }
}
