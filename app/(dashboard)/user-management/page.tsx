"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Building2,
  Shield,
  Mail,
  KeySquare,
  EyeOff,
  Eye,
} from "lucide-react";
import { PageHeader } from "@/components/reusable/page-header";
import { DataTableShell } from "@/components/reusable/data-table-shell";
import { MultiSelect } from "@/components/forms/multi-select";
import {
  getUserMasterData,
  saveUser,
  deleteUser,
} from "@/app/actions/master/user";

export default function UserManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Data State
    const [users, setUsers] = useState<any[]>([]);
    const [companyOptions, setCompanyOptions] = useState<any[]>([]);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("USER");
    const [status, setStatus] = useState("Active");
    const [password, setPassword] = useState("");
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

    // Load Data on Mount
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      setIsLoading(true);
      const data = await getUserMasterData();
      if (data.success) {
        setUsers(data.users);
        setCompanyOptions(
          data.companies.map((c: any) => ({ label: c.name, value: c.id })),
        );
      }
      setIsLoading(false);
    };

    const openNewModal = () => {
      setEditingId(null);
      setName("");
      setEmail("");
      setRole("USER");
      setStatus("Active");
      setPassword("");
      setSelectedCompanies([]);
      setShowPassword(false);
      setIsModalOpen(true);
    };

    const openEditModal = (user: any) => {
      setEditingId(user.id);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
      setPassword(""); // Leave blank so we don't accidentally overwrite it unless typed
      // Handle ADMIN global mappings gracefully
      if (user.role === "ADMIN") {
        setSelectedCompanies([]);
      } else {
        setSelectedCompanies(user.mappedCompanies.map((c: any) => c.id));
      }
      setShowPassword(false);
      setIsModalOpen(true);
    };

    const generatePassword = () => {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      let newPassword = "";
      for (let i = 0; i < 10; i++) {
        newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setPassword(newPassword);
      setShowPassword(true); // Show it so admin can copy it
    };

    const handleSave = async () => {
      if (!name.trim() || !email.trim())
        return alert("Name and Email are required.");
      if (!editingId && !password)
        return alert("A password is required for new users.");

      setIsSaving(true);
      const result = await saveUser(
        editingId,
        name,
        email,
        role,
        status,
        password,
        role === "ADMIN" ? [] : selectedCompanies, // Admins don't need mappings saved
      );

      if (result.success) {
        await fetchData();
        setIsModalOpen(false);
      } else {
        alert("Error saving user: " + result.error);
      }
      setIsSaving(false);
    };

    const handleDelete = async (id: string) => {
      if (!confirm("Are you sure you want to permanently delete this user?"))
        return;

      const result = await deleteUser(id);
      if (result.success) {
        await fetchData();
      } else {
        alert("Error deleting user: " + result.error);
      }
    };

    const getRoleBadge = (roleStr: string) => {
      switch (roleStr) {
        case "ADMIN":
          return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
              <Shield className="h-3 w-3 mr-1" /> System Admin
            </span>
          );
        case "MANAGER":
          return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
              Manager
            </span>
          );
        case "SUBADMIN":
          return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
              Sub-Admin
            </span>
          );
        default:
          return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Standard User
            </span>
          );
      }
    };

    return (
      <div className="space-y-6">
        <PageHeader
          title="User Management"
          description="Manage system users, their roles, and property access permissions securely."
          icon={Users}
          actionButton={
            <button
              onClick={openNewModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:shadow-blue-600/20"
            >
              <Plus className="h-4 w-4" /> Add User
            </button>
          }
        />

        <DataTableShell title="System Users">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 w-1/3">User Details</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Property Access</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 w-24 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-slate-500 font-medium"
                >
                  Loading records...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-slate-500 font-medium"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center mt-0.5">
                          <Mail className="h-3 w-3 mr-1" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {user.mappedCompanies.length === 0 ? (
                        <span className="text-xs font-semibold text-slate-400 italic">
                          No access granted
                        </span>
                      ) : (
                        user.mappedCompanies.map((comp: any, i: number) => (
                          <span
                            key={i}
                            className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-bold ${
                              comp.id === "ALL"
                                ? "bg-purple-100 text-purple-700 border border-purple-200"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {comp.id !== "ALL" && (
                              <Building2 className="h-3 w-3 text-slate-400 mr-1" />
                            )}
                            {comp.name}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-colors shadow-sm"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 rounded-lg transition-colors shadow-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </DataTableShell>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />{" "}
                  {editingId ? "Edit User Account" : "New User Account"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 font-bold text-xl"
                >
                  &times;
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      placeholder="e.g. rahul@udaan.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Account Role <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                        if (e.target.value === "ADMIN")
                          setSelectedCompanies([]); // Reset selections if admin
                      }}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
                    >
                      <option value="USER">Standard User</option>
                      <option value="MANAGER">Manager (Approvals)</option>
                      <option value="SUBADMIN">Sub-Admin</option>
                      <option value="ADMIN">System Administrator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Account Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive (Disabled)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Assign Property Access{" "}
                    {role !== "ADMIN" && (
                      <span className="text-rose-500">*</span>
                    )}
                  </label>
                  <MultiSelect
                    options={companyOptions}
                    selectedValues={selectedCompanies}
                    onChange={setSelectedCompanies}
                    placeholder={
                      role === "ADMIN"
                        ? "Admins automatically have global access."
                        : "Select properties the user can access..."
                    }
                    emptyText="No properties found."
                    disabled={role === "ADMIN"}
                  />
                  <p className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-1">
                    <Shield className="h-3 w-3" /> System Administrators bypass
                    this limit and can access all properties automatically.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 mt-2 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <KeySquare className="h-4 w-4" /> Authentication
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {editingId
                          ? "Generate a new password to reset the user's access."
                          : "Generate a secure temporary password for the new account."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm"
                    >
                      Generate Password
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        editingId
                          ? "Leave blank to keep current password"
                          : "Type or generate a password"
                      }
                      className="w-full px-4 py-2.5 pr-10 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70"
                >
                  {isSaving ? "Saving..." : "Save User"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
