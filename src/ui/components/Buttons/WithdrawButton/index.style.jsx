import styled from 'styled-components';
import { ReactComponent as BSCLogo } from '../../../../ui/images/bsc.svg';
import { ReactComponent as PolygonLogo } from '../../../../ui/images/poligon.svg';

const mobileBreakpoint = '768px';

export const ClaimButton = styled.div`
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  display: flex;
  flex-direction: row;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.buttonClaimTextColor};
  background: ${(props) => props.theme.colors.buttonClaimColor};
  border-radius: 10px;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding: 13px 16px;
  box-sizing: border-box;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.buttonClaimHoverColor};
    color: white;
  }
`;

export const ClaimButtonDisabled = styled.button`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.buttonClaimDisabledTextColor};
  background: ${(props) => props.theme.colors.buttonClaimDisabledColor};
  border-radius: 10px;
  height: 40px;
  box-sizing: border-box;
  border: 0;
  cursor: default;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 40px 16px;
  width: 100%;

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
  }
`;

export const DividerLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: #ddd;
  margin-bottom: 10px;
`;

export const BSCLogoStyled = styled(BSCLogo)`
  width: 20px;
  height: 20px;
`;

export const PolygonLogoStyled = styled(PolygonLogo)`
  width: 20px;
  height: 20px;
`;
