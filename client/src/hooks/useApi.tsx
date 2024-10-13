import { useState } from 'react';
import axios from 'axios';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const get = async (url: string) => {
    setLoading(true);
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('jwtToken='))?.split('=')[1];

    try {
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError(null); 
      return response.data;
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const post = async (url: string, data: any) => {
    setLoading(true);
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('jwtToken='))?.split('=')[1];

    try {
      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError(null); 
      return response.data;
    } catch (err) {
      console.error('Error posting data:', err);
      setError('Failed to post data');
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, get, post };
};

export default useApi;
