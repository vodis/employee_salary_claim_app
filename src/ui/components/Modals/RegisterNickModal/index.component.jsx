import React, { useContext, useRef } from 'react';
import {
  ClaimButtonStyle,
  DepositButtonContainer,
  MadalBodyTitle,
  MadalBodyTitleTextWrap,
  ModalBody,
  ModalBodyTitleText,
  ModalBodyWrapper,
  ModalOverlay,
  ModalTitle,
  ModalTitleError,
  ModalTitleTx,
  ModalTitleWrapper,
  ModalWrapper
} from './index.style';
import {
  CloseButtonStyled,
  CloseButtonWhiteStyled,
  ModalButtonClose
} from '../WaleltInfoModal/index.style';
import { getExplorerFromChainName } from '../../../../utils/wallets/utils';
import { ReactComponent as Spinner } from '../../../images/spinner.svg';
import { ReactComponent as Complete } from '../../../images/radio-check.svg';
import { useSelector } from 'react-redux';
import { selectMethod } from '../../../../store/user/user-selector';
import { ReactComponent as BSCLogo } from '../../../../ui/images/bsc.svg';
import { ReactComponent as PolygonLogo } from '../../../../ui/images/poligon.svg';
import { darkTheme, ThemeContext } from '../../../../theming';

const RegisterModalTx = ({ setIsModalOpen, nick, error, txHash, chain, isLoading }) => {
  const theme = useContext(ThemeContext);
  const walletMethod = useSelector(selectMethod);
  const modalRef = useRef();

  const closeButton =
    theme === darkTheme ? (
      <CloseButtonWhiteStyled onClick={() => setIsModalOpen(false)} />
    ) : (
      <CloseButtonStyled onClick={() => setIsModalOpen(false)} />
    );

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  const openExplorer = () => {
    const explorer = getExplorerFromChainName(chain);

    const url = `${explorer}/tx/${txHash}`;

    window.open(url, '_blank');
  };

  const buttonText = () => {
    if (error === '' && txHash === '' && !isLoading) {
      return <ClaimButtonStyle>See YOUR Wallet</ClaimButtonStyle>;
    }

    if (txHash !== '' && isLoading) {
      return (
        <ClaimButtonStyle
          onClick={openExplorer}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Spinner
            style={{ width: '40px', height: '40px', stroke: 'white', marginRight: '10px' }}
          />
          Transaction Pending
        </ClaimButtonStyle>
      );
    }

    if (txHash !== '' && !isLoading) {
      return (
        <ClaimButtonStyle
          onClick={openExplorer}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Complete style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          Transaction Completed
        </ClaimButtonStyle>
      );
    }

    if (error !== '') {
      return <ClaimButtonStyle>Transaction Error</ClaimButtonStyle>;
    }
  };

  console.log('error: ', error);

  const errorNew = error.replace('execution reverted:', '');

  return (
    <ModalOverlay onClick={handleOutsideClick}>
      <ModalWrapper ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <ModalTitleWrapper>
          <ModalTitle>Transaction Info</ModalTitle>
          <ModalButtonClose>{closeButton}</ModalButtonClose>
        </ModalTitleWrapper>
        <ModalBody>
          <ModalBodyWrapper>
            <MadalBodyTitle>
              <MadalBodyTitleTextWrap>
                <ModalBodyTitleText>Register nick `${nick}`</ModalBodyTitleText>
              </MadalBodyTitleTextWrap>
              {error !== '' ? (
                <ModalTitleError>
                  {errorNew === 'user rejected transaction'
                    ? 'Transaction canceled in Wallet'
                    : errorNew}
                </ModalTitleError>
              ) : (
                <></>
              )}
              {txHash !== '' ? <ModalTitleTx>{txHash}</ModalTitleTx> : <></>}
              {walletMethod === 'WalletConnect' ? (
                <ModalTitleTx
                  style={{
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    alignItems: 'center',
                    display: 'flex',
                    fontStyle: 'italic'
                  }}
                >
                  {chain === 'bsc' ? (
                    <BSCLogo style={{ marginRight: '10px' }} />
                  ) : (
                    <PolygonLogo style={{ marginRight: '10px' }} />
                  )}
                  Check Network in Your Wallet
                </ModalTitleTx>
              ) : (
                <></>
              )}
            </MadalBodyTitle>
          </ModalBodyWrapper>
        </ModalBody>
        <DepositButtonContainer>{buttonText()}</DepositButtonContainer>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default RegisterModalTx;
