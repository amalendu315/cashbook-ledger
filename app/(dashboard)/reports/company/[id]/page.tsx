"use client";

import React, { useState, useEffect, use } from "react";
import {
  Building2,
  Calendar,
  Download,
  Search,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  ArrowLeft,
  FileText,
  Eye,
  Printer,
  CreditCard,
  CheckCircle2,
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getCompanyDashboard } from "@/app/actions/reports/id-based-details";
import Link from "next/link";

export default function CompanyIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const companyId = resolvedParams.id;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  // Table Features State
  const [isExporting, setIsExporting] = useState(false);
  const [tableSearchQuery, setTableSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchDashboardData();
  }, [companyId]);

  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [tableSearchQuery]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const res: any = await getCompanyDashboard(companyId, fromDate, toDate);
    if (res.success) setData(res?.data);
    setIsLoading(false);
  };

  // Filter Transactions
  const filteredTransactions =
    data?.transactions?.filter(
      (tx: any) =>
        tx.voucherNo.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
        tx.particulars.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
        (tx.ledgerName &&
          tx.ledgerName
            .toLowerCase()
            .includes(tableSearchQuery.toLowerCase())) ||
        tx.amount.toString().includes(tableSearchQuery),
    ) || [];

  // Paginate Transactions
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleExportCSV = () => {
    if (!filteredTransactions.length) return;
    setIsExporting(true);

    try {
      let csvContent =
        "Voucher No,Date,Type,Ledger Ref,Particulars,Mode,Processed By,Inwards (INR),Outwards (INR)\n";

      filteredTransactions.forEach((tx: any) => {
        const inwards = tx.flowType === "in" ? tx.amount : 0;
        const outwards = tx.flowType === "out" ? tx.amount : 0;
        csvContent += `"${tx.voucherNo}","${tx.date}","${tx.type}","${tx.ledgerName}","${tx.particulars}","${tx.mode || "N/A"}","${tx.user || "System"}",${inwards},${outwards}\n`;
      });

      csvContent += `\nTOTALS,,,,,,,${data.totalIn},${data.totalOut}\n`;
      csvContent += `OPENING BALANCE,,,,,,,,${data.openingBalance}\n`;
      csvContent += `CLOSING BALANCE,,,,,,,,${data.closingBalance}\n`;

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `Company_Report_${data.companyName.replace(/\s+/g, "_")}_${fromDate}_to_${toDate}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("Failed to export CSV.");
    }
    setIsExporting(false);
  };

  const handleViewDetails = (tx: any) => {
    setSelectedTx(tx);
    setIsViewModalOpen(true);
  };

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-500 font-medium animate-pulse">
        Loading Company Profile...
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <Link
            href="/reports/company"
            className="p-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 rounded-xl transition-colors border border-slate-200 hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="h-14 w-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100 shadow-sm">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {data?.companyName}
            </h1>
            <p className="text-slate-500 font-bold text-sm mt-0.5 tracking-wider">
              CODE: {data?.companyCode}
            </p>
          </div>
        </div>

        {/* Date Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-slate-400 font-medium">to</span>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            {isLoading ? "..." : "Filter"}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border-y border-r border-l-4 border-slate-200 border-l-slate-700 shadow-sm flex justify-between items-center group hover:shadow-md transition-shadow">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Opening Balance
            </p>
            <h3 className="text-2xl font-black text-slate-900">
              ₹{" "}
              {data?.openingBalance.toLocaleString("en-IN", {
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
              Period Inwards
            </p>
            <h3 className="text-2xl font-black text-emerald-600">
              ₹{" "}
              {data?.totalIn.toLocaleString("en-IN", {
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
              Period Outwards
            </p>
            <h3 className="text-2xl font-black text-rose-600">
              ₹{" "}
              {data?.totalOut.toLocaleString("en-IN", {
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
              Closing Balance
            </p>
            <h3 className="text-2xl font-black text-blue-700">
              ₹{" "}
              {data?.closingBalance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </h3>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
            <PiggyBank className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Transaction Feed with Search, Export & Pagination */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5 whitespace-nowrap">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileText className="h-4 w-4" />
            </div>
            Transaction Registry
          </h2>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={tableSearchQuery}
                onChange={(e) => setTableSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
            </div>
            <button
              onClick={handleExportCSV}
              disabled={isExporting || !filteredTransactions.length}
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
              <tr>
                <th className="px-6 py-4">Voucher & Date</th>
                <th className="px-6 py-4">Ledger Ref</th>
                <th className="px-6 py-4">Particulars</th>
                <th className="px-6 py-4 text-right">Inwards (₹)</th>
                <th className="px-6 py-4 text-right">Outwards (₹)</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-slate-500 font-medium"
                  >
                    {tableSearchQuery
                      ? "No transactions match your search."
                      : "No transactions recorded in this period."}
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((tx: any) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-blue-50/50 transition-colors group"
                  >
                    <td className="px-6 py-3.5">
                      <div className="font-bold text-slate-900">
                        {tx.voucherNo}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-400 mt-0.5 tracking-wide">
                        {tx.date} • {tx.type}
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        {tx.ledgerName}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-medium text-slate-700">
                      {tx.particulars}
                    </td>
                    <td className="px-6 py-3.5 text-right font-black text-emerald-600">
                      {tx.flowType === "in"
                        ? tx.amount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })
                        : "-"}
                    </td>
                    <td className="px-6 py-3.5 text-right font-black text-rose-600">
                      {tx.flowType === "out"
                        ? tx.amount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })
                        : "-"}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <button
                        onClick={() => handleViewDetails(tx)}
                        className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-300 rounded-lg transition-all shadow-sm group-hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
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
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredTransactions.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {filteredTransactions.length}
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
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum =
                      currentPage -
                      3 +
                      i +
                      (currentPage + 2 > totalPages
                        ? totalPages - currentPage - 2
                        : 0);
                  }
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
                    {selectedTx.type}
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
                      {selectedTx.date}
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
