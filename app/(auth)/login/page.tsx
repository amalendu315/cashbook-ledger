"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        name,
        password,
        redirect: false, // Prevent NextAuth from automatically refreshing the page
      });

      if (res?.error) {
        setErrorMsg("Invalid email or password. Please try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100">
      <div className="flex flex-col items-center mb-8">
        <div className="h-14 w-14 bg-blue-50 flex items-center justify-center rounded-xl mb-4 border border-blue-100">
          <Building2 className="h-7 w-7 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome Back!</h2>
        <p className="text-sm text-slate-500 mt-2 text-center">
          Sign in to manage your company details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
            placeholder="Admin"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Forgot Password?
            </button>
          </div>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all disabled:opacity-70 flex justify-center items-center mt-2"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign In to Dashboard"
          )}
        </button>
      </form>
    </div>
  );
}
