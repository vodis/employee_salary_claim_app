import { ConnectButtonStyle, ConnectWalletButtonContainer } from './index.style';
import { useState } from 'react';
import Modal from '../../../../modules/LayOut/components/ConnectWalletsModal/index.component';

const ConnectWalletButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ConnectWalletButtonContainer>
        <ConnectButtonStyle onClick={() => setIsModalOpen(true)}>Connect Wallet</ConnectButtonStyle>
      </ConnectWalletButtonContainer>
      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : <></>}
    </>
  );
};

export default ConnectWalletButton;
