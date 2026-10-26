
import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Home,
  Heart,
  MessagesSquare,
  MapPin,
  Bell,
  UserRound,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  House,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "My Favorites", path: "/favorites", icon: Heart },
  { label: "Messages", path: "/messages", icon: MessagesSquare },
  { label: "My Visits", path: "/visits", icon: MapPin },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "Profile", path: "/profile", icon: UserRound },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={mobileOpen}
        aria-controls="dashboard-sidebar"
        className="
          fixed left-4 top-4 z-40
          flex h-10 w-10 items-center justify-center
          rounded-lg border border-gray-200 bg-white
          text-[#7061F5] shadow-sm
          transition-colors hover:bg-violet-50
          md:hidden
        "
      >
        <Menu size={22} />
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        aria-label="Main navigation"
        className={`
          fixed left-0 top-0 z-50
          flex h-dvh flex-col
          border-r border-gray-100 bg-white
          transition-all duration-300 ease-in-out

          w-60
          md:translate-x-0
          ${collapsed ? "md:w-[72px]" : "md:w-60"}

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Brand header */}
        <div
          className={`
            relative flex h-[68px] shrink-0 items-center
            ${collapsed ? "md:justify-center md:px-2" : "gap-3 px-4"}
          `}
        >
          <House
            size={22}
            strokeWidth={2.5}
            className="shrink-0 text-[#7061F5]"
          />

          <span
            className={`
              whitespace-nowrap text-sm font-bold text-[#17145C]
              ${collapsed ? "md:hidden" : "md:block"}
            `}
          >
            Hamro Listings
          </span>

          {/* Desktop collapse button */}
          {!collapsed && (
            <button
              type="button"
              onClick={onToggle}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="
                ml-auto hidden rounded-md p-1
                text-gray-400 transition-colors
                hover:bg-violet-50 hover:text-[#7061F5]
                md:block
              "
            >
              <PanelLeftClose size={18} />
            </button>
          )}

          {/* Desktop expand button */}
          {collapsed && (
            <button
              type="button"
              onClick={onToggle}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="
                absolute right-[-12px] top-5 hidden
                rounded-full border border-gray-200
                bg-white p-1 text-gray-500 shadow-sm
                transition-colors hover:text-[#7061F5]
                md:block
              "
            >
              <PanelLeftOpen size={16} />
            </button>
          )}

          {/* Mobile close button */}
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
            className="
              ml-auto rounded-md p-1 text-gray-500
              hover:bg-violet-50 hover:text-[#7061F5]
              md:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="mt-2 flex flex-col gap-2 overflow-y-auto px-2 pb-4">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              title={collapsed ? label : undefined}
              onClick={closeMobileMenu}
              className={({ isActive }) => `
                relative flex h-12 shrink-0 items-center
                rounded-lg transition-colors duration-200

                ${collapsed ? "md:justify-center md:px-0" : "gap-4 px-3"}

                ${
                  isActive
                    ? "bg-violet-50 text-[#7061F5]"
                    : "text-[#ADADAD] hover:bg-gray-50 hover:text-gray-600"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active route indicator */}
                  {isActive && (
                    <span
                      className="
                        absolute -left-2 bottom-2 top-2
                        w-[3px] rounded-r-full bg-[#7061F5]
                      "
                    />
                  )}

                  {/* Navigation icon */}
                  <Icon
                    size={21}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="shrink-0"
                    fill={
                      isActive && path === "/"
                        ? "currentColor"
                        : "none"
                    }
                  />

                  {/* Navigation label */}
                  <span
                    className={`
                      whitespace-nowrap text-xs font-medium
                      md:${collapsed ? "hidden" : "inline"}
                    `}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
