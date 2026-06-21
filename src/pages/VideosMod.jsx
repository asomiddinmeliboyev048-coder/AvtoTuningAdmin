// Video moderatsiya — saytdan yuklangan videolar (Firestore 'videos').
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Check, Ban, Trash2, RefreshCw } from "lucide-react";
import { db } from "../lib/firebase.js";
import "./Table.css";

function ytThumb(url = "") {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : "";
}

export default function VideosMod() {
  const [rows, setRows] = useState([]);
  const [tab, setTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "videos"));
    setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await updateDoc(doc(db, "videos", id), { status });
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  };
  const remove = async (id) => {
    if (!confirm("Videoni o'chirasizmi?")) return;
    await deleteDoc(doc(db, "videos", id));
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const shown = tab === "all" ? rows : rows.filter((v) => v.status === "pending");

  return (
    <div className="fade-up">
      <div className="page-head">
        <div><h1>Video moderatsiya</h1><p>Foydalanuvchi videolarini tasdiqlang yoki rad eting.</p></div>
        <button className="btn btn-ghost" onClick={load}><RefreshCw size={15} /> Yangilash</button>
      </div>

      <div className="table-filters" style={{ marginBottom: 18 }}>
        <button className={`pill ${tab === "pending" ? "pill--active" : ""}`} onClick={() => setTab("pending")}>Kutilmoqda</button>
        <button className={`pill ${tab === "all" ? "pill--active" : ""}`} onClick={() => setTab("all")}>Hammasi</button>
      </div>

      <div className="vmod__grid">
        {shown.map((v) => (
          <div key={v.id} className="card vmod__card">
            <div className="vmod__thumb" style={{ backgroundImage: `url(${v.thumbnailURL || ytThumb(v.youtubeURL)})` }}>
              <span className={`badge ${v.status === "approved" ? "badge--green" : v.status === "rejected" ? "badge--red" : "badge--amber"}`}>{v.status}</span>
            </div>
            <div className="vmod__body">
              <p className="vmod__title">{v.title}</p>
              <p className="vmod__author">{v.userName || "Foydalanuvchi"}</p>
              <div className="vmod__actions">
                {v.status !== "approved" && <button className="btn btn-primary vmod__btn" onClick={() => setStatus(v.id, "approved")}><Check size={14} /> Tasdiqlash</button>}
                {v.status !== "rejected" && <button className="btn btn-ghost vmod__btn" onClick={() => setStatus(v.id, "rejected")}><Ban size={14} /> Rad</button>}
                <button className="btn btn-ghost vmod__btn vmod__btn--del" onClick={() => remove(v.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
        {!loading && shown.length === 0 && <p className="table-empty">Video yo'q.</p>}
        {loading && <p className="table-empty">Yuklanmoqda...</p>}
      </div>
    </div>
  );
}
