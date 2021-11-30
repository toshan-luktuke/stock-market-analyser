import React from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import InfiniteScroll from 'react-infinite-scroll-component';

import PageTitle from '../components/Typography/PageTitle';
import SectionTitle from '../components/Typography/SectionTitle';
import CTA from '../components/CTA';
import { useFetch } from '../hooks/useFetch';

const Cards = () => {
  const url = 'https://inshortsapi.vercel.app/news?category=business';
  const {
    recdata: { data },
    isLoading,
  } = useFetch(url);
  console.log(data);
  return (
    <>
      <PageTitle>Latest Finance News</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* <InfiniteScroll> </InfiniteScroll> */}
        {!isLoading &&
          data.map((news_article) => {
            return <NewsArticle {...news_article} key={news_article.url} />;
          })}
      </div>
      <CTA />
    </>
  );
};

export default Cards;

const NewsArticle = ({ title, content }) => {
  return (
    <Card colored className="bg-red-400 dark:bg-teal-600 text-white">
      <CardBody>
        <p className="mb-4 font-semibold text-center font-ticker1">{title}</p>
        <p className="font-sadha text-sm font-medium">{content}</p>
      </CardBody>
    </Card>
  );
};
