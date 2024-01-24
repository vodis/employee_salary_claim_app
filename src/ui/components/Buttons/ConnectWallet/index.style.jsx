import styled from 'styled-components';

export const ConnectWalletButtonContainer = styled.div`
  box-sizing: border-box;
  margin-left: 10px;
  display: block;
`;

export const ConnectButtonStyle = styled.button`
  display: inline-block;
  border: ${(props) => props.theme.colors.border};
  box-sizing: border-box;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-decoration: none;
  padding: 9px 20px 11px;
  background: transparent;
  color: #23acde;

  &:hover {
    background: rgba(69, 88, 190, 0.1);
    transition: 0.5s;
  }
`;
