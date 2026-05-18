"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Plus,
  Edit,
  IndianRupee,
  Trash2,
  ChevronDown,
  Landmark,
  Banknote,
  ArrowRightLeft,
} from "lucide-react";
import { PageHeader } from "@/components/reusable/page-header";
import {
  TransactionFilterBox,
  TransactionFilters,
} from "@/components/reusable/transaction-filter";
import {
  getTransactionsData,
  saveTransaction,
  deleteTransactionRecord,
} from "@/app/actions/transactions";

type TxType = "RECEIPT" | "PAYMENT";
type TxCategory = "CASH" | "BANK";

export default function TransactionsHubPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Dropdown states for the "New" buttons
  const [receiptDropdownOpen, setReceiptDropdownOpen] = useState(false);
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);

  // Data State
  const [transactions, setTransactions] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [ledgers, setLedgers] = useState<any[]>([]);
  const [paymentModes, setPaymentModes] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<TransactionFilters | null>(
    null,
  );

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    txType: "RECEIPT" as TxType,
    txCategory: "CASH" as TxCategory,
    companyId: "",
    amount: "",
    paymentModeId: "",
    businessDate: new Date().toISOString().split("T")[0],
    ledgerId: "",
    remarks: "",
  });

  useEffect(() => {
    fetchData({
      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split("T")[0],
      toDate: new Date().toISOString().split("T")[0],
    });
  }, []);

  const fetchData = async (filters: TransactionFilters | null = null) => {
    setIsLoading(true);
    const data = await getTransactionsData(filters || undefined);
    if (data.success) {
      setTransactions(data.transactions || []);
      setCompanies(data.companies || []);
      setLedgers(data.ledgers || []);
      setPaymentModes(data.paymentModes || []);
    }
    setIsLoading(false);
  };

  const handleSearch = (filters: TransactionFilters) => {
    setActiveFilters(filters);
    fetchData(filters);
  };

  // --- Dynamic Filtering Logic for Entry Modal ---
  const availableLedgers = ledgers.filter((l) => {
    if (!l.companies || l.companies.length === 0) return true;
    return l.companies.some((c: any) => c.companyId === formData.companyId);
  });

  const availablePaymentModes = paymentModes.filter((pm) => {
    if (pm.category !== formData.txCategory) return false;
    if (!pm.companies || pm.companies.length === 0) return true;
    return pm.companies.some((c: any) => c.companyId === formData.companyId);
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === "companyId") {
        // Revalidate Ledger
        const newValidLedgers = ledgers.filter((l) => {
          if (!l.companies || l.companies.length === 0) return true;
          return l.companies.some((c: any) => c.companyId === value);
        });
        if (!newValidLedgers.some((l) => l.id === prev.ledgerId)) {
          newData.ledgerId = "";
        }

        // Revalidate Payment Mode
        const newValidPaymentModes = paymentModes.filter((pm) => {
          if (pm.category !== prev.txCategory) return false;
          if (!pm.companies || pm.companies.length === 0) return true;
          return pm.companies.some((c: any) => c.companyId === value);
        });
        if (!newValidPaymentModes.some((pm) => pm.id === prev.paymentModeId)) {
          newData.paymentModeId = "";
        }
      }
      return newData;
    });
  };

  const handleCategorySwitch = (newCategory: TxCategory) => {
    setFormData((prev) => {
      // Find the first valid payment mode for the new category to default to
      const newValidPaymentModes = paymentModes.filter((pm) => {
        if (pm.category !== newCategory) return false;
        if (!pm.companies || pm.companies.length === 0) return true;
        return pm.companies.some((c: any) => c.companyId === prev.companyId);
      });
      return {
        ...prev,
        txCategory: newCategory,
        paymentModeId:
          newValidPaymentModes.length > 0 ? newValidPaymentModes[0].id : "",
      };
    });
  };

  const openNewModal = (type: TxType, category: TxCategory) => {
    setReceiptDropdownOpen(false);
    setPaymentDropdownOpen(false);
    setEditingId(null);
    const defaultCompanyId = companies.length > 0 ? companies[0].id : "";
    const initialValidModes = paymentModes.filter((pm: any) => {
      if (pm.category !== category) return false;
      if (!pm.companies || pm.companies.length === 0) return true;
      return pm.companies.some((c: any) => c.companyId === defaultCompanyId);
    });

    setFormData({
      txType: type,
      txCategory: category,
      companyId: defaultCompanyId,
      amount: "",
      paymentModeId:
        initialValidModes.length > 0 ? initialValidModes[0].id : "",
      businessDate: new Date().toISOString().split("T")[0],
      ledgerId: "",
      remarks: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (tx: any) => {
    setEditingId(tx.id);
    setFormData({
      txType: tx.txType,
      txCategory: tx.txCategory,
      companyId: tx.hotelId,
      amount: tx.amount.toString(),
      paymentModeId: tx.paymentModeId || "",
      businessDate: tx.bDate,
      ledgerId: tx.ledgerId,
      remarks: tx.note !== "-" ? tx.note : "",
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (
      !formData.companyId ||
      !formData.amount ||
      !formData.ledgerId ||
      !formData.paymentModeId
    ) {
      return alert(
        "Please fill in all required fields (Hotel, Ledger, Mode, and Amount).",
      );
    }

    setIsSaving(true);
    const selectedLedger = ledgers.find((l) => l.id === formData.ledgerId);
    const ledgerName = selectedLedger
      ? selectedLedger.ledger_name
      : "Transaction";

    const result = await saveTransaction({
      id: editingId,
      ...formData,
      payee: ledgerName,
    });

    if (result.success) {
      await fetchData(activeFilters);
      setIsModalOpen(false);
    } else {
      alert("Error saving transaction: " + result.error);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm("Are you sure you want to permanently delete this transaction?")
    )
      return;
    const result = await deleteTransactionRecord(id);
    if (result.success) fetchData(activeFilters);
    else alert("Error deleting: " + result.error);
  };

  // Divide data into the two sides
  const receiptsList = transactions.filter((t) => t.txType === "RECEIPT");
  const paymentsList = transactions.filter((t) => t.txType === "PAYMENT");

  const totalReceipts = receiptsList.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );
  const totalPayments = paymentsList.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  // --- Theme Helper Variables ---
  const isReceipt = formData.txType === "RECEIPT";
  const themeColor = isReceipt ? "emerald" : "rose";

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50 min-h-screen w-full max-w-full">
      <PageHeader
        title="Transactions Hub"
        description="Unified interface to record and manage all inward and outward financial movements."
        icon={ArrowRightLeft}
      />

      <TransactionFilterBox
        companies={companies}
        paymentModes={paymentModes}
        ledgers={ledgers}
        onSearch={handleSearch}
      />

      {/* Global Click-Away for Dropdowns */}
      {(receiptDropdownOpen || paymentDropdownOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setReceiptDropdownOpen(false);
            setPaymentDropdownOpen(false);
          }}
        />
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 items-start">
        {/* RECEIPTS COLUMN */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-emerald-50/50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                <ArrowDownToLine className="h-5 w-5 text-emerald-600" />{" "}
                Receipts (Inwards)
              </h2>
              <p className="text-xs font-bold text-emerald-600 mt-1">
                Total: ₹ {totalReceipts.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="relative z-20">
              <button
                onClick={() => setReceiptDropdownOpen(!receiptDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" /> New{" "}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {receiptDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                  <button
                    onClick={() => openNewModal("RECEIPT", "CASH")}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 border-b border-slate-100 flex items-center gap-2"
                  >
                    <Banknote className="h-4 w-4 text-emerald-600" /> Cash
                    Receipt
                  </button>
                  <button
                    onClick={() => openNewModal("RECEIPT", "BANK")}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Landmark className="h-4 w-4 text-emerald-600" /> Bank
                    Receipt
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="overflow-x-auto min-h-75">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Voucher & Date</th>
                  <th className="px-4 py-3">Ledger & Hotel</th>
                  <th className="px-4 py-3">Mode</th>
                  <th className="px-4 py-3 text-right">Amount (₹)</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">
                      Loading...
                    </td>
                  </tr>
                ) : receiptsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">
                      No receipts found.
                    </td>
                  </tr>
                ) : (
                  receiptsList.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">
                          {item.voucherNo}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                          {item.bDate}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-emerald-700 truncate max-w-37.5">
                          {item.account}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 mt-0.5 truncate max-w-37.5">
                          {item.hotel}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.txCategory === "CASH" ? "bg-green-100 text-green-700" : "bg-cyan-100 text-cyan-700"}`}
                        >
                          {item.paymentModeName}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-extrabold text-emerald-600">
                        {Number(item.amount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-1.5">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-md transition-colors"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 rounded-md transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAYMENTS COLUMN */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-rose-50/50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-rose-900 flex items-center gap-2">
                <ArrowUpFromLine className="h-5 w-5 text-rose-600" /> Payments
                (Outwards)
              </h2>
              <p className="text-xs font-bold text-rose-600 mt-1">
                Total: ₹ {totalPayments.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="relative z-20">
              <button
                onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition-all shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" /> New{" "}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {paymentDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                  <button
                    onClick={() => openNewModal("PAYMENT", "CASH")}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 border-b border-slate-100 flex items-center gap-2"
                  >
                    <Banknote className="h-4 w-4 text-rose-600" /> Cash Payment
                  </button>
                  <button
                    onClick={() => openNewModal("PAYMENT", "BANK")}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Landmark className="h-4 w-4 text-rose-600" /> Bank Payment
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="overflow-x-auto min-h-75">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Voucher & Date</th>
                  <th className="px-4 py-3">Ledger & Hotel</th>
                  <th className="px-4 py-3">Mode</th>
                  <th className="px-4 py-3 text-right">Amount (₹)</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">
                      Loading...
                    </td>
                  </tr>
                ) : paymentsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  paymentsList.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">
                          {item.voucherNo}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                          {item.bDate}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-rose-700 truncate max-w-37.5">
                          {item.account}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 mt-0.5 truncate max-w-37.5">
                          {item.hotel}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.txCategory === "CASH" ? "bg-orange-100 text-orange-700" : "bg-purple-100 text-purple-700"}`}
                        >
                          {item.paymentModeName}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-extrabold text-rose-600">
                        {Number(item.amount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-1.5">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-md transition-colors"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 rounded-md transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Unified Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div
              className={`p-5 border-b border-slate-100 flex justify-between items-center ${isReceipt ? "bg-emerald-50" : "bg-rose-50"}`}
            >
              <h2
                className={`text-lg font-bold flex items-center gap-2 ${isReceipt ? "text-emerald-800" : "text-rose-800"}`}
              >
                {isReceipt ? (
                  <ArrowDownToLine className="h-5 w-5" />
                ) : (
                  <ArrowUpFromLine className="h-5 w-5" />
                )}
                {editingId ? "Edit" : "New"}{" "}
                {formData.txCategory === "CASH" ? "Cash" : "Bank"}{" "}
                {isReceipt ? "Receipt" : "Payment"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {/* Category Segmented Control */}
              <div className="flex bg-slate-100 p-1 rounded-xl w-full mb-6">
                <button
                  type="button"
                  onClick={() => handleCategorySwitch("CASH")}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${formData.txCategory === "CASH" ? `bg-white shadow-sm ${isReceipt ? "text-emerald-700" : "text-rose-700"}` : "text-slate-500 hover:text-slate-700"}`}
                >
                  <Banknote className="h-4 w-4" /> Cash Transaction
                </button>
                <button
                  type="button"
                  onClick={() => handleCategorySwitch("BANK")}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${formData.txCategory === "BANK" ? `bg-white shadow-sm ${isReceipt ? "text-emerald-700" : "text-rose-700"}` : "text-slate-500 hover:text-slate-700"}`}
                >
                  <Landmark className="h-4 w-4" /> Bank Transaction
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Company <span className={`text-${themeColor}-500`}>*</span>
                  </label>
                  <select
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 font-semibold outline-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      --- Select Company ---
                    </option>
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {isReceipt
                      ? "Credit Account (Ledger)"
                      : "Debit Account (Ledger)"}{" "}
                    <span className={`text-${themeColor}-500`}>*</span>
                  </label>
                  <select
                    name="ledgerId"
                    value={formData.ledgerId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 font-semibold outline-none cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed`}
                    disabled={!formData.companyId}
                  >
                    <option value="" disabled>
                      {formData.companyId
                        ? "--- Select Ledger ---"
                        : "--- Select Company First ---"}
                    </option>
                    {availableLedgers.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.ledger_name}
                      </option>
                    ))}
                  </select>
                  {formData.companyId && availableLedgers.length === 0 && (
                    <p className="text-xs text-rose-500 font-medium mt-1.5">
                      No active ledgers assigned to this property.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Amount (₹){" "}
                    <span className={`text-${themeColor}-500`}>*</span>
                  </label>
                  <div className="relative">
                    <IndianRupee
                      className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-${themeColor}-600`}
                    />
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      className={`w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 font-extrabold text-${themeColor}-600 outline-none text-lg`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Payment Mode{" "}
                    <span className={`text-${themeColor}-500`}>*</span>
                  </label>
                  <select
                    name="paymentModeId"
                    value={formData.paymentModeId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 font-semibold cursor-pointer outline-none disabled:bg-slate-50 disabled:cursor-not-allowed`}
                    disabled={!formData.companyId}
                  >
                    <option value="" disabled>
                      {formData.companyId
                        ? "--- Select Mode ---"
                        : "--- Select Company First ---"}
                    </option>
                    {availablePaymentModes.map((pm) => (
                      <option key={pm.id} value={pm.id}>
                        {pm.name}
                      </option>
                    ))}
                  </select>
                  {formData.companyId && availablePaymentModes.length === 0 && (
                    <p className="text-xs text-rose-500 font-medium mt-1.5">
                      No {formData.txCategory.toLowerCase()} modes mapped.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Business Date{" "}
                    <span className={`text-${themeColor}-500`}>*</span>
                  </label>
                  <input
                    type="date"
                    name="businessDate"
                    value={formData.businessDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 font-semibold outline-none`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Remarks / Note
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter transaction details..."
                    className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 font-semibold outline-none`}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2.5 text-white rounded-lg font-bold transition-colors shadow-sm disabled:opacity-70 ${isReceipt ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}
              >
                {isSaving
                  ? "Processing..."
                  : `Save ${isReceipt ? "Receipt" : "Payment"}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
