"use client";

import React, { useState, useEffect } from "react";
import { Search, Calendar, Filter, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { getAccessibleCompanies } from "@/app/actions/shared/filters";

// Type definition for the payload sent back to the parent component
export interface TransactionFilters {
  companyId: string;
  fromDate: string;
  toDate: string;
  bookingId: string;
  payee: string;
  approver: string;
}

interface TransactionFilterProps {
  showHotel?: boolean;
  showBookingId?: boolean;
  showPayee?: boolean;
  showApprover?: boolean;
  onSearch: (filters: TransactionFilters) => void;
}

export function TransactionFilterBox({
  showHotel = true,
  showBookingId = false,
  showPayee = false,
  showApprover = false,
  onSearch,
}: TransactionFilterProps) {
  const { data: session } = useSession();

  // Data State
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [filters, setFilters] = useState<TransactionFilters>({
    companyId: "ALL",
    fromDate: "",
    toDate: "",
    bookingId: "",
    payee: "",
    approver: "",
  });

  // Fetch accessible companies when the component mounts
  useEffect(() => {
    if (session?.user && showHotel) {
      loadCompanies();
    }
  }, [session, showHotel]);

  const loadCompanies = async () => {
    setIsLoading(true);
    // @ts-ignore - assuming your next-auth session has user.id and user.role
    const userId = session?.user?.id as string;
    // @ts-ignore
    const role = (session?.user?.role as string) || "USER";

    const res = await getAccessibleCompanies(userId, role);
    if (res.success) {
      setCompanies(res.companies || []);
    }
    setIsLoading(false);
  };

  const handleFilterChange = (
    field: keyof TransactionFilters,
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearchClick = () => {
    // Pass the current state to the parent component
    onSearch(filters);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-sm uppercase tracking-wider">
        <Filter className="h-4 w-4" /> Search Criteria
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {showHotel && (
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
               Company
            </label>
            <div className="relative">
              <select
                value={filters.companyId}
                onChange={(e) =>
                  handleFilterChange("companyId", e.target.value)
                }
                disabled={isLoading}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 appearance-none"
              >
                <option value="ALL">All Accessible Companies</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 animate-spin pointer-events-none" />
              )}
            </div>
          </div>
        )}

        <div className="lg:col-span-1">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
            From Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => handleFilterChange("fromDate", e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
            To Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => handleFilterChange("toDate", e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {showBookingId && (
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Booking ID / Voucher
            </label>
            <input
              type="text"
              value={filters.bookingId}
              onChange={(e) => handleFilterChange("bookingId", e.target.value)}
              placeholder="Search ID"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {showPayee && (
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Payee / Payer
            </label>
            <input
              type="text"
              value={filters.payee}
              onChange={(e) => handleFilterChange("payee", e.target.value)}
              placeholder="Search Payee"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {showApprover && (
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Appr. By
            </label>
            <input
              type="text"
              value={filters.approver}
              onChange={(e) => handleFilterChange("approver", e.target.value)}
              placeholder="Search Approver"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Search Button Container */}
        <div className="lg:col-span-1 flex items-center justify-end h-9.5">
          <button
            onClick={handleSearchClick}
            className="w-full lg:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </div>
      </div>
    </div>
  );
}
