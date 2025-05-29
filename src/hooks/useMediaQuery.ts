import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches(e.matches);
    };

    setMatches(media.matches);
    media.addListener(updateMatch);

    return () => media.removeListener(updateMatch);
  }, [query]);

  return matches;
};

export default useMediaQuery;