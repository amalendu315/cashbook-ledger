"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import {
  getPaymentModes,
  savePaymentMode,
  deletePaymentMode,
} from "@/app/actions/master/payment-mode";

export default function PaymentModeMasterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Data State
  const [paymentModes, setPaymentModes] = useState<any[]>([]);
  const [companyOptions, setCompanyOptions] = useState<any[]>([]);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("CASH");
  const [isActive, setIsActive] = useState(true);
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);

  useEffect(() => {
    fetchPaymentModes();
  }, []);

  const fetchPaymentModes = async () => {
    setIsLoading(true);
    const res = await getPaymentModes();
    if (res.success) {
      setPaymentModes(res.data || []);
      setCompanyOptions(res.companies || []);
    } else {
      alert("Failed to load payment modes");
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setCategory("CASH");
    setIsActive(true);
    setSelectedCompanyIds([]);
    setIsModalOpen(false);
  };

  const handleEdit = (mode: any) => {
    setEditingId(mode.id);
    setName(mode.name);
    setCategory(mode.category);
    setIsActive(mode.isActive);
    setSelectedCompanyIds(mode.companyIds || []);
    setIsModalOpen(true);
  };

  const handleCompanyToggle = (companyId: string) => {
    setSelectedCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId],
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      id: editingId || undefined,
      name,
      category,
      isActive,
      companyIds: selectedCompanyIds, // Pass the selected mappings
    };

    const res = await savePaymentMode(payload);
    if (res.success) {
      await fetchPaymentModes();
      resetForm();
    } else {
      alert(res.error || "Failed to save payment mode.");
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this payment mode?")) {
      const res = await deletePaymentMode(id);
      if (res.success) {
        await fetchPaymentModes();
      } else {
        alert(res.error || "Failed to delete payment mode.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Payment Modes</h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage transaction payment methods and map them to specific
              companies.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm w-full md:w-auto justify-center"
        >
          <Plus className="h-4 w-4" /> Add Payment Mode
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Mode Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Assigned Companies</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    Loading payment modes...
                  </td>
                </tr>
              ) : paymentModes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    No payment modes found. Add one to get started.
                  </td>
                </tr>
              ) : (
                paymentModes.map((mode) => (
                  <tr
                    key={mode.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {mode.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          mode.category === "CASH"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {mode.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="font-semibold text-slate-600 truncate max-w-62.5"
                        title={mode.companyNames || "None"}
                      >
                        {mode.companyNames ? (
                          mode.companyIds.length === companyOptions.length ? (
                            "All Companies"
                          ) : (
                            mode.companyNames
                          )
                        ) : (
                          <span className="text-rose-500">Unassigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {mode.isActive ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-700 font-semibold text-xs">
                              Active
                            </span>
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-500 font-semibold text-xs">
                              Inactive
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(mode)}
                          className="p-2 text-slate-400 hover:text-indigo-600 bg-white border border-slate-200 hover:border-indigo-200 rounded-lg transition-colors shadow-sm"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(mode.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 rounded-lg transition-colors shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Payment Mode" : "New Payment Mode"}
              </h2>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl leading-none"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar"
            >
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Mode Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Physical Cash, NEFT, UPI"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Financial Category <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="CASH">CASH (Affects Cash Balance)</option>
                  <option value="BANK">BANK (Affects Bank Balance)</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1.5 font-medium leading-relaxed">
                  Important: This dictates which dashboard KPI this payment mode
                  impacts.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Company Assignment
                </label>
                <div className="border border-slate-200 rounded-lg bg-slate-50 p-3 max-h-48 overflow-y-auto space-y-2">
                  {companyOptions.map((company) => (
                    <label
                      key={company.id}
                      className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                        checked={selectedCompanyIds.includes(company.id)}
                        onChange={() => handleCompanyToggle(company.id)}
                      />
                      <span className="text-sm font-bold text-slate-700 select-none">
                        {company.name}
                      </span>
                    </label>
                  ))}
                  {companyOptions.length === 0 && (
                    <div className="text-xs text-slate-400 font-medium text-center py-2">
                      No companies found. Create a company first.
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[10px] text-slate-400 font-medium">
                    Select where this mode should be visible.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCompanyIds(
                        selectedCompanyIds.length === companyOptions.length
                          ? []
                          : companyOptions.map((c) => c.id),
                      )
                    }
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    {selectedCompanyIds.length === companyOptions.length
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                <span className="text-sm font-bold text-slate-700">
                  Active Status
                </span>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
                >
                  {isSaving
                    ? "Saving..."
                    : editingId
                      ? "Update Mode"
                      : "Create Mode"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
