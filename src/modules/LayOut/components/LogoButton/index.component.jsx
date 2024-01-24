import React, { useContext } from 'react';
import { ReactComponent as LogoSvg } from '../../../../ui/images/logo.svg';
import { ReactComponent as LogoDarkSvg } from '../../../../ui/images/logo-white.svg';
import { darkTheme, ThemeContext } from '../../../../theming';

const LogoButtonComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <a href="https://airdrop-hunter.site" target="_blank" rel="noreferrer">
      {theme === darkTheme ? <LogoDarkSvg /> : <LogoSvg />}
    </a>
  );
};

export default LogoButtonComponent;
