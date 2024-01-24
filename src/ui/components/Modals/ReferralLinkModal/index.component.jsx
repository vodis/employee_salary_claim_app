import {
  MadalBodyTitle,
  ModalBody,
  ModalBodyTitleText,
  ModalBodyWrapper,
  ModalButtonClose,
  ModalCopyAddressText,
  ModalCopyAddressWrapper,
  ModalLinkText,
  ModalLinkWrapper,
  ModalOverlay,
  ModalTitle,
  ModalTitleWrapper,
  ModalWrapper
} from './index.style';
import { ReactComponent as CloseButton } from '../../../../ui/images/close-white.svg';
import { ReactComponent as CloseButtonWhite } from '../../../../ui/images/close.svg';
import { ReactComponent as CopyButton } from '../../../../ui/images/copy.svg';
import { ReactComponent as CopiedButton } from '../../../../ui/images/copied.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAddress } from '../../../../store/user/user-selector';
import { useEffect, useRef, useState } from 'react';
import { setAddress, setMethod } from '../../../../store/user/user-actions';
import { setCurrentUser } from '../../../../store/providerAndSigner/user-actions';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { getEthersProvider, getEthersSigner } from '../../../../utils/wallets/connectWallet';
import {
  getRefContractForNickRead
} from '../../../../utils/ethereum/ethereumFunctions';
import RegisterModalTx from '../RegisterNickModal/index.component';
import { selectTheme } from '../../../../store/theme/theme-selector';

const ReferralLinkModal = ({ setModalOpen }) => {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const [nick, setNick] = useState('');
  const address = useSelector(selectUserAddress);
  const theme = useSelector(selectTheme);
  const [txModal, setTxModal] = useState(false);
  const refLink = `https://app.airdrop-hunter.site/ref/?${address}`;

  const closeButton =
    theme === 'light' ? (
      <CloseButton onClick={() => setModalOpen(false)} />
    ) : (
      <CloseButtonWhite onClick={() => setModalOpen(false)} />
    );

  const getNick = async () => {
    const contract = await getRefContractForNickRead();

    const nickFromContract = await contract.NickGet(address);

    if (nickFromContract !== '') {
      setNick(nickFromContract);
    }
  };

  useEffect(() => {
    getNick();
  }, []);

  const modalRef = useRef();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };

  const textareaRef = useRef(null);

  const handleCopyButtonClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const chainWagmi = useNetwork().chain;

  useSwitchNetwork({
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

  return (
    <>
      <ModalOverlay onClick={handleOutsideClick}>
        <ModalWrapper ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <ModalTitleWrapper>
            <ModalTitle>Referral Link</ModalTitle>
            <ModalButtonClose>{closeButton}</ModalButtonClose>
          </ModalTitleWrapper>
          <ModalBody>
            <ModalBodyWrapper>
              <MadalBodyTitle>
                <ModalBodyTitleText>
                  For each referral you bring, you will receive % to your balance.
                </ModalBodyTitleText>
              </MadalBodyTitle>

              <ModalLinkWrapper style={{ marginBottom: '20px' }}>
                <ModalLinkText ref={textareaRef} value={refLink} readOnly />
                <ModalCopyAddressWrapper onClick={handleCopyButtonClick}>
                  {copied ? (
                    <>
                      <CopiedButton />
                      <ModalCopyAddressText>Copied!</ModalCopyAddressText>
                    </>
                  ) : (
                    <>
                      <CopyButton />
                      <ModalCopyAddressText style={{ marginRight: '15px' }}>
                        Copy
                      </ModalCopyAddressText>
                    </>
                  )}
                </ModalCopyAddressWrapper>
              </ModalLinkWrapper>
            </ModalBodyWrapper>
          </ModalBody>
        </ModalWrapper>
      </ModalOverlay>
      {txModal ? (
        <RegisterModalTx
          txHash={''}
          chain={'matic'}
          nick={nick}
          isLoading={false}
          error={''}
          setIsModalOpen={ setTxModal }
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ReferralLinkModal;
