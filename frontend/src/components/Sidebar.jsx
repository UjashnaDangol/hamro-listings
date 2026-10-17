
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

export default function Sidebar({collapsed , onToggle}) {

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col
        border-r border-gray-100 bg-white
        transition-[width] duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-60"}`}
    >
      {/* Brand */}
      <div
        className={`flex h-[68px] shrink-0 items-center
          ${collapsed ? "justify-center px-2" : "gap-3 px-4"}`}
      >
        <House
          size={22}
          strokeWidth={2.5}
          className="shrink-0 text-[#7061F5]"
        />

        {!collapsed && (
          <span className="whitespace-nowrap text-sm font-bold text-[#17145C]">
            Hamro Listings
          </span>
        )}

        {!collapsed && (
          <button
            type="button"
            onClick={onToggle}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="ml-auto rounded-md p-1 text-gray-400
              transition-colors hover:bg-violet-50 hover:text-[#7061F5]"
          >
            <PanelLeftClose size={18} />
          </button>
        )}

        {collapsed && (
          <button
            type="button"
           onClick={onToggle}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className="absolute right-[-12px] top-5 rounded-full
              border border-gray-200 bg-white p-1 text-gray-500
              shadow-sm transition-colors hover:text-[#7061F5]"
          >
            <PanelLeftOpen size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex flex-col gap-2 px-2">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `relative flex h-12 shrink-0 items-center rounded-lg
                transition-colors duration-200
                ${
                  collapsed
                    ? "justify-center px-0"
                    : "gap-4 px-3"
                }
                ${
                  isActive
                    ? "bg-violet-50 text-[#7061F5]"
                    : "text-[#ADADAD] hover:bg-gray-50 hover:text-gray-600"
                }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <span
                    className="absolute -left-2 top-2 bottom-2
                      w-[3px] rounded-r-full bg-[#7061F5]"
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
                {!collapsed && (
                  <span className="whitespace-nowrap text-xs font-medium">
                    {label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}