import React, { useRef } from 'react';
import { ReactComponent as WalletConnectLogo } from '../../../../ui/images/walletConnectLogo.svg';
import { ReactComponent as MetamMaskLogo } from '../../../../ui/images/metamaskLogo.svg';
import { ReactComponent as OkxWallet } from '../../../../ui/images/okxLogo.svg';
import { useWeb3Modal } from '@web3modal/react';
import { useDispatch } from 'react-redux';
import { setAddress, setMethod } from '../../../../store/user/user-actions';
import { ethers } from 'ethers';
import {
  ModalOverlay,
  ModalTitle,
  ModalWrapper,
  WalletOption,
  WalletOptionsWrapper
} from './index.style';
import { setCurrentUser } from '../../../../store/providerAndSigner/user-actions';

const Modal = ({ setIsModalOpen }) => {
  const modalRef = useRef();
  const { open } = useWeb3Modal();

  const isMetamaskAvalible = window.ethereum !== undefined;
  const isOkxAvalible = window.okxwallet !== undefined;

  const dispatch = useDispatch();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  const handleWalletClick = async (e) => {
    switch (e) {
      case 'Metamask': {
        if (!isMetamaskAvalible) {
          window.open(
            'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
            '_blank'
          );

          break;
        } else {
          await window.ethereum.enable();
          const provider = window.ethereum;

          const provider2 = new ethers.providers.Web3Provider(provider);
          const signer2 = await provider2.getSigner();
          const userAddress = await signer2.getAddress();

          dispatch(setAddress(userAddress));
          dispatch(setMethod('Metamask'));
          dispatch(setCurrentUser({ provider: provider2, signer: signer2 }));

          setIsModalOpen(false);

          break;
        }
      }

      case 'OKX Wallet': {
        if (!isOkxAvalible) {
          window.open(
            'https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge',
            '_blank'
          );

          break;
        } else {
          await window.okxwallet.enable();
          const provider = window.okxwallet;

          const provider2 = new ethers.providers.Web3Provider(provider);
          const signer2 = await provider2.getSigner();
          const userAddress = await signer2.getAddress();

          dispatch(setAddress(userAddress));
          dispatch(setMethod('OKX Wallet'));
          dispatch(setCurrentUser({ provider: provider2, signer: signer2 }));

          setIsModalOpen(false);

          break;
        }
      }

      case 'WalletConnect': {
        setIsModalOpen(false);
        open();
        break;
      }
    }
  };

  return (
    <ModalOverlay onClick={handleOutsideClick}>
      <ModalWrapper ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Choose Wallet</ModalTitle>
        <WalletOptionsWrapper>
          <WalletOption onClick={async () => await handleWalletClick('Metamask')}>
            <MetamMaskLogo style={isMetamaskAvalible ? {} : { filter: 'grayscale(100%)' }} />
            <span>Metamask</span>
          </WalletOption>
          <WalletOption onClick={async () => await handleWalletClick('OKX Wallet')}>
            <OkxWallet style={isOkxAvalible ? {} : { filter: 'grayscale(100%)' }} />
            <span>OKX Wallet</span>
          </WalletOption>
          <WalletOption onClick={async () => await handleWalletClick('WalletConnect')}>
            <WalletConnectLogo />
            <span>WalletConnect</span>
          </WalletOption>
        </WalletOptionsWrapper>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Modal;
