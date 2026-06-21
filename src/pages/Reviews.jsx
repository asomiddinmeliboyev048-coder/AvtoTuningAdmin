// Fikr moderatsiya — saytdan kelgan baholar (Firestore 'reviews').
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Star, Check, Ban, Trash2, RefreshCw } from "lucide-react";
import { db } from "../lib/firebase.js";
import "./Table.css";

export default function Reviews() {
  const [rows, setRows] = useState([]);
  const [tab, setTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "reviews"));
    setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await updateDoc(doc(db, "reviews", id), { status });
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  };
  const remove = async (id) => {
    if (!confirm("Fikrni o'chirasizmi?")) return;
    await deleteDoc(doc(db, "reviews", id));
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const shown = tab === "all" ? rows : rows.filter((r) => r.status === "pending");

  return (
    <div className="fade-up">
      <div className="page-head">
        <div><h1>Fikrlar</h1><p>Mijoz fikrlarini tasdiqlang — tasdiqlangani saytda ko'rinadi.</p></div>
        <button className="btn btn-ghost" onClick={load}><RefreshCw size={15} /> Yangilash</button>
      </div>

      <div className="table-filters" style={{ marginBottom: 18 }}>
        <button className={`pill ${tab === "pending" ? "pill--active" : ""}`} onClick={() => setTab("pending")}>Kutilmoqda</button>
        <button className={`pill ${tab === "all" ? "pill--active" : ""}`} onClick={() => setTab("all")}>Hammasi</button>
      </div>

      <div className="rmod__grid">
        {shown.map((r) => (
          <div key={r.id} className="card rmod__card">
            <div className="rmod__top">
              <div className="rmod__av" style={r.photo ? { backgroundImage: `url(${r.photo})` } : undefined}>{!r.photo && (r.name || "?")[0]?.toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <p className="table-strong">{r.name}</p>
                <div className="rmod__stars">{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={13} fill={n <= r.rating ? "#ffcf3d" : "none"} color="#ffcf3d" />)}</div>
              </div>
              <span className={`badge ${r.status === "approved" ? "badge--green" : r.status === "rejected" ? "badge--red" : "badge--amber"}`}>{r.status}</span>
            </div>
            <p className="rmod__text">“{r.text}”</p>
            <div className="rmod__actions">
              {r.status !== "approved" && <button className="btn btn-primary vmod__btn" onClick={() => setStatus(r.id, "approved")}><Check size={14} /> Tasdiqlash</button>}
              {r.status !== "rejected" && <button className="btn btn-ghost vmod__btn" onClick={() => setStatus(r.id, "rejected")}><Ban size={14} /> Rad</button>}
              <button className="btn btn-ghost vmod__btn vmod__btn--del" onClick={() => remove(r.id)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {!loading && shown.length === 0 && <p className="table-empty">Fikr yo'q.</p>}
        {loading && <p className="table-empty">Yuklanmoqda...</p>}
      </div>
    </div>
  );
}
