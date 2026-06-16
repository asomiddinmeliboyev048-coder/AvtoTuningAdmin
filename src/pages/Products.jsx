import { useMemo, useState } from "react";
import { Search, Plus, MoreHorizontal, Package } from "lucide-react";
import { PRODUCTS, statusToBadge } from "../data/mock.js";
import "./Table.css";

export default function Products() {
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const totalStock = PRODUCTS.reduce((s, p) => s + p.stock, 0);
  const totalSold = PRODUCTS.reduce((s, p) => s + p.sold, 0);

  return (
    <div className="fade-up">
      <div className="page-head">
        <div>
          <h1>Mahsulotlar</h1>
          <p>Zapchastlar omborini va sotuvlarni boshqaring.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> Mahsulot qo'shish
        </button>
      </div>

      {/* Mini summary */}
      <div className="mini-stats">
        <div className="card mini-stat">
          <span className="mini-stat__label">Jami mahsulot turlari</span>
          <span className="mini-stat__value">{PRODUCTS.length}</span>
        </div>
        <div className="card mini-stat">
          <span className="mini-stat__label">Ombordagi qoldiq</span>
          <span className="mini-stat__value">{totalStock}</span>
        </div>
        <div className="card mini-stat">
          <span className="mini-stat__label">Jami sotilgan</span>
          <span className="mini-stat__value gradient-text">{totalSold}</span>
        </div>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="table-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mahsulot nomi yoki kategoriya…"
            />
          </div>
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Mahsulot</th>
                <th>Kategoriya</th>
                <th>Narx</th>
                <th>Qoldiq</th>
                <th>Sotilgan</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="table-product">
                      <span className="table-product__icon">
                        <Package size={18} />
                      </span>
                      <span className="table-strong">{p.name}</span>
                    </div>
                  </td>
                  <td className="table-dim">{p.category}</td>
                  <td className="table-strong">${p.price.toLocaleString()}</td>
                  <td>
                    <div className="stock-bar">
                      <div
                        className="stock-bar__fill"
                        style={{
                          width: `${Math.min(100, (p.stock / 35) * 100)}%`,
                        }}
                      />
                      <span>{p.stock}</span>
                    </div>
                  </td>
                  <td className="table-dim">{p.sold}</td>
                  <td>
                    <span className={`badge ${statusToBadge(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
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
                    Mahsulot topilmadi.
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
