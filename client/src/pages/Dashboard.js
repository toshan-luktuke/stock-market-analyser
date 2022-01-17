import React from 'react';
import { Card, CardBody } from '@windmill/react-ui';

import { useFetch } from '../hooks/useFetch';
import CTA from '../components/CTA';
import InfoCard from '../components/Cards/InfoCard';
import IndexCard from '../components/Cards/IndexCard';
import PageTitle from '../components/Typography/PageTitle';
import { CartIcon, MoneyIcon, PeopleIcon, HomeIcon } from '../icons';
import RoundIcon from '../components/RoundIcon';
import StockTicker from '../components/StockTicker';
import LargeStockChart from '../components/Cards/LargeStockChart';

const Dashboard = () => {
  const { recdata } = useFetch('http://127.0.0.1:5000/stock/isopen');
  const { recdata: recdata1 } = useFetch(
    'http://localhost:5000/stock/indian/isopen',
  );

  const isIndianOpen = () => {
    const now = new Date();
    const market = new Date(recdata1.time);
    if (now - market < 60000) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <PageTitle>Market Dashboard</PageTitle>

      <div className="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="NYSE Indices Supported" value="S&P 500, DJIA & NASDAQ">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4 fill-current"
          />
        </InfoCard>

        <InfoCard title="ML Algorithms Applied" value="Regression, ANN & RSI">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4 fill-current"
          />
        </InfoCard>

        <InfoCard title="Total Stock Symbols Supported" value="13130">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4 fill-current"
          />
        </InfoCard>

        <InfoCard
          title="Indian Stock Indices Supported"
          value="BSE Sensex, NSE Nifty"
        >
          <RoundIcon
            icon={HomeIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500 fill-current stroke-current"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <Card className="shadow-md">
        <CardBody>
          {recdata.isTheStockMarketOpen ? (
            <p className="text-base font-extrabold text-green-700 dark:text-green-400 text-center">
              The U.S. Markets are open
            </p>
          ) : (
            <p className="text-base font-extrabold text-red-600 dark:text-red-400 text-center">
              The U.S. Markets are closed
            </p>
          )}
          {isIndianOpen() ? (
            <p className="text-base font-extrabold text-green-700 dark:text-green-400 text-center">
              The Indian Markets are open
            </p>
          ) : (
            <p className="text-base font-extrabold text-red-600 dark:text-red-400 text-center">
              The Indian Markets are closed
            </p>
          )}
        </CardBody>
      </Card>
      <div className="p-2 pb-0 h-6.5">
        <StockTicker rates={['$10', '$20', '$30']}></StockTicker>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <IndexCard
          indexName="NIFTY 50"
          symbol="BSEN"
          open={{ isIndianOpen, recdata }}
        ></IndexCard>
        <IndexCard
          indexName="NASDAQ"
          symbol="NDAQ"
          open={{ isIndianOpen, recdata }}
        ></IndexCard>
        <IndexCard
          indexName="SENSEX"
          symbol="BNSX"
          open={{ isIndianOpen, recdata }}
        ></IndexCard>
      </div>

      <LargeStockChart className="flex" />
      <div class="mt-8">
        <CTA />
      </div>
    </>
  );
};

export default Dashboard;
