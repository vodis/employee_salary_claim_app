import { ClaimButton } from './index.style';
import { getChainIdFromName } from '../../../../utils/wallets/utils';
import { utils } from 'web3';
import { ethers } from 'ethers';
import { setAddress, setMethod } from '../../../../store/user/user-actions';
import { setCurrentUser } from '../../../../store/providerAndSigner/user-actions';
import { getEthersProvider, getEthersSigner } from '../../../../utils/wallets/connectWallet';
import { useDispatch, useSelector } from 'react-redux';
import { selectMethod } from '../../../../store/user/user-selector';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const SwitchButton = ({ chain }) => {
  const walletType = useSelector(selectMethod);
  const dispatch = useDispatch();

  const chainWagmi = useNetwork().chain;

  const { switchNetworkAsync } = useSwitchNetwork({
    async onSuccess(data) {
      const chainIdPast = chainWagmi?.id;

      const provider = getEthersProvider({ chainId: chainIdPast });
      const signer = await getEthersSigner({ chainId: chainIdPast });
      const userAddress = await signer?.getAddress();

      dispatch(setAddress(userAddress));
      dispatch(setMethod('WalletConnect'));
      dispatch(setCurrentUser({ provider, signer }));
    },
    onMutate(args) {
      console.log('Mutate', args);
    }
  });

  const changeChain = async (chainId) => {
    try {
      switch (walletType) {
        case 'Metamask': {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: utils.toHex(chainId) }]
          });

          await window.ethereum.enable();
          const provider = window.ethereum;

          const provider2 = new ethers.providers.Web3Provider(provider);
          const signer2 = await provider2.getSigner();
          const userAddress = await signer2.getAddress();

          dispatch(setAddress(userAddress));
          dispatch(setMethod('Metamask'));
          dispatch(setCurrentUser({ provider: provider2, signer: signer2 }));

          break;
        }

        case 'OKX Wallet': {
          await window.okxwallet.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: utils.toHex(chainId) }]
          });

          await window.okxwallet.enable();
          const provider = window.okxwallet;

          const provider2 = new ethers.providers.Web3Provider(provider);
          const signer2 = await provider2.getSigner();
          const userAddress = await signer2.getAddress();

          dispatch(setAddress(userAddress));
          dispatch(setMethod('OKX Wallet'));
          dispatch(setCurrentUser({ provider: provider2, signer: signer2 }));

          break;
        }

        case 'WalletConnect': {
          await switchNetworkAsync(chainId);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ClaimButton onClick={() => changeChain(getChainIdFromName(chain))} style={{ padding: '0' }}>
      Switch Chain
    </ClaimButton>
  );
};

export default SwitchButton;
