import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import { useEffect, useState } from 'react';
import { getRefContractForEmployeeManager } from '../utils/ethereum/ethereumFunctions';
import { utils } from 'ethers';

export const useGetNicknameByWalletEvent = (interval = 1000) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [nickname, setNickname] = useState('');

  const handleSendTransaction = async () => {
    const contract = getRefContractForEmployeeManager(chainId, signer);
    const address = await signer.getAddress();
    if (!address) {
      return;
    }
    const values = [address];
    const data = contract.interface.encodeFunctionData('getEmployeeNicknameByWallet', values);
    const gasLimit = await contract.estimateGas.getEmployeeNicknameByWallet(...values);
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit * 2
    };

    const result = await signer.call(tx);
    const decode = utils.defaultAbiCoder.decode(['string'], result)?.[0];
    setNickname(decode);
  };

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const iId = setInterval(async () => {
      handleSendTransaction();
    }, interval);
    return () => {
      setNickname('');
      clearInterval(iId);
    };
  }, [chainId]);

  return { nickname };
};
