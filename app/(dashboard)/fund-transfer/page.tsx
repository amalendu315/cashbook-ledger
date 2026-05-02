"use client";

import { useEffect, useState } from "react";
import {
  ArrowRightLeft,
  Plus,
  Edit,
  IndianRupee,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/reusable/page-header";
import { DataTableShell } from "@/components/reusable/data-table-shell";
import { TransactionFilterBox } from "@/components/reusable/transaction-filter";
import {
  getFundTransferData,
  saveFundTransfer,
  deleteTransaction,
} from "@/app/actions/fund-transfer";

export default function FundTransferPage() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(true);
 const [isSaving, setIsSaving] = useState(false);

 // Data State
 const [transfers, setTransfers] = useState<any[]>([]);
 const [userCompanies, setUserCompanies] = useState<any[]>([]);
 const [allCompanies, setAllCompanies] = useState<any[]>([]);

 // Form State
 const [editingId, setEditingId] = useState<string | null>(null);
 const [formData, setFormData] = useState({
   companyId: "", // Source
   destinationCompanyId: "", // Target
   amount: "",
   paymentMode: "Bank Transfer", // Default mode
   businessDate: new Date().toISOString().split("T")[0],
   remarks: "",
 });

 // Load Data on Mount
 useEffect(() => {
   fetchData();
 }, []);

 const fetchData = async () => {
   setIsLoading(true);
   const data = await getFundTransferData();
   if (data.success) {
     setTransfers(data.transactions);
     setUserCompanies(data.userCompanies);
     setAllCompanies(data.allCompanies);

     // Set default source hotel
     if (data.userCompanies.length > 0)
       setFormData((f) => ({ ...f, companyId: data.userCompanies[0].id }));
   }
   setIsLoading(false);
 };

 const handleInputChange = (
   e: React.ChangeEvent<
     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
   >,
 ) => {
   const { name, value } = e.target;
   setFormData((prev) => ({ ...prev, [name]: value }));
 };

 const openNewModal = () => {
   setEditingId(null);
   setFormData({
     companyId: userCompanies.length > 0 ? userCompanies[0].id : "",
     destinationCompanyId: "",
     amount: "",
     paymentMode: "Bank Transfer",
     businessDate: new Date().toISOString().split("T")[0],
     remarks: "",
   });
   setIsModalOpen(true);
 };

 const openEditModal = (transfer: any) => {
   setEditingId(transfer.id);
   setFormData({
     companyId: transfer.fromId,
     destinationCompanyId: transfer.toId,
     amount: transfer.amount.toString(),
     paymentMode: transfer.mode || "Bank Transfer",
     businessDate: transfer.bDate,
     remarks: transfer.note !== "-" ? transfer.note : "",
   });
   setIsModalOpen(true);
 };

 const handleSave = async () => {
   if (
     !formData.companyId ||
     !formData.destinationCompanyId ||
     !formData.amount ||
     !formData.paymentMode
   ) {
     return alert(
       "Please fill in all required fields (Source, Destination, Mode, and Amount).",
     );
   }
   if (formData.companyId === formData.destinationCompanyId) {
     return alert("Source and Destination properties cannot be the same.");
   }

   setIsSaving(true);
   const result = await saveFundTransfer({ id: editingId, ...formData });

   if (result.success) {
     await fetchData();
     setIsModalOpen(false);
   } else {
     alert("Error saving transaction: " + result.error);
   }
   setIsSaving(false);
 };

 const handleDelete = async (id: string) => {
   if (
     !confirm("Are you sure you want to permanently delete this fund transfer?")
   )
     return;

   const result = await deleteTransaction(id);
   if (result.success) {
     await fetchData();
   } else {
     alert("Error deleting: " + result.error);
   }
 };

 // Automatically calculate the sum of visible transfers
 const subTotal = transfers.reduce((sum, item) => sum + Number(item.amount), 0);

 // Helper to format dates for display
 const formatDateDisplay = (dateString: string) => {
   const [year, month, day] = dateString.split("-");
   return `${day}-${month}-${year}`;
 };

 return (
   <div className="space-y-6 bg-slate-50 min-h-screen">
     <PageHeader
       title="Fund Transfer Details"
       description="Safely record internal cash and bank movements between your properties."
       icon={ArrowRightLeft}
       actionButton={
         <button
           onClick={openNewModal}
           className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-bold hover:bg-amber-600 transition-all shadow-sm hover:shadow-md hover:shadow-amber-500/20"
         >
           <Plus className="h-4 w-4" /> New Transfer
         </button>
       }
     />

     {/* Fund Transfer doesn't need Payee or Booking ID filtering usually, just dates and source hotel */}
     <TransactionFilterBox showHotel={true} />

     <div className="flex justify-end px-6 mb-2 -mt-2">
       <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm flex items-center gap-3">
         <span className="text-sm font-bold text-slate-500 uppercase">
           Total Transferred:
         </span>
         <span className="text-lg font-extrabold text-amber-500">
           ₹ {subTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
         </span>
       </div>
     </div>

     <DataTableShell
       title="Transfers Grid"
       searchPlaceholder="Search records..."
     >
       <table className="w-full text-left border-collapse">
         <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
           <tr>
             <th className="px-5 py-4">Voucher No</th>
             <th className="px-5 py-4">Routing (From &rarr; To)</th>
             <th className="px-5 py-4 text-right">Amount (₹)</th>
             <th className="px-5 py-4">Mode</th>
             <th className="px-5 py-4">Date</th>
             <th className="px-5 py-4">Remarks</th>
             <th className="px-5 py-4 text-center">Action</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-slate-100 bg-white">
           {isLoading ? (
             <tr>
               <td
                 colSpan={7}
                 className="text-center py-8 text-slate-500 font-medium"
               >
                 Loading records...
               </td>
             </tr>
           ) : transfers.length === 0 ? (
             <tr>
               <td
                 colSpan={7}
                 className="text-center py-8 text-slate-500 font-medium"
               >
                 No fund transfers found.
               </td>
             </tr>
           ) : (
             transfers.map((item) => (
               <tr
                 key={item.id}
                 className="hover:bg-slate-50 transition-colors"
               >
                 <td className="px-5 py-3">
                   <div className="font-bold text-slate-900">
                     {item.voucherNo}
                   </div>
                 </td>
                 <td className="px-5 py-3">
                   <div className="flex items-center gap-2">
                     <span className="text-sm font-bold text-rose-600">
                       {item.from}
                     </span>
                     <ArrowRight className="h-4 w-4 text-slate-400" />
                     <span className="text-sm font-bold text-emerald-600">
                       {item.to}
                     </span>
                   </div>
                 </td>
                 <td className="px-5 py-3 text-right font-extrabold text-amber-500 text-base">
                   {Number(item.amount).toLocaleString("en-IN", {
                     minimumFractionDigits: 2,
                   })}
                 </td>
                 <td className="px-5 py-3">
                   <span
                     className={`inline-flex px-2 py-1 rounded text-xs font-bold ${item.mode === "Cash" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-blue-50 text-blue-700 border border-blue-100"}`}
                   >
                     {item.mode}
                   </span>
                 </td>
                 <td className="px-5 py-3 font-semibold text-slate-700 text-sm">
                   {formatDateDisplay(item.bDate)}
                 </td>
                 <td className="px-5 py-3">
                   <div
                     className="text-sm text-slate-700 font-medium truncate max-w-50"
                     title={item.note}
                   >
                     {item.note}
                   </div>
                   <div className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase">
                     User: {item.user}
                   </div>
                 </td>
                 <td className="px-5 py-3">
                   <div className="flex justify-center gap-2">
                     <button
                       onClick={() => openEditModal(item)}
                       className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-colors shadow-sm"
                       title="Edit"
                     >
                       <Edit className="h-4 w-4" />
                     </button>
                     <button
                       onClick={() => handleDelete(item.id)}
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
     </DataTableShell>

     {/* Entry Modal */}
     {isModalOpen && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
         <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
           <div className="p-5 border-b border-slate-100 bg-amber-50 flex justify-between items-center">
             <h2 className="text-lg font-bold text-amber-800 flex items-center gap-2">
               <ArrowRightLeft className="h-5 w-5 text-amber-600" />
               {editingId ? "Edit Fund Transfer" : "New Fund Transfer"}
             </h2>
             <button
               onClick={() => setIsModalOpen(false)}
               className="text-amber-800/60 hover:text-amber-900 font-bold text-xl"
             >
               &times;
             </button>
           </div>

           <div className="p-6 space-y-5">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               {/* Routing Logic */}
               <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
                 <label className="block text-sm font-bold text-rose-800 mb-2">
                   From Hotel (Source) <span className="text-rose-500">*</span>
                 </label>
                 <select
                   name="companyId"
                   value={formData.companyId}
                   onChange={handleInputChange}
                   className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 font-semibold outline-none text-rose-900"
                 >
                   <option value="">--- Select Source Hotel ---</option>
                   {userCompanies.map((c) => (
                     <option key={c.id} value={c.id}>
                       {c.name}
                     </option>
                   ))}
                 </select>
               </div>

               <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                 <label className="block text-sm font-bold text-emerald-800 mb-2">
                   To Hotel (Destination){" "}
                   <span className="text-rose-500">*</span>
                 </label>
                 <select
                   name="destinationCompanyId"
                   value={formData.destinationCompanyId}
                   onChange={handleInputChange}
                   className="w-full px-4 py-2.5 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold outline-none text-emerald-900"
                 >
                   <option value="">--- Select Dest Hotel ---</option>
                   {allCompanies.map((c) => (
                     <option key={c.id} value={c.id}>
                       {c.name}
                     </option>
                   ))}
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">
                   Transfer Mode <span className="text-rose-500">*</span>
                 </label>
                 <select
                   name="paymentMode"
                   value={formData.paymentMode}
                   onChange={handleInputChange}
                   className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 font-semibold cursor-pointer outline-none"
                 >
                   <option value="Bank Transfer">
                     Bank (IMPS/NEFT)
                   </option>
                   <option value="Cash"> Cash</option>
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">
                   Transfer Amount (₹) <span className="text-rose-500">*</span>
                 </label>
                 <div className="relative">
                   <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                   <input
                     type="number"
                     name="amount"
                     value={formData.amount}
                     onChange={handleInputChange}
                     placeholder="0.00"
                     step="0.01"
                     className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 font-extrabold text-amber-600 outline-none text-lg"
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">
                   Business Date <span className="text-rose-500">*</span>
                 </label>
                 <input
                   type="date"
                   name="businessDate"
                   value={formData.businessDate}
                   onChange={handleInputChange}
                   className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 font-semibold outline-none"
                 />
               </div>

               <div className="md:col-span-2">
                 <label className="block text-sm font-bold text-slate-700 mb-2">
                   Remarks / Note
                 </label>
                 <textarea
                   name="remarks"
                   value={formData.remarks}
                   onChange={handleInputChange}
                   rows={2}
                   placeholder="Why are funds being transferred?"
                   className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 font-semibold outline-none"
                 ></textarea>
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
               className="px-6 py-2.5 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-sm disabled:opacity-70"
             >
               {isSaving ? "Processing..." : "Process Transfer"}
             </button>
           </div>
         </div>
       </div>
     )}
   </div>
 );
}
