import React from 'react';
import { Card, CardBody } from '@windmill/react-ui';

import PageTitle from '../components/Typography/PageTitle';
import SectionTitle from '../components/Typography/SectionTitle';
import CTA from '../components/CTA';


const Cards = () => {
  return (
    <>
      <PageTitle>Latest News</PageTitle>

      <SectionTitle>Latest Stock News</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card colored className="bg-red-400 dark:bg-yellow-500 text-white">
          <CardBody>
            <p className="mb-4 font-semibold">News 1</p>
            <p className="">We'll fetch from News APIs with stock and crypto keywords :)</p>
          </CardBody>
        </Card>

        <Card colored className="text-white bg-red-400 dark:bg-yellow-500">
          <CardBody>
            <p className="mb-4 font-semibold">News 2</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>
      </div>

      <SectionTitle>Latest Crypto News</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card colored className="text-white bg-red-400 dark:bg-yellow-500">
          <CardBody>
            <p className="mb-4 font-semibold">News 3</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>

        <Card colored className="text-white bg-red-400 dark:bg-yellow-500">
          <CardBody>
            <p className="mb-4 font-semibold">News 4</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>
      </div>

      <CTA />
    </>
  );
};

export default Cards;
