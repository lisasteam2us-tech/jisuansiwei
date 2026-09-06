import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';

interface RadarDataPoint {
  subject: string;
  score: number;
  benchmark?: number;
  fullMark: number;
}

interface CapabilityRadarChartProps {
  data: RadarDataPoint[];
  overallScore?: number;
  percentile?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: RadarDataPoint;
    color: string;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0]?.payload) {
    const item = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border-2 border-[#efeded] text-xs space-y-1">
        <p className="font-black text-sm text-[#1b1c1c] flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#07C160]"></span>
          <span>{item.subject}</span>
        </p>
        <p className="font-bold text-[#006d33]">
          当前得分：<span className="text-base font-black text-[#07C160]">{item.score}</span> 分
        </p>
        {item.benchmark !== undefined && (
          <p className="text-[#6c7b6c] font-medium">
            同龄均值：<span className="font-bold text-[#3d4a3d]">{item.benchmark}</span> 分
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const CapabilityRadarChart: React.FC<CapabilityRadarChartProps> = ({
  data,
  overallScore = 86,
  percentile = 89,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-between h-full min-h-[380px]">
      {/* Recharts Responsive Container */}
      <div className="w-full h-[280px] sm:h-[320px] relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="72%" data={data}>
            {/* Background Grid with clean subtle styling */}
            <PolarGrid
              stroke="#e3e2e2"
              strokeDasharray="3 3"
              gridType="polygon"
            />

            {/* 4 Dimension Axis Labels */}
            <PolarAngleAxis
              dataKey="subject"
              tick={(props: any) => {
                const { payload, x, y, textAnchor } = props || {};
                if (!payload || payload.value === undefined) return null;
                const item = data?.find((d) => d.subject === payload.value);
                const score = item ? item.score : 0;
                const safeX = typeof x === 'number' && !isNaN(x) ? x : 0;
                const safeY = typeof y === 'number' && !isNaN(y) ? y : 0;
                return (
                  <g transform={`translate(${safeX},${safeY})`}>
                    <text
                      textAnchor={textAnchor || 'middle'}
                      dy={safeY < 120 ? -6 : safeY > 200 ? 14 : 4}
                      dx={safeX < 100 ? -8 : safeX > 220 ? 8 : 0}
                      className="text-xs sm:text-sm font-extrabold fill-[#1b1c1c]"
                    >
                      {payload.value}
                    </text>
                    <text
                      textAnchor={textAnchor || 'middle'}
                      dy={safeY < 120 ? 10 : safeY > 200 ? 28 : 18}
                      dx={safeX < 100 ? -8 : safeX > 220 ? 8 : 0}
                      className="text-[11px] font-black fill-[#006d33]"
                    >
                      ({score}分)
                    </text>
                  </g>
                );
              }}
            />

            {/* Radius Axis (0-100) */}
            <PolarRadiusAxis
              angle={45}
              domain={[0, 100]}
              tick={{ fill: '#9e9e9e', fontSize: 10 }}
              stroke="#e9e8e7"
            />

            {/* Benchmark Cohort Line */}
            <Radar
              name="同龄均值"
              dataKey="benchmark"
              stroke="#b0bec5"
              fill="#b0bec5"
              fillOpacity={0.15}
              strokeDasharray="4 4"
            />

            {/* User Assessment Radar Area */}
            <Radar
              name="学生得分"
              dataKey="score"
              stroke="#07C160"
              strokeWidth={3}
              fill="#07C160"
              fillOpacity={0.3}
              dot={{
                r: 4.5,
                fill: '#07C160',
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6.5,
                fill: '#FFD54F',
                stroke: '#006d33',
                strokeWidth: 2.5,
              }}
            />

            {/* Interactive Tooltip */}
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend & Summary Info */}
      <div className="w-full flex flex-col items-center gap-2.5 pt-2 border-t-2 border-[#efeded]/70">
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#07C160] shadow-xs"></span>
            <span className="font-extrabold text-[#1b1c1c]">学生得分</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-full bg-[#90a4ae] border border-dashed border-[#546e7a]"></span>
            <span className="font-medium text-[#6c7b6c]">同龄参考均值</span>
          </div>
        </div>

        {/* Aggregate Score Tag */}
        <div className="bg-[#f0fdf4] text-[#006d33] px-4 py-1.5 rounded-full text-xs font-black border border-[#bbf7d0] flex items-center gap-1.5 shadow-2xs">
          <span>综合能力指数：<strong>{overallScore}分</strong></span>
          <span className="text-[#6c7b6c]">·</span>
          <span>超越全国 <strong>{percentile}%</strong> 的同龄探索者</span>
        </div>
      </div>
    </div>
  );
};
