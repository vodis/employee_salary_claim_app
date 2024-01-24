import {
  ReferBlockOpenBottomInfo,
  ReferBlockOpenInfoWrapper,
  ReferBlockOpenTime,
  ReferBlockOpenTopInfo
} from '../index.style';

const ReferInfoBlockOpenComponent = ({ topText, bottomText, isTime }) => {
  return (
    <ReferBlockOpenInfoWrapper>
      <ReferBlockOpenTopInfo>{topText}</ReferBlockOpenTopInfo>
      {isTime ? (
        <ReferBlockOpenTime>{bottomText}</ReferBlockOpenTime>
      ) : (
        <ReferBlockOpenBottomInfo>{bottomText}</ReferBlockOpenBottomInfo>
      )}
    </ReferBlockOpenInfoWrapper>
  );
};

export default ReferInfoBlockOpenComponent;
