import { useCallback, useEffect, useRef, useState } from 'react';

export const useWaitingUntilFetchChanges = (
  fetchFn,
  interval,
  maxWaitingTime = 0,
  callback = () => {}
) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const responseSnapshotRef = useRef(null);

  const handleStartWaiting = async () => {
    if (responseSnapshotRef.current) {
      return;
    }
    try {
      const response = await fetchFn();
      responseSnapshotRef.current = response;
      setIsWaiting(true);
    } catch (error) {
      responseSnapshotRef.current = null;
      setIsWaiting(false);
      console.error('Error fetching data from API:', error);
    }
  };

  const handleDataComparison = useCallback(
    (data) => {
      return JSON.stringify(responseSnapshotRef.current) === JSON.stringify(data);
    },
    [responseSnapshotRef.current]
  );

  useEffect(() => {
    if (!responseSnapshotRef.current) {
      return;
    }

    const fetchDataFromAPI = async () => {
      try {
        const response = await fetchFn();

        const isEqual = handleDataComparison(response);
        if (isEqual) {
          return;
        }

        clearInterval(intervalId);
        responseSnapshotRef.current = null;
        setIsWaiting(false);

        callback();
      } catch (error) {
        clearInterval(intervalId);
        responseSnapshotRef.current = null;
        setIsWaiting(false);
        console.error('Error fetching data from API:', error);
      }
    };

    const intervalId = setInterval(fetchDataFromAPI, interval);

    if (maxWaitingTime > 0) {
      setTimeout(() => {
        clearInterval(intervalId);
        responseSnapshotRef.current = null;
        setIsWaiting(false);
      }, maxWaitingTime);
    }

    return () => {
      clearInterval(intervalId);
      responseSnapshotRef.current = null;
      setIsWaiting(false);
    };
  }, [fetchFn, interval, maxWaitingTime, handleDataComparison, callback]);

  return {
    isWaiting,
    handleStartWaiting
  };
};
