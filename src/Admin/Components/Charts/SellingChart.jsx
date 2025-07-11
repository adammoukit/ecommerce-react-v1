import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@mui/lab";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomCalendar from "../Calendar/CustomCalendar";

const data = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Fév", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 2000, revenue: 9800 },
  { month: "Avr", sales: 2780, revenue: 3908 },
  { month: "Mai", sales: 1890, revenue: 4800 },
  { month: "Juin", sales: 2390, revenue: 3800 },
  { month: "Juil", sales: 3490, revenue: 4300 },
];

const SellingChart = () => {
  return (
    <div className="w-full h-[250px] lg:h-[380px] bg-white p-2 rounded-lg shadow-sm">
      <div className="flex flex-row  justify-between items-start">
        <h3 className="text-[15px] lg:text-md font-semibold">Performances des ventes</h3>
        <div className="flex flex-col lg:mr-5 justify-between items-center lg:flex-row lg:justify-between">
          <h3 className="text-[15px] lg:text-md font-medium">Filtrer par :</h3>
         
           
            <CustomCalendar/>
          
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            stroke="#64748b"
            tick={{ fill: "#475569" }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            stroke="#64748b"
            tick={{ fill: "#475569" }}
            tickFormatter={(value) => `€${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            wrapperStyle={{ paddingBottom: 20 }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            name="Ventes"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: "#6366f1", strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenu"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellingChart;
