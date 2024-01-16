import React from 'react';
import SpinnerIcon from '../../assets/spinner.svg';

const Loading = () => {
  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-line-wrap">
          <img src={SpinnerIcon} alt="preloader" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
