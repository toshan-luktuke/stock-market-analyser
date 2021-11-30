import React from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';

import PageTitle from '../components/Typography/PageTitle';
import NewsArticle from '../components/Cards/NewsArticle';
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
