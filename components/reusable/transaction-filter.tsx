"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Building2,
  BookOpen,
  CreditCard,
  X,
} from "lucide-react";

export interface TransactionFilters {
  companyId?: string;
  paymentModeId?: string;
  ledgerId?: string;
  fromDate?: string;
  toDate?: string;
}

interface TransactionFilterBoxProps {
  companies?: any[];
  paymentModes?: any[];
  ledgers?: any[];
  onSearch: (filters: TransactionFilters) => void;
}

export function TransactionFilterBox({
  companies = [],
  paymentModes = [],
  ledgers = [],
  onSearch,
}: TransactionFilterBoxProps) {
  // Default to current month
  const [filters, setFilters] = useState<TransactionFilters>({
    companyId: "",
    paymentModeId: "",
    ledgerId: "",
    fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0],
    toDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };

      // If company changes, reset ledger and payment mode if they aren't mapped to the new company
      if (name === "companyId") {
        const isValidLedger = ledgers.some(
          (l) =>
            l.id === prev.ledgerId &&
            (!l.companies ||
              l.companies.length === 0 ||
              l.companies.some((c: any) => c.companyId === value)),
        );
        if (!isValidLedger) newFilters.ledgerId = "";

        const isValidMode = paymentModes.some(
          (pm) =>
            pm.id === prev.paymentModeId &&
            (!pm.companies ||
              pm.companies.length === 0 ||
              pm.companies.some((c: any) => c.companyId === value)),
        );
        if (!isValidMode) newFilters.paymentModeId = "";
      }

      return newFilters;
    });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    const cleared = {
      companyId: "",
      paymentModeId: "",
      ledgerId: "",
      fromDate: "",
      toDate: "",
    };
    setFilters(cleared);
    onSearch(cleared); // Trigger fetch with cleared filters
  };

  // Filter ledgers dynamically based on selected company
  const availableLedgers = ledgers.filter((l) => {
    if (!filters.companyId) return true;
    if (!l.companies || l.companies.length === 0) return true;
    return l.companies.some((c: any) => c.companyId === filters.companyId);
  });

  // Filter payment modes dynamically based on selected company
  const availablePaymentModes = paymentModes.filter((pm) => {
    if (!filters.companyId) return true;
    if (!pm.companies || pm.companies.length === 0) return true;
    return pm.companies.some((c: any) => c.companyId === filters.companyId);
  });

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
          <Filter className="h-4 w-4" /> Global Filters
        </div>
        <button
          onClick={handleClear}
          className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-rose-50"
        >
          <X className="h-3 w-3" /> Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-1">
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase">
            Company
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              name="companyId"
              value={filters.companyId}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">All Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {availablePaymentModes.length > 0 && (
          <div className="lg:col-span-1">
            <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase">
              Payment Mode
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                name="paymentModeId"
                value={filters.paymentModeId}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">All Modes</option>
                {availablePaymentModes.map((pm) => (
                  <option key={pm.id} value={pm.id}>
                    {pm.name} ({pm.category})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {availableLedgers.length > 0 && (
          <div className="lg:col-span-1">
            <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase">
              Ledger
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                name="ledgerId"
                value={filters.ledgerId}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">All Ledgers</option>
                {availableLedgers.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.ledger_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="lg:col-span-1">
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase">
            Date Range
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleChange}
              className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-slate-400 font-bold text-xs">-</span>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleChange}
              className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="lg:col-span-1 flex items-center justify-end h-10.5">
          <button
            onClick={handleSearch}
            className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </div>
      </div>
    </div>
  );
}
