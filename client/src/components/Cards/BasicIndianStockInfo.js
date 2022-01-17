import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { get } from 'axios';

import { useFetch } from '../../hooks/useFetch';
import CTA from '../CTA';

const BasicIndianStockInfo = ({ symbol, sector }) => {
  let code = symbol.split(',')[1].trim();
  const url = `https://priceapi.moneycontrol.com/techCharts/techChartController/symbols?symbol=${code}`;
  const { recdata, isLoading } = useFetch(url);
  if (!isLoading) {
    return (
      <>
        <div className="mt-4">
          <Card className="mb-8 shadow-md pl-4">
            <CardBody>
              <h1 className="mb-1 font-semibold font-mono text-2xl dark:text-gray-200 w-full text-center">
                {recdata.description} (
                <span className="dark:text-red-400 text-red-700">
                  {recdata.name}
                </span>
                )
              </h1>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-0">
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
