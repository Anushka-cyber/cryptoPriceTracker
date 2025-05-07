import React, { useState } from 'react';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import './CryptoPriceTracker.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    defs,
  } from 'recharts';  
import { useEffect } from 'react';
import axios from 'axios';



const CryptoPriceTracker = () => {
    const [activeTab, setActiveTab] = useState('1w');
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const daysMap = {
            '1d': '1',
            '3d': '3',
            '1w': '7',
            '1m': '30',
            '6m': '180',
            '1y': '365',
            max: 'max',
        };

        const fetchChartData = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`,
                    {
                        params: {
                            vs_currency: 'usd',
                            days: daysMap[activeTab],
                        },
                    }
                );

                const formatted = response.data.prices.map((entry) => ({
                    time: new Date(entry[0]).toLocaleDateString(),
                    price: Number(entry[1].toFixed(2)),
                }));

                setChartData(formatted);
            } catch (err) {
                console.error('Failed to fetch chart data:', err);
            }
        };

        fetchChartData();
    }, [activeTab]);
    const tabs = ['1d', '3d', '1w', '1m', '6m', '1y', 'max'];
    const dummyChartData = [
        { time: 'Mon', price: 61200 },
        { time: 'Tue', price: 62250 },
        { time: 'Wed', price: 61800 },
        { time: 'Thu', price: 63400 },
        { time: 'Fri', price: 63100 },
        { time: 'Sat', price: 63500 },
        { time: 'Sun', price: 63179 },
    ];


    return (
        <div className="crypto-container">
            <h1 className="price-title">$63,179.71 USD</h1>
            <p className="price-change">+2,161.42 (3.54%)</p>

            {/* Unified Toolbar (Buttons + Tabs) */}
            <div className="toolbar-full">
                <div className="toolbar-left">
                    <button className="toolbar-button">
                        <OpenInFullOutlinedIcon fontSize="small" />
                        <span>Fullscreen</span>
                    </button>
                    <button className="toolbar-button">
                        <AddCircleOutlineOutlinedIcon fontSize="small" />
                        <span>Compare</span>
                    </button>
                </div>

                <div className="toolbar-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Placeholder */}
            <div style={{ height: 300, marginTop: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
  <LineChart
    data={chartData}
    margin={{ top: 30, right: 20, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
      </linearGradient>
    </defs>

    <XAxis dataKey="time" hide={chartData.length > 30} />
    <YAxis tick={{ fill: '#888888', fontSize: 12 }} />
    <Tooltip
      contentStyle={{
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        fontSize: '12px',
      }}
    />

    <Area
      type="monotone"
      dataKey="price"
      stroke="none"
      fill="url(#colorPrice)"
    />

    <Line
      type="monotone"
      dataKey="price"
      stroke="#4f46e5"
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ResponsiveContainer>

            </div>
        </div>
    );
};

export default CryptoPriceTracker;
