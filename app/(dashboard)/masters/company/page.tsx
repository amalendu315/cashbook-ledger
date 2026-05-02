"use client";

import { useState, useEffect } from "react";
import { Building2, Plus, Edit, Trash2, FolderTree } from "lucide-react";
import {
  getCompanyMasterData,
  saveCompany,
  deleteCompany,
} from "@/app/actions/master/company";
import { PageHeader } from "@/components/reusable/page-header";
import { DataTableShell } from "@/components/reusable/data-table-shell";

export default function CompanyMasterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Data State
  const [companies, setCompanies] = useState<any[]>([]);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Load Data on Mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getCompanyMasterData();
    if (data.success) {
      setCompanies(data.companies);
    }
    setIsLoading(false);
  };

  const openNewModal = () => {
    setEditingId(null);
    setCompanyCode("");
    setCompanyName("");
    setIsModalOpen(true);
  };

  const openEditModal = (company: any) => {
    setEditingId(company.id);
    setCompanyCode(company.companyCode);
    setCompanyName(company.name);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!companyCode.trim() || !companyName.trim()) {
      return alert("Company Code and Name are required.");
    }

    setIsSaving(true);
    const result = await saveCompany(editingId, companyCode, companyName);

    if (result.success) {
      await fetchData(); // Refresh grid
      setIsModalOpen(false);
    } else {
      alert("Error saving company: " + result.error);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this Property?"))
      return;

    const result = await deleteCompany(id);
    if (result.success) {
      await fetchData();
    } else {
      alert("Error deleting company: " + result.error);
    }
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen">
      <PageHeader
        title="Company Master"
        description="Manage your individual hotel properties and their unique operational codes."
        icon={Building2}
        actionButton={
          <button
            onClick={openNewModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:shadow-blue-600/20"
          >
            <Plus className="h-4 w-4" /> Add Company
          </button>
        }
      />

      <DataTableShell title="Registered Companies">
        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
          <tr>
            <th className="px-6 py-4">Company Code</th>
            <th className="px-6 py-4">Property Name</th>
            <th className="px-6 py-4 w-24 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {isLoading ? (
            <tr>
              <td
                colSpan={3}
                className="text-center py-8 text-slate-500 font-medium"
              >
                Loading records...
              </td>
            </tr>
          ) : companies.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="text-center py-8 text-slate-500 font-medium"
              >
                No companies found. Create one above!
              </td>
            </tr>
          ) : (
            companies.map((company) => (
              <tr
                key={company.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="font-mono text-sm font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    {company.companyCode}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">
                  {company.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openEditModal(company)}
                      className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-colors shadow-sm"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />{" "}
                {editingId ? "Manage Company" : "New Company"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Company Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyCode}
                  onChange={(e) => setCompanyCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono uppercase"
                  placeholder="e.g. UDAAN-01"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  placeholder="e.g. Grand Udaan Hotel"
                />
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
                {isSaving ? "Saving..." : "Save Company"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}