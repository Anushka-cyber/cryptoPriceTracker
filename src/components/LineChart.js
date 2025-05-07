import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

export default function LineChart({ data }) {
  const chartRef = useRef(null);
  const labels = data.map((d) => d.time);
  const prices = data.map((d) => d.price);

  const chartData = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Price',
        data: prices,
        borderColor: 'rgba(63,81,181,1)',
        backgroundColor: function (context) {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, 'rgba(63,81,181,0.4)');
          gradient.addColorStop(1, 'rgba(63,81,181,0)');
          return gradient;
        },
        fill: 'start',
        pointRadius: 0,
        yAxisID: 'y',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    layout: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#999',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: {
          color: '#888',
          callback: (value) => `$${value}`,
        },
        suggestedMin: Math.min(...prices) * 0.995,
        suggestedMax: Math.max(...prices) * 1.005,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
  };

  return <Chart ref={chartRef} data={chartData} options={options} />;
}
