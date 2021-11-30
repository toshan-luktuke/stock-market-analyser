import React from 'react';
import { Card, CardBody } from '@windmill/react-ui';

const NewsArticle = ({ title, content, date, time }) => {
  return (
    <Card
      colored
      className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
    >
      <CardBody>
        <p className="mb-2 font-semibold text-center font-ticker1 dark:text-purple-100">
          {title}
        </p>
        <p className="mb-1 flex justify-between text-sm dark:text-cool-gray-300 text-gray-800">
          <p>{date}</p> <p>{time}</p>
        </p>
        <p className="font-medium text-sm dark:text-gray-400">{content}</p>
      </CardBody>
    </Card>
  );
};

export default NewsArticle;
