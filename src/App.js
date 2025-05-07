import React, { useState, useEffect } from 'react';
import NavTabs from './components/NavTabs';
import PriceHeader from './components/PriceHeader';
import ChartControls from './components/ChartControls';
import LineChart from './components/LineChart';
import axios from 'axios';
import { Container, Box } from '@mui/material';

function App() {
  const [activeTab, setActiveTab] = useState('Chart');
  const [timeframe, setTimeframe] = useState('1w');
  const [price, setPrice] = useState(63179.71);
  const [delta, setDelta] = useState(2161.42);
  const [chartData, setChartData] = useState([]);

  const daysMap = {
    '1d': '1',
    '3d': '3',
    '1w': '7',
    '1m': '30',
    '6m': '180',
    '1y': '365',
    max: 'max',
  };

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
          {
            params: {
              vs_currency: 'usd',
              days: daysMap[timeframe],
            },
          }
        );
        const prices = res.data.prices.map((entry) => ({
          time: new Date(entry[0]).toLocaleDateString(),
          price: Number(entry[1].toFixed(2)),
        }));
        setChartData(prices);

        const last = prices[prices.length - 1].price;
        const first = prices[0].price;
        setPrice(last);
        setDelta(last - first);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchChart();
  }, [timeframe]);

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <NavTabs active={activeTab} onChange={setActiveTab} />
        <PriceHeader price={price} delta={delta} />
        <ChartControls timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <LineChart data={chartData} />
      </Box>
    </Container>
  );
}

export default App;
