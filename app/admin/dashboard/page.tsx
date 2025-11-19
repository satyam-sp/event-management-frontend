"use client";
import { useEffect, useState } from "react";
import axios from "@/services/axiosInstance";

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get("/analytics/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;


  debugger;
  const pieData = stats.eventWiseTickets.map((item: any) => ({
    name: item.event.title,
    value: Number(item.ticketCount)
  }));

  const barData = stats.monthlyRevenue.map((item: any) => ({
    month: item.month,
    revenue: Number(item.revenue)
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-yellow-700">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-5 rounded-lg border">
          <h3 className="text-lg">Total Events</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.totalEvents}</p>
        </div>
        <div className="bg-white shadow p-5 rounded-lg border">
          <h3 className="text-lg">Tickets Sold</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.totalTickets}</p>
        </div>
        <div className="bg-white shadow p-5 rounded-lg border">
          <h3 className="text-lg">Total Revenue</h3>
          <p className="text-2xl font-bold text-yellow-600">₹{stats.totalRevenue}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-10">

        {/* PIE CHART */}
        <div className="bg-white p-5 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Event-wise Ticket Share</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx={200}
              cy={150}
              outerRadius={100}
              fill="#FFA500"
              dataKey="value"
              label
            >
              {pieData.map((entry: any, index: any) => (
                <Cell key={index} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-5 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>

          <BarChart width={450} height={300} data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#FFC300" />
          </BarChart>
        </div>
      </div>

      {/* Download Report */}
      <div className="mt-8">
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/analytics/download`}
          target="_blank"
        >
          <button className="px-5 py-2 bg-yellow-600 text-white rounded-lg">
            Download Full Report (PDF)
          </button>
        </a>
      </div>
    </div>
  );
}
