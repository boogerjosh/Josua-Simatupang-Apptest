import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (method, endpoint) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: `${method}`,
    maxBodyLength: Infinity,
    url: `https://contact.herokuapp.com/${endpoint}`,
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
    },
    // params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      // setData(response.data.data.sort((a, b) => {
      //   const nameA = a.firstName.toLowerCase();
      //   const nameB = b.firstName.toLowerCase();
      
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      //   return 0;
      // }));
      setData(response.data.data)
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
