import React from 'react';

import PageTitle from '../components/Typography/PageTitle';
import NewsArticle from '../components/Cards/NewsArticle';
import CTA from '../components/CTA';
import { useFetch } from '../hooks/useFetch';

const Cards = () => {
  const url =
    'https://inshorts-news-api-8vpo9a88a.vercel.app/news?category=business';
  const {
    recdata: { data },
    isLoading,
    error,
  } = useFetch(url);
  if (!isLoading) {
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
  } else if (error) {
    return (
      <>
        <PageTitle>Latest Finance News</PageTitle>
        <p className="dark:text-white text-center">
          Unable to fetch news right now :(
        </p>
      </>
    );
  } else {
    return (
      <>
        <PageTitle>Latest Finance News</PageTitle>
        <p className="dark:text-white text-center animate__animated animate__flash animate__infinite">
          Loading...
        </p>
      </>
    );
  }
};

export default Cards;
