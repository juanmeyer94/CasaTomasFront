import { useEffect } from 'react';

const useKeepAlive = (url: string) => {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Keep-alive request failed:', error));
    }, 10 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [url]);
};

export default useKeepAlive;
