import { useCallback, useState, useEffect } from 'react';
import { get } from 'axios';

export const useFetch = (url) => {
  const [recdata, setRecdata] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const { data } = await get(url, { crossdomain: true });
      setRecdata(data);
      setisLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);

  return { recdata, isLoading };
};
