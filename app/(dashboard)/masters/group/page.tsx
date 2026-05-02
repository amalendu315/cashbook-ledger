"use client";

import { useState, useEffect } from "react";
import { FolderTree, Plus, Edit, Trash2, Building2 } from "lucide-react";
import { PageHeader } from "@/components/reusable/page-header";
import { DataTableShell } from "@/components/reusable/data-table-shell";
import {
  getGroupMasterData,
  saveGroup,
  deleteGroup,
} from "@/app/actions/master/group";


export default function GroupMasterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Data State
  const [groups, setGroups] = useState<any[]>([]);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("");

  // Load Data on Mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getGroupMasterData();
    if (data.success) {
      setGroups(data.groups);
    }
    setIsLoading(false);
  };

  const openNewModal = () => {
    setEditingId(null);
    setGroupName("");
    setIsModalOpen(true);
  };

  const openEditModal = (group: any) => {
    setEditingId(group.id);
    setGroupName(group.name);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!groupName.trim()) return alert("Group Name is required.");

    setIsSaving(true);
    const result = await saveGroup(editingId, groupName);
    if (result.success) {
      await fetchData(); // Refresh grid
      setIsModalOpen(false);
    } else {
      alert("Error saving group: " + result.error);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this Group?")) return;

    const result = await deleteGroup(id);
    if (result.success) {
      await fetchData();
    } else {
      alert("Error deleting group: " + result.error);
    }
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen">
      <PageHeader
        title="Manage Hotel Groups"
        description="Create and configure groups to consolidate financial reporting across multiple properties."
        icon={FolderTree}
        actionButton={
          <button
            onClick={openNewModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:shadow-blue-600/20"
          >
            <Plus className="h-4 w-4" /> Create Group
          </button>
        }
      />

      <DataTableShell
        title="Existing Groups"
        searchPlaceholder="Search groups..."
      >
        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 w-20">No.</th>
            <th className="px-6 py-4 w-1/3">Group Name</th>
            <th className="px-6 py-4 w-24 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {isLoading ? (
            <tr>
              <td
                colSpan={4}
                className="text-center py-8 text-slate-500 font-medium"
              >
                Loading records...
              </td>
            </tr>
          ) : groups.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="text-center py-8 text-slate-500 font-medium"
              >
                No groups found. Create one above!
              </td>
            </tr>
          ) : (
            groups.map((group, index) => (
              <tr
                key={group.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-slate-400">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-bold text-slate-900 text-base">
                  {group.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openEditModal(group)}
                      className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-colors shadow-sm"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(group.id)}
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

      {/* Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FolderTree className="h-5 w-5 text-blue-600" />{" "}
                {editingId
                  ? "Edit Group Configuration"
                  : "New Group Configuration"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Group Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  placeholder="e.g. North Bengal Premium Properties"
                />
              </div>

              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex gap-3">
                <div className="mt-0.5">
                  <FolderTree className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-blue-800 leading-relaxed font-medium">
                  You can now safely assign Companies to this Group directly
                  from the <strong>Company Master</strong> page during property
                  creation.
                </p>
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
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 flex items-center"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
