import { DepositButtonContainer, DepositButtonStyle } from '../DepositButton/index.style';
import { useDispatch } from 'react-redux';
import { setAddress, setMethod } from '../../../../store/user/user-actions';
import { useDisconnect } from 'wagmi';
import { setCurrentUser } from '../../../../store/providerAndSigner/user-actions';

const DisconnectButton = () => {
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();
  const disconnectButton = () => {
    dispatch(
      setCurrentUser({
        signer: null,
        provider: null
      })
    );
    dispatch(setMethod(''));
    dispatch(setAddress(''));
    disconnect();
  };

  return (
    <DepositButtonContainer>
      <DepositButtonStyle onClick={disconnectButton}>Disconnect</DepositButtonStyle>
    </DepositButtonContainer>
  );
};

export default DisconnectButton;
