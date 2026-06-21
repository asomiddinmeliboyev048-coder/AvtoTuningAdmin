// Buyurtmalar — saytdagi savatdan keladi (Firestore 'orders').
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { RefreshCw } from "lucide-react";
import { db } from "../lib/firebase.js";
import "./Table.css";

const STATUS = [
  { v: "new", label: "Yangi", b: "badge--blue" },
  { v: "processing", label: "Bajarilmoqda", b: "badge--amber" },
  { v: "done", label: "Yakunlandi", b: "badge--green" },
  { v: "cancelled", label: "Bekor qilindi", b: "badge--red" },
];
const label = (v) => STATUS.find((s) => s.v === v)?.label || v;
const badge = (v) => STATUS.find((s) => s.v === v)?.b || "badge--blue";

export default function Orders() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, "orders"));
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const change = async (id, v) => {
    await updateDoc(doc(db, "orders", id), { status: v });
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status: v } : x)));
  };

  const total = rows.reduce((s, o) => s + (o.total || 0), 0);

  return (
    <div className="fade-up">
      <div className="page-head">
        <div><h1>Buyurtmalar</h1><p>Dokon savatidan kelgan buyurtmalar.</p></div>
        <button className="btn btn-ghost" onClick={load}><RefreshCw size={15} /> Yangilash</button>
      </div>

      <div className="card table-card">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr><th>Mijoz</th><th>Telefon</th><th>Mahsulotlar</th><th>Summa</th><th>Holat</th><th>Boshqarish</th></tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id}>
                  <td className="table-strong">{o.name || "—"}</td>
                  <td className="table-mono">{o.phone || "—"}</td>
                  <td className="table-dim">{(o.items || []).map((i) => `${i.name}×${i.qty}`).join(", ")}</td>
                  <td className="table-strong">${(o.total || 0).toLocaleString()}</td>
                  <td><span className={`badge ${badge(o.status)}`}>{label(o.status)}</span></td>
                  <td>
                    <select value={o.status} onChange={(e) => change(o.id, e.target.value)} className="table-select">
                      {STATUS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 && <tr><td colSpan={6} className="table-empty">Hozircha buyurtma yo'q.</td></tr>}
              {loading && <tr><td colSpan={6} className="table-empty">Yuklanmoqda...</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="table-foot"><span>{rows.length} ta buyurtma</span><span className="table-strong">Jami: ${total.toLocaleString()}</span></div>
      </div>
    </div>
  );
}
