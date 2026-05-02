import React from 'react'
import Link from 'next/link';

const QuickAction = ({ href, icon: Icon, label, variant = "default" }: any) => {
  const baseClass =
    "flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all text-sm";
  const variants: any = {
    default:
      "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md hover:shadow-blue-600/20",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md hover:shadow-emerald-600/20",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 shadow-sm hover:shadow-md hover:shadow-rose-600/20",
    warning:
      "bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:shadow-md hover:shadow-amber-500/20",
    dark: "bg-slate-800 text-white hover:bg-slate-900 shadow-sm hover:shadow-md hover:shadow-slate-800/20",
  };

  return (
    <Link href={href} className={`${baseClass} ${variants[variant]}`}>
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};

export default QuickAction;