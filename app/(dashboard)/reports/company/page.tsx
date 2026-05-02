"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Search,
  Calendar,
  Filter,
  Wallet,
  PiggyBank,
  Download,
  TrendingUp,
  TrendingDown,
  Printer,
  Eye,
  FileText,
  AlertCircle,
  Clock,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import { getCompanyReportData } from "@/app/actions/reports/company";


interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  actionButton?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

function PageHeader({
  title,
  description,
  icon: Icon,
  actionButton,
  secondaryAction,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && (
            <p className="text-slate-500 text-sm mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        {secondaryAction}
        {actionButton}
      </div>
    </div>
  );
}

interface DataTableShellProps {
  title: string;
  children: React.ReactNode;
  searchPlaceholder?: string;
  onExport?: () => void;
  onPrint?: () => void;
}

function DataTableShell({
  title,
  children,
  searchPlaceholder = "Search records...",
  onExport,
  onPrint,
}: DataTableShellProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col print:border-none print:shadow-none">
      {/* Table Toolbar */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:min-w-62.5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow hover:bg-white focus:bg-white"
            />
          </div>
          <button
            onClick={onPrint}
            className="p-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            title="Print Report"
          >
            <Printer className="h-4 w-4" />
          </button>
          <button
            onClick={onExport}
            className="p-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            title="Export CSV"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Print Only Header */}
      <div className="hidden print:block p-4 border-b border-slate-200 mb-4">
        <h2 className="text-2xl font-bold text-black">{title}</h2>
        <p className="text-sm text-gray-500">
          Generated securely by Udaan Cashbook
        </p>
      </div>

      {/* Table Content Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          {children}
        </table>
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default function CompanyReportPage() {
const [isLoading, setIsLoading] = useState(true);
const [isExporting, setIsExporting] = useState(false);

// Tab State
const [activeTab, setActiveTab] = useState<
  "overall" | "cash" | "bank" | "transfer"
>("overall");

// Modal State
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
const [selectedTx, setSelectedTx] = useState<any>(null);

// Filters
const [selectedCompanyId, setSelectedCompanyId] = useState("");
const [fromDate, setFromDate] = useState(() => {
  const d = new Date();
  d.setDate(1); // Default to 1st of current month
  return d.toISOString().split("T")[0];
});
const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

// Data
const [companies, setCompanies] = useState<any[]>([]);
const [companyName, setCompanyName] = useState("");
const [openingBalance, setOpeningBalance] = useState(0);
const [ledgerSummary, setLedgerSummary] = useState<any[]>([]);
const [allTransactions, setAllTransactions] = useState<any[]>([]);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  setIsLoading(true);
  const data = await getCompanyReportData(selectedCompanyId, fromDate, toDate);
  if (data.success) {
    if (companies.length === 0) setCompanies(data.companies); // Only set dropdown once

    // Auto-select first company on initial load
    if (!selectedCompanyId && data.companies.length > 0) {
      setSelectedCompanyId(data.companies[0].id);
      const autoData = await getCompanyReportData(
        data.companies[0].id,
        fromDate,
        toDate,
      );
      setCompanyName(autoData.companyName);
      setOpeningBalance(autoData.openingBalance);
      setLedgerSummary(autoData.ledgerSummary);
      setAllTransactions(autoData.transactions || []);
    } else {
      setCompanyName(data.companyName);
      setOpeningBalance(data.openingBalance);
      setLedgerSummary(data.ledgerSummary);
      setAllTransactions(data.transactions || []);
    }
  } else {
    alert("Error loading report: " + data.error);
  }
  setIsLoading(false);
};

const handleGenerate = () => {
  fetchData();
};

const totalIn = ledgerSummary.reduce((acc, curr) => acc + curr.in, 0);
const totalOut = ledgerSummary.reduce((acc, curr) => acc + curr.out, 0);
const netFlow = totalIn - totalOut;
const closingBalance = openingBalance + netFlow;

// Filter transactions based on active tab
const visibleTransactions = allTransactions.filter((tx) => {
  if (activeTab === "cash")
    return tx.type === "CASH_RECEIPT" || tx.type === "CASH_PAYMENT";
  if (activeTab === "bank")
    return tx.type === "BANK_RECEIPT" || tx.type === "BANK_PAYMENT";
  if (activeTab === "transfer")
    return tx.type === "FUND_TRANSFER" || tx.type === "TRANSFER_IN";
  return true;
});

const handleViewDetails = (tx: any) => {
  setSelectedTx(tx);
  setIsViewModalOpen(true);
};

// --- Export & Print Logic ---
const handlePrint = () => {
  window.print();
};

const handleExportCSV = () => {
  setIsExporting(true);
  try {
    let csvContent = "data:text/csv;charset=utf-8,";

    if (activeTab === "overall") {
      csvContent +=
        "Ledger ID,Ledger Name,Category,Txn Count,Total In (INR),Total Out (INR),Net Flow (INR)\n";
      ledgerSummary.forEach((row) => {
        csvContent += `${row.id},"${row.name}",${row.type},${row.transactions},${row.in},${row.out},${row.net}\n`;
      });
      csvContent += `\nGRAND TOTALS,,,,${totalIn},${totalOut},${netFlow}\n`;
      csvContent += `OPENING BALANCE,,,,,,${openingBalance}\n`;
      csvContent += `CLOSING BALANCE,,,,,,${closingBalance}\n`;
    } else {
      csvContent +=
        "Voucher No,Date,Time,Type,Particulars,Mode,Amount,Flow Type,Processed By\n";
      visibleTransactions.forEach((row) => {
        csvContent += `"${row.voucherNo}",${row.date},${row.time},${row.category},"${row.particulars}","${row.mode}",${row.amount},${row.flowType},"${row.user}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${activeTab.toUpperCase()}_Report_${companyName.replace(/\s+/g, "_")}_${fromDate}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    alert("Failed to export CSV.");
  }
  setIsExporting(false);
};

// Generate dynamic Title based on Tab
const getTableTitle = () => {
  if (activeTab === "overall")
    return `${companyName || "Property"} - Ledger Breakdown (P&L)`;
  if (activeTab === "cash")
    return `${companyName || "Property"} - Cash Transactions`;
  if (activeTab === "bank")
    return `${companyName || "Property"} - Bank Transactions`;
  if (activeTab === "transfer")
    return `${companyName || "Property"} - Fund Transfers`;
  return "Transactions";
};

return (
  <div className="space-y-6 print:m-0 print:p-0 bg-slate-50 min-h-screen">
    <PageHeader
      title="Company Financial Summary"
      description="Analyze ledger-wise revenue, expenses, and granular transactions for individual properties."
      icon={Building2}
      actionButton={
        <button
          onClick={handleExportCSV}
          disabled={isExporting || isLoading}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:shadow-blue-600/20 disabled:opacity-70"
        >
          <Download className="h-4 w-4" />{" "}
          {isExporting ? "Exporting..." : "Export Report"}
        </button>
      }
    />

    {/* Global Report Parameters Filter */}
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
      <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-sm uppercase tracking-wider">
        <Filter className="h-4 w-4" /> Report Parameters
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="lg:col-span-1">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
            Select Company
          </label>
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">-- Select Property --</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
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
            {isLoading ? "Loading..." : "Generate"}
          </button>
        </div>
      </div>
    </div>

    {/* Primary Tab Navigation */}
    <div className="flex space-x-1 border-b border-slate-200 pb-px print:hidden">
      <button
        onClick={() => setActiveTab("overall")}
        className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === "overall" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
      >
        Overall Summary (P&L)
      </button>
      <button
        onClick={() => setActiveTab("cash")}
        className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === "cash" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
      >
        Cash Transactions
      </button>
      <button
        onClick={() => setActiveTab("bank")}
        className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === "bank" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
      >
        Bank Transactions
      </button>
      <button
        onClick={() => setActiveTab("transfer")}
        className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === "transfer" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
      >
        Fund Transfers
      </button>
    </div>

    {/* Tab Content Display */}
    {activeTab === "overall" ? (
      <>
        {/* KPI Cards for Overall Tab */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              Total Revenue (In)
            </p>
            <h3 className="text-2xl font-black text-emerald-700 relative z-10 print:text-slate-900">
              ₹ {totalIn.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </h3>
          </div>

          <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 shadow-sm relative overflow-hidden print:bg-white print:border print:border-slate-300">
            <TrendingDown className="absolute -right-4 -top-4 h-24 w-24 text-rose-100 opacity-50 print:hidden" />
            <p className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 relative z-10 print:text-slate-500">
              Total Expenses (Out)
            </p>
            <h3 className="text-2xl font-black text-rose-700 relative z-10 print:text-slate-900">
              ₹ {totalOut.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
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

        <DataTableShell
          title={getTableTitle()}
          searchPlaceholder="Search ledgers..."
          onExport={handleExportCSV}
          onPrint={handlePrint}
        >
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200 print:bg-slate-100">
            <tr>
              <th className="px-6 py-4">Ledger Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Txn Count</th>
              <th className="px-6 py-4 text-right">Total In (₹)</th>
              <th className="px-6 py-4 text-right">Total Out (₹)</th>
              <th className="px-6 py-4 text-right">Net Flow (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-500">
                  Loading Profit & Loss details...
                </td>
              </tr>
            ) : ledgerSummary.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-500">
                  No data found for this period.
                </td>
              </tr>
            ) : (
              ledgerSummary.map((ledger, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">
                      {ledger.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {ledger.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold border print:border-none print:px-0 print:py-0 ${ledger.type === "Revenue" ? "bg-emerald-50 text-emerald-700 border-emerald-200 print:bg-transparent print:text-slate-700" : "bg-rose-50 text-rose-700 border-rose-200 print:bg-transparent print:text-slate-700"}`}
                    >
                      {ledger.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-600">
                    {ledger.transactions}
                  </td>
                  <td className="px-6 py-4 text-right font-extrabold text-emerald-600 text-sm print:text-slate-900">
                    {ledger.in > 0
                      ? ledger.in.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-right font-extrabold text-rose-600 text-sm print:text-slate-900">
                    {ledger.out > 0
                      ? ledger.out.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })
                      : "-"}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-black text-base ${ledger.net >= 0 ? "text-emerald-700" : "text-rose-700"} print:text-black`}
                  >
                    {ledger.net.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="bg-slate-50 border-t-2 border-slate-200 print:bg-slate-100">
            <tr>
              <th
                colSpan={3}
                className="px-6 py-4 text-right font-bold text-slate-700 uppercase"
              >
                Grand Totals:
              </th>
              <th className="px-6 py-4 text-right font-black text-emerald-700 text-lg print:text-black">
                ₹{" "}
                {totalIn.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </th>
              <th className="px-6 py-4 text-right font-black text-rose-700 text-lg print:text-black">
                ₹{" "}
                {totalOut.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </th>
              <th className="px-6 py-4 text-right font-black text-blue-700 text-xl print:text-black">
                ₹{" "}
                {netFlow.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </th>
            </tr>
          </tfoot>
        </DataTableShell>
      </>
    ) : (
      <DataTableShell
        title={getTableTitle()}
        searchPlaceholder="Search vouchers, particulars..."
        onExport={handleExportCSV}
        onPrint={handlePrint}
      >
        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200 print:bg-slate-100">
          <tr>
            <th className="px-5 py-4">Voucher No</th>
            <th className="px-5 py-4">Date & Time</th>
            <th className="px-5 py-4">Particulars</th>
            <th className="px-5 py-4">Mode</th>
            <th className="px-5 py-4 text-right">In (₹)</th>
            <th className="px-5 py-4 text-right">Out (₹)</th>
            <th className="px-5 py-4 text-center print:hidden">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-slate-500">
                Loading transactions...
              </td>
            </tr>
          ) : visibleTransactions.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-slate-500">
                No transactions found for this category.
              </td>
            </tr>
          ) : (
            visibleTransactions.map((tx, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <div className="font-bold text-slate-900">{tx.voucherNo}</div>
                  <div className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-wider">
                    {tx.category}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="font-semibold text-slate-800 text-sm">
                    {tx.date}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                    {tx.time}
                  </div>
                </td>
                <td className="px-5 py-3 font-semibold text-slate-800 text-sm">
                  {tx.particulars}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex px-2 py-1 rounded text-xs font-bold ${tx.mode === "Cash" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-blue-50 text-blue-700 border border-blue-100"}`}
                  >
                    {tx.mode}
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-extrabold text-emerald-600 text-sm print:text-slate-900">
                  {tx.flowType === "in"
                    ? tx.amount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })
                    : "-"}
                </td>
                <td className="px-5 py-3 text-right font-extrabold text-rose-600 text-sm print:text-slate-900">
                  {tx.flowType === "out"
                    ? tx.amount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })
                    : "-"}
                </td>
                <td className="px-5 py-3 text-center print:hidden">
                  <button
                    onClick={() => handleViewDetails(tx)}
                    className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-colors shadow-sm"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </DataTableShell>
    )}

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
                  {selectedTx.voucherNo}
                </span>
              </h2>
            </div>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <AlertCircle className="h-6 w-6" />{" "}
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
