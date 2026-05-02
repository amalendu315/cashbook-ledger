"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  FolderTree,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft,
  FileBarChart,
  Users,
  ChevronDown,
  LogOut, // Added LogOut icon
} from "lucide-react";
import { useSession, signOut } from "next-auth/react"; // Added signOut

interface NavSubItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  subItems?: NavSubItem[];
}

interface NavGroup {
  name: string;
  isGroup: true;
  children: NavItem[];
}

type NavigationItem = NavItem | NavGroup;

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Masters",
    isGroup: true,
    children: [
      { name: "Company Master", href: "/masters/company", icon: Building2 },
      { name: "Ledger Master", href: "/masters/ledger", icon: BookOpen },
      { name: "Group Master", href: "/masters/group", icon: FolderTree },
    ],
  },
  {
    name: "Transactions",
    isGroup: true,
    children: [
      {
        name: "Receipts",
        href: "/receipts",
        icon: ArrowDownToLine,
        subItems: [
          { name: "Cash", href: "/receipts/cash" },
          { name: "Bank", href: "/receipts/bank" },
        ],
      },
      {
        name: "Payments",
        href: "/payments",
        icon: ArrowUpFromLine,
        subItems: [
          { name: "Cash", href: "/payments/cash" },
          { name: "Bank", href: "/payments/bank" },
        ],
      },
      { name: "Fund Transfer", href: "/fund-transfer", icon: ArrowRightLeft },
    ],
  },
  {
    name: "Reports",
    isGroup: true,
    children: [
      { name: "Company", href: "/reports/company", icon: FileBarChart },
      { name: "Ledger", href: "/reports/ledger", icon: FileBarChart },
      { name: "Group", href: "/reports/group", icon: FileBarChart },
    ],
  },
  { name: "User Management", href: "/user-management", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // State to track which dropdowns are manually toggled open
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {},
  );

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 h-full border-r border-slate-800 z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950 shrink-0">
        <Building2 className="h-6 w-6 text-blue-500 mr-3" />
        <span className="text-white font-bold text-lg tracking-wide">
          CASHBOOK
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="space-y-1 px-3">
          {navigation.map((item, index) => {
            // Render Grouped Items (Masters, Transactions)
            if ("isGroup" in item) {
              return (
                <div key={index} className="pt-4 pb-2">
                  <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {item.name}
                  </p>

                  {item.children.map((child) => {
                    const hasSubItems =
                      child.subItems && child.subItems.length > 0;
                    const isSubActive = hasSubItems
                      ? child.subItems!.some((sub) =>
                          pathname.startsWith(sub.href),
                        )
                      : false;
                    const isActive =
                      pathname.startsWith(child.href) || isSubActive;

                    // Dropdown is open if manually clicked OR if one of its children is the active route
                    const isOpen = openDropdowns[child.name] || isSubActive;

                    if (hasSubItems) {
                      return (
                        <div key={child.name} className="mb-1">
                          <button
                            onClick={() => toggleDropdown(child.name)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                              isActive
                                ? "bg-blue-600/10 text-blue-400 border border-blue-500/10"
                                : "hover:bg-slate-800 hover:text-white border border-transparent"
                            }`}
                          >
                            <div className="flex items-center">
                              <child.icon
                                className={`mr-3 h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-400"}`}
                              />
                              {child.name}
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>

                          {isOpen && (
                            <div className="pl-11 pr-3 py-1 space-y-1 mt-1">
                              {child.subItems!.map((sub) => {
                                const isSubItemActive = pathname === sub.href;
                                return (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                      isSubItemActive
                                        ? "text-blue-400 bg-blue-600/10"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                    }`}
                                  >
                                    {sub.name}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Render Standard Grouped Item (e.g., Company Master, Fund Transfer)
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all mb-1 ${
                          isActive
                            ? "bg-blue-600/10 text-blue-400 border border-blue-500/10"
                            : "hover:bg-slate-800 hover:text-white border border-transparent"
                        }`}
                      >
                        <child.icon
                          className={`mr-3 h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-400"}`}
                        />
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              );
            }

            // Render Standard Top-Level Items (Dashboard, Reports)
            else {
              const navItem = item as NavItem;
              const isActive = pathname === navItem.href;

              return (
                <Link
                  key={navItem.name}
                  href={navItem.href}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all mb-1 ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/10"
                      : "hover:bg-slate-800 hover:text-white border border-transparent"
                  }`}
                >
                  <navItem.icon
                    className={`mr-3 h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-400"}`}
                  />
                  {navItem.name}
                </Link>
              );
            }
          })}
        </nav>
      </div>

      {/* User Profile & Logout Section */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center overflow-hidden">
            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-inner shrink-0 uppercase">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.name || "Loading..."}
              </p>
              <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">
                {session?.user?.role || "USER"}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Sign Out"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors ml-2 shrink-0"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
