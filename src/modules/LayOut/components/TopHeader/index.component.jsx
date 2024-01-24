import {
  TopHeaderContainer,
  TopHeaderLeftSideContainer,
  TopHeaderRightSideContainer,
  TopHeaderRightSideWrapper,
  TopHeaderWrapper
} from './index.style';
import LogoButtonComponent from '../LogoButton/index.component';
import ConnectWalletButton from '../../../../ui/components/Buttons/ConnectWallet/index.module';
import MenuButton from '../../../../ui/components/Buttons/MenuButton/index.component';
import ConnectedWalletButton from '../../../../ui/components/Buttons/ConnectedWallet/index.module';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';

const TopHeaderComponent = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <TopHeaderContainer>
      <TopHeaderWrapper>
        <TopHeaderLeftSideContainer>
          <LogoButtonComponent />
        </TopHeaderLeftSideContainer>
        <TopHeaderRightSideContainer>
          <TopHeaderRightSideWrapper>
            {/* <DepositButton/> */}
            {currentUser?.signer ? <ConnectedWalletButton /> : <ConnectWalletButton />}
            <MenuButton />
          </TopHeaderRightSideWrapper>
        </TopHeaderRightSideContainer>
      </TopHeaderWrapper>
    </TopHeaderContainer>
  );
};

export default TopHeaderComponent;
