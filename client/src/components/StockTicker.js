import React from 'react';
import Ticker from 'react-ticker';

const GetRatesList = ({ rates, load }) => {
  if (!load && rates) {
    return (
      <p
        className="mb-4 font-medium text-gray-700 dark:text-gray-100 tracking-widest text-2xl"
        style={{ whiteSpace: 'nowrap', fontFamily: 'Black Ops One' }}
      >
        {rates.map((rate) => {
          return ` ${rate.symbol}: $ ${rate.price} | `;
        })}
      </p>
    );
  } else {
    return <p style={{ visibility: 'hidden' }}>Fetching the latest rates</p>;
  }
};

function StockTicker({ rates }) {
  return (
    <Ticker offset="run-in" speed={3.5}>
      {() => <GetRatesList rates={rates} />}
    </Ticker>
  );
}

export default StockTicker;
