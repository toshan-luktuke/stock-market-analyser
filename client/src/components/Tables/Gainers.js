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
import { useFetch } from '../../hooks/useFetch';

const Gainers = () => {
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState([]);

  const resultsPerPage = 5;
  const url =
    'https://stock-market-analyser-backend.cyclic.app/stock/gainers';

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
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell className="text-center text-base font-ticker1">
                Stock Symbol
              </TableCell>
              <TableCell className="text-center text-base font-ticker1">
                Stock Name
              </TableCell>
              <TableCell className="text-center text-base font-ticker1">
                Price
              </TableCell>
              <TableCell className="text-center text-base font-ticker1">
                % Change
              </TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((stonk, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="font-semibold font-ticker2 dark:text-gray-300 text-center">
                    {stonk.symbol}
                  </p>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm dark:text-gray-300">
                    {stonk.name}
                  </span>
                </TableCell>
                <TableCell className="text-center font-sadha font-semibold">
                  <span className="text-sm">
                    $ {Number(stonk.price).toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-center font-bold text-lg">
                  <p className="font-mono dark:text-green-400 text-green-600">
                    {Number(stonk.changesPercentage).toFixed()}%{' '}
                    <span className="font-black text-xl">&#8593;</span>
                  </p>
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
    );
  } else {
    return (
      <>
        <p className="dark:text-white text-center animate__animated animate__flash animate__infinite">
          Loading...
        </p>
      </>
    );
  }
};

export default Gainers;
