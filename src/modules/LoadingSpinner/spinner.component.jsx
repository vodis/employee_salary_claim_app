import { SpinnerOverlay } from './spinner.style';
import { ReactComponent as LoadingSpinner } from '../../ui/images/spinner.svg';

const Spinner = () => (
  <SpinnerOverlay>
    <LoadingSpinner />
  </SpinnerOverlay>
);

export default Spinner;
