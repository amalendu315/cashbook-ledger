import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function RootPage() {
  // Check for an active session securely on the server
  const session = await getServerSession(authOptions);

  // Route intelligently based on authentication status
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
