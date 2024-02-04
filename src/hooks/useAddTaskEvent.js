import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import { getRefContractForTaskManager } from '../utils/ethereum/ethereumFunctions';
import { useNotifications } from '../providers/Notifications';

export const useAddTaskEvent = (nickname, interval = 1000) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [tasks, setTasks] = useState([]);
  const { alert } = useNotifications();

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const iId = setInterval(async () => {
      let events;
      try {
        const contract = getRefContractForTaskManager(chainId, signer);
        const filter = contract.filters.eLog();
        events = await contract.queryFilter(filter);
      } catch (e) {
        alert(e);
      }

      if (events) {
        const eventInfo = events
          .map((e) => e.args)
          .reduce((a, el, i, arr) => {
            if (el[1] === 'paid_one') {
              return a;
            }
            const findPaid = arr.findIndex((fPEl) => {
              return fPEl[1] === 'paid_one' && fPEl[2].toNumber() === el[2].toNumber();
            });
            if (findPaid !== -1) {
              a.push(arr[findPaid]);
              return a;
            }
            a.push(el);
            return a;
          }, [])
          .map((d) => ({
            eventName: d[1],
            taskId: d[2],
            nickname: d[3],
            periods: d[4],
            prices: d[5],
            getIsAlreadyPaid: d[6],
            createdAd: d[7],
            title: d[8]
          }));

        setTasks(eventInfo);
      }
    }, interval);
    return () => {
      setTasks([]);
      clearInterval(iId);
    };
  }, [chainId]);
  console.log(tasks, '<');
  return {
    tasks
  };
};
