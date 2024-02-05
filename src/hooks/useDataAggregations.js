import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import { useEffect, useState } from '@types/react';
import { getRefContractForEmployeeManager } from '../utils/ethereum/ethereumFunctions';
import { useNotifications } from '../providers/Notifications';

export const useDataAggregations = (employees, interval = 5000) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [openTasks, setOpenTasks] = useState([]);
  const { alert } = useNotifications();

  const handleGetEvents = async () => {
    try {
      const contract = getRefContractForEmployeeManager(chainId, signer);
      const filter = contract.filters.eLog();
      const events = await contract.queryFilter(filter);

      if (events) {
        const openTasksAgg = employees.map((employee) => {
          const openTasks = events.map((e) => e.args);
          return {
            id: employee.nickname,
            openTasks
          };
        });
        setOpenTasks(openTasksAgg);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (!chainId && !employees) {
      return;
    }
    const iId = setInterval(handleGetEvents, interval);
    return () => {
      clearInterval(iId);
    };
  }, [chainId, employees]);

  console.log('useDataAggregations', openTasks);
  return {};
};
