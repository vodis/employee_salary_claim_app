import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';

export const useChainId = () => {
  const provider = useSelector(selectCurrentUser).provider;

  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (provider) {
      const getChainId = async () => {
        try {
          const network = await provider.getNetwork();
          setChainId(network.chainId);
        } catch (error) {
          console.error('Ошибка при получении chainId:', error);
        }
      };

      getChainId();
    }
  }, [provider]);

  return chainId;
};
