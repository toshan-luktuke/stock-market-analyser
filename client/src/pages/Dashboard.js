import React from 'react';

import CTA from '../components/CTA';
import InfoCard from '../components/Cards/InfoCard';
import IndexCard from '../components/Cards/IndexCard';
import PageTitle from '../components/Typography/PageTitle';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons';
import RoundIcon from '../components/RoundIcon';
import StockTicker from '../components/StockTicker';

const Dashboard = () => {
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

        <InfoCard title="ML Algorithms Applied" value="Regression, LSTM & RSI">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4 fill-current"
          />
        </InfoCard>

        <InfoCard title="Total Stock Symbols Supported real-time" value="13130">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4 fill-current"
          />
        </InfoCard>

        <InfoCard title="Total Cryptocurrencies Supported" value="100">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500 fill-current stroke-current"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <div className="p-2 pb-0 h-6.5">
        <StockTicker rates={['$10', '$20', '$30']}></StockTicker>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <IndexCard indexName="NASDAQ" value="$15736.35"></IndexCard>
        <IndexCard indexName="SENSEX" value="$50736.26"></IndexCard>
        <IndexCard indexName="CRYPTO" value="$700573.18"></IndexCard>
      </div>

      <CTA />
    </>
  );
};

export default Dashboard;
