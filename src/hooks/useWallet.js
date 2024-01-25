import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { selectMethod } from '../store/user/user-selector';
import { setAddress } from '../store/user/user-actions';
import { setCurrentUser } from '../store/providerAndSigner/user-actions';

export const useWallet = () => {
  const dispatch = useDispatch();
  const walletMethod = useSelector(selectMethod);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);

  const initializeWallet = async () => {
    switch (walletMethod) {
      case 'Metamask':
        await window.ethereum.enable();
        // eslint-disable-next-line no-case-declarations
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // eslint-disable-next-line no-case-declarations
        const signer = await provider.getSigner();
        // eslint-disable-next-line no-case-declarations
        const userAddress = await signer.getAddress();
        // eslint-disable-next-line no-case-declarations
        const { chainId } = await provider.getNetwork();

        dispatch(setAddress(userAddress));
        dispatch(setCurrentUser({ provider, signer }));
        setChainId(chainId);
        setProvider(provider);
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    initializeWallet();

    return () => {
      if (provider) {
        provider?.disconnect();
      }
      setProvider(null);
    };
  }, [walletMethod]);

  return {
    provider,
    chainId
  };
};
