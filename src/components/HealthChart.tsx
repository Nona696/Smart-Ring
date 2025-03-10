
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  value: number;
  [key: string]: any;
}

interface HealthChartProps {
  data: DataPoint[];
  dataKey: string;
  color: string;
  gradientColor?: string;
  unit?: string;
  title?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  height?: number;
  showGrid?: boolean;
}

const HealthChart: React.FC<HealthChartProps> = ({
  data,
  dataKey,
  color,
  gradientColor,
  unit = '',
  title,
  showXAxis = true,
  showYAxis = true,
  height = 200,
  showGrid = false
}) => {
  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>}
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: showYAxis ? 5 : -20, bottom: 5 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            {showXAxis && <XAxis dataKey="time" tick={{ fontSize: 10 }} />}
            {showYAxis && <YAxis tick={{ fontSize: 10 }} />}
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`${value}${unit}`, '']}
              labelFormatter={(time) => `${time}`}
            />
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={gradientColor || color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${dataKey})`}
              animationDuration={1000}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthChart;
