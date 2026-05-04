"use client";

import { useEffect, useState } from "react";
import {
  Landmark,
  Plus,
  Edit,
  IndianRupee,
  Trash2,
  Paperclip,
} from "lucide-react";
import { PageHeader } from "@/components/reusable/page-header";
import { DataTableShell } from "@/components/reusable/data-table-shell";
import {
  TransactionFilterBox,
  TransactionFilters,
} from "@/components/reusable/transaction-filter";
import {
  getBankReceiptData,
  saveBankReceipt,
  deleteTransaction,
} from "@/app/actions/receipts/bank";

export default function BankReceiptPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeFilters, setActiveFilters] = useState<TransactionFilters | null>(
    null,
  );

  // Data State
  const [receipts, setReceipts] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [ledgers, setLedgers] = useState<any[]>([]);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyId: "",
    amount: "",
    paymentMode: "UPI",
    businessDate: new Date().toISOString().split("T")[0],
    ledgerId: "",
    remarks: "",
  });

  // Load Data on Mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (filters: TransactionFilters | null = null) => {
    setIsLoading(true);
    const data = await getBankReceiptData(filters || undefined);

    if (data.success) {
      setReceipts(data.transactions);
      setCompanies(data.companies);
      setLedgers(data.ledgers);

      // Set defaults for form if data exists and we aren't editing
      if (data.companies.length > 0 && !editingId)
        setFormData((f) => ({ ...f, companyId: data.companies[0].id }));
    }
    setIsLoading(false);
  };

  // <-- New handler for the Search button
  const handleSearch = (filters: TransactionFilters) => {
    setActiveFilters(filters); // Save current filters
    fetchData(filters); // Fetch filtered data
  };

  // Derived state: Filter ledgers dynamically based on selected Company
  const availableLedgers = ledgers.filter((l) => {
    // If the ledger has no mapped companies, it's globally available
    if (!l.companies || l.companies.length === 0) return true;
    // Otherwise, check if it's explicitly assigned to the selected company
    return l.companies.some((c: any) => c.companyId === formData.companyId);
  });

 const handleInputChange = (
   e: React.ChangeEvent<
     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
   >,
 ) => {
   const { name, value } = e.target;

   setFormData((prev) => {
     const newData = { ...prev, [name]: value };

     // If the user changes the Company, we must validate the currently selected Ledger
     if (name === "companyId") {
       const newValidLedgers = ledgers.filter((l) => {
         if (!l.companies || l.companies.length === 0) return true;
         return l.companies.some((c: any) => c.companyId === value);
       });

       // If the old ledger is not allowed for the new company, clear the ledger selection
       if (!newValidLedgers.some((l) => l.id === prev.ledgerId)) {
         newData.ledgerId = "";
       }
     }

     return newData;
   });
 };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({
      companyId:"",
      amount: "",
      paymentMode: "UPI",
      businessDate: new Date().toISOString().split("T")[0],
      ledgerId: "",
      remarks: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (receipt: any) => {
    setEditingId(receipt.id);
    setFormData({
      companyId: receipt.hotelId,
      amount: receipt.amount.toString(),
      paymentMode: receipt.mode,
      businessDate: receipt.bDate,
      ledgerId: receipt.ledgerId,
      remarks: receipt.note !== "-" ? receipt.note : "",
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.companyId || !formData.amount || !formData.ledgerId) {
      return alert(
        "Please fill in all required fields (Hotel, Ledger, and Amount).",
      );
    }

    setIsSaving(true);

    // Pass the ledger name as the particulars to satisfy the database schema
    const selectedLedger = ledgers.find((l) => l.id === formData.ledgerId);
    const ledgerName = selectedLedger
      ? selectedLedger.ledger_name
      : "Ledger Receipt";

    const result = await saveBankReceipt({
      id: editingId,
      ...formData,
      payee: ledgerName,
    });

    if (result.success) {
      await fetchData(activeFilters); // <-- Re-fetch using current filters to preserve view
      setIsModalOpen(false);
    } else {
      alert("Error saving transaction: " + result.error);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this receipt?"))
      return;

    const result = await deleteTransaction(id);
    if (result.success) {
      await fetchData();
    } else {
      alert("Error deleting: " + result.error);
    }
  };

  // Automatically calculate the sum of visible receipts
  const subTotal = receipts.reduce((sum, item) => sum + Number(item.amount), 0);

  // Helper to format dates for display
  const formatDateDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen">
      <PageHeader
        title="Bank Receipt Entry"
        description="Record non-cash receipts like UPI, Card, and Bank Transfers purely against specific ledgers."
        icon={Landmark}
        actionButton={
          <button
            onClick={openNewModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 text-white rounded-lg text-sm font-bold hover:bg-cyan-700 transition-all shadow-sm hover:shadow-md hover:shadow-cyan-600/20"
          >
            <Plus className="h-4 w-4" /> New Bank Receipt
          </button>
        }
      />

      <TransactionFilterBox showPayee={true} onSearch={handleSearch} />

      <div className="flex justify-end px-6 mb-2 -mt-2">
        <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm flex items-center gap-3">
          <span className="text-sm font-bold text-slate-500 uppercase">
            Sub Total:
          </span>
          <span className="text-lg font-extrabold text-cyan-600">
            ₹ {subTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <DataTableShell
        title="Bank Receipts Grid"
        searchPlaceholder="Search by ID or Remarks..."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-4">Voucher & Hotel</th>
                <th className="px-5 py-4">Ledger Account</th>
                <th className="px-5 py-4 text-right">Amount (₹)</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Mode</th>
                <th className="px-5 py-4">Remarks</th>
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-slate-500 font-medium"
                  >
                    Loading records...
                  </td>
                </tr>
              ) : receipts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-slate-500 font-medium"
                  >
                    No bank receipts found.
                  </td>
                </tr>
              ) : (
                receipts.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="font-bold text-slate-900">
                        {item.voucherNo}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5">
                        {item.hotel}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex px-2 py-1 bg-cyan-50 text-cyan-700 border border-cyan-100 rounded text-xs font-bold uppercase tracking-wider">
                        {item.account}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-extrabold text-cyan-600 text-base">
                      {Number(item.amount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-semibold text-slate-800 text-sm">
                        Biz: {formatDateDisplay(item.bDate)}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-700">
                        {item.mode}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div
                        className="text-sm text-slate-700 font-medium truncate max-w-37.5"
                        title={item.note}
                      >
                        {item.note}
                      </div>
                      <div className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide flex items-center gap-1">
                        User: {item.user}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-colors shadow-sm"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 rounded-lg transition-colors shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </DataTableShell>

      {/* Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 bg-cyan-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-cyan-800 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-cyan-600" />
                {editingId ? "Edit Bank Receipt" : "New Bank Receipt"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-cyan-800/60 hover:text-cyan-900 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Company <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 font-semibold outline-none cursor-pointer"
                  >
                    <option value="">
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
                    Credit Account (Ledger){" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="ledgerId"
                    value={formData.ledgerId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 font-semibold outline-none cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
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
                      No active ledgers are assigned to this property.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Amount (₹) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-600" />
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 font-extrabold text-cyan-600 outline-none text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Payment Mode <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 font-semibold cursor-pointer outline-none"
                  >
                    <option value="UPI">UPI / Wallet</option>
                    <option value="Bank Transfer">
                      Bank Transfer (NEFT/RTGS/IMPS)
                    </option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Business Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="businessDate"
                    value={formData.businessDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Attachments{" "}
                    <small className="text-slate-400 font-medium">
                      (Proof)
                    </small>
                  </label>
                  <div className="border border-dashed border-slate-300 rounded-xl p-2.5 flex items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer bg-white">
                    <Paperclip className="h-5 w-5 text-slate-400 mr-2" />
                    <span className="text-sm font-bold text-slate-600">
                      Choose files...
                    </span>
                  </div>
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
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 font-semibold outline-none"
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
                className="px-6 py-2.5 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700 transition-colors shadow-sm disabled:opacity-70"
              >
                {isSaving ? "Saving..." : "Save Receipt"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
