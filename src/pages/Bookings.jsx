// Navbatlar (tamirlash so'rovlari) — saytdan keladi (Firestore 'bookings').
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { Phone, RefreshCw } from "lucide-react";
import { db } from "../lib/firebase.js";
import "./Table.css";

const STATUS = [
  { v: "new", label: "Yangi", b: "badge--blue" },
  { v: "called", label: "Qo'ng'iroq qilindi", b: "badge--amber" },
  { v: "scheduled", label: "Navbat belgilandi", b: "badge--green" },
  { v: "done", label: "Bajarildi", b: "badge--green" },
  { v: "cancelled", label: "Bekor", b: "badge--red" },
];
const label = (v) => STATUS.find((s) => s.v === v)?.label || v;
const badge = (v) => STATUS.find((s) => s.v === v)?.b || "badge--blue";

export default function Bookings() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "bookings"), orderBy("createdAt", "desc")));
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, "bookings"));
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const change = async (id, v) => {
    await updateDoc(doc(db, "bookings", id), { status: v });
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status: v } : x)));
  };

  return (
    <div className="fade-up">
      <div className="page-head">
        <div><h1>Navbatlar</h1><p>Tamirlash uchun kelgan so'rovlar — holatini boshqaring.</p></div>
        <button className="btn btn-ghost" onClick={load}><RefreshCw size={15} /> Yangilash</button>
      </div>

      <div className="card table-card">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr><th>Ism</th><th>Telefon</th><th>Xizmat</th><th>Mashina</th><th>Holat</th><th>Boshqarish</th></tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id}>
                  <td className="table-strong">{b.name}</td>
                  <td><a href={`tel:${b.phone}`} className="table-mono" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Phone size={14} /> {b.phone}</a></td>
                  <td className="table-dim">{b.service}</td>
                  <td>{b.car || "—"}</td>
                  <td><span className={`badge ${badge(b.status)}`}>{label(b.status)}</span></td>
                  <td>
                    <select value={b.status} onChange={(e) => change(b.id, e.target.value)} className="table-select">
                      {STATUS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 && <tr><td colSpan={6} className="table-empty">Hozircha navbat so'rovi yo'q.</td></tr>}
              {loading && <tr><td colSpan={6} className="table-empty">Yuklanmoqda...</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="table-foot"><span>{rows.length} ta so'rov</span></div>
      </div>
    </div>
  );
}
