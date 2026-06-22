// Boshqaruv paneli — REAL Firestore ma'lumotlari (soxta emas).
import { useEffect, useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { Users, ShoppingCart, DollarSign, Wrench, Video, Star } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase.js";
import { som } from "../lib/money.js";
import "./Dashboard.css";

const MONTHS = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"];
const STATUS_COLORS = { new: "#3d6bff", processing: "#ff8a3d", done: "#22c58b", cancelled: "#ff3d3d" };

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tip">
      {label && <div className="chart-tip__label">{label}</div>}
      {payload.map((p) => (
        <div className="chart-tip__row" key={p.dataKey || p.name}>
          <span className="chart-tip__dot" style={{ background: p.color || p.fill }} />
          <span className="chart-tip__name">{p.name}</span>
          <span className="chart-tip__val">{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
}

const relTime = (ts) => {
  if (!ts?.seconds) return "";
  const diff = (Date.now() / 1000 - ts.seconds);
  if (diff < 60) return "hozir";
  if (diff < 3600) return `${Math.floor(diff / 60)} daqiqa oldin`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} soat oldin`;
  return `${Math.floor(diff / 86400)} kun oldin`;
};

export default function Dashboard() {
  const axisStyle = { fontSize: 12, fill: "var(--text-faint)" };
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const get = async (c) => { try { return (await getDocs(collection(db, c))).docs.map((d) => ({ id: d.id, ...d.data() })); } catch { return []; } };
      const [users, orders, bookings, videos, reviews] = await Promise.all([
        get("users"), get("orders"), get("bookings"), get("videos"), get("reviews"),
      ]);
      const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
      const avg = orders.length ? Math.round(revenue / orders.length) : 0;

      // oylik daromad
      const monthly = MONTHS.map((m) => ({ month: m, daromad: 0 }));
      orders.forEach((o) => { if (o.createdAt?.seconds) monthly[new Date(o.createdAt.seconds * 1000).getMonth()].daromad += (o.total || 0); });

      // buyurtma holati
      const statusCount = {};
      orders.forEach((o) => { statusCount[o.status || "new"] = (statusCount[o.status || "new"] || 0) + 1; });
      const statusPie = Object.entries(statusCount).map(([k, v]) => ({ name: k, value: v, color: STATUS_COLORS[k] || "#8a90a0" }));

      // faoliyat
      const activity = [
        ...orders.map((o) => ({ t: o.createdAt, text: `Buyurtma: ${o.name || "mijoz"} · ${som(o.total)}`, type: "order" })),
        ...bookings.map((b) => ({ t: b.createdAt, text: `Navbat: ${b.name || ""} · ${b.service || ""}`, type: "booking" })),
        ...reviews.map((r) => ({ t: r.createdAt, text: `Fikr: ${r.name || ""} (${r.rating}★)`, type: "review" })),
      ].filter((a) => a.t?.seconds).sort((a, b) => b.t.seconds - a.t.seconds).slice(0, 7);

      setData({
        users: users.length, orders: orders.length, revenue, avg,
        bookings: bookings.length,
        pendingVideos: videos.filter((v) => v.status === "pending").length,
        pendingReviews: reviews.filter((r) => r.status === "pending").length,
        newBookings: bookings.filter((b) => b.status === "new").length,
        monthly, statusPie, activity,
      });
    };
    load();
  }, []);

  const kpis = data ? [
    { label: "Foydalanuvchilar", value: data.users, icon: Users, color: "#3d6bff" },
    { label: "Buyurtmalar", value: data.orders, icon: ShoppingCart, color: "#ff8a3d" },
    { label: "Umumiy daromad", value: som(data.revenue), icon: DollarSign, color: "#22c58b" },
    { label: "Navbat so'rovlari", value: data.bookings, icon: Wrench, color: "#ff3d3d" },
  ] : [];

  return (
    <div className="dashboard">
      <div className="page-head">
        <div><h1>Boshqaruv paneli</h1><p>APEX Garage — real vaqt ko'rsatkichlari.</p></div>
      </div>

      {!data ? (
        <p className="table-empty">Yuklanmoqda...</p>
      ) : (
        <>
          <div className="dashboard__kpis">
            {kpis.map((k) => (
              <div key={k.label} className="card kpi-card fade-up">
                <div className="kpi-card__top">
                  <span className="kpi-card__label">{k.label}</span>
                  <span className="kpi-card__ic" style={{ background: k.color + "22", color: k.color }}><k.icon size={18} /></span>
                </div>
                <div className="kpi-card__value">{k.value}</div>
              </div>
            ))}
          </div>

          {/* Moderatsiya kutilmoqda */}
          {(data.newBookings + data.pendingVideos + data.pendingReviews) > 0 && (
            <div className="dashboard__alerts">
              {data.newBookings > 0 && <span className="alert alert--red"><Wrench size={14} /> {data.newBookings} yangi navbat</span>}
              {data.pendingVideos > 0 && <span className="alert alert--amber"><Video size={14} /> {data.pendingVideos} video kutilmoqda</span>}
              {data.pendingReviews > 0 && <span className="alert alert--blue"><Star size={14} /> {data.pendingReviews} fikr kutilmoqda</span>}
            </div>
          )}

          <div className="dashboard__grid">
            <div className="card chart-card chart-card--wide fade-up">
              <div className="chart-card__head"><div><h3>Daromad (oylik)</h3><span className="chart-card__sub">Joriy yil · real buyurtmalar</span></div></div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.monthly} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
                  <defs><linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff3d3d" stopOpacity={0.45} /><stop offset="100%" stopColor="#ff3d3d" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" vertical={false} />
                  <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="daromad" name="Daromad" stroke="#ff3d3d" strokeWidth={2.5} fill="url(#gRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card chart-card fade-up">
              <div className="chart-card__head"><div><h3>Buyurtma holati</h3><span className="chart-card__sub">Real taqsimot</span></div></div>
              {data.statusPie.length === 0 ? (
                <p className="table-empty">Hozircha buyurtma yo'q</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={data.statusPie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={58} outerRadius={92} paddingAngle={3} stroke="none">
                      {data.statusPie.map((s) => <Cell key={s.name} fill={s.color} />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="card chart-card fade-up">
            <div className="chart-card__head"><div><h3>So'nggi faoliyat</h3><span className="chart-card__sub">Real vaqt</span></div></div>
            {data.activity.length === 0 ? (
              <p className="table-empty">Hozircha faoliyat yo'q</p>
            ) : (
              <ul className="activity">
                {data.activity.map((a, i) => (
                  <li className="activity__item" key={i}>
                    <span className={`activity__dot activity__dot--${a.type}`} />
                    <div className="activity__body"><span className="activity__text">{a.text}</span><span className="activity__time">{relTime(a.t)}</span></div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
