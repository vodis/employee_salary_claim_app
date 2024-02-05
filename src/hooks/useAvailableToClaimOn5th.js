import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import { useNotifications } from '../providers/Notifications';
import { getRefContractForTaskManager } from '../utils/ethereum/ethereumFunctions';

export const useAvailableToClaimOn5th = (nickname) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [amount, setAmount] = useState([]);
  const { alert } = useNotifications();

  const get5thTimestamp = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1, 5);
    return currentDate.getTime();
  };

  const handleGetEvents = async () => {
    const contract = getRefContractForTaskManager(chainId, signer);
    const filter = contract.filters.eLog();
    const events = await contract.queryFilter(filter);

    if (events) {
      const amountInfo = events
        .map((e) => e.args)
        .filter((fEl) => fEl[2] === nickname)
        .reduce((a, el, i, arr) => {
          if (el[1] === 'paid_one') {
            const isAlreadyTakenButOutdated = a.findIndex(
              (ex) => ex[1] === 'paid_one' && ex[2].toNumber() === el[2].toNumber()
            );
            if (isAlreadyTakenButOutdated !== -1) {
              a[isAlreadyTakenButOutdated] = el;
            }
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
        .reduce((a, el, i, arr) => {
          let calc = 0;
          el[6].forEach((elEl, j) => {
            if (!elEl) {
              if (arr[i].periods[j] * 1000 <= get5thTimestamp()) {
                calc += arr[i].prices[j];
              }
            }
          });
          if (calc) {
            a += calc;
          }
          return a;
        }, 0);
      setAmount(amountInfo);
    }
  };

  useEffect(() => {
    if (!chainId && !nickname) {
      return;
    }
    try {
      handleGetEvents();
    } catch (e) {
      alert(e);
    }
  }, [chainId, nickname]);

  return {
    amount
  };
};
