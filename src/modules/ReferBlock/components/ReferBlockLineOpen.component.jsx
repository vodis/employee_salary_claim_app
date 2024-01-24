import { Grid } from '@mui/material';
import {
  ReferBlockLine,
  ReferBlockLineStyled,
  ReferBlockOpenAddress,
  ReferBlockOpenBottomInfo,
  ReferBlockOpenInfoWrapper,
  ReferBlockOpenTopInfo
} from '../index.style';
import { GridItemOpenComponent } from './GridItemOpen.component';
import WithdrawButtonComponent from '../../../ui/components/Buttons/WithdrawButton/index.component';
import {
  BSCLogoStyled,
  DividerLine,
  PolygonLogoStyled
} from '../../../ui/components/Buttons/WithdrawButton/index.style';
import { ReactComponent as USDTLogo } from '../../../ui/images/usdt.svg';

const ReferBlockLineOpen = ({
  index,
  referAddress,
  amount,
  time,
  isClaimed,
  isOwner,
  chain,
  address,
  id,
  referralAddress,
  inviterAddress,
  timeU,
  chainId
}) => {
  return (
    <ReferBlockLineStyled isBackGorund={index % 2 === 0}>
      <DividerLine />
      <ReferBlockLine isFull={true} isBackGorund={index % 2 === 0}>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid
            item
            xs={0.8}
            md={0.5}
            sx={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}
          >
            <ReferBlockOpenInfoWrapper>
              <ReferBlockOpenBottomInfo>{index}</ReferBlockOpenBottomInfo>
            </ReferBlockOpenInfoWrapper>
          </Grid>

          <Grid
            item
            xs={4}
            md={0.5}
            sx={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center'
            }}
          >
            {chain === 'bsc' ? (
              <BSCLogoStyled
                style={{ width: '100%', height: '100%', maxHeight: '51px', maxWidth: '25px' }}
              />
            ) : (
              <PolygonLogoStyled
                style={{ minWidth: '21px', minHeight: '21px', maxHeight: '51px', maxWidth: '25px' }}
              />
            )}
          </Grid>
          <Grid
            item
            md={3.5}
            xs={7}
            sx={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}
          >
            <ReferBlockOpenInfoWrapper>
              <ReferBlockOpenTopInfo>Referral Address:</ReferBlockOpenTopInfo>
              <ReferBlockOpenAddress>{referAddress}</ReferBlockOpenAddress>
            </ReferBlockOpenInfoWrapper>
          </Grid>
          <Grid
            item
            xs={4}
            md={1.5}
            sx={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              marginRight: '5px'
            }}
          >
            <ReferBlockOpenInfoWrapper>
              <ReferBlockOpenTopInfo>Amount:</ReferBlockOpenTopInfo>
              <ReferBlockOpenBottomInfo style={{ display: 'flex', alignItems: 'center' }}>
                <USDTLogo style={{ width: '15px', height: '15px', marginRight: '5px' }} />
                {amount}
              </ReferBlockOpenBottomInfo>
            </ReferBlockOpenInfoWrapper>
          </Grid>
          <GridItemOpenComponent
            gridCount={3.5}
            gridCountXs={7.5}
            topText={'Time: '}
            bottomText={time}
            isTime={true}
          />
          <Grid item md={2} xs={12}>
            <WithdrawButtonComponent
              isClaimed={isClaimed}
              isOwner={isOwner}
              chain={chain}
              amount={amount}
              address={address}
              id={id}
              referralAddress={referralAddress}
              inviterAddress={inviterAddress}
              time={timeU}
              chainId={chainId}
            />
          </Grid>
        </Grid>
      </ReferBlockLine>
    </ReferBlockLineStyled>
  );
};

export default ReferBlockLineOpen;
