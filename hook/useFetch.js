import { useState, useEffect } from 'react';
import axios from 'axios';
// import { RAPID_API_KEY } from '@env';
// const rapidApiKey = RAPID_API_KEY;

const mockData = [
  {
    job_id: 1,
    employer_name: "Microsoft",
    employer_logo: "https://logo.clearbit.com/microsoft.com",
    job_title: "Software Engineer",
    job_location: "New York, USA",
    job_city: "New York",
    job_state: "NY",
    job_country: "USA",
  },
  {
    job_id: 2,
    employer_name: "Google",
    employer_logo: "https://logo.clearbit.com/google.com",
    job_title: "Frontend Developer",
    job_location: "California, USA",
    job_city: "Mountain View",
    job_state: "CA",
    job_country: "USA",
  },
  {
    job_id: 3,
    employer_name: "Facebook",
    employer_logo: "https://logo.clearbit.com/facebook.com",
    job_title: "Backend Developer",
    job_location: "Texas, USA",
    job_city: "Austin",
    job_state: "TX",
    job_country: "USA",
  },
  {
    job_id: 4,
    employer_name: "Amazon",
    employer_logo: "https://logo.clearbit.com/amazon.com",
    job_title: "DevOps Engineer",
    job_location: "Washington, USA",
    job_city: "Seattle",
    job_state: "WA",
    job_country: "USA",
  },
  {
    job_id: 5,
    employer_name: "Apple",
    employer_logo: "https://logo.clearbit.com/apple.com",
    job_title: "Senior Software Engineer",
    job_location: "California, USA",
    job_city: "Cupertino",
    job_state: "CA",
    job_country: "USA",
  },
  {
    job_id: 6,
    employer_name: "Tesla",
    employer_logo: "https://logo.clearbit.com/tesla.com",
    job_title: "Data Scientist",
    job_location: "Texas, USA",
    job_city: "Austin",
    job_state: "TX",
    job_country: "USA",
  },
  {
    job_id: 7,
    employer_name: "Netflix",
    employer_logo: "https://logo.clearbit.com/netflix.com",
    job_title: "Binge Watcher",
    job_location: "California, USA",
    job_city: "Los Gatos",
    job_state: "CA",
    job_country: "USA",
  },
  {
    job_id: 9,
    employer_name: "Samsung",
    employer_logo: "https://logo.clearbit.com/samsung.com",
    job_title: "Mobile Developer",
    job_location: "Suwon, South Korea",
    job_city: "Yeongtong-gu",
    job_state: "Suwon",
    job_country: "South Korea",
  },
  {
    job_id: 10,
    employer_name: "IBM",
    employer_logo: "https://logo.clearbit.com/ibm.com",
    job_title: "Software Engineer",
    job_location: "New York, USA",
    job_city: "New York",
    job_state: "NY",
    job_country: "USA",
  },
]

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
    try {
      // const response = await axios.request(options);
      const response = {
        data: {
          data: mockData,
        },
      };
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
};

export default useFetch;
