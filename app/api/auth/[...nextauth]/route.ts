import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Fetch user and their property mappings from the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { companyAccess: true },
        });

        if (!user || !user.isActive || !user.passwordHash) {
          throw new Error("User not found or account disabled");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user object injected with RBAC permissions
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          // If Admin, grant access to everything, otherwise extract mapped IDs
          companyIds:
            user.role === "ADMIN"
              ? ["ALL"]
              : user.companyAccess.map((ca: any) => ca.companyId),
        };
      },
    }),
  ],
  callbacks: {
    // Inject custom claims into the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.companyIds = (user as any).companyIds;
      }
      return token;
    },
    // Make custom claims available on the client via useSession()
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
        (session.user as any).companyIds = token.companyIds;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
