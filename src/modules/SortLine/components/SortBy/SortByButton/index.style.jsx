import styled from 'styled-components';
import { ReactComponent as ArrowDown } from '../../../../../ui/images/arrowDown.svg';
import { ReactComponent as ArrowDownWhite } from '../../../../../ui/images/arrowDownWhite.svg';

export const SortByContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: block;
`;

export const SortByWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.buttonConnectedText};
  text-decoration: none;
  font-size: 16px;
  line-height: 19px;
  border: ${(props) => props.theme.colors.border};
  box-sizing: border-box;
  border-radius: 10px;
  font-weight: normal;
  height: 40px;
  padding: 8px 13px 8px;
  background: transparent;
  outline: none;
  text-decoration: none;
  position: relative;
  width: 160px;
  align-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    filter: sepia(100%);
  }
`;

export const SortByText = styled.div`
  color: ${(props) => props.theme.colors.buttonConnectedText};
  box-sizing: border-box;
`;

export const SortByArrowDown = styled(ArrowDown)``;

export const SortByArrowUp = styled(ArrowDown)`
  transform: rotate(180deg);
`;

export const SortByArrowDownWhite = styled(ArrowDownWhite)``;

export const SortByArrowUpWhite = styled(ArrowDownWhite)`
  transform: rotate(180deg);
`;
