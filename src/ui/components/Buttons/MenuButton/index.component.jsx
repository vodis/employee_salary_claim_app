import { MenuButtonContainer, MenuButtonSvg, MenuButtonWrapper } from './index.style';
import { useState } from 'react';
import MenuDropDownMenuComponent from './MenuDropDownMenu/index.component';
import Modal from '../../../../modules/LayOut/components/ConnectWalletsModal/index.component';
import ReferralLinkModal from '../../Modals/ReferralLinkModal/index.component';

const MenuButton = () => {
  const [isDropdown, setIsDropDown] = useState(false);
  const [openModalConnectWallet, setOpenModalConnectWallet] = useState(false);
  const [openModalReferral, setOpenModalReferral] = useState(false);

  return (
    <>
      <MenuButtonContainer>
        <MenuButtonWrapper onClick={() => setIsDropDown(!isDropdown)}>
          <MenuButtonSvg />
        </MenuButtonWrapper>
      </MenuButtonContainer>
      {isDropdown ? (
        <MenuDropDownMenuComponent
          setIsDropDownOpen={setIsDropDown}
          setOpenModalReferral={setOpenModalReferral}
          setOpenModalConnectWallet={setOpenModalConnectWallet}
        />
      ) : (
        <></>
      )}
      {openModalConnectWallet ? <Modal setIsModalOpen={setOpenModalConnectWallet} /> : <></>}
      {openModalReferral ? <ReferralLinkModal setModalOpen={setOpenModalReferral} /> : <></>}
    </>
  );
};

export default MenuButton;
