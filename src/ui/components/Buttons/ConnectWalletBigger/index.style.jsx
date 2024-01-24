import styled from 'styled-components';

export const ConnectWalletButtonContainer = styled.div`
  box-sizing: border-box;
  margin-left: 10px;
  display: block;
`;

export const ConnectButtonStyle = styled.button`
  display: inline-block;
  border: 2px solid #868686;
  box-sizing: border-box;
  border-radius: 10px;
  font-weight: 600;
  font-size: 25px;
  line-height: 35px;
  text-decoration: none;
  padding: 9px 20px 11px;
  background: #23acde;
  color: #ffffff;

  &:hover {
    background: #1b8fb6;
    transition: 0.5s;
  }
`;
