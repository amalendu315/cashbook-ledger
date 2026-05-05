"use client";
import { useState, useEffect } from "react";
import StatCard from "@/components/reusable/stat-card";
import {
  ArrowUpFromLine,
  ArrowDownToLine,
  Building2,
  Calendar,
  FileText,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle2,
  Wallet,
  FolderTree,
  Vault,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getDashboardData } from "@/app/actions/dashboard";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedCompanyId, setSelectedCompanyId] = useState("ALL");

  // Data States
  const [companies, setCompanies] = useState<any[]>([]);
  const [kpis, setKpis] = useState({
    openingBalance: 0,
    cashIn: 0,
    cashOut: 0,
    closingBalance: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, [selectedDate, selectedCompanyId]);

  const fetchDashboard = async () => {
    setIsLoading(true);
    const data = await getDashboardData(selectedDate, selectedCompanyId);

    if (data.success) {
      setCompanies(data.companies || []);
      setKpis(
        data.kpis || {
          openingBalance: 0,
          cashIn: 0,
          cashOut: 0,
          closingBalance: 0,
        },
      );
      setChartData(data.chartData || []);
      setRecentTransactions(data.recentTransactions || []);
      setSystemAlerts(data.alerts || []);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Interactive Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Cashbook Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Analytical snapshot for selected company and date (Cash Only).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex-1 lg:flex-none min-w-50 hover:border-blue-400 transition-colors">
            <Building2 className="h-4 w-4 text-slate-400 mr-2" />
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-semibold text-slate-700 w-full cursor-pointer appearance-none"
            >
              <option value="ALL">All Companies (Consolidated)</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex-1 lg:flex-none hover:border-blue-400 transition-colors">
            <Calendar className="h-4 w-4 text-slate-400 mr-2" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-semibold text-slate-700 w-full cursor-pointer"
            />
          </div>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex-1 lg:flex-none hover:border-blue-400 transition-colors">
            <FolderTree className="h-4 w-4 text-slate-400 mr-2" />
            <a
              href="/reports/group"
              className="bg-transparent border-none outline-none text-sm font-semibold text-slate-700 w-full cursor-pointer"
            >
              Group Balances
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic KPI Cards - Cash Only Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Opening Balance"
          value={`₹ ${kpis.openingBalance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
          icon={Wallet}
          colorClass="bg-blue-500"
          trend={isLoading ? "Loading..." : "Carried forward"}
          trendLabel=""
        />
        <StatCard
          title="Cash In"
          value={`₹ ${kpis.cashIn.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
          icon={ArrowDownToLine}
          colorClass="bg-emerald-500"
          trend={isLoading ? "Loading..." : "Cash"}
          trendLabel="received today"
        />
        <StatCard
          title="Cash Out"
          value={`₹ ${kpis.cashOut.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
          icon={ArrowUpFromLine}
          colorClass="bg-rose-500"
          trend={isLoading ? "Loading..." : "Cash"}
          trendLabel="paid today"
        />
        <StatCard
          title="Closing Balance"
          value={`₹ ${kpis.closingBalance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
          icon={Vault}
          colorClass="bg-indigo-500"
          trend={isLoading ? "Loading..." : "Available Cash"}
          trendLabel=""
        />
      </div>

      {/* Main Dashboard Layout - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Charts and Transactions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Financial Trend Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" /> Hourly Cash
                Movement (Selected Date)
              </h2>
            </div>

            <div className="flex-1 w-full h-full min-h-0">
              {isLoading ? (
                <div className="h-full flex items-center justify-center text-slate-400 font-medium">
                  Loading Chart Data...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#f43f5e"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f43f5e"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value: any, name: any) => [
                        `₹ ${Number(value).toLocaleString("en-IN")}`,
                        name,
                      ]}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: "12px",
                        paddingTop: "10px",
                        fontWeight: "bold",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="Cash In"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorIn)"
                    />
                    <Area
                      type="monotone"
                      dataKey="Cash Out"
                      stroke="#f43f5e"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorOut)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Recent Transactions Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">
                Recent Cash Activity
              </h2>
              <a
                href="/reports/ledger"
                className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                View Full Ledger <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Ref & Type</th>
                    <th className="px-5 py-4">Details</th>
                    <th className="px-5 py-4 text-right">Cash In (₹)</th>
                    <th className="px-5 py-4 text-right">Cash Out (₹)</th>
                    <th className="px-5 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-slate-400"
                      >
                        Loading activity...
                      </td>
                    </tr>
                  ) : recentTransactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-slate-400"
                      >
                        No recent cash transactions found.
                      </td>
                    </tr>
                  ) : (
                    recentTransactions.map((tx, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-5 py-3">
                          <div className="font-bold text-slate-900">
                            {tx.id}
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 mt-0.5 uppercase tracking-wide">
                            {tx.type}
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="font-semibold text-slate-800 truncate max-w-37.5">
                            {tx.details}
                          </div>
                          <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                            {tx.date} •{" "}
                            <span className="text-slate-400">{tx.mode}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-right font-extrabold text-emerald-600 text-sm">
                          {tx.amountIn}
                        </td>
                        <td className="px-5 py-3 text-right font-extrabold text-rose-600 text-sm">
                          {tx.amountOut}
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button
                            className="text-slate-400 hover:text-blue-600 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all p-2 rounded-lg shadow-sm"
                            title="View/Print Voucher"
                          >
                            <FileText className="h-4 w-4 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: System Alerts / Reminders */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" /> System Alerts
              </h2>
              {!isLoading && (
                <span
                  className={`${systemAlerts.length > 0 && systemAlerts[0].type !== "success" ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"} text-[10px] uppercase font-black px-2.5 py-1 rounded-full tracking-wide`}
                >
                  {systemAlerts.length} Alerts
                </span>
              )}
            </div>

            <div className="p-5 space-y-4 flex-1 overflow-y-auto min-h-75">
              {isLoading ? (
                <p className="text-center text-slate-400 mt-10">
                  Scanning database...
                </p>
              ) : (
                systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex gap-3 items-start p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <div
                      className={`mt-0.5 p-2 rounded-full shrink-0 ${
                        alert.type === "warning"
                          ? "bg-amber-100 text-amber-600"
                          : alert.type === "danger"
                            ? "bg-rose-100 text-rose-600"
                            : alert.type === "success"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {alert.type === "warning" ? (
                        <Clock className="h-4 w-4" />
                      ) : alert.type === "danger" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : alert.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        {alert.desc}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
              <a
                href="/reports/ledger"
                className="block text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors w-full py-2 bg-white border border-slate-200 rounded-lg shadow-sm"
              >
                View Deep Analytics
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
