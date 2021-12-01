import { useCallback, useState, useEffect } from 'react';
import { get } from 'axios';

export const useFetch = (url) => {
  const [recdata, setRecdata] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = useCallback(async () => {
    try {
      const { data } = await get(url, { crossdomain: true });
      setRecdata(data);
      setisLoading(false);
    } catch (error) {
      setError(true);
      throw new Error(error);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);

  return { recdata, isLoading, error };
};
