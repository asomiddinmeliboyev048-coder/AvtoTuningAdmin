import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Orders from "./pages/Orders.jsx";
import Products from "./pages/Products.jsx";
import Customers from "./pages/Customers.jsx";
import Bookings from "./pages/Bookings.jsx";
import VideosMod from "./pages/VideosMod.jsx";
import Reviews from "./pages/Reviews.jsx";
import Login from "./pages/Login.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import "./App.css";

export default function App() {
  const { user, isAdmin, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#8a90a0" }}>Yuklanmoqda...</div>;
  }
  if (!user || !isAdmin) return <Login />;

  return (
    <div className={`layout ${collapsed ? "layout--collapsed" : ""}`}>
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="layout__main">
        <Topbar onToggleSidebar={() => setCollapsed((v) => !v)} onToggleMobile={() => setMobileOpen((v) => !v)} />
        <div className="layout__content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/videos" element={<VideosMod />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </div>
      </div>
      {mobileOpen && <div className="layout__overlay" onClick={() => setMobileOpen(false)} />}
    </div>
  );
}
