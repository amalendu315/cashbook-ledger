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
  MessageSquareCheck ,
  FileBarChart,
  Users,
  ChevronDown,
  LogOut,
  Landmark,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

// --- Types ---
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

interface NavGroup {
  name: string;
  isGroup: true;
  requiresAdmin?: boolean; // Flag to hide groups from non-admins
  children: NavItem[];
}

type NavigationItem = NavItem | NavGroup;

// --- Navigation Configuration ---
const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Masters",
    isGroup: true,
    requiresAdmin: true, // ONLY ADMIN CAN SEE THIS ENTIRE GROUP
    children: [
      { name: "Group Master", href: "/masters/group", icon: FolderTree },
      { name: "Company Master", href: "/masters/company", icon: Building2 },
      { name: "Ledger Master", href: "/masters/ledger", icon: BookOpen },
      { name: "Payment Mode Master", href: "/masters/payment-mode", icon: MessageSquareCheck },
      { name: "User Management", href: "/user-management", icon: Users },
    ],
  },
  {
    name: "Transactions",
    isGroup: true,
    children: [
      { name: "Cash Receipt", href: "/receipts/cash", icon: ArrowDownToLine },
      { name: "Cash Payment", href: "/payments/cash", icon: ArrowUpFromLine },
      { name: "Bank Receipt", href: "/receipts/bank", icon: Landmark },
      { name: "Bank Payment", href: "/payments/bank", icon: Landmark },
      { name: "Fund Transfer", href: "/fund-transfer", icon: ArrowRightLeft },
    ],
  },
  {
    name: "Reports",
    isGroup: true,
    children: [
      { name: "Company Report", href: "/reports/company", icon: FileBarChart },
      { name: "Ledger Report", href: "/reports/ledger", icon: FileBarChart },
      { name: "Group Report", href: "/reports/group", icon: FileBarChart },
    ],
  },
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

  // Filter navigation items based on the user's role
  const userRole = session?.user?.role || "USER";
  const filteredNavigation = navigation.filter((item) => {
    if ("requiresAdmin" in item && item.requiresAdmin) {
      return userRole === "ADMIN";
    }
    return true;
  });

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 h-full border-r border-slate-800 z-20">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950 shrink-0">
        <Building2 className="h-6 w-6 text-blue-500 mr-3" />
        <span className="text-white font-bold text-lg tracking-wide">
          CASHBOOK
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="space-y-1 px-3">
          {filteredNavigation.map((item, index) => {
            // Render Grouped Items (Masters, Transactions, Reports)
            if ("isGroup" in item) {
              const isActiveGroup = item.children.some((child) =>
                pathname.startsWith(child.href),
              );
              const isOpen = openDropdowns[item.name] == false; // Default open, unless toggled

              return (
                <div key={index} className="pt-2 pb-1">
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-1 space-y-1">
                      {item.children.map((child) => {
                        const isActive = pathname.startsWith(child.href);
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
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
                  )}
                </div>
              );
            }

            // Render Standard Top-Level Items (Dashboard)
            const navItem = item as NavItem;
            const isActive = pathname === navItem.href;

            return (
              <div key={navItem.name} className="pb-2">
                <Link
                  href={navItem.href}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
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
              </div>
            );
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
                {userRole}
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
