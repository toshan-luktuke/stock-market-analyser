import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Input, Button } from '@windmill/react-ui';
import { get } from 'axios';
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

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const LargeStockChart = () => {
  let [graphHeight, setGraphHeight] = useState(0.4 * window.innerHeight);
  let [stockName, setStockName] = useState('Name of Stock');
  let [stockPrice, setStockPrice] = useState(''); //setting this as string as different currencies might be required
  const [suggestions, setSuggestions] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [stock, setStock] = useState('');
  const [stockData, setStockData] = useState({});

  const getSuggestions = async (searchName) => {
    try {
      const { data } = await get(
        `https://stock-market-analyser-backend.cyclic.app/stock/autosuggest/${searchName}`,
      );
      if (data.length > 3) {
        setSuggestions(data.slice(0, 3));
      } else {
        setSuggestions(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const getStockData = async (sym) => {
    const {
      data: { data },
    } = await get(
      `https://stock-market-analyser-backend.cyclic.app/stock/chart/${symbol}`,
    );
    let toPlot = [];
    for (let i = 0; i < data.chart.result[0].timestamp.length; ++i) {
      toPlot.push({
        time: data.chart.result[0].timestamp[i],
        close: data.chart.result[0].indicators.quote[0].close[i],
      });
    }
    setStockData(toPlot);
    setStockPrice(data.chart.result[0].meta.previousClose);
    console.log(data.chart.result[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
  };

  useEffect(() => {
    window.addEventListener('resize', changeGraphHeight);
    return () => {
      window.removeEventListener('resize', changeGraphHeight);
    };
  }, [window.innerHeight, window.innerWidth]);
  useEffect(() => {
    if (symbol) {
      getStockData();
      const interval = setInterval(getStockData, 10000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [symbol]);

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
            <div className="mb-5 flex flex-col content-around lg:flex-row justify-around text-center">
              <div className="text-center">
                <p className="text-2xl text-center dark:text-white">
                  {symbol && stockData ? stockName : 'Search any stock'}
                </p>
              </div>
              <div>
                <p className="text-2xl text-center dark:text-white ">
                  {symbol && `$ ${stockPrice}`}
                </p>
              </div>
            </div>
            {symbol && (
              <div
                width="100%"
                height="100%"
                class="md:mr-10"
                style={{ marginLeft: -20 }}
              >
                <ResponsiveContainer width="110%" height={graphHeight}>
                  <AreaChart data={stockData}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#4FC82D"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4FC82D"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="close"
                      stroke="#64CE1D"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                    <XAxis
                      dataKey={(realdata) => {
                        if (realdata.time) {
                          new Date(Number(realdata.time));
                        }
                      }}
                      hide
                    ></XAxis>
                    <YAxis
                      domain={['auto', 'auto']}
                      allowDataOverflow={true}
                    ></YAxis>
                    {/* <CartesianGrid strokeDasharray="3 3" /> Line that generates grid*/}
                    {/* <Tooltip /> */}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-evenly">
            <div class="row-span-1">
              <Card class=" bg-gray-100 dark:bg-gray-700 rounded-lg">
                <CardBody>
                  <div className="grid grid-cols-12">
                    <Input
                      autoComplete="off"
                      value={stock}
                      type="text"
                      id="stock"
                      name="stock"
                      onInput={(e) => {
                        setStock(e.target.value);
                        if (e.target.value.length > 1) {
                          getSuggestions(e.target.value);
                        } else {
                          setSuggestions([]);
                        }
                      }}
                      className="col-span-9 bg-cool-gray-200 dark:bg-cool-gray-800 rounded-lg py-2 px-4 dark:text-white"
                      placeholder="Search for the Stock here"
                    />
                    <Button
                      size="small"
                      type="submit"
                      onClick={() => setSuggestions([])}
                      className="col-span-3 mx-2 p-2 text-white bg-purple-600 dark:bg-green-700 rounded-md focus:border-blue-300"
                    >
                      &#x1F50D;
                    </Button>
                  </div>
                  {suggestions &&
                    suggestions.map((suggestion) => {
                      return (
                        <div
                          key={suggestion.symbol}
                          className="bg-cool-gray-200 dark:bg-cool-gray-800 dark:text-gray-200 py-2 px-4 ml-2 mr-20 cursor-pointer bg-opacity-50 hover:bg-gray-300 dark:hover:bg-cool-gray-600"
                          onClick={() => {
                            setStock(suggestion.name);
                            setSymbol(suggestion.symbol);
                            setStockName(suggestion.name);
                            setSuggestions([]);
                          }}
                          onBlur={() => {
                            setTimeout(() => {
                              setSuggestions([]);
                            }, 100);
                          }}
                        >
                          <p className="text-xs">{suggestion.name}</p>
                        </div>
                      );
                    })}
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
