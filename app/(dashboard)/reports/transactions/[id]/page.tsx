"use client";

import React, { useState, useEffect, use } from "react";
import {
  ArrowLeft,
  Printer,
  FileText,
  Calendar,
  Building2,
  BookOpen,
  User,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { getTransactionDetails } from "@/app/actions/reports/id-based-details";
import Link from "next/link";

export default function TransactionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const txId = resolvedParams.id;

  const [isLoading, setIsLoading] = useState(true);
  const [tx, setTx] = useState<any>(null);

  useEffect(() => {
    fetchTx();
  }, [txId]);

  const fetchTx = async () => {
    setIsLoading(true);
    const res = await getTransactionDetails(txId);
    if (res.success) setTx(res.data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 text-slate-500 font-medium animate-pulse">
        Retrieving Digital Voucher...
      </div>
    );
  }

  if (!tx) {
    return (
      <div className="p-10 text-center text-rose-500 font-bold">
        Transaction Not Found or Access Denied.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Actions (Hidden during printing) */}
        <div className="flex justify-between items-center print:hidden">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold shadow-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold shadow-sm hover:shadow-md transition-all"
          >
            <Printer className="h-4 w-4" /> Print Voucher
          </button>
        </div>

        {/* The Printable Voucher Body */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 print:shadow-none print:border-none">
          {/* Voucher Header */}
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center print:bg-transparent print:text-black print:border-b-2 print:border-slate-800">
            <div>
              <div className="flex items-center gap-3 text-slate-400 print:text-slate-600 mb-2">
                <FileText className="h-5 w-5" />
                <span className="font-bold tracking-widest text-sm uppercase">
                  Digital Voucher
                </span>
              </div>
              <h1 className="text-4xl font-black tracking-tight">
                {tx.voucherNo}
              </h1>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border ${tx.flowType === "in" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 print:bg-emerald-100 print:text-emerald-800" : "bg-rose-500/20 text-rose-400 border-rose-500/30 print:bg-rose-100 print:text-rose-800"}`}
              >
                <CheckCircle2 className="h-4 w-4" /> Processed
              </span>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Amount Banner */}
            <div
              className={`p-6 rounded-2xl border-2 flex items-center justify-between print:bg-transparent ${tx.flowType === "in" ? "bg-emerald-50 border-emerald-100 text-emerald-900" : "bg-rose-50 border-rose-100 text-rose-900"}`}
            >
              <div>
                <p className="text-sm font-bold opacity-70 uppercase tracking-widest mb-1">
                  Total Transaction Amount
                </p>
                <h2 className="text-5xl font-black">
                  ₹{" "}
                  {tx.amount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </h2>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold opacity-70 uppercase tracking-widest mb-1">
                  Transaction Type
                </p>
                <p className="text-xl font-bold">{tx.type.replace("_", " ")}</p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Calendar className="h-3.5 w-3.5" /> Date of Transaction
                  </p>
                  <p className="text-lg font-bold text-slate-800">{tx.date}</p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Building2 className="h-3.5 w-3.5" /> Entity / Company
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {tx.companyName}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <CreditCard className="h-3.5 w-3.5" /> Payment Method
                  </p>
                  <p className="text-lg font-bold text-slate-800 bg-slate-100 inline-block px-3 py-1 rounded-md">
                    {tx.mode || "Not Specified"}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <BookOpen className="h-3.5 w-3.5" /> Impacted Ledger
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {tx.ledgerName}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <User className="h-3.5 w-3.5" /> Processed By
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {tx.userName}
                  </p>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-slate-100 my-8"></div>

            {/* Description / Particulars */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Target / Particulars
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xl font-bold text-slate-900">
                  {tx.particulars}
                </p>
              </div>
            </div>

            {/* Additional Remarks */}
            {tx.remarks && (
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  System Remarks
                </p>
                <p className="text-slate-600 font-medium italic">
                  "{tx.remarks}"
                </p>
              </div>
            )}
          </div>

          {/* Printable Footer */}
          <div className="bg-slate-50 p-6 border-t border-slate-200 text-center text-sm font-bold text-slate-400">
            This is a system-generated secure voucher. No physical signature is
            required.
          </div>
        </div>
      </div>
    </div>
  );
}
