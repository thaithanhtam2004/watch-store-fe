import { useState } from 'react';
import { deleteDongHo } from '../services/donghoService';

export function useDeleteDongHo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteDongHo(id);
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { onDelete, loading, error };
}
