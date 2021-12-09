import React from 'react';
import Ticker from 'react-ticker';

const GetRatesList = ({ rates }) => {
  return rates ? (
    <p
      className="mb-4 font-semibold text-black dark:text-white"
      style={{ whiteSpace: 'nowrap' }}
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
