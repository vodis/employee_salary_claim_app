import { useSelector } from 'react-redux';
import {
  selectHideZero,
  selectReferrals,
  selectSortMy,
  selectSortType
} from '../../store/referrals/referrals-selector';
import ReferBlockFullComponent from './components/ReferBlock.component';
import { sortObject } from '../../utils/wallets/utils';
import { selectUserAddress } from '../../store/user/user-selector';
import { TextWrapper, TitleBlMinimize } from '../../Pages/MainPage/MainPage.style';
import { ReactComponent as EmptyLogo } from '../../ui/images/disk.svg';
import ConnectWalletBiggerButton from '../../ui/components/Buttons/ConnectWalletBigger/index.module';

function filterObjectByKey(obj, keyToKeep) {
  const { [keyToKeep]: insedKeyArr, ...filteredObj } = obj;
  return { [keyToKeep]: insedKeyArr };
}

function hideZeroBalances(obj) {
  const sortedObj = {};

  // Сортировка ключей по самой новой дате
  Object.keys(obj).forEach((ref) => {
    sortedObj[ref] = obj[ref].filter((referral) => {
      return Number(referral.amount) !== 0;
    });
  });

  console.log(sortedObj);

  return sortedObj;
}

const ReferBlock = () => {
  const referrals = useSelector(selectReferrals);
  const sortType = useSelector(selectSortType);
  const sortMy = useSelector(selectSortMy);
  const hideZero = useSelector(selectHideZero);
  const address = useSelector(selectUserAddress);

  const sortedByMyKey = Object.keys(referrals).find((ref) => {
    if (address === '0xdC4502699007BB2C402b2922deB12e581dceD10c') {
      return ref.toLowerCase() === '0x500c520b90120fc7798b40176e831c1382f00dc0'.toLowerCase();
    } else {
      return ref.toLowerCase() === address.toLowerCase();
    }
  });

  const sortedByMy = sortedByMyKey ? filterObjectByKey(referrals, sortedByMyKey) : {};

  const referralsSorted = sortMy ? sortedByMy : sortObject(referrals, sortType);

  const toRender = hideZero ? hideZeroBalances(referralsSorted) : referralsSorted;

  const referralsBlocks = Object.keys(toRender).map((key) => {
    const referralsArr = toRender[key];

    return <ReferBlockFullComponent address={key} referralsArr={referralsArr} key={key} />;
  });

  if (sortMy && !address) {
    return (
      <TextWrapper>
        <ConnectWalletBiggerButton />
      </TextWrapper>
    );
  } else if (sortMy && !sortedByMyKey) {
    return (
      <TextWrapper>
        <EmptyLogo />
        <TitleBlMinimize>
          <strong>You Don't Have Any Referrals</strong>
        </TitleBlMinimize>
      </TextWrapper>
    );
  } else {
    return <>{referralsBlocks}</>;
  }
};

export default ReferBlock;
