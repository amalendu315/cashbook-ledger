import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  actionButton?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export function PageHeader({
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
