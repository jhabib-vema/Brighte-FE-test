import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts';

export const useFetchData = () => {
  const { apiClient } = useAppContext();
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /* Expose method to programatically trigger API refresh */
  async function fetchData() {
    setLoading(true);
    const referralDataRequest = await apiClient.getReferralData();
    if (referralDataRequest.type === 'success') {
      setData(referralDataRequest.data);
    } else {
      setError(referralDataRequest.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    error,
    loading,
    fetchData,
  };
};
