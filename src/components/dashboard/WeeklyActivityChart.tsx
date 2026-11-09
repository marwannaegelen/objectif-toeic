import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";
import { useReducedMotion } from "framer-motion";
import { weeklyActivity } from "@/lib/mockData";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function ActivityTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 border border-line-strong shadow-card">
      <p className="text-xs text-ink-faint">{label}</p>
      <p className="text-sm font-semibold tabular-nums">{payload[0].value} min</p>
    </div>
  );
}

export function WeeklyActivityChart() {
  const reduce = useReducedMotion();
  const max = Math.max(...weeklyActivity.map((d) => d.minutes));
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyActivity} margin={{ top: 8, right: 0, left: 0, bottom: 0 }} barCategoryGap={14}>
          <defs>
            <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9B5CFF" />
              <stop offset="100%" stopColor="#3D7BFF" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            tick={{ fill: "#636E8C", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<ActivityTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar
            dataKey="minutes"
            radius={[8, 8, 8, 8]}
            isAnimationActive={!reduce}
            animationDuration={900}
            maxBarSize={38}
          >
            {weeklyActivity.map((d, i) => (
              <Cell
                key={i}
                fill={d.minutes === max ? "url(#barFill)" : "rgba(91,141,255,0.35)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
