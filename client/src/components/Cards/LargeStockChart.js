import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Input, Button } from '@windmill/react-ui';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const LargeStockChart = () => {
  let [graphHeight, setGraphHeight] = useState(0.4 * window.innerHeight);
  let [stockName, setStockName] = useState('Name of Stock');
  let [stockPrice, setStockPrice] = useState('12307.82$'); //setting this as string as different currencies might be required
  let [open, setOpen] = useState(100);
  let [high, setHigh] = useState(124);
  let [low, setLow] = useState(1344);
  let [close, setClose] = useState(1278);
  let [perChange, setPerChange] = useState(4.07);

  useEffect(() => {
    window.addEventListener('resize', changeGraphHeight);
    return () => {
      window.removeEventListener('resize', changeGraphHeight);
    };
  }, [window.innerHeight, window.innerWidth]);

  const changeGraphHeight = () => {
    if (window.innerWidth < 550) {
      setGraphHeight(0.3 * window.innerHeight);
    } else {
      setGraphHeight(0.4 * window.innerHeight);
    }
    console.log(window.innerHeight, window.innerWidth);
  };

  return (
    <Card>
      <CardBody>
        <div className="lg:grid grid-cols-3">
          <div className="col-span-2 mr-12">
            <div className="mb-5 font-semibold lg:grid grid-cols-2 basis-1/2 ">
              <div className="">
                <p className="text-3xl text-center dark:text-white">
                  {stockName}
                </p>
              </div>
              <div>
                <p className="text-3xl text-center dark:text-white ">
                  {stockPrice}
                </p>
              </div>
            </div>
            <div width="100%" height="100%" class="md:mr-10">
              <ResponsiveContainer width="110%" height={graphHeight}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FC82D" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#4FC82D"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#64CE1D"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <XAxis dataKey="name" />
                  <YAxis />
                  {/* <CartesianGrid strokeDasharray="3 3" /> Line that generates grid*/}
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-rows-4">
            <div class="row-span-1">
              <Card>
                <CardBody>
                  <div className="grid grid-cols-12">
                    <Input
                      aria-label="Bad"
                      className="col-span-9 bg-cool-gray-200 dark:bg-cool-gray-800 rounded-lg py-2 px-4 dark:text-white"
                      placeholder="Search for the Stock here"
                    />
                    <Button
                      size="small"
                      className="col-span-3 mx-2 p-2 text-white bg-purple-600 dark:bg-green-700 rounded-md focus:border-blue-300"
                    >
                      Search!
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="row-span-2 row-start-3">
              <Card>
                <CardBody>
                  <table
                    className="table-fixed text-md font-semibold"
                    width="100%"
                  >
                    <tbody className="px-6 py-0.5 ">
                      <tr>
                        <td className=" dark:text-white">Open</td>
                        <td className="text-gray-600 dark:text-gray-400">
                          {open}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-gray-700 dark:text-white">High</td>
                        <td className="text-gray-600 dark:text-gray-400">
                          {high}
                        </td>
                      </tr>
                      <tr>
                        <td className="dark:text-white">Low</td>
                        <td className="text-gray-600 dark:text-gray-400">
                          {low}
                        </td>
                      </tr>
                      <tr>
                        <td className="dark:text-white">Close</td>
                        <td className="text-gray-600 dark:text-gray-400">
                          {close}
                        </td>
                      </tr>
                      <tr>
                        <td className="dark:text-white">% Change</td>
                        <td className="text-gray-600 dark:text-gray-400">
                          {perChange}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default LargeStockChart;
