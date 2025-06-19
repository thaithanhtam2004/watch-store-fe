import { useState } from 'react';
import { updateDongHo } from '../services/donghoService';

export function useUpdateDongHo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onUpdate = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateDongHo(id, data);
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { onUpdate, loading, error };
}
