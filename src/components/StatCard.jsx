import { TrendingUp, TrendingDown } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import "./StatCard.css";

export default function StatCard({ kpi, index = 0 }) {
  const data = kpi.spark.map((v, i) => ({ i, v }));
  const up = kpi.trend === "up";

  return (
    <div
      className="stat card fade-up"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="stat__top">
        <span className="stat__label">{kpi.label}</span>
        <span
          className={`stat__delta ${up ? "stat__delta--up" : "stat__delta--down"}`}
        >
          {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(kpi.delta)}%
        </span>
      </div>
      <div className="stat__value">{kpi.value}</div>
      <div className="stat__spark">
        <ResponsiveContainer width="100%" height={48}>
          <AreaChart
            data={data}
            margin={{ top: 4, bottom: 0, left: 0, right: 0 }}
          >
            <defs>
              <linearGradient id={`grad-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={kpi.color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={kpi.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={kpi.color}
              strokeWidth={2}
              fill={`url(#grad-${kpi.id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
