import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { get } from 'axios';

import { useFetch } from '../../hooks/useFetch';
import CTA from '../CTA';

const BasicIndianStockInfo = ({ symbol, sector, stock_id }) => {
  const [realtime, setRealtime] = useState({});
  const [update, setUpdate] = useState({});

  let code = symbol.split(',')[1].trim();
  const url = `https://priceapi.moneycontrol.com/techCharts/techChartController/symbols?symbol=${code}`;
  const { recdata, isLoading } = useFetch(url);
  const getInfo = async () => {
    const {
      data: { data },
    } = await get(
      `https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/${stock_id}`,
    );
    setRealtime(data);
  };
  const getUpdates = async () => {
    const {
      data: { data },
    } = await get(
      `https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/${stock_id}`,
    );
    setUpdate(data);
  };
  useEffect(() => {
    getInfo();
    getUpdates();
    setInterval(getUpdates, 5000);
  }, [stock_id]);
  if (!isLoading) {
    return (
      <>
        <div className="mt-4">
          <Card className="mb-8 shadow-md pl-4">
            <CardBody>
              <h1 className="mb-1 font-semibold font-mono text-2xl dark:text-gray-200 w-full text-center">
                {realtime.SC_FULLNM},{' '}
                <span class="text-xl">{realtime.HN} </span>(
                <span className="dark:text-red-400 text-red-700">
                  {recdata.name}
                </span>
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
                  <span>{recdata['exchange-listed']}</span>
                </p>
                <p className="text-left my-1">
                  💵 <span className="font-semibold"> Currency: </span>
                  <span>{recdata.currency_code}</span>
                </p>
                <p className="text-left my-1">
                  🔧 <span className="font-semibold"> Sector: </span>
                  <span>{sector}</span>
                </p>
                <p className="text-left my-1">
                  🛠 <span className="font-semibold"> Sub-sector: </span>
                  <span>{realtime.SC_SUBSEC}</span>
                </p>
                <p className="text-left my-1">
                  💹 <span className="font-semibold">Market Cap: </span>
                  <span>{realtime.MKTCAP}</span>
                </p>
                <p className="text-left my-1">
                  🤑 <span className="font-semibold">50 Day Avg: </span>
                  <span>{realtime['50DayAvg']}</span>
                </p>
                <p className="text-left my-1">
                  💱 <span className="font-semibold">150 Day Avg: </span>
                  <span>{realtime['150DayAvg']}</span>
                </p>
                <p className="text-left my-1">
                  💷 <span className="font-semibold">200 Day Avg: </span>
                  <span>{realtime['200DayAvg']}</span>
                </p>
                <p className="text-left my-1">
                  📅{' '}
                  <span className="font-semibold">
                    Trailing 12 Month Score:{' '}
                  </span>
                  <span>{realtime.SC_TTM}</span>
                </p>
                <p className="text-left my-1">
                  💵{' '}
                  <span className="font-semibold">
                    Avg Quantity Traded (20 days) :{' '}
                  </span>
                  <span>{realtime.AvgVolQtyTraded_20day}</span>
                </p>
                <p className="text-left my-1">
                  💴{' '}
                  <span className="font-semibold"> Lower Circuit Limit: </span>
                  <span>{realtime.lower_circuit_limit}</span>
                </p>
                <p className="text-left my-1">
                  💸{' '}
                  <span className="font-semibold"> Upper Circuit Limit: </span>
                  <span>{realtime.upper_circuit_limit}</span>
                </p>
                <p className="text-left my-1">
                  ⌚ <span className="font-semibold"> Timezone: </span>
                  <span>{recdata.timezone}</span>
                </p>
                <p className="text-left my-1">
                  ⏲ <span className="font-semibold"> Trading Session: </span>
                  <span>{recdata.session}</span>
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
                <span class="font-black"> ₹</span>{' '}
                <span>
                  {update.pricecurrent} {update.pricechange > 0 ? '🚀' : '💩'}
                </span>
              </p>
              <p className="text-base dark:text-gray-200 w-full text-center">
                💹 Price Change From Previous Close:{' '}
                {update.pricechange > 0 ? (
                  <span class="text-green-700 dark:text-green-400">
                    {Number(update.pricepercentchange).toFixed(2)}% &uarr;
                  </span>
                ) : (
                  <span class="text-red-600 dark:text-red-400">
                    {Number(update.pricepercentchange).toFixed(2)}% &darr;
                  </span>
                )}
              </p>
              <p className="text-base dark:text-gray-200 w-full text-center">
                ⌚ Last Updated: <span> {update.lastupd}</span>
              </p>
            </CardBody>
          </Card>
        </div>
        <CTA />
      </>
    );
  }
  return (
    <p className="dark:text-white text-center animate__animated animate__flash animate__infinite">
      Loading...
    </p>
  );
};

export default BasicIndianStockInfo;
