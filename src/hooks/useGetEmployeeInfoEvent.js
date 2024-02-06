import { useEffect, useState } from 'react';
import { useNotifications } from '../providers/Notifications';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import { getRefContractForEmployeeManager } from '../utils/ethereum/ethereumFunctions';

export const useGetEmployeeInfoEvent = (interval = 1000) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [employeesInfo, setEmployeesInfo] = useState([]);
  const { alert } = useNotifications();

  const handleGetEvents = async () => {
    const contract = getRefContractForEmployeeManager(chainId, signer);
    const filter = contract.filters.eLog();
    const events = await contract.queryFilter(filter);

    if (events) {
      const employeesInfo = events
        .map((e) => e.args)
        .reduce((a, rEl) => {
          if (rEl[1] === 'fired_employee') {
            const isAlreadyTakenButOutdated = a.findIndex(
              (ex) => ex[1] === 'add_employee' && ex[2].toLowerCase() === rEl[2].toLowerCase()
            );
            if (isAlreadyTakenButOutdated !== -1) {
              a[isAlreadyTakenButOutdated] = {
                ...rEl,
                createdAt: a[isAlreadyTakenButOutdated][2],
                firedAt: rEl[5]
              };
            }
            return a;
          }
          a.push(rEl);
          return a;
        }, [])
        .map((mEl) => ({
          nickname: mEl[2],
          address: mEl[3],
          isFired: mEl[4],
          createdAt: mEl[5],
          firedAt: mEl.firedAt
        }));
      setEmployeesInfo(employeesInfo);
    }
  };

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const iId = setInterval(async () => {
      try {
        handleGetEvents();
      } catch (e) {
        alert(e);
      }
    }, interval);
    return () => {
      setEmployeesInfo([]);
      clearInterval(iId);
    };
  }, [chainId]);

  return {
    employeesInfo
  };
};
