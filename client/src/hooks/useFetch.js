import { useCallback, useState, useEffect } from 'react';
import { get } from 'axios';

export const useFetch = (url) => {
  const [recdata, setRecdata] = useState({});
  const [isLoading, setisLoading] = useState(true);
  // const [quantity, setQuantity] = useState(0);

  const getData = useCallback(async () => {
    try {
      const { data } = await get(url);
      setRecdata(data);
      setisLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  }, [url]);

  useEffect(() => {
    // setQuantity(6);
    getData();
  }, [url, getData]);

  return { recdata, isLoading };
};
