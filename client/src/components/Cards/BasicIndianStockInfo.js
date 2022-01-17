import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { get } from 'axios';

import { useFetch } from '../../hooks/useFetch';
import CTA from '../CTA';

const BasicIndianStockInfo = ({ symbol }) => {
  return (
    <div>
      <p>{symbol}</p>
    </div>
  );
};

export default BasicIndianStockInfo;
