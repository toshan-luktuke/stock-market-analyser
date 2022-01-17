import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import { Card, CardBody } from '@windmill/react-ui';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const IndexCard = ({ indexName, symbol }) => {
  const [value, setValue] = useState(-1);
  const [percentChange, setPercentChange] = useState(-1);
  const [data, setData] = useState({});
  let graphPadding;
  if (symbol === 'BSEN') {
    graphPadding = 70;
  } else if (symbol === 'BNSX') {
    graphPadding = 25;
  }

  const getData = async () => {
    if (symbol === 'SPY' || symbol === 'NDAQ') {
      const {
        data: {
          data: {
            chart: { result },
          },
        },
      } = await get(`http://localhost:5000/stock/chart/${symbol}`);
      const rec = result[0].meta;
      setValue(rec.regularMarketPrice);
      const price = rec.regularMarketPrice;
      console.log(result[0].timestamp);
      const prev = rec.chartPreviousClose;
      setPercentChange((((price - prev) / price) * 100).toFixed(3));
    } else {
      const { data } = await get(
        `http://localhost:5000/stock/indian/index/${symbol}`,
      );
      setValue(data.current_close);
      console.log(data);
      setPercentChange(
        (
          ((data.current_close - data.prev_close) / data.current_close) *
          100
        ).toFixed(3),
      );
      setData(data.values);
      console.log(data.values);
    }
  };

  useEffect(() => {
    getData();
    setInterval(getData, 5000);
  }, []);

  return (
    <Card>
      <CardBody>
        <div className="grid grid-cols-2">
          <div className="grid grid-rows-2">
            <p className="mb-4 font-semibold text-black dark:text-white">
              {indexName}
            </p>
            <p className="font-extrabold text-gray-600 dark:text-gray-300 font-sadha">
              {value}
            </p>
            {percentChange > 0 ? (
              <p className="text-sm font-bold text-green-600 dark:text-green-400">
                {percentChange}% &uarr;
              </p>
            ) : (
              <p className="text-sm font-bold text-red-600 dark:text-red-400">
                {percentChange}% &darr;
              </p>
            )}
          </div>
          <div style={{ marginLeft: -50 }}>
            <ResponsiveContainer width="100%">
              <AreaChart data={data} stackOffset="expand">
                <YAxis padding={{ top: graphPadding }} hide></YAxis>
                <Area
                  type="natural"
                  dataKey="_chg"
                  stroke="#f97316"
                  fill="#A3D4BB"
                  strokeOpacity={0.8}
                  fillOpacity={0}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default IndexCard;
