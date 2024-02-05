import { useEffect, useState } from 'react';
import { useNotifications } from '../providers/Notifications';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import { getRefContractForEmployeeManager } from '../utils/ethereum/ethereumFunctions';

export const useEmployeesInfo = (interval) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [employeesInfo, setEmployeesInfo] = useState([]);
  const { alert } = useNotifications();

  const handleGetEvents = async (interval = 1000) => {
    const contract = getRefContractForEmployeeManager(chainId, signer);
    const filter = contract.filters.eLog();
    const events = await contract.queryFilter(filter);

    if (events) {
      const employeesInfo = events
        .map((e) => e.args)
        .map((mEl) => ({
          nickname: mEl[2],
          address: mEl[3],
          isFired: mEl[4],
          createdAt: mEl[5]
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
