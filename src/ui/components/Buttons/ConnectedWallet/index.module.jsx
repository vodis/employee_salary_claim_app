import {
  ConnectedButtonAddressButton,
  ConnectedButtonAddressText,
  ConnectedWalletAddressAndStatusWrapper,
  ConnectedWalletButtonContainer,
  ConnectedWalletFull,
  ConnectedWalletStatus
} from './index.style';
import { useSelector } from 'react-redux';
import { selectUserAddress } from '../../../../store/user/user-selector';
import { useState } from 'react';
import WalletInfoModal from '../../Modals/WaleltInfoModal/index.component';
import { compressAddress } from '../../../../utils/wallets/utils';

const ConnectedWalletButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const address = useSelector(selectUserAddress);

  return (
    <>
      <ConnectedWalletButtonContainer>
        <ConnectedWalletFull>
          <ConnectedButtonAddressButton onClick={() => setModalOpen(true)}>
            <ConnectedWalletAddressAndStatusWrapper>
              <ConnectedButtonAddressText>
                {compressAddress(String(address))}
              </ConnectedButtonAddressText>
              <ConnectedWalletStatus />
            </ConnectedWalletAddressAndStatusWrapper>
          </ConnectedButtonAddressButton>
        </ConnectedWalletFull>
      </ConnectedWalletButtonContainer>
      {isModalOpen ? <WalletInfoModal setModalOpen={setModalOpen} /> : <></>}
    </>
  );
};

export default ConnectedWalletButton;
