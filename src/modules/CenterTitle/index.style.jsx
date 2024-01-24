import styled from 'styled-components';

export const CenterTitleCenter = styled.div`
  display: block;
  text-align: -webkit-center;
`;

export const CenterTitleContainer = styled.div`
  text-align: center;
  justify-content: center !important;
  background: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  padding: 3px;
  max-width: 256px;
`;

export const CenterTitleTextStyle = styled.div`
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #636775;
  padding: 6px 18px 8px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

export const CenterTitleTextCurrentStyle = styled.div`
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  padding: 6px 18px 8px;
  border-radius: 8px;
  text-decoration: none;
  cursor: default;
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.backgroundSelected};
`;
