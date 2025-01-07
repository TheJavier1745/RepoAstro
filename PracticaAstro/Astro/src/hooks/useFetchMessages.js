import { useState, useEffect } from 'react';

const useFetchMessages = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(
          result.map((row) => ({
            ...row,
            id: row.id,
            fecha_hora: row.fecha_hora || '',
          }))
        );
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export default useFetchMessages;
