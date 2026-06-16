import { useMemo, useState } from "react";
import { Search, Plus, Mail, MoreHorizontal } from "lucide-react";
import { CUSTOMERS, tierToBadge } from "../data/mock.js";
import "./Table.css";

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Customers() {
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      CUSTOMERS.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="fade-up">
      <div className="page-head">
        <div>
          <h1>Mijozlar</h1>
          <p>Mijozlar bazasi va ularning faolligi.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> Mijoz qo'shish
        </button>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="table-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ism yoki email bo'yicha qidirish…"
            />
          </div>
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Mijoz</th>
                <th>Email</th>
                <th>Buyurtmalar</th>
                <th>Sarflagan</th>
                <th>Daraja</th>
                <th>Ro'yxatdan o'tgan</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="table-product">
                      <span className="table-avatar">{initials(c.name)}</span>
                      <span className="table-strong">{c.name}</span>
                    </div>
                  </td>
                  <td className="table-dim">
                    <span className="table-email">
                      <Mail size={14} /> {c.email}
                    </span>
                  </td>
                  <td className="table-strong">{c.orders}</td>
                  <td className="table-strong">${c.spent.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${tierToBadge(c.tier)}`}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="table-dim">{c.joined}</td>
                  <td>
                    <button className="table-action" aria-label="Amallar">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="table-empty">
                    Mijoz topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
