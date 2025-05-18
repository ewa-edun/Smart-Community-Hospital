import React from 'react';

export default function Charts({ chartData }) {
  if (!chartData) return <div>No chart to display yet.</div>;
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Analysis Chart</h3>
      <img src={`data:image/png;base64,${chartData}`} alt="Chart" className="border rounded shadow" />
    </div>
  );
}