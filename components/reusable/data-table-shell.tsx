import React from "react";
import { Search, Download, Filter, Printer } from "lucide-react";

interface DataTableShellProps {
  title: string;
  children: React.ReactNode;
  searchPlaceholder?: string;
  onExport?: () => void;
  onPrint?: () => void;
}

export function DataTableShell({
  title,
  children,
  searchPlaceholder = "Search records...",
  onExport,
  onPrint,
}: DataTableShellProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:min-w-62.5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
          <button
            className="p-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            title="Filter"
          >
            <Filter className="h-4 w-4" />
          </button>
          <button
            onClick={onPrint}
            className="p-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            title="Print Ledger"
          >
            <Printer className="h-4 w-4" />
          </button>
          <button
            onClick={onExport}
            className="p-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            title="Export"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table Content Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          {children}
        </table>
      </div>

      {/* Pagination Footer Placeholder */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
        <span>Showing 1 to 10 of 50 entries</span>
        <div className="flex gap-1">
          <button
            className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors disabled:opacity-50"
            disabled
          >
            Prev
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded shadow-sm">
            1
          </button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">
            2
          </button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
