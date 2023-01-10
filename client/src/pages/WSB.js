import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination,
} from '@windmill/react-ui';

import { useFetch } from '../hooks/useFetch';
import CTA from '../components/CTA';
import PageTitle from '../components/Typography/PageTitle';

const WSB = () => {
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState([]);

  const resultsPerPage = 10;
  const url = 'https://stock-market-analyser-backend.cyclic.app/stock/wsb';

  const {
    recdata: { data: response },
    isLoading,
  } = useFetch(url);

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  useEffect(() => {
    if (!isLoading) {
      setDataTable(
        response.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage,
        ),
      );
    }
  }, [pageTable, isLoading, response]);

  if (!isLoading) {
    const totalResults = response.length;

    return (
      <>
        <PageTitle>r/WallStreetBets Sentiment Analysis</PageTitle>

        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell className="text-center text-base font-ticker1">
                  Stock Symbol
                </TableCell>
                <TableCell className="text-center text-base font-ticker1">
                  Sentiment Score
                </TableCell>
                <TableCell className="text-center text-base font-ticker1">
                  Sentiment
                </TableCell>
                <TableCell className="text-center text-base font-ticker1">
                  Number of Posts
                </TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable.map((stonk, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <p className="font-semibold font-ticker2 dark:text-gray-300 text-center">
                      {stonk.ticker}
                    </p>
                  </TableCell>
                  <TableCell className="text-center font-sadha font-semibold">
                    <span className="text-sm dark:text-gray-300">
                      {Number(stonk.sentiment_score).toFixed(3)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-bold text-lg">
                    {stonk.sentiment === 'Bullish' ? (
                      <p className="font-mono dark:text-green-400 text-green-600">
                        {stonk.sentiment}{' '}
                        <span className="font-black text-xl">&#8593;</span>
                      </p>
                    ) : (
                      <p className="font-mono dark:text-red-400 text-red-600">
                        {stonk.sentiment}{' '}
                        <span className="font-black text-xl">&#8595;</span>
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">{stonk.no_of_comments}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={onPageChangeTable}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>

        <CTA />
      </>
    );
  } else {
    return (
      <>
        <PageTitle>r/WallStreetBets Sentiment Analysis</PageTitle>
        <p className="dark:text-white text-center animate__animated animate__flash animate__infinite">
          Loading...
        </p>
      </>
    );
  }
};

export default WSB;
