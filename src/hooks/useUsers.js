import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import { getRefContractForEmployeeManager } from '../utils/ethereum/ethereumFunctions';

export const useUsers = () => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const iId = setInterval(async () => {
      const contract = getRefContractForEmployeeManager(chainId, signer);
      const filter = contract.filters.eLog1();
      const events = await contract.queryFilter(filter);

      if (events) {
        setUsers(
          events
            .map((e) => e.args)
            .map((d) => ({
              nickname: d[2],
              address: d[3],
              createdAt: d[4]
            }))
        );
      }
    }, 1000);
    return () => {
      clearInterval(iId);
    };
  }, [chainId]);

  return {
    users
  };
};
