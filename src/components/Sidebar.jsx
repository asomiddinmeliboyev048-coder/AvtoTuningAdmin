import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, Package, Users,
  Wrench, Video, Star, LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import "./Sidebar.css";

const NAV = [
  { to: "/", label: "Boshqaruv paneli", icon: LayoutDashboard, end: true },
  { to: "/bookings", label: "Navbatlar", icon: Wrench },
  { to: "/orders", label: "Buyurtmalar", icon: ShoppingCart },
  { to: "/videos", label: "Videolar", icon: Video },
  { to: "/reviews", label: "Fikrlar", icon: Star },
  { to: "/products", label: "Mahsulotlar", icon: Package },
  { to: "/customers", label: "Mijozlar", icon: Users },
];

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  const { profile, logout } = useAuth();
  const name = profile?.name || profile?.displayName || "Admin";
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${mobileOpen ? "sidebar--mobile-open" : ""}`}>
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
            className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">{initials}</div>
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">{name}</span>
            <span className="sidebar__user-role">Administrator</span>
          </div>
          <button className="sidebar__logout" aria-label="Chiqish" onClick={logout}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
