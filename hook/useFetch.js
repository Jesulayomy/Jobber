import { useState, useEffect } from 'react';
import axios from 'axios';
// import { RAPID_API_KEY } from '@env';
// const rapidApiKey = RAPID_API_KEY;
import mockData from '../utils/mockData';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      'x-rapidapi-key': '52fff5ec86mshd4f6db6b3cf774dp1751cdjsn24bd0b5e72aa',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    const response = mockData;
    console.log('setting data');
    try {
      // const response = await axios.request(options);
      if (endpoint === 'job-details') {
        for (const item of response.data) {
          if (item.job_id === options.params.job_id) {
            setData(item);
            break;
          }
        }
        console.log('DATA!');
      } else {
        setData(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("We got error");
      setError(error);
      alert(error);
    } finally {
      console.log('fetched');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log('useEffect');
    fetchData();
    setIsLoading(false);
  }, []);

  const refetch = () => {
    console.log('refetching');
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
};

export default useFetch;
