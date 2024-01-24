import { ReferBlockBottomInfo, ReferBlockInfoWrapper, ReferBlockTopInfo } from '../index.style';

const ReferInfoBlockComponent = ({ topText, bottomText }) => {
  return (
    <ReferBlockInfoWrapper>
      <ReferBlockTopInfo isAmount={false}>{topText}</ReferBlockTopInfo>
      <ReferBlockBottomInfo>{bottomText}</ReferBlockBottomInfo>
    </ReferBlockInfoWrapper>
  );
};

export default ReferInfoBlockComponent;
