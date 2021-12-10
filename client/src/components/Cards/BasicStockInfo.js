import React from 'react';
import { Card, CardBody } from '@windmill/react-ui';

import { useFetch } from '../../hooks/useFetch';

const BasicStockInfo = ({ symbol }) => {
  const url = `http://localhost:5000/stock/details/${symbol}`;
  const { recdata, isLoading } = useFetch(url);
  const { data } = recdata;
  console.log(recdata);
  if (!isLoading) {
    return (
      <div className="mt-4">
        <Card
          colored
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-300"
        >
          <CardBody>
            <p className="mb-1 font-semibold font-mono text-lg dark:text-gray-200">
              {data.companyName} (
              <a
                href={data.website}
                className="dark:text-red-400 text-red-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.symbol}
              </a>
              ) @ {data.exchange} ({data.exchangeShortName})
            </p>
            <p>{data.description}</p>
          </CardBody>
        </Card>
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
