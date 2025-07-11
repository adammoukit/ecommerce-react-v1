import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Mobile', value: 400 },
  { name: 'Desktop', value: 300 },
  { name: 'Tablette', value: 200 },
  { name: 'Autres', value: 100 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];
const RADIAN = Math.PI / 180;

// Fonction de rendu des labels avec nom + pourcentage
const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent, 
  name 
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-[10px] font-semibold pointer-events-none"
    >
      {`${name}\n${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Légende personnalisée
const renderLegend = (props) => {
  const { payload } = props;
  const total = payload.reduce((sum, entry) => sum + entry.payload.value, 0);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {payload.map((entry, index) => {
        const percent = ((entry.payload.value / total) * 100).toFixed(1);
        return (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.value}</span>
            <span className="text-sm font-semibold text-gray-900">
              {percent}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

const DevicesPieChart = () => {
  return (
    <div className="p-1 bg-white rounded-lg shadow-sm h-[390px]">
      <h3 className="text-lg font-semibold mb-4">Répartition des appareils</h3>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
           
            outerRadius={80}
            innerRadius={45}
            paddingAngle={2}
            dataKey="value"
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Legend 
            content={renderLegend}
            wrapperStyle={{ paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DevicesPieChart;