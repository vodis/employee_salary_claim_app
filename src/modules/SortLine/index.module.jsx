import SortByComponent from './components/SortBy/index.component';
import OnlyMyComponent from './components/OnlyMy/index.component';
import {
  DepositButtonContainer,
  DepositButtonStyle
} from '../../ui/components/Buttons/DepositButton/index.style';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/providerAndSigner/user-selector';
import { useState } from 'react';
import Modal from '../LayOut/components/ConnectWalletsModal/index.component';
import ReferralLinkModal from '../../ui/components/Modals/ReferralLinkModal/index.component';
import { OpenRefModalButtonContainer } from '../../ui/components/Modals/ReferralLinkModal/index.style';
import HideZeroComponent from './components/HideZero/index.component';

const SortLineModule = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [openModalConnectWallet, setOpenModalConnectWallet] = useState(false);
  const [openModalReferral, setOpenModalReferral] = useState(false);

  const onClick = () => {
    if (!currentUser?.signer) {
      setOpenModalConnectWallet(true);
    } else {
      setOpenModalReferral(true);
    }
  };

  return (
    <OpenRefModalButtonContainer>
      <div style={{ display: 'flex', marginBottom: '30px' }}>
        <SortByComponent />
        <OnlyMyComponent />
        <HideZeroComponent />
      </div>
      <div>
        <DepositButtonContainer>
          <DepositButtonStyle onClick={onClick}>+ Referral Link</DepositButtonStyle>
        </DepositButtonContainer>
        {openModalConnectWallet ? <Modal setIsModalOpen={setOpenModalConnectWallet} /> : <></>}
        {openModalReferral ? <ReferralLinkModal setModalOpen={setOpenModalReferral} /> : <></>}
      </div>
    </OpenRefModalButtonContainer>
  );
};

export default SortLineModule;
