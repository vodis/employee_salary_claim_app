import {
  OnlyMyContainer,
  OnlyMyHiddenCheckbox,
  OnlyMyText,
  OnlyMyTogglerKnob,
  OnlyMyTogglerSlider,
  OnlyMyTogglerWrapper
} from './index.style';
import { useDispatch, useSelector } from 'react-redux';
import { selectHideZero } from '../../../../store/referrals/referrals-selector';
import { setHideZero } from '../../../../store/referrals/referrals-actions';

const HideZeroComponent = () => {
  const checked = useSelector(selectHideZero);
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch(setHideZero(!checked));
  };

  return (
    <OnlyMyContainer>
      <OnlyMyTogglerWrapper>
        <OnlyMyHiddenCheckbox checked={checked} onChange={handleCheckboxChange} />
        <OnlyMyTogglerSlider checked={checked}>
          <OnlyMyTogglerKnob checked={checked} />
        </OnlyMyTogglerSlider>
      </OnlyMyTogglerWrapper>
      <OnlyMyText>Hide Zero</OnlyMyText>
    </OnlyMyContainer>
  );
};

export default HideZeroComponent;
