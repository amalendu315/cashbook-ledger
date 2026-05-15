import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Modern financial management and cashbook application",
  manifest: "/manifest.json", // For PWA
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}
    >
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Unique Partial Screen Gradient & Illustration */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
          {/* Vibrant Deep Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900"></div>

          {/* Decorative glassmorphism glowing blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>

          {/* Foreground Content container */}
          <div className="relative z-10 w-full max-w-xl px-12 flex flex-col items-center">
            {/* Custom Abstract Glassmorphism UI Illustration */}
            <div className="relative w-full max-w-md mx-auto mb-12">
              {/* Tilted background glass card */}
              <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl transform -rotate-6 scale-105"></div>

              {/* Main foreground glass card */}
              <div className="relative bg-linear-to-tr from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl p-6">
                {/* Mock Window Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="w-1/3 h-2 rounded-full bg-white/20"></div>
                </div>

                {/* Mock Metric Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="w-24 h-2 rounded-full bg-white/30 mb-3"></div>
                      <div className="text-4xl font-black text-white tracking-tight drop-shadow-sm">
                        ₹ 1.45M
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 text-xs font-bold shadow-inner">
                      + 12.5%
                    </div>
                  </div>

                  {/* Mock Bar Chart */}
                  <div className="h-32 w-full mt-6 flex items-end justify-between space-x-2">
                    {[40, 70, 45, 90, 65, 100, 85].map((height, i) => (
                      <div
                        key={i}
                        className="w-full bg-blue-400/10 rounded-t-sm relative group overflow-hidden"
                      >
                        <div
                          className="absolute bottom-0 w-full bg-linear-to-t from-blue-500 to-blue-400 rounded-t-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Success Badge */}
                <div className="absolute -right-8 -bottom-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white drop-shadow-sm">
                      Secure Sync
                    </div>
                    <div className="text-xs font-medium text-emerald-300">
                      Connected
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Subtitle */}
            {/* <div className="text-center mt-4">
              <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-white drop-shadow-lg">
                Enterprise Cashbook
              </h1>
              <p className="text-base text-blue-100/80 mx-auto leading-relaxed font-medium max-w-sm">
                Enterprise-grade financial management and seamless cashbook
                operations tailored for premium properties.
              </p>
            </div> */}
          </div>
        </div>

        {/* Right Side: Centered Login Card */}
        <div className="w-full lg:w-1/2 flex flex-col bg-slate-50">
          <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
            <div className="w-full max-w-md relative z-10">{children}</div>
          </div>
        </div>
      </div>

      {/* Footer attached at the bottom of the screen */}
      {/* <Footer /> */}
    </div>
  );
}
