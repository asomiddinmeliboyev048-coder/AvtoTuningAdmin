import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Download, ArrowUpRight } from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import {
  KPIS,
  REVENUE_DATA,
  SERVICE_SPLIT,
  WEEKLY_ORDERS,
  SATISFACTION,
  ACTIVITY,
} from "../data/mock.js";
import "./Dashboard.css";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="chart-tip">
      {label && <div className="chart-tip__label">{label}</div>}
      {payload.map((p) => (
        <div className="chart-tip__row" key={p.dataKey || p.name}>
          <span
            className="chart-tip__dot"
            style={{ background: p.color || p.fill }}
          />
          <span className="chart-tip__name">{p.name}</span>
          <span className="chart-tip__val">
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const axisStyle = { fontSize: 12, fill: "var(--text-faint)" };

  return (
    <div className="dashboard">
      <div className="page-head">
        <div>
          <h1>Boshqaruv paneli</h1>
          <p>
            APEX Garage faoliyati bo'yicha umumiy ko'rsatkichlar va tahlillar.
          </p>
        </div>
        <button className="btn btn-primary">
          <Download size={16} /> Hisobotni yuklab olish
        </button>
      </div>

      {/* KPI cards */}
      <div className="dashboard__kpis">
        {KPIS.map((kpi, i) => (
          <StatCard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Main charts row */}
      <div className="dashboard__grid">
        {/* Revenue area chart */}
        <div className="card chart-card chart-card--wide fade-up">
          <div className="chart-card__head">
            <div>
              <h3>Daromad va xarajatlar</h3>
              <span className="chart-card__sub">Oylik dinamika · 2026</span>
            </div>
            <span className="badge badge--green">
              <ArrowUpRight size={13} /> +12.5%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={REVENUE_DATA}
              margin={{ top: 10, right: 8, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff3d3d" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#ff3d3d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3d6bff" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3d6bff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--grid)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="daromad"
                name="Daromad"
                stroke="#ff3d3d"
                strokeWidth={2.5}
                fill="url(#gRev)"
              />
              <Area
                type="monotone"
                dataKey="xarajat"
                name="Xarajat"
                stroke="#3d6bff"
                strokeWidth={2.5}
                fill="url(#gCost)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service split pie */}
        <div className="card chart-card fade-up">
          <div className="chart-card__head">
            <div>
              <h3>Xizmatlar ulushi</h3>
              <span className="chart-card__sub">Kategoriya bo'yicha</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={SERVICE_SPLIT}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={92}
                paddingAngle={3}
                stroke="none"
              >
                {SERVICE_SPLIT.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            {SERVICE_SPLIT.map((s) => (
              <div className="chart-legend__item" key={s.name}>
                <span
                  className="chart-legend__dot"
                  style={{ background: s.color }}
                />
                <span className="chart-legend__name">{s.name}</span>
                <span className="chart-legend__val">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary charts row */}
      <div className="dashboard__grid">
        {/* Weekly orders bar */}
        <div className="card chart-card fade-up">
          <div className="chart-card__head">
            <div>
              <h3>Haftalik buyurtmalar</h3>
              <span className="chart-card__sub">Oxirgi 7 kun</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={WEEKLY_ORDERS}
              margin={{ top: 10, right: 8, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff8a3d" />
                  <stop offset="100%" stopColor="#ff3d3d" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--grid)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "var(--bg-hover)" }}
              />
              <Bar
                dataKey="orders"
                name="Buyurtma"
                fill="url(#gBar)"
                radius={[8, 8, 0, 0]}
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Satisfaction radar */}
        <div className="card chart-card fade-up">
          <div className="chart-card__head">
            <div>
              <h3>Mijoz mamnunligi</h3>
              <span className="chart-card__sub">Ko'rsatkichlar tahlili</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={SATISFACTION} outerRadius={92}>
              <PolarGrid stroke="var(--grid)" />
              <PolarAngleAxis dataKey="metric" tick={axisStyle} />
              <Radar
                name="Ball"
                dataKey="value"
                stroke="#9b5dff"
                strokeWidth={2}
                fill="#9b5dff"
                fillOpacity={0.35}
              />
              <Tooltip content={<ChartTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity feed */}
        <div className="card chart-card fade-up">
          <div className="chart-card__head">
            <div>
              <h3>So'nggi faoliyat</h3>
              <span className="chart-card__sub">Real vaqt</span>
            </div>
          </div>
          <ul className="activity">
            {ACTIVITY.map((a) => (
              <li className="activity__item" key={a.id}>
                <span className={`activity__dot activity__dot--${a.type}`} />
                <div className="activity__body">
                  <span className="activity__text">{a.text}</span>
                  <span className="activity__time">{a.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
