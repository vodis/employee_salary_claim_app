import styled from 'styled-components';
import { ReactComponent as Dots } from '../../../../ui/images/threeDots.svg';

export const MenuButtonContainer = styled.div`
  margin-left: 10px;
`;

export const MenuButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  background: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  padding-top: 5px;
  box-sizing: border-box;
  border: 1px solid transparent;
  cursor: pointer;

  /* Стили для svg внутри MenuButtonWrapper */
  svg {
    filter: brightness(${(props) => props.theme.colors.brightness});
    transition: filter 0.3s ease;
  }

  /* Эффект при наведении курсора */
  &:hover {
    /* Стили для svg, когда находится внутри наведенного MenuButtonWrapper */
    svg {
      filter: brightness(${(props) => props.theme.colors.brightnessHover});
    }
  }
`;

export const MenuButtonSvg = styled(Dots)``;
