import { DropdownItem, DropdownMenu } from './index.style';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Globe } from '../../../../images/globe.svg';
import { ReactComponent as Moon } from '../../../../images/moon.svg';
import { ReactComponent as Twitter } from '../../../../images/twitter.svg';
import { ReactComponent as Telegram } from '../../../../images/telegram.svg';
import { ReactComponent as ReferralLogo } from '../../../../images/referral.svg';
import { setTheme } from '../../../../../store/theme/theme-actions';
import { selectTheme } from '../../../../../store/theme/theme-selector';
import { selectCurrentUser } from '../../../../../store/providerAndSigner/user-selector';

const MenuDropDownMenuComponent = ({
  setIsDropDownOpen,
  setOpenModalConnectWallet,
  setOpenModalReferral
}) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);

  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  const onItemClick = (text) => {
    switch (text) {
      case 'About': {
        const url = 'https://airdrop-hunter.site/'; // Замените на вашу ссылку
        window.open(url, '_self');

        setIsDropDownOpen(false);

        break;
      }

      case 'Referral': {
        if (!currentUser?.signer) {
          setOpenModalConnectWallet(true);
        } else {
          setOpenModalReferral(true);
        }

        setIsDropDownOpen(false);

        break;
      }

      case 'Twitter': {
        const url = 'https://twitter.com/AirHunter_Drop'; // Замените на вашу ссылку
        window.open(url, '_blank');

        setIsDropDownOpen(false);

        break;
      }

      case 'Telegram': {
        const url = 'https://t.me/airdrop_hunter_bot'; // Замените на вашу ссылку
        window.open(url, '_blank');

        setIsDropDownOpen(false);

        break;
      }

      case 'Theme': {
        dispatch(setTheme(newTheme));

        setIsDropDownOpen(false);

        break;
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <DropdownMenu>
        <DropdownItem onClick={() => onItemClick('Referral')}>
          Referral
          <ReferralLogo />
        </DropdownItem>
        <DropdownItem onClick={() => onItemClick('About')}>
          About
          <Globe />
        </DropdownItem>
        <DropdownItem onClick={() => onItemClick('Theme')}>
          Theme
          <Moon />
        </DropdownItem>
        <DropdownItem onClick={() => onItemClick('Twitter')}>
          Twitter
          <Twitter />
        </DropdownItem>
        <DropdownItem onClick={() => onItemClick('Telegram')} style={{ paddingBottom: '0' }}>
          Telegram
          <Telegram />
        </DropdownItem>
      </DropdownMenu>
    </div>
  );
};

export default MenuDropDownMenuComponent;
