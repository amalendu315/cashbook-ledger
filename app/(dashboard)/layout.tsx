import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/components/providers/session-provider";

// Dynamic metadata configuration template for all nested dashboard pages
export const metadata: Metadata = {
  title: {
    template: "%s | Enterprise Cashbook",
    default: "Dashboard | Enterprise Cashbook",
  },
  description: "Enterprise Cashbook Dashboard and Masters Management",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden w-full relative">
          <TopNav />

          {/* Page Content & Footer Wrapper */}
          <main className="flex-1 overflow-y-auto flex flex-col">
            {/* REMOVED: max-w-7xl mx-auto to allow full width scaling */}
            <div className="flex-1 p-4 md:p-6 lg:p-8 w-full">{children}</div>

            {/* Dashboard Footer */}
            <Footer />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
