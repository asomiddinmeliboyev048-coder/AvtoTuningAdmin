import { Menu, Search, Bell, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import "./Topbar.css";

export default function Topbar({ onToggleSidebar, onToggleMobile }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          className="topbar__icon-btn topbar__desktop-toggle"
          onClick={onToggleSidebar}
          aria-label="Sidebar"
        >
          <Menu size={20} />
        </button>
        <button
          className="topbar__icon-btn topbar__mobile-toggle"
          onClick={onToggleMobile}
          aria-label="Menyu"
        >
          <Menu size={20} />
        </button>

        <div className="topbar__search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buyurtma, mijoz yoki mahsulot qidiring…"
          />
          <kbd>⌘K</kbd>
        </div>
      </div>

      <div className="topbar__right">
        <button
          className="topbar__icon-btn"
          onClick={toggleTheme}
          aria-label="Mavzu"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <button
          className="topbar__icon-btn topbar__bell"
          aria-label="Bildirishnomalar"
        >
          <Bell size={19} />
          <span className="topbar__dot" />
        </button>
        <div className="topbar__profile">
          <div className="topbar__avatar">AS</div>
          <div className="topbar__profile-info">
            <span className="topbar__profile-name">Asomiddin</span>
            <span className="topbar__profile-role">Admin</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
