import { useMemo, useState } from "react";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";
import { ORDERS, statusToBadge } from "../data/mock.js";
import "./Table.css";

const STATUSES = [
  "Barchasi",
  "Kutilmoqda",
  "Bajarilmoqda",
  "Yakunlandi",
  "Bekor qilindi",
];

export default function Orders() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Barchasi");

  const rows = useMemo(() => {
    return ORDERS.filter((o) => {
      const matchQuery =
        o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.customer.toLowerCase().includes(query.toLowerCase()) ||
        o.car.toLowerCase().includes(query.toLowerCase());
      const matchStatus = status === "Barchasi" || o.status === status;
      return matchQuery && matchStatus;
    });
  }, [query, status]);

  const total = rows.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="fade-up">
      <div className="page-head">
        <div>
          <h1>Buyurtmalar</h1>
          <p>Barcha buyurtmalarni boshqaring va holatini kuzating.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> Yangi buyurtma
        </button>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="table-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ID, mijoz yoki avtomobil bo'yicha qidirish…"
            />
          </div>
          <div className="table-filters">
            {STATUSES.map((s) => (
              <button
                key={s}
                className={`pill ${status === s ? "pill--active" : ""}`}
                onClick={() => setStatus(s)}
              >
                {s}
              </button>
            ))}
            <button className="btn btn-ghost table-filter-btn">
              <Filter size={15} /> Filtr
            </button>
          </div>
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Buyurtma ID</th>
                <th>Mijoz</th>
                <th>Avtomobil</th>
                <th>Xizmat</th>
                <th>Summa</th>
                <th>Holat</th>
                <th>Sana</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id}>
                  <td className="table-mono">{o.id}</td>
                  <td className="table-strong">{o.customer}</td>
                  <td>{o.car}</td>
                  <td className="table-dim">{o.service}</td>
                  <td className="table-strong">${o.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${statusToBadge(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="table-dim">{o.date}</td>
                  <td>
                    <button className="table-action" aria-label="Amallar">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="table-empty">
                    Hech qanday buyurtma topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-foot">
          <span>{rows.length} ta buyurtma ko'rsatildi</span>
          <span className="table-strong">Jami: ${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
