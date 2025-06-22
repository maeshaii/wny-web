import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import Sidebar from '../global/sidebar.tsx';

type EmploymentData = {
  category: string;
  count: number;
};

const yearOptions = ['ALL','2024', '2023', '2022', '2021', '2020'];
const courseOptions = ['ALL','BSIT', 'BSIS', 'BIT-CT'];

const initialData: EmploymentData[] = [
  { category: 'Employed', count: 1350 },
  { category: 'Unemployed', count: 950 },
  { category: 'Absorb', count: 1250 },
  { category: 'High Position', count: 950 },
];

const barColors: Record<string, string> = {
  Employed: '#7C97A4',
  Unemployed: '#1F4B7A',
  Absorb: '#A3D9DF',
  'High Position': '#0797D8',
};

export default function Statistics() {
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const navigate = useNavigate(); // ✅ You need this

  const data = initialData;

  const maxCount = Math.max(...data.map(d => d.count));
  const maxTick = Math.ceil(maxCount / 200) * 200;
  const ticks = Array.from({ length: maxTick / 200 + 1 }, (_, i) => i * 200);

  return (
    <div style={{ display: 'flex', height: '100vh'}}>
      <Sidebar />

      <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', flex: 1 }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Statistics</h2>

        {/* Filters */}
        <div className="filter-container">
          <div className="filter-group">
            <label className="filter-label">Year:</label>
            <select
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Course:</label>
            <select
              className="filter-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courseOptions.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <button
            style={{
              marginLeft: 'auto',
              padding: '10px 20px',
              backgroundColor: '#1D4E89',
              color: '#fff',
              borderRadius: '20px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            onClick={() => navigate('/ViewStats')}
          >
            View Statistics
          </button>
        </div>

        {/* Bar Chart */}
        <div style={{ width: '100%', height: '600px', marginTop: '24px' }}>
          <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis domain={[0, maxTick]} ticks={ticks} />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" name="Statistics" radius={[5, 5, 0, 0]}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={barColors[entry.category]} />
        ))}
      </Bar>
    </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Embedded CSS */}
        <style>{`
          .filter-container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
          }

          .filter-group {
            display: flex;
            flex-direction: column;
          }

          .filter-label {
            margin-bottom: 4px;
            font-size: 14px;
          }

          .filter-select {
            padding: 6px 10px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .legend-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 24px;
            flex-wrap: wrap;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
          }

          .legend-box {
            width: 20px;
            height: 20px;
            border-radius: 4px;
          }
        `}</style>
      </div>
    </div>
  );
}
