import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import { getRefContractForTaskManager } from '../utils/ethereum/ethereumFunctions';

export const useAddTaskEvent = (nickname, interval = 1000) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const iId = setInterval(async () => {
      const contract = getRefContractForTaskManager(chainId, signer);
      const filter = contract.filters.eLog();
      const events = await contract.queryFilter(filter);

      if (events) {
        const eventInfo = events
          .map((e) => e.args)
          .map((d) => ({
            taskId: d[2],
            nickname: d[3],
            periods: d[4],
            prices: d[5],
            createdAd: d[6],
            title: d[7]
          }));

        setTasks(eventInfo);
      }
    }, interval);
    return () => {
      setTasks([]);
      clearInterval(iId);
    };
  }, [chainId]);

  return {
    tasks
  };
};
