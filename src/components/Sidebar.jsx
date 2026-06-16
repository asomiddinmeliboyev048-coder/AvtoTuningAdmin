import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const NAV = [
  { to: "/", label: "Boshqaruv paneli", icon: LayoutDashboard, end: true },
  { to: "/orders", label: "Buyurtmalar", icon: ShoppingCart },
  { to: "/products", label: "Mahsulotlar", icon: Package },
  { to: "/customers", label: "Mijozlar", icon: Users },
];

const SECONDARY = [
  { to: "/", label: "Sozlamalar", icon: Settings },
  { to: "/", label: "Yordam markazi", icon: LifeBuoy },
];

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  return (
    <aside
      className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${
        mobileOpen ? "sidebar--mobile-open" : ""
      }`}
    >
      <div className="sidebar__brand">
        <span className="sidebar__logo">
          <span className="sidebar__logo-mark">APEX</span>
          <span className="sidebar__logo-dot" />
        </span>
        <span className="sidebar__logo-text">Admin</span>
      </div>

      <nav className="sidebar__nav">
        <div className="sidebar__group-label">Asosiy</div>
        {NAV.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="sidebar__group-label">Tizim</div>
        {SECONDARY.map((item) => (
          <button
            key={item.label}
            className="sidebar__link"
            onClick={onCloseMobile}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">AS</div>
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">Asomiddin</span>
            <span className="sidebar__user-role">Administrator</span>
          </div>
          <button className="sidebar__logout" aria-label="Chiqish">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
