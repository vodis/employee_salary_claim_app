import styled from 'styled-components';

export const ConnectedWalletButtonContainer = styled.div`
  box-sizing: border-box;
  margin-left: 10px;
  display: block;
`;

export const ConnectedWalletFull = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  padding: 3px;
  display: flex;
  max-width: 282px;
  max-height: 40px;
`;

export const ConnectedWalletAmount = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #000000;
  padding: 8px 9px;
  box-sizing: border-box;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const ConnectedButtonAddressButton = styled.button`
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #636775;
  padding: 8px 10px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  text-decoration: none;
  border-color: transparent;
  max-height: 35px;
  align-items: center;
  display: flex;
  cursor: pointer;
`;

export const ConnectedWalletAddressAndStatusWrapper = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const ConnectedButtonAddressText = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.theme.colors.buttonConnectedText};
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  text-decoration: none;
  margin-right: 25px;
`;

export const ConnectedWalletStatus = styled.div`
  width: 15px;
  height: 15px;
  background: #23acde;
  border-radius: 100%;
  position: absolute;
  right: 10px;
`;
