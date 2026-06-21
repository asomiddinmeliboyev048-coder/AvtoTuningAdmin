// Mijozlar — real ro'yxatdan o'tgan foydalanuvchilar (Firestore 'users').
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Search, RefreshCw, ShieldCheck } from "lucide-react";
import { db } from "../lib/firebase.js";
import "./Table.css";

export default function Customers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "users"));
    setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((u) => (u.name || u.displayName || "").toLowerCase().includes(s) || (u.email || "").toLowerCase().includes(s));
  }, [rows, q]);

  const fmtDate = (ts) => ts?.seconds ? new Date(ts.seconds * 1000).toLocaleDateString("uz") : "—";

  return (
    <div className="fade-up">
      <div className="page-head">
        <div><h1>Mijozlar</h1><p>Ro'yxatdan o'tgan foydalanuvchilar.</p></div>
        <button className="btn btn-ghost" onClick={load}><RefreshCw size={15} /> Yangilash</button>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="table-search"><Search size={16} /><input placeholder="Ism yoki email bo'yicha qidirish..." value={q} onChange={(e) => setQ(e.target.value)} /></div>
        </div>
        <div className="table-scroll">
          <table className="table">
            <thead><tr><th>Mijoz</th><th>Email</th><th>Telefon</th><th>Mashina</th><th>Rol</th><th>Ro'yxatdan o'tgan</th></tr></thead>
            <tbody>
              {filtered.map((u) => {
                const name = u.name || u.displayName || "Foydalanuvchi";
                return (
                  <tr key={u.id}>
                    <td>
                      <div className="cust__cell">
                        <div className="cust__av" style={u.photoURL ? { backgroundImage: `url(${u.photoURL})` } : undefined}>{!u.photoURL && name.slice(0, 2).toUpperCase()}</div>
                        <span className="table-strong">{name}</span>
                      </div>
                    </td>
                    <td className="table-dim">{u.email}</td>
                    <td className="table-mono">{u.phone || "—"}</td>
                    <td className="table-dim">{u.currentCar || "—"}</td>
                    <td>{u.role === "admin" ? <span className="badge badge--red"><ShieldCheck size={12} style={{ verticalAlign: "-2px" }} /> Admin</span> : <span className="badge badge--blue">User</span>}</td>
                    <td className="table-dim">{fmtDate(u.createdAt)}</td>
                  </tr>
                );
              })}
              {!loading && filtered.length === 0 && <tr><td colSpan={6} className="table-empty">Hozircha ro'yxatdan o'tgan mijoz yo'q.</td></tr>}
              {loading && <tr><td colSpan={6} className="table-empty">Yuklanmoqda...</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="table-foot"><span>{filtered.length} ta mijoz</span></div>
      </div>
    </div>
  );
}
