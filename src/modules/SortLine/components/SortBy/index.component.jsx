import { useState } from 'react';
import SortByButton from './SortByButton/index.component';
import SortByDropDownMenuComponent from './SortByDropDownMenu/index.component';
import { useSelector } from 'react-redux';
import { selectSortType } from '../../../../store/referrals/referrals-selector';

const SortByComponent = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const sortType = useSelector(selectSortType);

  return (
    <>
      <SortByButton
        isDropDownOpen={isDropDownOpen}
        setIsDropDownOpen={setIsDropDownOpen}
        buttonText={sortType}
      />
      {isDropDownOpen ? (
        <SortByDropDownMenuComponent setIsDropDownOpen={setIsDropDownOpen} />
      ) : (
        <></>
      )}
    </>
  );
};

export default SortByComponent;
