import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { get } from 'axios';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { useFetch } from '../../hooks/useFetch';
import CTA from '../CTA';

const directionEmojis = {
  up: '🚀',
  down: '💩',
  '': '',
};

const BasicStockInfo = ({ symbol }) => {
  const url = `https://stock-market-analyser-backend.cyclic.app/stock/details/${symbol}`;
  const { recdata, isLoading } = useFetch(url);
  const { data } = recdata;
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState({ success: false });
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    const url1 = `https://stock-market-analyser-backend.cyclic.app/stock/rating/${symbol}`;
    fetcherConditional(url1);
  }, [recdata, symbol]);

  const fetcherConditional = async (url1) => {
    try {
      let data1 = await get(url1, { crossdomain: true });
      if (data1) {
        data1 = data1.data;
        setRating(data1);
      } else {
        setRating({ success: false });
      }
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getData = async () => {
    const { data } = await get(
      `https://stock-market-analyser-backend.cyclic.app/stock/chart/${symbol}`,
    );
    return data;
  };

  let [price, setPrice] = useState(-1);
  let [prevPrice, setPrevPrice] = useState(-1);
  let [priceTime, setPriceTime] = useState(null);
  useEffect(() => {
    let timeoutId;
    const getLatestPrice = async () => {
      try {
        const rdata = await getData();
        const stockData = rdata.data.chart.result[0];
        setPrevPrice(price);
        setPrice(stockData.meta.regularMarketPrice.toFixed(2));
        setPriceTime(new Date(stockData.meta.regularMarketTime * 1000));
        let toPlot = [];
        for (let i = 0; i < stockData.timestamp.length; ++i) {
          toPlot.push({
            time: stockData.timestamp[i],
            close: stockData.indicators.quote[0].close[i],
          });
        }
        setGraphData(toPlot);
      } catch (error) {
        throw new Error(error);
      }
      timeoutId = setTimeout(getLatestPrice, 2500);
    };
    getLatestPrice();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [symbol]);

  const direction = useMemo(
    () => (prevPrice < price ? 'up' : prevPrice > price ? 'down' : ''),
    [prevPrice, price],
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
          <p>
            Time:{' '}
            {`${new Date(payload[0].payload.time * 1000).toLocaleTimeString()}`}
          </p>
          <p>Close: {payload[0].payload.close.toFixed(2)}</p>
        </div>
      );
    }

    return null;
  };

  if (!isLoading && !loading) {
    return (
      <div className="mt-4">
        <Card className="mb-8 shadow-md pl-4">
          <CardBody>
            <h1 className="mb-1 font-semibold font-mono text-2xl dark:text-gray-200 w-full text-center">
              {data.companyName} (
              <a
                href={data.website}
                className="dark:text-red-400 text-red-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.symbol}
              </a>
              )
            </h1>
            <p
              className="text-sm text-gray-700 dark:text-gray-300 mt-0"
              style={{
                fontFamily: 'Comfortaa',
                columnWidth: '400px',
                columnRule: '2px solid red',
                columnGap: '7em',
              }}
            >
              <p className="text-left mb-1">
                💰 <span className="font-semibold"> Exchange: </span>
                <span>
                  {data.exchange} ({data.exchangeShortName})
                </span>
              </p>
              <p className="text-left my-1">
                💵 <span className="font-semibold"> Currency: </span>
                <span>{data.currency}</span>
              </p>
              <p className="text-left my-1">
                🔧 <span className="font-semibold"> Industry: </span>
                <span>
                  {data.industry}, {data.sector}
                </span>
              </p>
              <p className="text-left my-1">
                🗺 <span className="font-semibold"> Address: </span>
                <span>
                  {data.address}, {data.city}, {data.state}, {data.zip}
                </span>
              </p>
              <p className="text-left my-1">
                📅 <span className="font-semibold"> IPO Date: </span>
                <span>{data.ipoDate}</span>
              </p>
              <p className="text-left my-1">
                📈 <span className="font-semibold"> Range: </span>
                <span>{data.range}</span>
              </p>
              <p className="text-left my-1">
                📑 <span className="font-semibold"> Volume Average: </span>
                <span>{data.volAvg}</span>
              </p>
              <p className="text-left my-1">
                💹 <span className="font-semibold"> Market Cap: </span>
                <span>{data.mktCap}</span>
              </p>
            </p>
          </CardBody>
        </Card>
        <Card className="my-8 shadow-md flex justify-center">
          <CardBody>
            <h1 className="my-2 font-semibold font-mono text-xl dark:text-gray-200 w-full text-center">
              Real-time Analysis
            </h1>
            <p
              className="text-3xl dark:text-gray-200 w-full text-center font"
              style={{ fontFamily: 'Black Ops One' }}
            >
              💲{' '}
              <span>
                {price} {directionEmojis[direction]}
              </span>
            </p>
            <p className="text-base dark:text-gray-200 w-full text-center">
              ⌚ Time:{' '}
              <span> {priceTime && priceTime.toLocaleTimeString()}</span>
            </p>
          </CardBody>
        </Card>
        <Card className="my-8 shadow-md">
          <CardBody>
            <h1 className="my-2 font-semibold font-mono text-xl dark:text-gray-200 w-full text-center">
              Real-time Chart (Intraday)
            </h1>

            <div style={{ marginLeft: -20 }}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={graphData}>
                  <XAxis
                    dataKey={(realdata) => {
                      if (realdata.time) {
                        new Date(Number(realdata.time));
                      }
                    }}
                    hide
                  ></XAxis>
                  <YAxis
                    domain={['auto', 'auto']}
                    allowDataOverflow={true}
                  ></YAxis>
                  <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
                  <Area
                    type="natural"
                    connectNulls
                    dataKey="close"
                    stroke={'#00c853'}
                    fill="#A3D4BB"
                    strokeOpacity={0.8}
                    fillOpacity={0.5}
                    strokeWidth={1}
                  ></Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        {rating && rating.success && (
          <Card className="mt-8 mb-4 shadow-md">
            <CardBody>
              <h1 className="my-2 font-semibold font-mono text-lg dark:text-gray-200 ml-4">
                Ratings (Based on DCF, ROA, DES, PB scores)
              </h1>
              <div
                className="text-sm text-gray-700 dark:text-gray-300 mt-0 pl-4"
                style={{
                  fontFamily: 'Comfortaa',
                }}
              >
                <p>
                  ⭐ <span className="font-semibold">Rating:</span>{' '}
                  <span>{rating && rating.data.rating}</span>
                </p>
                <p>
                  💯 <span className="font-semibold">Score:</span>{' '}
                  <span>{rating && rating.data.ratingScore}</span>
                </p>
                <p>
                  💹 <span className="font-semibold">Recommendation:</span>{' '}
                  <span>{rating && rating.data.ratingRecommendation}</span>
                </p>
              </div>
            </CardBody>
          </Card>
        )}
        {!loading && <CTA />}
      </div>
    );
  }
  return (
    <p className="dark:text-white text-center animate__animated animate__flash animate__infinite">
      Loading...
    </p>
  );
};

export default BasicStockInfo;
