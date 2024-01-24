import {
  SortByArrowDown,
  SortByArrowDownWhite,
  SortByArrowUp,
  SortByArrowUpWhite,
  SortByContainer,
  SortByText,
  SortByWrapper
} from './index.style';
import React, { useContext } from 'react';
import { darkTheme, ThemeContext } from '../../../../../theming';

const SortByButton = ({ isDropDownOpen, setIsDropDownOpen, buttonText }) => {
  const theme = useContext(ThemeContext);

  const onClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const isThemeDark = theme === darkTheme;

  const arrow = isDropDownOpen ? <SortByArrowUp /> : <SortByArrowDown />;
  const arrowDarkTheme = isDropDownOpen ? <SortByArrowUpWhite /> : <SortByArrowDownWhite />;

  const arrowToRender = isThemeDark ? arrowDarkTheme : arrow;

  return (
    <SortByContainer>
      <SortByWrapper onClick={onClick}>
        <SortByText>{buttonText}</SortByText>
        {arrowToRender}
      </SortByWrapper>
    </SortByContainer>
  );
};

export default SortByButton;
