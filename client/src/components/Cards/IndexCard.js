import React, { useState, useEffect, useMemo } from 'react';
import { get } from 'axios';
import { Card, CardBody } from '@windmill/react-ui';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const IndexCard = ({ indexName, symbol, open }) => {
  const { isIndianOpen, recdata } = open;
  const [value, setValue] = useState(-1);
  const [percentChange, setPercentChange] = useState(-1);
  const [data, setData] = useState({});
  let graphPadding;
  if (symbol === 'BSEN') {
    graphPadding = 70;
  } else if (symbol === 'BNSX') {
    graphPadding = 20;
  } else {
    graphPadding = 0;
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
      setData(result[0].indicators.quote[0].close);
      const priceArr = result[0].indicators.quote[0].close;
      const timestampArr = result[0].timestamp;
      let toSet = [];
      for (let i = 0; i < priceArr.length; ++i) {
        if (priceArr[i] - priceArr[0] > 0) {
          toSet.push({
            time: timestampArr[i],
            price: priceArr[i] - priceArr[0],
          });
        }
      }
      setData(toSet);
      const price = rec.regularMarketPrice;
      const prev = rec.chartPreviousClose;
      setPercentChange((((price - prev) / price) * 100).toFixed(3));
    } else {
      const { data } = await get(
        `http://localhost:5000/stock/indian/index/${symbol}`,
      );
      setValue(data.current_close);
      setPercentChange(
        (
          ((data.current_close - data.prev_close) / data.current_close) *
          100
        ).toFixed(3),
      );
      setData(data.values);
    }
  };

  useEffect(() => {
    getData();
    if (
      (symbol == 'NDAQ' && recdata.isTheStockMarketOpen) ||
      (isIndianOpen() && symbol != 'NDAQ')
    ) {
      setInterval(getData, 5000);
    }
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
              {symbol === 'NDAQ' ? (
                <AreaChart data={data}>
                  <XAxis dataKey="time" hide></XAxis>
                  <YAxis
                    padding={{ top: graphPadding, bottom: 5 }}
                    hide
                  ></YAxis>
                  <Area
                    type="natural"
                    dataKey="price"
                    stroke={'#00c853'}
                    fill="#A3D4BB"
                    strokeOpacity={0.8}
                    fillOpacity={0}
                    strokeWidth={2}
                  />
                </AreaChart>
              ) : (
                <AreaChart data={data} stackOffset="expand">
                  <YAxis
                    padding={{ top: graphPadding, bottom: 5 }}
                    hide
                  ></YAxis>
                  <Area
                    type="natural"
                    dataKey="_chg"
                    stroke={'#00c853'}
                    fill="#A3D4BB"
                    strokeOpacity={0.8}
                    fillOpacity={0}
                    strokeWidth={2}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default IndexCard;
