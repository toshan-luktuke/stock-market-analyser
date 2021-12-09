import React from 'react';
import Ticker from 'react-ticker';

const GetRatesList = ({ rates }) => {
  return rates ? (
    <p
      className="mb-4 font-medium text-gray-700 dark:text-gray-100 tracking-widest text-2xl"
      style={{ whiteSpace: 'nowrap', fontFamily: 'Black Ops One' }}
    >
      {rates.join(' +++ ')} +++{' '}
    </p>
  ) : (
    <p style={{ visibility: 'hidden' }}>Placeholder</p>
  );
};

function StockTicker({ rates }) {
  return (
    <Ticker offset="run-in" speed={5}>
      {() => <GetRatesList rates={rates} />}
    </Ticker>
  );
}

export default StockTicker;
