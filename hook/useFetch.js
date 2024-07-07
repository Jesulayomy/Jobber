import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import mockData from '../utils/mockData';


const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const effectRan = useRef(false);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      'x-rapidapi-key': '52fff5ec86mshd4f6db6b3cf774dp1751cdjsn24bd0b5e72aa',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };

  useEffect(() => {
    console.log('effect ran');
    if (effectRan.current === true) {
      setIsLoading(true);
      if (endpoint === 'job-details') {
        for (const item of mockData.data) {
          if (item.job_id === query.params.job_id) {
            setData(item);
            break;
          }
        }
      } else {
        setData(mockData.data);
      }
      setIsLoading(false);
    }
    return () => {
      effectRan.current = true;
    }
  }, []);

  const refetch = () => {
    console.log('refetching');
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }

  return { data, isLoading, error, refetch };
};

export default useFetch;
