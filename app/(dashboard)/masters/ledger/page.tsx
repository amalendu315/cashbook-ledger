"use client";

import { useState, useEffect } from "react";
import { BookOpen, Plus, Edit, Trash2, Building2, FolderTree, IndianRupee } from "lucide-react";
import { PageHeader } from "@/components/reusable/page-header";
import { DataTableShell } from "@/components/reusable/data-table-shell";
import { MultiSelect } from "@/components/forms/multi-select";
import { getLedgerMasterData, saveLedger, deleteLedger } from "@/app/actions/master/ledger";


export default function LedgerMasterPage() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(true);
 const [isSaving, setIsSaving] = useState(false);

 // Data State
 const [ledgers, setLedgers] = useState<any[]>([]);
 const [companyOptions, setCompanyOptions] = useState<
   { label: string; value: string }[]
 >([]);
 const [groups, setGroups] = useState<{ label: string; value: string }[]>([]);

 // Form State
 const [editingId, setEditingId] = useState<string | null>(null);
 const [ledgerName, setLedgerName] = useState("");
 const [ledgerDetails, setLedgerDetails] = useState("");
 const [status, setStatus] = useState("Active");
 const [selectedGroupId, setSelectedGroupId] = useState<string>("");
 const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

 // New State for Opening Balances
 const [openingBalance, setOpeningBalance] = useState("0");
 const [openingBalanceType, setOpeningBalanceType] = useState("Dr");

 // Load Data on Mount
 useEffect(() => {
   fetchData();
 }, []);

 const fetchData = async () => {
   setIsLoading(true);
   const data = await getLedgerMasterData();
   if (data.success) {
     setLedgers(data.ledgers);
     setCompanyOptions(
       data.companies.map((c: any) => ({ label: c.name, value: c.id })),
     );
     setGroups(data.groups.map((g: any) => ({ label: g.name, value: g.id })));
   }
   setIsLoading(false);
 };

 const openNewModal = () => {
   setEditingId(null);
   setLedgerName("");
   setLedgerDetails("");
   setStatus("Active");
   setSelectedGroupId("");
   setSelectedCompanies([]);
   setOpeningBalance("0");
   setOpeningBalanceType("Dr");
   setIsModalOpen(true);
 };

 const openEditModal = (ledger: any) => {
   setEditingId(ledger.id);
   setLedgerName(ledger.name);
   setLedgerDetails(ledger.details || "");
   setStatus(ledger.status);
   setSelectedGroupId(ledger.group?.id || "");
   setSelectedCompanies(ledger.mappedCompanies.map((c: any) => c.id));
   setOpeningBalance(ledger.openingBalance?.toString() || "0");
   setOpeningBalanceType(ledger.openingBalanceType || "Dr");
   setIsModalOpen(true);
 };

 const handleSave = async () => {
   if (!ledgerName.trim()) return alert("Ledger Name is required.");
   if (!selectedGroupId)
     return alert("A Group assignment is mandatory for Ledgers.");

   const parsedBalance = parseFloat(openingBalance);
   if (isNaN(parsedBalance))
     return alert("Please enter a valid Opening Balance.");

   setIsSaving(true);
   const result = await saveLedger(
     editingId,
     ledgerName,
     ledgerDetails,
     status,
     selectedGroupId,
     selectedCompanies,
     parsedBalance,
     openingBalanceType,
   );

   if (result.success) {
     await fetchData();
     setIsModalOpen(false);
   } else {
     alert("Error saving ledger: " + result.error);
   }
   setIsSaving(false);
 };

 const handleDelete = async (id: string) => {
   if (!confirm("Are you sure you want to permanently delete this Ledger?"))
     return;

   const result = await deleteLedger(id);
   if (result.success) {
     await fetchData();
   } else {
     alert("Error deleting ledger: " + result.error);
   }
 };

 return (
   <div className="space-y-6 bg-slate-50 min-h-screen">
     <PageHeader
       title="Ledger Master"
       description="Create accounting ledgers, assign them to a core group, and flexibly manage their property visibility."
       icon={BookOpen}
       actionButton={
         <button
           onClick={openNewModal}
           className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:shadow-blue-600/20"
         >
           <Plus className="h-4 w-4" /> Add Ledger
         </button>
       }
     />

     <DataTableShell
       title="Registered Ledgers"
       searchPlaceholder="Search ledgers by name..."
     >
       <div className="overflow-x-auto">
         <table className="w-full text-left border-collapse">
           <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
             <tr>
               <th className="px-6 py-4 w-1/5">Ledger Name</th>
               <th className="px-6 py-4 w-1/6">Group</th>
               <th className="px-6 py-4 text-right">Open Balance</th>
               <th className="px-6 py-4">Assigned Visibility</th>
               <th className="px-6 py-4 text-center">Status</th>
               <th className="px-6 py-4 w-24 text-center">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100 bg-white">
             {isLoading ? (
               <tr>
                 <td
                   colSpan={6}
                   className="text-center py-8 text-slate-500 font-medium"
                 >
                   Loading records...
                 </td>
               </tr>
             ) : ledgers.length === 0 ? (
               <tr>
                 <td
                   colSpan={6}
                   className="text-center py-8 text-slate-500 font-medium"
                 >
                   No ledgers found. Create one above!
                 </td>
               </tr>
             ) : (
               ledgers.map((ledger) => (
                 <tr
                   key={ledger.id}
                   className="hover:bg-slate-50 transition-colors"
                 >
                   <td className="px-6 py-4">
                     <div className="font-bold text-slate-900">
                       {ledger.name}
                     </div>
                     <div className="text-[10px] text-slate-400 font-mono mt-0.5 tracking-wider">
                       {ledger.id}
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     {ledger.group ? (
                       <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-100 shadow-sm">
                         <FolderTree className="h-3 w-3 mr-1.5" />
                         {ledger.group.name}
                       </span>
                     ) : (
                       <span className="text-xs text-rose-500 font-medium">
                         Unassigned
                       </span>
                     )}
                   </td>
                   <td className="px-6 py-4 text-right">
                     <div className="font-extrabold text-slate-700">
                       ₹{" "}
                       {Number(ledger.openingBalance).toLocaleString("en-IN", {
                         minimumFractionDigits: 2,
                       })}
                     </div>
                     <div
                       className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${ledger.openingBalanceType === "Cr" ? "text-rose-500" : "text-emerald-500"}`}
                     >
                       {ledger.openingBalanceType === "Cr" ? "Credit" : "Debit"}
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex flex-wrap gap-1.5">
                       {ledger.mappedCompanies.length === 0 ? (
                         <span className="inline-flex items-center px-2 py-1 rounded text-[11px] font-bold bg-blue-100 text-blue-700">
                           All Companies (Global)
                         </span>
                       ) : (
                         ledger.mappedCompanies.map((comp: any, i: number) => (
                           <span
                             key={i}
                             className="inline-flex items-center px-2 py-1 rounded text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200 shadow-sm"
                           >
                             <Building2 className="h-3 w-3 text-slate-400 mr-1" />
                             {comp.name}
                           </span>
                         ))
                       )}
                     </div>
                   </td>
                   <td className="px-6 py-4 text-center">
                     <span
                       className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                         ledger.status === "Active"
                           ? "bg-emerald-100 text-emerald-700"
                           : "bg-slate-100 text-slate-500"
                       }`}
                     >
                       {ledger.status}
                     </span>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex justify-center gap-2">
                       <button
                         onClick={() => openEditModal(ledger)}
                         className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-colors shadow-sm"
                       >
                         <Edit className="h-4 w-4" />
                       </button>
                       <button
                         onClick={() => handleDelete(ledger.id)}
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
         </table>
       </div>
     </DataTableShell>

     {/* Add/Edit Modal */}
     {isModalOpen && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
         <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
           <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
               <BookOpen className="h-5 w-5 text-blue-600" />{" "}
               {editingId
                 ? "Manage Ledger Configuration"
                 : "New Ledger Configuration"}
             </h2>
             <button
               onClick={() => setIsModalOpen(false)}
               className="text-slate-400 hover:text-slate-700 font-bold text-xl"
             >
               &times;
             </button>
           </div>

           <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">
                   Ledger Name <span className="text-rose-500">*</span>
                 </label>
                 <input
                   type="text"
                   value={ledgerName}
                   onChange={(e) => setLedgerName(e.target.value)}
                   className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                   placeholder="e.g. Room Revenue"
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">
                   Status <span className="text-rose-500">*</span>
                 </label>
                 <select
                   value={status}
                   onChange={(e) => setStatus(e.target.value)}
                   className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
                 >
                   <option value="Active">Active</option>
                   <option value="Inactive">Inactive</option>
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">
                   Opening Balance (₹) <span className="text-rose-500">*</span>
                 </label>
                 <div className="relative">
                   <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <input
                     type="number"
                     value={openingBalance}
                     onChange={(e) => setOpeningBalance(e.target.value)}
                     className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-extrabold text-slate-800 text-lg"
                     placeholder="0.00"
                     step="0.01"
                   />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">
                   Balance Type <span className="text-rose-500">*</span>
                 </label>
                 <select
                   value={openingBalanceType}
                   onChange={(e) => setOpeningBalanceType(e.target.value)}
                   className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 cursor-pointer"
                 >
                   <option value="Dr">Dr. (Debit Balance)</option>
                   <option value="Cr">Cr. (Credit Balance)</option>
                 </select>
               </div>
             </div>

             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">
                 Parent Group <span className="text-rose-500">*</span>
               </label>
               <select
                 value={selectedGroupId}
                 onChange={(e) => setSelectedGroupId(e.target.value)}
                 className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
               >
                 <option value="" disabled>
                   -- Select a Group --
                 </option>
                 {groups.map((g: any) => (
                   <option key={g.value} value={g.value}>
                     {g.label}
                   </option>
                 ))}
               </select>
               <p className="text-xs text-slate-500 mt-2 font-medium">
                 A ledger must be consolidated under a specific Group for
                 reporting.
               </p>
             </div>

             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">
                 Company Visibility (Optional)
               </label>
               <MultiSelect
                 options={companyOptions}
                 selectedValues={selectedCompanies}
                 onChange={setSelectedCompanies}
                 placeholder="Select companies..."
                 emptyText="No companies found."
               />
               <p className="text-xs text-slate-500 mt-2 font-medium">
                 Leave empty to make this ledger globally available to all
                 properties within the Group.
               </p>
             </div>

             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">
                 Ledger Details (Optional)
               </label>
               <textarea
                 rows={3}
                 value={ledgerDetails}
                 onChange={(e) => setLedgerDetails(e.target.value)}
                 className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                 placeholder="Brief description of what this ledger is used for..."
               ></textarea>
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
               {isSaving ? "Saving..." : "Save Ledger"}
             </button>
           </div>
         </div>
       </div>
     )}
   </div>
 );
}
