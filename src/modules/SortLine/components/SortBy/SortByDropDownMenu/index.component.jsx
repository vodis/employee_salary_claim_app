import { DropdownItem, DropdownMenu } from './index.style';
import { useDispatch } from 'react-redux';
import { setSortType } from '../../../../../store/referrals/referrals-actions';

const SortByDropDownMenuComponent = ({ setIsDropDownOpen }) => {
  const dispatch = useDispatch();

  const onItemClick = (text) => {
    dispatch(setSortType(text));
    setIsDropDownOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <DropdownMenu>
        <DropdownItem onClick={() => onItemClick('Referrals Count')}>Referrals Count</DropdownItem>
        <DropdownItem onClick={() => onItemClick('Amount')}>Amount</DropdownItem>
        <DropdownItem onClick={() => onItemClick('Date')}>Date</DropdownItem>
      </DropdownMenu>
    </div>
  );
};

export default SortByDropDownMenuComponent;
