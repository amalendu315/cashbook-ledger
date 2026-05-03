"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Menu,
  FileText,
  BookOpen,
  Building2,
  Loader2,
  Clock,
  Calendar,
} from "lucide-react";
import { performGlobalSearch } from "@/app/actions/global-search";

export function TopNav() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  // Search State
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Hydration safety and Live Clock
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle clicking outside the search box to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced Search Logic
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults(null);
      setShowDropdown(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      setShowDropdown(true);

      const res = await performGlobalSearch(query);
      if (res.success) {
        setResults(res.results);
      }

      setIsSearching(false);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Greeting Logic
  const hour = time.getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-50 shadow-sm relative">
      <div className="flex items-center flex-1">
        <button className="md:hidden text-slate-500 hover:text-slate-700 mr-4">
          <Menu className="h-6 w-6" />
        </button>

        {/* Global Search - Wrapped tightly to enforce dropdown positioning */}
        <div
          className="hidden sm:flex max-w-xl w-full relative"
          ref={searchRef}
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (query.length >= 2) setShowDropdown(true);
              }}
              className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-inner"
              placeholder="Search transactions, ledgers, or companies..."
            />

            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
              </div>
            )}

            {/* YouTube-style Search Dropdown - Now using standard 'top-full mt-2' */}
            {showDropdown && results && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-100 max-h-100 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Transactions Section */}
                {results.transactions.length > 0 && (
                  <div className="border-b border-slate-100 last:border-0 pb-2">
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                      Transactions
                    </div>
                    {results.transactions.map((tx: any) => (
                      <a
                        href={`/reports/transactions/${tx.id}`} // Dynamic report route
                        key={tx.id}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors group cursor-pointer"
                      >
                        <div className="bg-blue-100 p-2 rounded-md mr-3 group-hover:bg-blue-200 transition-colors">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">
                            {tx.voucherNo} • {tx.company}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            ₹{tx.amount} • {tx.type.replace("_", " ")} •{" "}
                            {tx.date}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {/* Ledgers Section */}
                {results.ledgers.length > 0 && (
                  <div className="border-b border-slate-100 last:border-0 pb-2">
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                      Ledgers
                    </div>
                    {results.ledgers.map((ledger: any) => (
                      <a
                        href={`/reports/ledger/${ledger.id}`} // Dynamic report route
                        key={ledger.id}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center px-4 py-3 hover:bg-emerald-50 transition-colors group cursor-pointer"
                      >
                        <div className="bg-emerald-100 p-2 rounded-md mr-3 group-hover:bg-emerald-200 transition-colors">
                          <BookOpen className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">
                            {ledger.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {ledger.type}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {/* Companies Section */}
                {results.companies.length > 0 && (
                  <div className="border-b border-slate-100 last:border-0 pb-2">
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                      Companies
                    </div>
                    {results.companies.map((company: any) => (
                      <a
                        href={`/reports/company/${company.id}`} // Dynamic report route
                        key={company.id}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center px-4 py-3 hover:bg-purple-50 transition-colors group cursor-pointer"
                      >
                        <div className="bg-purple-100 p-2 rounded-md mr-3 group-hover:bg-purple-200 transition-colors">
                          <Building2 className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700 group-hover:text-purple-700">
                            {company.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Code: {company.code}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {/* No Results Fallback */}
                {results.transactions.length === 0 &&
                  results.ledgers.length === 0 &&
                  results.companies.length === 0 &&
                  !isSearching && (
                    <div className="p-6 text-center text-slate-500">
                      <Search className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                      <p className="text-sm">No results found for "{query}"</p>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Greeting & Clock */}
      <div className="flex items-center">
        {mounted ? (
          <div className="flex flex-col items-end animate-in fade-in duration-500">
            <span className="text-sm font-bold text-slate-700">
              {greeting}!
            </span>
            <div className="flex items-center text-xs text-slate-500 mt-0.5 gap-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />{" "}
                {time.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 font-medium text-slate-600">
                <Clock className="h-3 w-3" />{" "}
                {time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <div className="h-4 w-24 bg-slate-100 animate-pulse rounded"></div>
            <div className="h-3 w-40 bg-slate-100 animate-pulse rounded mt-1"></div>
          </div>
        )}
      </div>
    </header>
  );
}
