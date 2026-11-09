import {
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ComposedChart,
} from "recharts";
import { useReducedMotion } from "framer-motion";
import { scoreHistory } from "@/lib/mockData";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; dataKey: string }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3.5 py-2.5 border border-line-strong shadow-card">
      <p className="text-xs text-ink-faint mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm font-semibold flex items-center gap-2">
          <span
            className="size-2 rounded-full"
            style={{ background: p.dataKey === "score" ? "#5B8DFF" : "#9B5CFF" }}
          />
          {p.dataKey === "score" ? "Score estimé" : "Préparation"} :{" "}
          <span className="tabular-nums">
            {p.value}
            {p.dataKey === "preparation" ? " %" : ""}
          </span>
        </p>
      ))}
    </div>
  );
}

export function ScoreEvolutionChart() {
  const reduce = useReducedMotion();
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={scoreHistory} margin={{ top: 10, right: 8, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3D7BFF" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#3D7BFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#636E8C", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="score"
            domain={[400, 990]}
            tick={{ fill: "#636E8C", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <YAxis yAxisId="prep" orientation="right" domain={[0, 100]} hide />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.12)" }} />
          <Area
            yAxisId="score"
            type="monotone"
            dataKey="score"
            stroke="#5B8DFF"
            strokeWidth={2.5}
            fill="url(#scoreFill)"
            isAnimationActive={!reduce}
            animationDuration={1200}
            dot={{ r: 0 }}
            activeDot={{ r: 5, fill: "#5B8DFF", stroke: "#0B1022", strokeWidth: 2 }}
          />
          <Line
            yAxisId="prep"
            type="monotone"
            dataKey="preparation"
            stroke="#9B5CFF"
            strokeWidth={2}
            strokeDasharray="4 4"
            isAnimationActive={!reduce}
            animationDuration={1400}
            dot={{ r: 0 }}
            activeDot={{ r: 4, fill: "#9B5CFF", stroke: "#0B1022", strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
