import styled from 'styled-components';
import { ReactComponent as CloseButton } from '../../../../ui/images/close-white.svg';
import { ReactComponent as CloseButtonWhite } from '../../../../ui/images/close.svg';

export const mobileBreakpoint = '768px';
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  z-index: 100;
  min-width: 70%;
  max-width: 1000px;

  border: solid 5px ${(props) => props.theme.colors.primaryDarker};

  @media (max-width: ${mobileBreakpoint}) {
    width: 90%;
    max-width: 100%;
  }
`;

export const ModalTitleWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
  border-bottom: 0;
  z-index: 10;
`;

export const ModalTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.25rem;
  z-index: 10;
`;

export const DepositButtonContainer = styled.div`
  display: block;
  width: 100%;
  margin-top: 20px;
`;

export const ModalTitleError = styled.div`
  font-weight: normal;
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1rem;
  color: #e30909;
  text-align: center;
  padding: 10px;
  white-space: normal;
  z-index: 10;
`;

export const ModalTitleTx = styled.div`
  font-weight: normal;
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  padding: 10px;
  white-space: normal;
  z-index: 10;

  @media (max-width: ${mobileBreakpoint}) {
    visibility: hidden;
    overflow: hidden;
    padding: 0;
    line-height: 0;
  }
`;

export const WalletOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 2px solid #eaeaea;
  border-radius: 8px;
  cursor: pointer;
  z-index: 10;

  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  span {
    font-size: 14px;
    margin-top: 10px;
    font-weight: 500;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const WalletOptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
`;

export const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalBodyWrapper = styled.div`
  border: solid 1px ${(props) => props.theme.colors.secondBackground};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.secondBackground};
  padding: 10px;
  width: 98%;
`;

export const MadalBodyTitle = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const MadalBodyTitleTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

export const ModalBodyTitleText = styled.div`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 20px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  justify-content: center;
  line-height: 25px;
  align-items: center;
  align-content: center;
  display: flex;
  padding: 5px;
`;

export const ModalBodyTitleTextNotMain = styled.div`
  margin-bottom: 0;
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  justify-content: center;
  line-height: 25px;
  align-items: center;
  align-content: center;
  display: flex;
  padding: 5px;
`;

export const ClaimButtonStyle = styled.button`
  display: inline-block;
  cursor: default;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  text-decoration: none;
  background: ${(props) => props.theme.colors.primaryDarker};
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
`;

export const CloseButtonStyled = styled(CloseButton)`
  fill-opacity: 0.3;

  &:hover {
    fill-opacity: 1;
  }
`;

export const CloseButtonWhiteStyled = styled(CloseButtonWhite)`
  fill-opacity: 0.3;

  &:hover {
    fill-opacity: 1;
  }
`;
