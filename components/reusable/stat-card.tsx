import React from 'react'

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  colorClass,
}: any) => (
  <div
    className={`bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}
  >
    {/* Subtle Right-side color indicator bar */}
    <div
      className={`absolute right-0 top-0 w-1.5 h-full opacity-70 group-hover:opacity-100 transition-opacity ${colorClass}`}
    ></div>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100`}>
        {/* Dynamically extract the text color from the passed background color class */}
        <Icon className={`h-6 w-6 ${colorClass.replace("bg-", "text-")}`} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <span
          className={
            trend.startsWith("+")
              ? "text-emerald-600 font-bold"
              : trend.startsWith("-")
                ? "text-rose-600 font-bold"
                : "text-slate-600 font-bold"
          }
        >
          {trend}
        </span>
        <span className="text-slate-500 ml-2 font-medium">{trendLabel}</span>
      </div>
    )}
  </div>
);

export default StatCard;