import styled from 'styled-components';
import { ReactComponent as CloseButton } from '../../../../ui/images/close-white.svg';
import { ReactComponent as CloseButtonWhite } from '../../../../ui/images/close.svg';

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
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.25rem;
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
  color: ${(props) => props.theme.colors.text};
  border: 0;
  border-radius: 0.25rem;
  opacity: 0.5;
`;

export const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  box-sizing: border-box;
`;

export const ModalBodyWrapper = styled.div`
  background: ${(props) => props.theme.colors.secondBackground};
  border-radius: 5px;
  padding: 13px 16px 16px 19px;
  box-sizing: border-box;
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
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #636775;
`;

export const ModalAddress = styled.div`
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  color: ${(props) => props.theme.colors.text};
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
  color: #636775;
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  cursor: pointer;
`;
export const ModalCopyAddressText = styled.span`
  margin-left: 10px;
`;
export const CloseButtonStyled = styled(CloseButton)`
  fill-opacity: 0.5;

  &:hover {
    fill-opacity: 1;
  }
`;

export const CloseButtonWhiteStyled = styled(CloseButtonWhite)`
  fill-opacity: 0.5;

  &:hover {
    fill-opacity: 1;
  }
`;
