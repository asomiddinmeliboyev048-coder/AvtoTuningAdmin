// Mahsulotlar — Firestore 'products'. Qo'shish modali (rasm Supabase'ga yuklanadi).
// Bu yerdan qo'shilgan mahsulot asosiy sayt Dokon bo'limida ko'rinadi.
import { useEffect, useRef, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { Plus, Trash2, X, UploadCloud, RefreshCw } from "lucide-react";
import { db } from "../lib/firebase.js";
import { uploadFile } from "../lib/supabase.js";
import "./Table.css";

const CATEGORIES = ["Disk", "Filter", "Moy", "Aksessuar", "Lamp", "Tana", "Dvigatel", "Tormoz", "Optika", "Xodovoy"];

export default function Products() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", category: "Disk", price: "", stock: "", description: "", imageURL: "" });
  const fileRef = useRef(null);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "products"), orderBy("createdAt", "desc")));
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, "products"));
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true); setErr("");
    try {
      const { url } = await uploadFile("products", f);
      setForm((s) => ({ ...s, imageURL: url }));
    } catch (e2) {
      setErr("Rasm yuklashda xato: " + (e2.message || "Supabase 'models' bucket'ga INSERT policy qo'shing"));
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.name || !form.price) { setErr("Nom va narx majburiy"); return; }
    setSaving(true); setErr("");
    try {
      await addDoc(collection(db, "products"), {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock) || 0,
        description: form.description,
        imageURL: form.imageURL,
        image: form.imageURL,
        createdAt: serverTimestamp(),
      });
      setForm({ name: "", category: "Disk", price: "", stock: "", description: "", imageURL: "" });
      setOpen(false);
      load();
    } catch (e2) {
      setErr(e2.message || "Xatolik");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Mahsulotni o'chirasizmi?")) return;
    await deleteDoc(doc(db, "products", id));
    setRows((r) => r.filter((x) => x.id !== id));
  };

  return (
    <div className="fade-up">
      <div className="page-head">
        <div><h1>Mahsulotlar</h1><p>Dokon mahsulotlari — qo'shing, bu saytda ko'rinadi.</p></div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={load}><RefreshCw size={15} /></button>
          <button className="btn btn-primary" onClick={() => setOpen(true)}><Plus size={16} /> Mahsulot qo'shish</button>
        </div>
      </div>

      <div className="card table-card">
        <div className="table-scroll">
          <table className="table">
            <thead><tr><th>Rasm</th><th>Nomi</th><th>Kategoriya</th><th>Narx</th><th>Stok</th><th></th></tr></thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td><div className="prod__thumb" style={{ backgroundImage: `url(${p.imageURL || p.image || ""})` }} /></td>
                  <td className="table-strong">{p.name}</td>
                  <td className="table-dim">{p.category}</td>
                  <td className="table-strong">${Number(p.price || 0).toLocaleString()}</td>
                  <td>{p.stock ?? 0}</td>
                  <td><button className="btn btn-ghost vmod__btn vmod__btn--del" onClick={() => remove(p.id)}><Trash2 size={14} /></button></td>
                </tr>
              ))}
              {!loading && rows.length === 0 && <tr><td colSpan={6} className="table-empty">Hozircha mahsulot yo'q. “Mahsulot qo'shish”ni bosing.</td></tr>}
              {loading && <tr><td colSpan={6} className="table-empty">Yuklanmoqda...</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="table-foot"><span>{rows.length} ta mahsulot</span></div>
      </div>

      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal__card" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setOpen(false)}><X size={20} /></button>
            <h3 className="modal__title">Yangi mahsulot</h3>

            <label className="modal__label">Nomi *</label>
            <input className="modal__input" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} placeholder="Masalan: Vossen disk 20''" />

            <label className="modal__label">Kategoriya</label>
            <select className="modal__input" value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <div className="modal__row">
              <div style={{ flex: 1 }}>
                <label className="modal__label">Narx ($) *</label>
                <input className="modal__input" type="number" value={form.price} onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="modal__label">Stok</label>
                <input className="modal__input" type="number" value={form.stock} onChange={(e) => setForm((s) => ({ ...s, stock: e.target.value }))} />
              </div>
            </div>

            <label className="modal__label">Tavsif</label>
            <textarea className="modal__input" rows={2} value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />

            <label className="modal__label">Rasm (galereyadan)</label>
            {form.imageURL && <img src={form.imageURL} alt="" className="modal__preview" />}
            <button className="modal__drop" onClick={() => fileRef.current?.click()} disabled={uploading}>
              <UploadCloud size={18} /> {uploading ? "Yuklanmoqda..." : form.imageURL ? "Boshqa rasm" : "Rasm tanlash"}
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />

            {err && <p className="modal__err">{err}</p>}
            <button className="btn btn-primary modal__submit" onClick={save} disabled={saving || uploading}>
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
