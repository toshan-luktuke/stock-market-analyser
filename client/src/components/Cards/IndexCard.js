import React from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { AreaChart, Area } from 'recharts';

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

const IndexCard = ({ indexName, value }) => {
  return (
    <Card>
      <CardBody>
        <div className="grid grid-cols-2">
          <div className="grid grid-rows-2">
            <p className="mb-4 font-semibold text-black dark:text-white">
              {indexName}
            </p>
            <p className="font-medium text-gray-600 dark:text-gray-300">
              {value}
            </p>
            <p className="text-xs font-light text-gray-600 dark:text-gray-400">
              Change in % here
            </p>
          </div>
          <AreaChart height={80} width={150} data={data}>
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#1aff1a"
              fill="#A3D4BB"
              fillOpacity={0.5}
              strokeWidth={2}
            />
          </AreaChart>
        </div>
      </CardBody>
    </Card>
  );
};

export default IndexCard;
