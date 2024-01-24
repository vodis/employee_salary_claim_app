import {
  OnlyMyContainer,
  OnlyMyHiddenCheckbox,
  OnlyMyText,
  OnlyMyTogglerKnob,
  OnlyMyTogglerSlider,
  OnlyMyTogglerWrapper
} from './index.style';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortMy } from '../../../../store/referrals/referrals-selector';
import { setSortMy } from '../../../../store/referrals/referrals-actions';

const OnlyMyComponent = () => {
  const checked = useSelector(selectSortMy);
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch(setSortMy(!checked));
  };

  return (
    <OnlyMyContainer>
      <OnlyMyTogglerWrapper>
        <OnlyMyHiddenCheckbox checked={checked} onChange={handleCheckboxChange} />
        <OnlyMyTogglerSlider checked={checked}>
          <OnlyMyTogglerKnob checked={checked} />
        </OnlyMyTogglerSlider>
      </OnlyMyTogglerWrapper>
      <OnlyMyText>Only My</OnlyMyText>
    </OnlyMyContainer>
  );
};

export default OnlyMyComponent;
