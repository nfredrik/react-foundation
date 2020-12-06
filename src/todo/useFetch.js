import axios from 'axios';

import {
  useState,
  useEffect
} from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios(url);

      setData(result.data);
    };

    fetchTodos();
  }, [url]);

  return [data, setData];
  // return data;
}