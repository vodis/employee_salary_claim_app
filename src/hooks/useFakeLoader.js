import { useEffect, useState } from 'react';

export const useFakeLoader = (timeout = 30000) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), timeout);
  }, []);

  return {
    loading
  };
};
