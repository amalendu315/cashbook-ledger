"use client";

import React, { useEffect, useState } from "react";
import {
  FolderTree,
  Search,
  Calendar,
  Filter,
  Download,
  Building2,
  ChevronDown,
  ChevronUp,
  Layers,
  BookOpen,
} from "lucide-react";
import { getGroupReportData } from "@/app/actions/reports/group";

// --- Reusable Components (Inlined for standalone compilation) ---

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

// --- Main Page Component ---

export default function GroupReportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // State to track which group row is expanded
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  // Filters
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedLedgerId, setSelectedLedgerId] = useState("");
  const [selectedPaymentModeId, setSelectedPaymentModeId] = useState(""); // NEW: Payment Mode Filter
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  // Data
  const [groups, setGroups] = useState<any[]>([]);
  const [allLedgers, setAllLedgers] = useState<any[]>([]);
  const [paymentModes, setPaymentModes] = useState<any[]>([]);
  const [groupBalances, setGroupBalances] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getGroupReportData(
      selectedGroupId,
      selectedLedgerId,
      selectedPaymentModeId,
      fromDate,
      toDate,
    );
    if (data.success) {
      if (groups.length === 0) setGroups(data.groups || []);
      if (allLedgers.length === 0) setAllLedgers(data.ledgers || []);
      if (paymentModes.length === 0) setPaymentModes(data.paymentModes || []);
      setGroupBalances(data.groupBalances || []);
      // Auto-expand first group if exists
      if (data.groupBalances?.length > 0) {
        setExpandedGroup(data.groupBalances[0].id);
      }
    } else {
      alert("Error loading report.");
    }
    setIsLoading(false);
  };

  const handleGenerate = () => {
    fetchData();
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroupId(e.target.value);
    setSelectedLedgerId(""); // Reset ledger selection when group changes
  };

  const grandTotalNet = groupBalances.reduce(
    (acc, curr) => acc + curr.netBalance,
    0,
  );

  const toggleGroup = (id: string) => {
    if (expandedGroup === id) setExpandedGroup(null);
    else setExpandedGroup(id);
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent +=
        "Type,Group / Ledger Name,Total In (INR),Total Out (INR),Net Balance (INR)\n";

      groupBalances.forEach((group) => {
        // Group Row
        csvContent += `GROUP,"${group.name}",${group.totalIn},${group.totalOut},${group.netBalance}\n`;

        // Ledger Rows within the group
        group.ledgers.forEach((l: any) => {
          csvContent += `LEDGER," - ${l.ledgerName} (${l.companyName})",${l.in},${l.out},${l.balance}\n`;
        });
      });

      // Totals row
      csvContent += `\nGRAND TOTAL NET,,,,${grandTotalNet}\n`;

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `Consolidated_Group_Report_${fromDate}_to_${toDate}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("Failed to export CSV.");
    }
    setIsExporting(false);
  };

  // Group payment modes by category for cleaner dropdown UX
  const cashModes = paymentModes.filter((pm) => pm.category === "CASH");
  const bankModes = paymentModes.filter((pm) => pm.category === "BANK");

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen">
      <PageHeader
        title="Consolidated Group Balances"
        description="High-level enterprise reporting aggregating balances across grouped ledgers."
        icon={FolderTree}
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

      {/* Report Parameters Filter */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-sm uppercase tracking-wider">
          <Filter className="h-4 w-4" /> Report Parameters
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Select Group
            </label>
            <select
              value={selectedGroupId}
              onChange={handleGroupChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">All Groups</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Select Ledger
            </label>
            <select
              value={selectedLedgerId}
              onChange={(e) => setSelectedLedgerId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">All Ledgers</option>
              {allLedgers
                .filter(
                  (l) => !selectedGroupId || l.groupId === selectedGroupId,
                )
                .map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.ledger_name}
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
              {cashModes.length > 0 && (
                <optgroup label="Cash Modes">
                  {cashModes.map((pm) => (
                    <option key={pm.id} value={pm.id}>
                      {pm.name}
                    </option>
                  ))}
                </optgroup>
              )}
              {bankModes.length > 0 && (
                <optgroup label="Bank Modes">
                  {bankModes.map((pm) => (
                    <option key={pm.id} value={pm.id}>
                      {pm.name}
                    </option>
                  ))}
                </optgroup>
              )}
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
              {isLoading ? "Loading..." : "Consolidate"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Aggregated Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" /> Enterprise
            Consolidation
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 w-16">Sl No.</th>
                <th className="px-6 py-4 w-1/3">Group Name</th>
                <th className="px-6 py-4 text-right">Total In (₹)</th>
                <th className="px-6 py-4 text-right">Total Out (₹)</th>
                <th className="px-6 py-4 text-right">Net Balance (₹)</th>
                <th className="px-6 py-4 text-center w-32">Breakdown</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-slate-500 font-medium"
                  >
                    Aggregating enterprise ledgers...
                  </td>
                </tr>
              ) : groupBalances.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-slate-500 font-medium"
                  >
                    No financial data found for this configuration.
                  </td>
                </tr>
              ) : (
                groupBalances.map((group, index) => (
                  <React.Fragment key={group.id}>
                    {/* Parent Group Row */}
                    <tr
                      className={`border-b border-slate-100 transition-colors ${expandedGroup === group.id ? "bg-blue-50/30" : "hover:bg-slate-50"}`}
                    >
                      <td className="px-6 py-4 font-bold text-slate-400">
                        {(index + 1).toString().padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-base flex items-center gap-3">
                        <FolderTree className="h-5 w-5 text-slate-400" />{" "}
                        {group.name}
                      </td>
                      <td className="px-6 py-4 text-right font-extrabold text-emerald-600">
                        {group.totalIn.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-6 py-4 text-right font-extrabold text-rose-600">
                        {group.totalOut.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-black text-lg ${group.netBalance >= 0 ? "text-blue-600" : "text-rose-600"}`}
                      >
                        {group.netBalance.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleGroup(group.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 w-full ${expandedGroup === group.id ? "bg-blue-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                        >
                          {expandedGroup === group.id ? "Close" : "Details"}
                          {expandedGroup === group.id ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Child Row (Ledger Bifurcation) */}
                    {expandedGroup === group.id && (
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <td colSpan={6} className="p-0">
                          <div className="pl-16 pr-6 py-4 border-l-4 border-blue-500 my-2 mr-6 bg-white rounded-r-xl shadow-inner mx-6">
                            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                              Ledger-wise Bifurcation
                            </h4>
                            <table className="w-full text-sm text-left">
                              <thead className="text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100">
                                <tr>
                                  <th className="pb-2 w-1/3">Ledger Name</th>
                                  <th className="pb-2 w-1/3">Company</th>
                                  <th className="pb-2 text-right">
                                    Collection (In)
                                  </th>
                                  <th className="pb-2 text-right">
                                    Disbursement (Out)
                                  </th>
                                  <th className="pb-2 text-right">
                                    Ledger Balance
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {group.ledgers.map((ledger: any) => (
                                  <tr key={ledger.id}>
                                    <td className="py-3 font-bold text-slate-700 flex items-center gap-2">
                                      <BookOpen className="h-4 w-4 text-slate-300" />{" "}
                                      {ledger.ledgerName}
                                    </td>
                                    <td className="py-3 font-semibold text-slate-600">
                                      <div className="flex items-center gap-1.5">
                                        <Building2 className="h-3 w-3 text-slate-400" />
                                        {ledger.companyName}
                                      </div>
                                    </td>
                                    <td className="py-3 text-right font-bold text-emerald-600/80">
                                      ₹{" "}
                                      {ledger.in.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                      })}
                                    </td>
                                    <td className="py-3 text-right font-bold text-rose-600/80">
                                      ₹{" "}
                                      {ledger.out.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                      })}
                                    </td>
                                    <td
                                      className={`py-3 text-right font-extrabold ${ledger.balance >= 0 ? "text-slate-900" : "text-rose-600"}`}
                                    >
                                      ₹{" "}
                                      {ledger.balance.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                      })}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
            <tfoot className="bg-slate-900 text-white">
              <tr>
                <th
                  colSpan={4}
                  className="px-6 py-5 text-right font-bold uppercase tracking-wider text-slate-300"
                >
                  Enterprise Total Net Balance:
                </th>
                <th className="px-6 py-5 text-right font-black text-2xl text-blue-400">
                  ₹{" "}
                  {grandTotalNet.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
