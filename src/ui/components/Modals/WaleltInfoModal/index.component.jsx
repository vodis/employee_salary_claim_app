import {
  CloseButtonStyled,
  CloseButtonWhiteStyled,
  MadalBodyTitle,
  ModalAddress,
  ModalAddressAndStatus,
  ModalBody,
  ModalBodyTitleText,
  ModalBodyWrapper,
  ModalButtonClose,
  ModalCopyAddressText,
  ModalCopyAddressWrapper,
  ModalOverlay,
  ModalStatus,
  ModalTitle,
  ModalTitleWrapper,
  ModalWrapper
} from './index.style';
import { ReactComponent as CopyButton } from '../../../../ui/images/copy.svg';
import { ReactComponent as CopiedButton } from '../../../../ui/images/copied.svg';
import DisconnectButton from '../../Buttons/DisconnectButton/index.component';
import { useSelector } from 'react-redux';
import { selectMethod, selectUserAddress } from '../../../../store/user/user-selector';
import { compressAddress } from '../../../../utils/wallets/utils';
import React, { useContext, useRef, useState } from 'react';
import { darkTheme, ThemeContext } from '../../../../theming';

const WalletInfoModal = ({ setModalOpen }) => {
  const [copied, setCopied] = useState(false);
  const address = useSelector(selectUserAddress);

  const method = useSelector(selectMethod);

  const modalRef = useRef();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true); // Устанавливаем состояние, что скопировали
      setTimeout(() => {
        setCopied(false); // Через секунду возвращаем состояние обратно
      }, 2000);
    });
  };

  const theme = useContext(ThemeContext);

  const closeButton =
    theme === darkTheme ? (
      <CloseButtonWhiteStyled onClick={() => setModalOpen(false)} />
    ) : (
      <CloseButtonStyled onClick={() => setModalOpen(false)} />
    );

  return (
    <ModalOverlay onClick={handleOutsideClick}>
      <ModalWrapper ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <ModalTitleWrapper>
          <ModalTitle>Address</ModalTitle>
          <ModalButtonClose>{closeButton}</ModalButtonClose>
        </ModalTitleWrapper>
        <ModalBody>
          <ModalBodyWrapper>
            <MadalBodyTitle>
              <ModalBodyTitleText>Connected address via {method}</ModalBodyTitleText>
            </MadalBodyTitle>

            <ModalAddressAndStatus>
              <ModalStatus />
              <ModalAddress>{compressAddress(String(address))}</ModalAddress>

              <DisconnectButton />
            </ModalAddressAndStatus>

            <ModalCopyAddressWrapper onClick={copyAddress}>
              {copied ? (
                <>
                  <CopiedButton />
                  <ModalCopyAddressText>Copied!</ModalCopyAddressText>
                </>
              ) : (
                <>
                  <CopyButton />
                  <ModalCopyAddressText>Copy Address</ModalCopyAddressText>
                </>
              )}
            </ModalCopyAddressWrapper>
          </ModalBodyWrapper>
        </ModalBody>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default WalletInfoModal;
