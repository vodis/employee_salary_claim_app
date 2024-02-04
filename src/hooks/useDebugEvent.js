import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import {
  getRefContractForTaskManager,
  getRefContractForChargeVesting
} from '../utils/ethereum/ethereumFunctions';

export const useDebugEvent = (nickname, interval = 5000) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const iId = setInterval(async () => {
      let events;
      let events2;
      try {
        const contract = getRefContractForTaskManager(chainId, signer);
        const filter = contract.filters.debug();
        events = await contract.queryFilter(filter);

        const contract2 = getRefContractForChargeVesting(chainId, signer);
        const filter2 = contract2.filters.debug();
        events2 = await contract2.queryFilter(filter2);
      } catch (e) {
        alert(e);
      }

      if (events) {
        const eventInfo = events.map((e) => e.args);
        console.log(eventInfo, 'debugTaskManager');
      }
      if (events2) {
        const eventInfo = events2.map((e) => e.args);
        console.log(eventInfo, 'debugChargeVesting');
      }
    }, interval);
    return () => {
      clearInterval(iId);
    };
  }, [chainId]);
};
