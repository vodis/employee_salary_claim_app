import styled from 'styled-components';
import { mobileBreakpoint } from '../ClaimModal/index.style';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-width: 50%;
  align-content: center;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  z-index: 1000;
`;

export const ModalTitleWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
  border-bottom: 0;
`;

export const ModalTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text};
`;
export const ModalButtonClose = styled.div`
  padding: 0.5rem 0.5rem;
  margin: -0.5rem -0.5rem -0.5rem auto;
  cursor: pointer;
  outline: none;

  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  color: #000;
  border: 0;
  border-radius: 0.25rem;
  opacity: 0.5;
`;

export const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  width: 100%;
`;

export const ModalBodyWrapper = styled.div`
  background: ${(props) => props.theme.colors.secondBackground};
  border-radius: 5px;
  padding: 13px 16px 16px 19px;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  width: 100%;
  flex-direction: column;
`;

export const MadalBodyTitle = styled.div`
  margin-bottom: 10px;
  align-items: center !important;
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const ModalBodyTitleText = styled.div`
  margin-bottom: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.text};
`;

export const ModalAddress = styled.div`
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  color: #000000;
  padding-left: 20px;
  padding-right: 50px;
`;
export const ModalStatus = styled.div`
  width: 20px;
  height: 20px;
  background: #07a8f4;
  border-radius: 50%;
  top: 3px;
  left: 0;
`;

export const ModalAddressAndStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ModalCopyAddressWrapper = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  padding-left: 60px;
`;
export const ModalCopyAddressText = styled.span`
  margin-left: 10px;
  white-space: nowrap;
`;

export const ModalLinkWrapper = styled.div`
  border: solid 1px ${(props) => props.theme.colors.borderRefColor};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.background};
  padding: 10px;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: ${mobileBreakpoint}) {
  }
`;

export const ModalLinkText = styled.textarea`
  border: 0;
  width: 100%;
  height: 24px;
  display: flex; /* Используем flex для выравнивания текста по центру */
  align-items: center; /* Выравниваем по вертикали */
  font-size: 15px;
  max-height: 24px;
  resize: none;
  color: #23acde;
  white-space: nowrap;
  background-color: transparent;
  margin: 0;
  overflow: hidden;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  ::placeholder {
    color: #23acde;
    opacity: 0.7;
    display: flex; /* Используем flex для выравнивания текста по центру */
    align-items: center; /* Выравниваем по вертикали */
  }

  &:focus {
    outline: none;
    box-shadow: none;
    border: none;
  }

  @media (max-width: ${mobileBreakpoint}) {
    width: 60%;
    overflow: auto;
    white-space: pre;
  }
`;

export const ModalInveterText = styled.div`
  color: #23acde;
  text-decoration: underline;
  margin-left: 10px;
  font-size: 15px;
`;

export const ModalInputNick = styled.input`
  border: 0;
  width: 100%;
  outline: none;
  font-size: 16px;
  color: #23acde;
  background: ${(props) => props.theme.colors.background};
`;

export const OpenRefModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: ${mobileBreakpoint}) {
    display: block;
    margin-bottom: 30px;
  }
`;
