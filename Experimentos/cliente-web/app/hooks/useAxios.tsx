'use client';

import { useRouter } from 'next/navigation';
import axios, { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';

const useAxiosWithRedirect = () => {
  const router = useRouter();

  const fetchData = useCallback(
    async (config: AxiosRequestConfig) => {
      try {
        const response = await axios(config);
        return response.data;
      } catch (error) {
        console.error('Request failed:', error);
        router.push('/error');
        throw error;
      }
    },
    [router]
  );

  return { fetchData };
};

export default useAxiosWithRedirect;
