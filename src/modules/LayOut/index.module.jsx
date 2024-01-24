import TopInfo from './components/TopInfo/index.component';
import { LayOutContainer } from './index.style';
import TopHeaderComponent from './components/TopHeader/index.component';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, useNetwork } from 'wagmi';
import { getEthersProvider, getEthersSigner } from '../../utils/wallets/connectWallet';
import { setAddress, setMethod } from '../../store/user/user-actions';
import { useEffect } from 'react';
import { selectisReferralsLoading } from '../../store/referrals/referrals-selector';
import Spinner from '../LoadingSpinner/spinner.component';
import { setCurrentUser } from '../../store/providerAndSigner/user-actions';
import { selectMethod } from '../../store/user/user-selector';
import { ethers } from 'ethers';

const LayOutModule = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectisReferralsLoading);
  const walletMethod = useSelector(selectMethod);
  const { chain } = useNetwork();

  useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });

      const chainId = chain.id;

      const provider = getEthersProvider({ chainId });
      const signer = await getEthersSigner({ chainId });
      const userAddress = await signer.getAddress();

      dispatch(setAddress(userAddress));
      dispatch(setMethod('WalletConnect'));
      dispatch(setCurrentUser({ provider, signer }));
    },
    onDisconnect() {
      dispatch(setCurrentUser({ signer: null, provider: null }));
      dispatch(setAddress(null));
      dispatch(setMethod(''));
    }
  });

  useEffect(() => {
    const checkWallet = async () => {
      switch (walletMethod) {
        case 'Metamask': {
          await window.ethereum.enable();
          const provider = window.ethereum;

          const provider2 = new ethers.providers.Web3Provider(provider);
          const signer2 = await provider2.getSigner();
          const userAddress = await signer2.getAddress();

          dispatch(setAddress(userAddress));
          dispatch(setCurrentUser({ provider: provider2, signer: signer2 }));

          break;
        }

        case 'OKX Wallet': {
          await window.okxwallet.enable();
          const provider = window.okxwallet;

          const provider2 = new ethers.providers.Web3Provider(provider);
          const signer2 = await provider2.getSigner();
          const userAddress = await signer2.getAddress();

          dispatch(setAddress(userAddress));
          dispatch(setCurrentUser({ provider: provider2, signer: signer2 }));

          break;
        }

        case 'WalletConnect': {
          const chainId = chain?.id;

          const provider = getEthersProvider({ chainId });
          const signer = await getEthersSigner({ chainId });
          const userAddress = await signer?.getAddress();

          dispatch(setAddress(userAddress));
          dispatch(setCurrentUser({ provider, signer }));
        }
      }
    };

    checkWallet();
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <LayOutContainer>
        <TopInfo />
        <TopHeaderComponent />
        {children}
      </LayOutContainer>
    );
  }
};

export default LayOutModule;
