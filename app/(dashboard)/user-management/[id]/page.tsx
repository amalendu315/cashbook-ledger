"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  UserCircle,
  Mail,
  Shield,
  Building2,
  Calendar,
  KeySquare,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle2,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { getUserDetails, adminResetPassword } from "@/app/actions/master/user";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const userId = resolvedParams.id;
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Security Module State
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    setIsLoading(true);
    const data = await getUserDetails(userId);
    if (data.success) {
      setUser(data.user);
    } else {
      alert("Error loading user: " + data.error);
    }
    setIsLoading(false);
  };

  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let generated = "";
    for (let i = 0; i < 12; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(generated);
    setShowPassword(true);
    setResetSuccess(false);
  };

  const handlePasswordReset = async () => {
    if (!newPassword || newPassword.length < 6) {
      return alert(
        "Please generate or type a password of at least 6 characters.",
      );
    }
    if (
      !confirm(
        "Are you sure you want to reset this user's password? They will be logged out of active sessions.",
      )
    ) {
      return;
    }

    setIsResetting(true);
    const result = await adminResetPassword(user.id, newPassword);

    if (result.success) {
      setResetSuccess(true);
      setNewPassword(""); // Clear memory
      setShowPassword(false);
    } else {
      alert("Reset failed: " + result.error);
    }
    setIsResetting(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-slate-500">
          Loading user profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="h-16 w-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">User Not Found</h2>
        <button
          onClick={() => router.push("/user-management")}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          &larr; Back to User Directory
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Premium Profile Header */}
      <div className="relative bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-8 overflow-hidden shadow-lg border border-slate-800">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <button
              onClick={() => router.push("/user-management")}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-black rounded-xl backdrop-blur-sm transition-all"
              title="Back to Users"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-800 to-indigo-800 flex items-center justify-center text-black text-2xl font-bold border-2 border-black/20 shadow-inner">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black tracking-tight flex items-center gap-3">
                {user.name}
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    user.status === "Active"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-500/30 text-slate-300 border border-slate-500/30"
                  }`}
                >
                  {user.status}
                </span>
              </h1>
              <p className="text-sm font-medium text-slate-300 mt-1 flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-blue-400" />
                {user.role} Access Level
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Identity & Access */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <UserCircle className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Identity Profile
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {user.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-fit">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {user.email}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    System Role
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-indigo-700">
                    {user.role}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Profile Created
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mapped Properties Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Building2 className="h-4 w-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Assigned Properties
                </h2>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">
                {user.mappedCompanies.length} Total
              </span>
            </div>

            {user.mappedCompanies.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <Building2 className="h-10 w-10 text-slate-200 mb-3" />
                <p className="text-sm font-medium text-slate-500">
                  No properties assigned to this user.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/80 text-slate-500 font-semibold text-xs border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3.5">Property Name</th>
                      <th className="px-6 py-3.5 text-right">Company Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {user.mappedCompanies.map((comp: any) => (
                      <tr
                        key={comp.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {comp.name}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center font-mono text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm">
                            {comp.companyCode}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Security */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
            <div className="px-6 py-4 border-b border-rose-100 bg-rose-50/50 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                <KeySquare className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-rose-900">
                Security Access
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-xs font-medium text-slate-500 leading-relaxed text-center">
                  For security reasons, existing passwords are irreversibly
                  hashed and cannot be viewed. Generate a new password below to
                  reset access.
                </p>
              </div>

              {resetSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-emerald-800 text-xs font-medium shadow-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <p>
                    Password successfully reset! Ensure you have securely shared
                    the new credential with the user before closing this page.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    New Password
                  </label>
                  <button
                    onClick={generatePassword}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md"
                  >
                    <RefreshCw className="h-3 w-3" /> Generate Secure
                  </button>
                </div>

                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setResetSuccess(false);
                    }}
                    placeholder="Type or generate..."
                    className="w-full px-4 py-3 pr-11 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-mono text-sm transition-all shadow-sm group-hover:border-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handlePasswordReset}
                  disabled={isResetting || newPassword.length < 6}
                  className="w-full py-2.5 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isResetting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Updating...
                    </>
                  ) : (
                    "Force Password Reset"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
