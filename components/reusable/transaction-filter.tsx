import React from "react";
import { Search, Calendar, Filter } from "lucide-react";

interface TransactionFilterProps {
  showHotel?: boolean;
  showBookingId?: boolean;
  showPayee?: boolean;
  showApprover?: boolean;
  onSearch?: () => void;
}

export function TransactionFilterBox({
  showHotel = true,
  showBookingId = false,
  showPayee = false,
  showApprover = false,
  onSearch,
}: TransactionFilterProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-sm uppercase tracking-wider">
        <Filter className="h-4 w-4" /> Search Criteria
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {showHotel && (
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Hotel
            </label>
            <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Hotels</option>
              <option>Grand Udaan Hotel</option>
              <option>Udaan Woodberry</option>
            </select>
          </div>
        )}

        <div className="lg:col-span-1">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
            From Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="date"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
            To Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="date"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {showBookingId && (
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Booking ID
            </label>
            <input
              type="text"
              placeholder="Search ID"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {showPayee && (
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
              Payee
            </label>
            <input
              type="text"
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
              placeholder="Search Approver"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="lg:col-span-1 flex items-center justify-end h-[38px]">
          <button
            onClick={onSearch}
            className="w-full lg:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </div>
      </div>
    </div>
  );
}
