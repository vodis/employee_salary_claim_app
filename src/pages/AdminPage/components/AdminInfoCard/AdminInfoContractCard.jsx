import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import {
  getRefContractForChargeVesting,
  getRefContractForERC20
} from '../../../../utils/ethereum/ethereumFunctions';
import { utils } from 'ethers';

const AdminInfoContractCard = () => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [chargeVestingAddress, setChargeVestingAddress] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');
  const [usdtBalance, setUsdtBalance] = useState(0);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    getRefContractForERC20(chainId, signer, (address) => setUsdtAddress(address));
    getRefContractForChargeVesting(chainId, signer, (address) => setChargeVestingAddress(address));
  }, [chainId]);

  const handleGetBalance = async () => {
    const contract = getRefContractForERC20(chainId, signer);
    const data = contract.interface.encodeFunctionData('balanceOf', [chargeVestingAddress]);
    const tx = {
      to: contract.address,
      data
    };
    const result = await signer.call(tx);
    const balanceOf = utils.defaultAbiCoder.decode(['uint256'], result)[0].toString();
    setUsdtBalance((+balanceOf / 10 ** 18).toFixed(4));
  };

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (chargeVestingAddress) {
      handleGetBalance();
    }
  }, [chainId, chargeVestingAddress]);

  return (
    <div className="d-flex flex-column gap-3 align-items-start mb-4">
      <h5 className="card-title mb-2 flex-shrink-0">Contract information:</h5>
      <div className="w-100">
        <span style={{ fontSize: '0.8rem' }}>{`${usdtAddress} - адрес usdt`}</span>
        <div className="d-flex justify-content-between">
          <span>Contract Balance (USDT):</span>
          <span>{usdtBalance}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoContractCard;
