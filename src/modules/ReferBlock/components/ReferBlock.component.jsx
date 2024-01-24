import {
  ReferBlockArrowDown,
  ReferBlockArrowUp,
  ReferBlockArrowWrapper,
  ReferBlockBottomInfo,
  ReferBlockBottomInfo1,
  ReferBlockBox,
  ReferBlockConatainer,
  ReferBlockDivWrapper,
  ReferBlockInfoWrapper,
  ReferBlockInfoWrapperClaimed,
  ReferBlockLine,
  ReferBlockStatus,
  ReferBlockTopInfo
} from '../index.style';
import { Grid } from '@mui/material';
import ReferInfoBlockComponent from './ReferInfoBlock.component';
import { GridItemComponent } from './GridItem.component';
import ReferBlockLineOpen from './ReferBlockLineOpen.component';
import React, { useContext, useEffect, useState } from 'react';
import { calcTotalFromReferralsArr, timeToLocaltime } from '../../../utils/wallets/utils';
import { useSelector } from 'react-redux';
import { selectUserAddress } from '../../../store/user/user-selector';
import { selectCurrentUser } from '../../../store/providerAndSigner/user-selector';
import { useChainId } from '../../../hooks/web3';
import { ReactComponent as USDTLogo } from '../../../ui/images/usdt.svg';
import {
  SortByArrowDown,
  SortByArrowDownWhite,
  SortByArrowUp,
  SortByArrowUpWhite
} from '../../SortLine/components/SortBy/SortByButton/index.style';
import { darkTheme, ThemeContext } from '../../../theming';

const ReferBlockFullComponent = ({ address, referralsArr }) => {
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const userAddress = useSelector(selectUserAddress);
  const currentUser = useSelector(selectCurrentUser);
  const [isOwner, setIsOwner] = useState(false);
  const chainId = useChainId();

  useEffect(() => {
    if (userAddress === '0xdC4502699007BB2C402b2922deB12e581dceD10c') {
      setIsOwner(address.toLowerCase() !== userAddress.toLowerCase());
    } else {
      setIsOwner(address.toLowerCase() === userAddress.toLowerCase());
    }
  }, [currentUser]);

  const { totalReferrals, amountTotal, amountClaimedSum, amountClaimedSumUsdt } =
    calcTotalFromReferralsArr(referralsArr);

  const referralsLine = referralsArr.map((referral, index) => {
    const { pay_addr, amount, time, claimed, ref_addr, net, id } = referral;

    return (
      <ReferBlockLineOpen
        index={index + 1}
        key={index}
        referAddress={pay_addr}
        amount={amount}
        time={timeToLocaltime(time)}
        isClaimed={claimed}
        isOwner={isOwner}
        chain={net}
        address={ref_addr}
        id={id}
        referralAddress={pay_addr}
        inviterAddress={ref_addr}
        timeU={time}
        chainId={chainId}
      />
    );
  });

  const compressAddress = (address) => {
    const prefix = address.substring(0, 5);
    const suffix = address.substring(address.length - 4);
    return `${prefix}....${suffix}`;
  };

  const theme = useContext(ThemeContext);

  const isThemeDark = theme === darkTheme;

  const arrow = isBlockOpen ? <SortByArrowUp /> : <SortByArrowDown />;
  const arrowDarkTheme = isBlockOpen ? <SortByArrowUpWhite /> : <SortByArrowDownWhite />;

  const arrowToRender = isThemeDark ? arrowDarkTheme : arrow;

  return (
    <ReferBlockConatainer>
      <ReferBlockBox>
        <ReferBlockLine
          isFull={false}
          isBackGorund={false}
          isMargin={isBlockOpen}
          onClick={() => setIsBlockOpen(!isBlockOpen)}
        >
          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={12} md={3}>
              <ReferBlockDivWrapper style={{ display: 'inline-flex' }}>
                <ReferBlockStatus />
                <ReferBlockInfoWrapper style={{ display: 'grid' }}>
                  <ReferBlockTopInfo>Address</ReferBlockTopInfo>
                  <ReferBlockBottomInfo1>{address}</ReferBlockBottomInfo1>
                </ReferBlockInfoWrapper>
              </ReferBlockDivWrapper>
            </Grid>
            <GridItemComponent
              gridXs={3.5}
              gridCount={2.6}
              topText={'Referrals Count'}
              bottomText={totalReferrals}
            />
            <GridItemComponent
              gridXs={3.5}
              gridCount={2.8}
              topText={'Total To Claim'}
              bottomText={amountTotal}
            />
            <Grid item xs={5} md={2.6}>
              <ReferBlockInfoWrapper>
                <ReferBlockTopInfo isAmount={true}>Claimed</ReferBlockTopInfo>
                <ReferBlockBottomInfo style={{ display: 'flex', alignItems: 'center' }}>
                  <USDTLogo
                    style={{
                      width: '15px',
                      height: '15px',
                      minWidth: '15px',
                      minHeight: '15px',
                      marginRight: '5px'
                    }}
                  />
                  {amountClaimedSumUsdt} / {amountClaimedSum}
                </ReferBlockBottomInfo>
              </ReferBlockInfoWrapper>
            </Grid>
            <Grid item xs={12} md={1}>
              <ReferBlockArrowWrapper>{arrowToRender}</ReferBlockArrowWrapper>
            </Grid>
          </Grid>
        </ReferBlockLine>
        {isBlockOpen ? <>{referralsLine}</> : <></>}
      </ReferBlockBox>
    </ReferBlockConatainer>
  );
};

export default ReferBlockFullComponent;
