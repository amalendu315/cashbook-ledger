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
  Clock,
  CheckCircle2,
  CreditCard,
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getCompanyReportData } from "@/app/actions/reports/company";

export default function CompanyReportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // Tab & Table State
  const [activeTab, setActiveTab] = useState<
    "overall" | "cash" | "bank" | "transfer"
  >("overall");
  const [tableSearchQuery, setTableSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);

  // Filters
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedPaymentModeId, setSelectedPaymentModeId] = useState("");
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  // Data
  const [data, setData] = useState<any>(null);
  const [paymentModes, setPaymentModes] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Reset payment mode & pagination when switching tabs to avoid contradictory states
  useEffect(() => {
    setSelectedPaymentModeId("");
    setCurrentPage(1);
  }, [activeTab, tableSearchQuery]);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getCompanyReportData(
      selectedCompanyId,
      selectedPaymentModeId,
      fromDate,
      toDate,
    );
    if (res.success) {
      if (!data?.companies?.length) {
        setData(res);
        setPaymentModes(res.paymentModes || []);
        if (!selectedCompanyId && res.companies.length > 0) {
          setSelectedCompanyId(res.companies[0].id);
          const autoData = await getCompanyReportData(
            res.companies[0].id,
            selectedPaymentModeId,
            fromDate,
            toDate,
          );
          setData(autoData);
        }
      } else {
        setData(res);
      }
    } else {
      alert("Error loading report: " + res.error);
    }
    setIsLoading(false);
  };

  const handleGenerate = () => fetchData();

  // --- Dynamic KPI Data Assignment ---
  let displayMetrics = { opening: 0, in: 0, out: 0, closing: 0 };
  if (data) {
    if (activeTab === "overall") {
      displayMetrics = {
        opening: data.openingBalance,
        in: data.totalIn,
        out: data.totalOut,
        closing: data.closingBalance,
      };
    } else if (activeTab === "cash") {
      displayMetrics = data.cashSummary;
    } else if (activeTab === "bank") {
      displayMetrics = data.bankSummary;
    }
  }

  // --- Filter Transactions based on Tab & Search ---
  const visibleTransactions = (data?.transactions || []).filter((tx: any) => {
    if (activeTab === "cash") return tx.paymentCategory === "CASH";
    if (activeTab === "bank") return tx.paymentCategory === "BANK";
    if (activeTab === "transfer")
      return tx.type === "FUND_TRANSFER" || tx.type === "TRANSFER_IN";
    return true;
  });

  const searchedTransactions = visibleTransactions.filter(
    (tx: any) =>
      tx.voucherNo.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      tx.particulars.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      tx.amount.toString().includes(tableSearchQuery),
  );

  const searchedLedgers = (data?.ledgerSummary || []).filter(
    (l: any) =>
      l.name.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      l.type.toLowerCase().includes(tableSearchQuery.toLowerCase()),
  );

  // Pagination Math
  const isOverall = activeTab === "overall";
  const totalListLength = isOverall
    ? searchedLedgers.length
    : searchedTransactions.length;
  const totalPages = Math.ceil(totalListLength / itemsPerPage);

  const paginatedData = isOverall
    ? searchedLedgers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : searchedTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      );

  const handleViewDetails = (tx: any) => {
    setSelectedTx(tx);
    setIsViewModalOpen(true);
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      let csvContent = "data:text/csv;charset=utf-8,";

      if (activeTab === "overall") {
        csvContent +=
          "Ledger ID,Ledger Name,Category,Txn Count,Total In (INR),Total Out (INR),Net Flow (INR)\n";
        searchedLedgers.forEach((row: any) => {
          csvContent += `${row.id},"${row.name}",${row.type},${row.transactions},${row.in},${row.out},${row.net}\n`;
        });
        csvContent += `\nGRAND TOTALS,,,,${displayMetrics.in},${displayMetrics.out},${displayMetrics.in - displayMetrics.out}\n`;
      } else {
        csvContent +=
          "Voucher No,Date,Time,Type,Particulars,Mode,Processed By,In (INR),Out (INR)\n";
        searchedTransactions.forEach((row: any) => {
          const inAmt = row.flowType === "in" ? row.amount : 0;
          const outAmt = row.flowType === "out" ? row.amount : 0;
          csvContent += `"${row.voucherNo}",${row.date},${row.time},${row.category},"${row.particulars}","${row.mode}","${row.user}",${inAmt},${outAmt}\n`;
        });
        if (activeTab !== "transfer") {
          csvContent += `\nTOTALS,,,,,,,${displayMetrics.in},${displayMetrics.out}\n`;
        }
      }

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `${activeTab.toUpperCase()}_Report_${data?.companyName.replace(/\s+/g, "_")}_${fromDate}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("Failed to export CSV.");
    }
    setIsExporting(false);
  };

  // Determine available payment modes based on currently selected tab
  const availablePaymentModes = paymentModes.filter((pm) => {
    if (activeTab === "cash") return pm.category === "CASH";
    if (activeTab === "bank") return pm.category === "BANK";
    return true; // Overall and Transfer show all modes
  });

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Financial Reports
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-0.5">
              Analyze P&L and granular transactions for your properties.
            </p>
          </div>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-sm uppercase tracking-wider">
          <Filter className="h-4 w-4" /> Report Parameters
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Select Company
            </label>
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">-- Select Company --</option>
              {data?.companies?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Payment Mode
            </label>
            <select
              value={selectedPaymentModeId}
              onChange={(e) => setSelectedPaymentModeId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">All Modes</option>
              {availablePaymentModes.map((pm: any) => (
                <option key={pm.id} value={pm.id}>
                  {pm.name}
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

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-slate-200 pb-px print:hidden overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab("overall")}
          className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${activeTab === "overall" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
        >
          Overall Summary (P&L)
        </button>
        <button
          onClick={() => setActiveTab("cash")}
          className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${activeTab === "cash" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
        >
          Cash Transactions
        </button>
        <button
          onClick={() => setActiveTab("bank")}
          className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${activeTab === "bank" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
        >
          Bank Transactions
        </button>
        <button
          onClick={() => setActiveTab("transfer")}
          className={`px-5 py-3 text-sm font-bold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${activeTab === "transfer" ? "border-blue-600 bg-white text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
        >
          Fund Transfers
        </button>
      </div>

      {/* Dynamic KPI Cards (Hidden for 'transfer' tab) */}
      {activeTab !== "transfer" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-6 border-y border-r border-l-4 border-slate-200 border-l-slate-700 shadow-sm flex justify-between items-center group hover:shadow-md transition-shadow">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                {activeTab} Opening
              </p>
              <h3 className="text-2xl font-black text-slate-900">
                ₹{" "}
                {displayMetrics.opening.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-slate-100 transition-colors">
              <Wallet className="h-5 w-5 text-slate-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-y border-r border-l-4 border-slate-200 border-l-emerald-500 shadow-sm flex justify-between items-center group hover:shadow-md transition-shadow">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                {activeTab} Inwards
              </p>
              <h3 className="text-2xl font-black text-emerald-600">
                ₹{" "}
                {displayMetrics.in.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-y border-r border-l-4 border-slate-200 border-l-rose-500 shadow-sm flex justify-between items-center group hover:shadow-md transition-shadow">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                {activeTab} Outwards
              </p>
              <h3 className="text-2xl font-black text-rose-600">
                ₹{" "}
                {displayMetrics.out.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 group-hover:bg-rose-100 transition-colors">
              <TrendingDown className="h-5 w-5 text-rose-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-y border-r border-l-4 border-slate-200 border-l-blue-600 shadow-sm flex justify-between items-center group hover:shadow-md transition-shadow">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                {activeTab} Closing
              </p>
              <h3 className="text-2xl font-black text-blue-700">
                ₹{" "}
                {displayMetrics.closing.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
              <PiggyBank className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      )}

      {/* Main Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5 whitespace-nowrap">
            <div
              className={`p-2 rounded-lg ${isOverall ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}
            >
              {isOverall ? (
                <BookOpen className="h-4 w-4" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
            </div>
            {isOverall
              ? `${data?.companyName || "Property"} P&L`
              : `${activeTab.toUpperCase()} Registry`}
          </h2>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={tableSearchQuery}
                onChange={(e) => setTableSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
            </div>
            <button
              onClick={handleExportCSV}
              disabled={isExporting || totalListLength === 0}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span className="hidden sm:inline">
                {isExporting ? "Exporting..." : "Export"}
              </span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
              {isOverall ? (
                <tr>
                  <th className="px-6 py-4">Ledger Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Txn Count</th>
                  <th className="px-6 py-4 text-right">Total In (₹)</th>
                  <th className="px-6 py-4 text-right">Total Out (₹)</th>
                  <th className="px-6 py-4 text-right">Net Flow (₹)</th>
                </tr>
              ) : (
                <tr>
                  <th className="px-5 py-4">Voucher No</th>
                  <th className="px-5 py-4">Date & Time</th>
                  <th className="px-5 py-4">Particulars</th>
                  <th className="px-5 py-4">Mode</th>
                  <th className="px-5 py-4 text-right">In (₹)</th>
                  <th className="px-5 py-4 text-right">Out (₹)</th>
                  <th className="px-5 py-4 text-center print:hidden">Action</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={isOverall ? 6 : 7}
                    className="text-center py-12 text-slate-500 font-medium"
                  >
                    {tableSearchQuery
                      ? "No records match your search."
                      : "No records found for this period."}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row: any, i: number) =>
                  isOverall ? (
                    // Overall Table Row
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">
                          {row.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          {row.id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold border ${row.type === "Revenue" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}
                        >
                          {row.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-600">
                        {row.transactions}
                      </td>
                      <td className="px-6 py-4 text-right font-extrabold text-emerald-600 text-sm">
                        {row.in > 0
                          ? row.in.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-right font-extrabold text-rose-600 text-sm">
                        {row.out > 0
                          ? row.out.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })
                          : "-"}
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-black text-base ${row.net >= 0 ? "text-emerald-700" : "text-rose-700"}`}
                      >
                        {row.net.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ) : (
                    // Transactions Table Row
                    <tr
                      key={i}
                      className="hover:bg-blue-50/50 transition-colors group"
                    >
                      <td className="px-5 py-3">
                        <div className="font-bold text-slate-900">
                          {row.voucherNo}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-wider">
                          {row.category}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-semibold text-slate-800 text-sm">
                          {row.date}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                          {row.time}
                        </div>
                      </td>
                      <td className="px-5 py-3 font-semibold text-slate-800 text-sm">
                        {row.particulars}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded text-xs font-bold ${row.paymentCategory === "CASH" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-blue-50 text-blue-700 border border-blue-100"}`}
                        >
                          {row.mode}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-extrabold text-emerald-600 text-sm">
                        {row.flowType === "in"
                          ? row.amount.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })
                          : "-"}
                      </td>
                      <td className="px-5 py-3 text-right font-extrabold text-rose-600 text-sm">
                        {row.flowType === "out"
                          ? row.amount.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })
                          : "-"}
                      </td>
                      <td className="px-5 py-3 text-center print:hidden">
                        <button
                          onClick={() => handleViewDetails(row)}
                          className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-300 rounded-lg transition-all shadow-sm group-hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-900">
                {Math.min(currentPage * itemsPerPage, totalListLength)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {totalListLength}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3)
                    pageNum =
                      currentPage -
                      3 +
                      i +
                      (currentPage + 2 > totalPages
                        ? totalPages - currentPage - 2
                        : 0);
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-8 w-8 rounded-lg text-sm font-bold transition-colors ${currentPage === pageNum ? "bg-blue-50 text-blue-600 border border-blue-200" : "text-slate-500 hover:bg-slate-50 border border-transparent"}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Details View Modal */}
      {isViewModalOpen && selectedTx && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200">
            <div className="p-6 border-b border-slate-100 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-3">
                  Transaction Summary
                  <span className="px-3 py-1 bg-white/20 text-white rounded-md text-xs tracking-widest font-mono border border-white/10">
                    {selectedTx.voucherNo}
                  </span>
                </h2>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 bg-slate-50/50 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`p-5 rounded-xl border ${selectedTx.flowType === "in" ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}
                >
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Net Amount
                  </p>
                  <h3
                    className={`text-3xl font-black tracking-tight ${selectedTx.flowType === "in" ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    ₹{" "}
                    {selectedTx.amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Voucher Type
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {selectedTx.category}
                  </h3>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Processed By
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 flex items-center gap-2">
                    {selectedTx.user || "System User"}
                  </h3>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 border-b border-slate-100">
                  <div className="p-5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> Business Date
                    </p>
                    <p className="font-semibold text-slate-800 text-base">
                      {selectedTx.date} • {selectedTx.time}
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" /> Impacted Ledger
                    </p>
                    <p className="font-semibold text-slate-800 text-base">
                      {selectedTx.ledgerName}
                    </p>
                  </div>
                </div>

                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Particulars / Description
                  </p>
                  <p className="font-bold text-slate-900 text-lg">
                    {selectedTx.particulars}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  <div className="p-5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <CreditCard className="h-3.5 w-3.5" /> Payment Mode
                    </p>
                    <p className="font-semibold text-slate-800 flex items-center gap-2">
                      <span className="inline-flex px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-700">
                        {selectedTx.mode || "N/A"}
                      </span>
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />{" "}
                      Status
                    </p>
                    <p className="font-semibold text-slate-800">
                      Processed / Verified
                    </p>
                  </div>
                </div>
              </div>

              {selectedTx.note && selectedTx.note !== "-" && (
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Remarks / Notes
                  </p>
                  <p className="font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {selectedTx.note}
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 bg-white flex justify-between items-center">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg font-bold border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                <Printer className="h-4 w-4" /> Print
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
