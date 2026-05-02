"use client";

import { useEffect, useState } from "react";
import {
  FileBarChart,
  Search,
  Calendar,
  Filter,
  Wallet,
  PiggyBank,
  Eye,
  Printer,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  CreditCard,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/reusable/page-header";
import { DataTableShell } from "@/components/reusable/data-table-shell";
import { getLedgerReportData } from "@/app/actions/reports/ledger";

export default function LedgerReportPage() {
   const [isLoading, setIsLoading] = useState(true);
   const [isExporting, setIsExporting] = useState(false);
   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
   const [selectedTx, setSelectedTx] = useState<any>(null);

   // Tab State
   const [activeTab, setActiveTab] = useState<
     "overall" | "cash" | "bank" | "transfer"
   >("overall");

   // Filters
   const [selectedCompanyId, setSelectedCompanyId] = useState("");
   const [selectedLedgerId, setSelectedLedgerId] = useState("");
   const [fromDate, setFromDate] = useState(() => {
     const d = new Date();
     d.setDate(1);
     return d.toISOString().split("T")[0];
   });
   const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

   // Data
   const [companies, setCompanies] = useState<any[]>([]);
   const [ledgers, setLedgers] = useState<any[]>([]);
   const [openingBalance, setOpeningBalance] = useState(0);
   const [allTransactions, setAllTransactions] = useState<any[]>([]);

   useEffect(() => {
     fetchData();
   }, []);

   const fetchData = async () => {
     setIsLoading(true);
     const data = await getLedgerReportData(
       selectedCompanyId,
       selectedLedgerId,
       fromDate,
       toDate,
     );
     if (data.success) {
       if (companies.length === 0) setCompanies(data.companies);
       setLedgers(data.ledgers);
       setOpeningBalance(data.openingBalance);
       setAllTransactions(data.transactions || []);
     } else {
       alert("Error loading ledger: " + data.error);
     }
     setIsLoading(false);
   };

   const handleGenerate = () => {
     fetchData();
   };

   // 1. Calculate Running Balances on the UNFILTERED array to ensure mathematical accuracy
   let currentBalance = openingBalance;
   const transactionsWithBalance = allTransactions.map((entry) => {
     if (entry.flowType === "in") currentBalance += entry.amount;
     else currentBalance -= entry.amount;
     return { ...entry, runningBalance: currentBalance };
   });

   // 2. Filter the UI based on Active Tab
   const visibleEntries = transactionsWithBalance.filter((tx) => {
     if (activeTab === "cash")
       return tx.type === "CASH_RECEIPT" || tx.type === "CASH_PAYMENT";
     if (activeTab === "bank")
       return tx.type === "BANK_RECEIPT" || tx.type === "BANK_PAYMENT";
     if (activeTab === "transfer")
       return tx.type === "FUND_TRANSFER" || tx.type === "TRANSFER_IN";
     return true; // "overall" shows all
   });

   // 3. Calculate UI Flow Totals
   const totalIn = visibleEntries
     .filter((e) => e.flowType === "in")
     .reduce((acc, curr) => acc + curr.amount, 0);
   const totalOut = visibleEntries
     .filter((e) => e.flowType === "out")
     .reduce((acc, curr) => acc + curr.amount, 0);
   const periodFlow = totalIn - totalOut;
   const closingBalance =
     openingBalance + (activeTab === "overall" ? periodFlow : 0);

   const handleViewDetails = (tx: any) => {
     setSelectedTx(tx);
     setIsViewModalOpen(true);
   };

   const handlePrint = () => {
     window.print();
   };

   const handleExportCSV = () => {
     setIsExporting(true);
     try {
       let csvContent = "data:text/csv;charset=utf-8,";
       csvContent +=
         "Voucher No,Hotel,Date,Time,Category,Particulars,Mode,Amount In (INR),Amount Out (INR),Running Balance (INR),Processed By,Remarks\n";

       csvContent += `,-,-,-,OPENING BALANCE,-,-,-,-,${openingBalance},-,\n`;

       visibleEntries.forEach((row) => {
         const amtIn = row.flowType === "in" ? row.amount : "";
         const amtOut = row.flowType === "out" ? row.amount : "";

         const rowData = [
           `"${row.id}"`,
           `"${row.hotel}"`,
           row.date,
           row.time,
           row.category,
           `"${row.particulars}"`,
           `"${row.mode}"`,
           amtIn,
           amtOut,
           row.runningBalance,
           `"${row.user}"`,
           `"${row.note}"`,
         ];
         csvContent += rowData.join(",") + "\n";
       });

       csvContent += `\nGRAND TOTALS,,,,,,,${totalIn},${totalOut},,,\n`;
       if (activeTab === "overall") {
         csvContent += `CLOSING BALANCE,,,,,,,,,${closingBalance},,\n`;
       }

       const encodedUri = encodeURI(csvContent);
       const link = document.createElement("a");
       link.setAttribute("href", encodedUri);
       link.setAttribute(
         "download",
         `${activeTab.toUpperCase()}_Ledger_${fromDate}_to_${toDate}.csv`,
       );
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
     } catch (e) {
       alert("Failed to export CSV.");
     }
     setIsExporting(false);
   };

   const getTableTitle = () => {
     if (activeTab === "overall") return "Ledger Entries (All)";
     if (activeTab === "cash") return "Cash Ledger";
     if (activeTab === "bank") return "Bank Ledger";
     if (activeTab === "transfer") return "Fund Transfers";
     return "Ledger Entries";
   };

   return (
     <div className="space-y-6 print:m-0 print:p-0 bg-slate-50 min-h-screen">
       <PageHeader
         title="Day Cashbook Ledger"
         description="Comprehensive chronological statement of all financial transactions."
         icon={FileBarChart}
         actionButton={
           <button
             onClick={handleExportCSV}
             disabled={isExporting || isLoading}
             className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:shadow-blue-600/20 disabled:opacity-70"
           >
             <Download className="h-4 w-4" />{" "}
             {isExporting ? "Exporting..." : "Export Ledger"}
           </button>
         }
       />

       {/* Custom Report Filter */}
       <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
         <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-sm uppercase tracking-wider">
           <Filter className="h-4 w-4" /> Report Parameters
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
           <div className="lg:col-span-1">
             <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
               Property
             </label>
             <select
               value={selectedCompanyId}
               onChange={(e) => setSelectedCompanyId(e.target.value)}
               className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
             >
               <option value="">All Properties</option>
               {companies.map((c) => (
                 <option key={c.id} value={c.id}>
                   {c.name}
                 </option>
               ))}
             </select>
           </div>

           <div className="lg:col-span-1">
             <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
               Specific Ledger
             </label>
             <select
               value={selectedLedgerId}
               onChange={(e) => setSelectedLedgerId(e.target.value)}
               className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
             >
               <option value="">All Ledgers (Consolidated)</option>
               {ledgers.map((l) => (
                 <option key={l.id} value={l.id}>
                   {l.ledger_name}
                 </option>
               ))}
             </select>
           </div>

           <div className="lg:col-span-1">
             <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
               From Date
             </label>
             <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input
                 type="date"
                 value={fromDate}
                 onChange={(e) => setFromDate(e.target.value)}
                 className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
           </div>

           <div className="lg:col-span-1">
             <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
               To Date
             </label>
             <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input
                 type="date"
                 value={toDate}
                 onChange={(e) => setToDate(e.target.value)}
                 className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
           </div>

           <div className="lg:col-span-1 flex items-center justify-end h-10.5">
             <button
               onClick={handleGenerate}
               disabled={isLoading}
               className="w-full lg:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
             >
               <Search className="h-4 w-4" />{" "}
               {isLoading ? "Loading..." : "Load Ledger"}
             </button>
           </div>
         </div>
       </div>

       {/* Tabs Navigation (Placed right below the filters) */}
       <div className="flex flex-wrap gap-2 border-b border-slate-200 print:hidden mt-2">
         <button
           onClick={() => setActiveTab("overall")}
           className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === "overall" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
         >
           All Transactions
         </button>
         <button
           onClick={() => setActiveTab("cash")}
           className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === "cash" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
         >
           Cash Ledger
         </button>
         <button
           onClick={() => setActiveTab("bank")}
           className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === "bank" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
         >
           Bank Ledger
         </button>
         <button
           onClick={() => setActiveTab("transfer")}
           className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === "transfer" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
         >
           Fund Transfers
         </button>
       </div>

       {/* Print Date Range Indication */}
       <div className="hidden print:block mb-4 text-sm font-bold text-slate-600">
         Reporting Period: {fromDate} to {toDate} | View:{" "}
         {activeTab.toUpperCase()}
       </div>

       {/* KPI Cards for Overall Tab */}
       {activeTab === "overall" && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden print:border print:border-slate-300">
             <Wallet className="absolute -right-4 -top-4 h-24 w-24 text-slate-50 opacity-50 print:hidden" />
             <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 relative z-10">
               Opening Balance
             </p>
             <h3 className="text-2xl font-black text-slate-900 relative z-10">
               ₹{" "}
               {openingBalance.toLocaleString("en-IN", {
                 minimumFractionDigits: 2,
               })}
             </h3>
           </div>

           <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden print:bg-white print:border print:border-slate-300">
             <TrendingUp className="absolute -right-4 -top-4 h-24 w-24 text-emerald-100 opacity-50 print:hidden" />
             <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 relative z-10 print:text-slate-500">
               Total In (Credits)
             </p>
             <h3 className="text-2xl font-black text-emerald-700 relative z-10 print:text-slate-900">
               ₹ {totalIn.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
             </h3>
           </div>

           <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 shadow-sm relative overflow-hidden print:bg-white print:border print:border-slate-300">
             <TrendingDown className="absolute -right-4 -top-4 h-24 w-24 text-rose-100 opacity-50 print:hidden" />
             <p className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 relative z-10 print:text-slate-500">
               Total Out (Debits)
             </p>
             <h3 className="text-2xl font-black text-rose-700 relative z-10 print:text-slate-900">
               ₹{" "}
               {totalOut.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
             </h3>
           </div>

           <div className="bg-blue-600 rounded-2xl p-6 border border-blue-700 shadow-sm relative overflow-hidden text-white print:bg-white print:border print:border-slate-300 print:text-black">
             <PiggyBank className="absolute -right-4 -top-4 h-24 w-24 text-blue-500 opacity-50 print:hidden" />
             <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-2 relative z-10 print:text-slate-500">
               Closing Balance
             </p>
             <h3 className="text-2xl font-black text-white relative z-10 print:text-slate-900">
               ₹{" "}
               {closingBalance.toLocaleString("en-IN", {
                 minimumFractionDigits: 2,
               })}
             </h3>
           </div>
         </div>
       )}

       {/* Main Ledger Grid */}
       <DataTableShell
         title={getTableTitle()}
         searchPlaceholder="Search records, notes, or IDs..."
         onPrint={handlePrint}
         onExport={handleExportCSV}
       >
         <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200 print:bg-slate-100">
           <tr>
             <th className="px-5 py-4">Ref No</th>
             <th className="px-5 py-4">Date & Time</th>
             <th className="px-5 py-4">Particulars</th>
             <th className="px-5 py-4">Mode</th>
             <th className="px-5 py-4">Remarks</th>
             <th className="px-5 py-4 text-center print:hidden">
               <FileText className="h-4 w-4 mx-auto" />
             </th>
             <th className="px-5 py-4 text-right">In (₹)</th>
             <th className="px-5 py-4 text-right">Out (₹)</th>
             <th className="px-5 py-4 text-right bg-blue-50/50">Balance (₹)</th>
             <th className="px-5 py-4 text-center print:hidden">Act</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-slate-100">
           {/* Static Opening Balance Row */}
           <tr className="bg-slate-50/80 print:bg-slate-50">
             <td className="px-5 py-3"></td>
             <td className="px-5 py-3"></td>
             <td className="px-5 py-3 font-extrabold text-slate-800 text-sm">
               Opening Balance Brought Forward
             </td>
             <td className="px-5 py-3"></td>
             <td className="px-5 py-3"></td>
             <td className="px-5 py-3 print:hidden"></td>
             <td className="px-5 py-3"></td>
             <td className="px-5 py-3"></td>
             <td className="px-5 py-3 text-right font-black text-blue-700 text-base bg-blue-50/30 border-l border-blue-100 print:bg-transparent print:border-none print:text-black">
               {openingBalance.toLocaleString("en-IN", {
                 minimumFractionDigits: 2,
               })}
             </td>
             <td className="px-5 py-3 print:hidden"></td>
           </tr>

           {isLoading ? (
             <tr>
               <td colSpan={10} className="text-center py-8 text-slate-500">
                 Loading ledger data...
               </td>
             </tr>
           ) : visibleEntries.length === 0 ? (
             <tr>
               <td colSpan={10} className="text-center py-8 text-slate-500">
                 No transactions found for the selected view.
               </td>
             </tr>
           ) : (
             visibleEntries.map((item, i) => (
               <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                 <td className="px-5 py-3">
                   <div className="font-bold text-slate-900">{item.id}</div>
                   <div className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">
                     {item.category}
                   </div>
                 </td>
                 <td className="px-5 py-3">
                   <div className="font-semibold text-slate-800 text-sm">
                     {item.date}
                   </div>
                   <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                     {item.time}
                   </div>
                 </td>
                 <td
                   className="px-5 py-3 font-semibold text-slate-800 text-sm max-w-50 truncate"
                   title={item.particulars}
                 >
                   {item.particulars}
                 </td>
                 <td className="px-5 py-3">
                   <span className="inline-flex px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-700">
                     {item.mode}
                   </span>
                 </td>
                 <td className="px-5 py-3">
                   <div
                     className="text-sm text-slate-700 font-medium truncate max-w-37.5"
                     title={item.note}
                   >
                     {item.note}
                   </div>
                 </td>
                 <td className="px-5 py-3 text-center print:hidden">
                   {item.attachment && (
                     <div
                       className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                       title="Has Attachments"
                     >
                       <FileText className="h-3 w-3" />
                     </div>
                   )}
                 </td>
                 <td className="px-5 py-3 text-right font-extrabold text-emerald-600 text-sm print:text-black">
                   {item.flowType === "in"
                     ? item.amount.toLocaleString("en-IN", {
                         minimumFractionDigits: 2,
                       })
                     : "-"}
                 </td>
                 <td className="px-5 py-3 text-right font-extrabold text-rose-600 text-sm print:text-black">
                   {item.flowType === "out"
                     ? item.amount.toLocaleString("en-IN", {
                         minimumFractionDigits: 2,
                       })
                     : "-"}
                 </td>
                 <td className="px-5 py-3 text-right font-extrabold text-blue-700 text-sm bg-blue-50/30 border-l border-blue-100 print:bg-transparent print:border-none print:text-black">
                   {item.runningBalance.toLocaleString("en-IN", {
                     minimumFractionDigits: 2,
                   })}
                 </td>
                 <td className="px-5 py-3 print:hidden">
                   <div className="flex justify-center gap-2">
                     <button
                       onClick={() => handleViewDetails(item)}
                       className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-colors shadow-sm"
                       title="View Details"
                     >
                       <Eye className="h-4 w-4" />
                     </button>
                     <button
                       onClick={handlePrint}
                       className="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-colors shadow-sm"
                       title="Print Voucher"
                     >
                       <Printer className="h-4 w-4" />
                     </button>
                   </div>
                 </td>
               </tr>
             ))
           )}
         </tbody>
       </DataTableShell>

       {/* Read-Only Transaction View Modal */}
       {isViewModalOpen && selectedTx && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 print:hidden">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200">
             {/* Modal Header */}
             <div className="p-6 border-b border-slate-100 bg-slate-900 text-white flex justify-between items-center">
               <div>
                 <h2 className="text-xl font-bold flex items-center gap-3">
                   Transaction Details
                   <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs tracking-widest font-mono">
                     {selectedTx.id}
                   </span>
                 </h2>
               </div>
               <button
                 onClick={() => setIsViewModalOpen(false)}
                 className="text-slate-400 hover:text-white transition-colors"
               >
                 <AlertCircle className="h-6 w-6" />
               </button>
             </div>

             <div className="p-8 bg-slate-50/50 space-y-6">
               {/* Highlight Metric Row */}
               <div className="grid grid-cols-3 gap-4">
                 <div
                   className={`p-4 rounded-xl border ${selectedTx.flowType === "in" ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}
                 >
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                     Total Amount
                   </p>
                   <h3
                     className={`text-3xl font-black ${selectedTx.flowType === "in" ? "text-emerald-600" : "text-rose-600"}`}
                   >
                     ₹{" "}
                     {selectedTx.amount.toLocaleString("en-IN", {
                       minimumFractionDigits: 2,
                     })}
                   </h3>
                 </div>
                 <div className="p-4 rounded-xl border border-slate-200 bg-white">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                     Transaction Type
                   </p>
                   <h3 className="text-xl font-bold text-slate-900 mt-2">
                     {selectedTx.category}
                   </h3>
                 </div>
                 <div className="p-4 rounded-xl border border-slate-200 bg-white">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                     Processed By
                   </p>
                   <h3 className="text-lg font-bold text-slate-900 mt-2">
                     {selectedTx.user}
                   </h3>
                 </div>
               </div>

               {/* Detail Grid */}
               <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                 <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
                   <div className="p-4">
                     <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                       <Calendar className="h-3 w-3" /> Business Date
                     </p>
                     <p className="font-semibold text-slate-800">
                       {selectedTx.date}
                     </p>
                   </div>
                   <div className="p-4">
                     <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                       <Clock className="h-3 w-3" /> System Time
                     </p>
                     <p className="font-semibold text-slate-800">
                       {selectedTx.time}
                     </p>
                   </div>
                 </div>

                 <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                     Particulars / Target
                   </p>
                   <p className="font-bold text-slate-900 text-lg">
                     {selectedTx.particulars}
                   </p>
                 </div>

                 <div className="grid grid-cols-2 divide-x divide-slate-100">
                   <div className="p-4">
                     <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                       <CreditCard className="h-3 w-3" /> Payment Mode
                     </p>
                     <p className="font-semibold text-slate-800">
                       {selectedTx.mode}
                     </p>
                   </div>
                   <div className="p-4">
                     <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                       <CheckCircle2 className="h-3 w-3" /> Status
                     </p>
                     <p className="font-semibold text-slate-800">
                       Processed / Verified
                     </p>
                   </div>
                 </div>
               </div>

               {/* Remarks */}
               <div className="bg-white p-4 rounded-xl border border-slate-200">
                 <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                   Remarks / Notes
                 </p>
                 <p className="font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 min-h-15">
                   {selectedTx.note}
                 </p>
               </div>
             </div>

             {/* Modal Footer */}
             <div className="p-5 border-t border-slate-100 bg-white flex justify-between items-center">
               <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                 <Printer className="h-4 w-4" /> Print Voucher
               </button>
               <button
                 onClick={() => setIsViewModalOpen(false)}
                 className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm"
               >
                 Close Window
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
}
