import { useState } from 'react';
import { createDongHo } from '../services/donghoService';

export function useCreateDongHo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCreate = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createDongHo(data);
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { onCreate, loading, error };
}
