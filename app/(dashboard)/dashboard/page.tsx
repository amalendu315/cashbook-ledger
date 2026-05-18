"use client";

import { useState, useEffect } from "react";
import StatCard from "@/components/reusable/stat-card";
import {
  ArrowUpFromLine,
  ArrowDownToLine,
  Building2,
  Calendar,
  Wallet,
  Vault,
} from "lucide-react";
import { getDashboardData } from "@/app/actions/dashboard";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [companyStats, setCompanyStats] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, [selectedDate]);

  const fetchDashboard = async () => {
    setIsLoading(true);
    // Passing only the date since we now pull all authorized companies at once
    const data = await getDashboardData(selectedDate);

    if (data.success) {
      setCompanyStats(data.companyStats || []);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 bg-slate-50 min-h-screen">
      {/* Header & Interactive Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-full md:w-auto">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Companies Cash Balances
          </h1>
          <p className="text-slate-500 font-medium text-xs sm:text-sm mt-1">
            Unified overview of daily physical cash flows across all your
            properties.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 w-full md:w-64 hover:border-blue-400 transition-colors focus-within:ring-2 focus-within:ring-blue-100">
            <Calendar className="h-5 w-5 text-blue-500 mr-2.5 shrink-0" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 w-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Companies Iteration Blocks */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-slate-400 font-bold tracking-wide animate-pulse text-sm sm:text-base">
              Aggregating Balances...
            </div>
          </div>
        ) : companyStats.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 sm:p-10 text-center border border-slate-200 shadow-sm">
            <p className="text-slate-500 font-medium text-sm sm:text-base">
              No properties found or authorized for your account.
            </p>
          </div>
        ) : (
          companyStats.map((company) => (
            <div
              key={company.id}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4 sm:mb-5">
                <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                  {company.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <StatCard
                  title="Opening Balance"
                  value={`₹ ${company.openingBalance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  icon={Wallet}
                  colorClass="bg-blue-500"
                  trend="Carried forward"
                  trendLabel=""
                />
                <StatCard
                  title="Cash In"
                  value={`₹ ${company.cashIn.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  icon={ArrowDownToLine}
                  colorClass="bg-emerald-500"
                  trend="Cash"
                  trendLabel="received today"
                />
                <StatCard
                  title="Cash Out"
                  value={`₹ ${company.cashOut.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  icon={ArrowUpFromLine}
                  colorClass="bg-rose-500"
                  trend="Cash"
                  trendLabel="paid today"
                />
                <StatCard
                  title="Closing Balance"
                  value={`₹ ${company.closingBalance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  icon={Vault}
                  colorClass="bg-indigo-500"
                  trend="Available Cash"
                  trendLabel=""
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
