import moment from 'moment';
import { getRefContractForChargeVesting } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { useNotifications } from '../../../../providers/Notifications';
import cn from 'classnames';

const EmployeeTaskPeriod = ({ taskId, periodId, periodDate, periodPrice, isClaimed, callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const { alert, success } = useNotifications();

  const handleClaimOne = async () => {
    try {
      const contract = getRefContractForChargeVesting(chainId, signer);
      const values = [taskId, periodId];
      const data = contract.interface.encodeFunctionData('claimOne', values);

      const gasLimit = await contract.estimateGas.claimOne(...values);
      const tx = {
        to: contract.address,
        data,
        gasLimit: gasLimit * 2
      };

      const transaction = await signer.sendTransaction(tx);
      const receipt = await transaction.wait();

      callback(transaction, receipt);

      success(
        `The stamp for period ${periodId} for task ${taskId} is completed. Check your wallet address. If you don't see the tokens displayed, try adding the USDT address to your volet`
      );
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="d-flex gap-3 justify-content-between align-items-center mb-1">
      <span>{periodId + 1}</span>
      <span>{moment(new Date(periodDate * 1000)).format('YYYY-MM-DD, h:mm:ss a')}</span>
      <span>${periodPrice.toNumber()}</span>
      <button
        disabled={isClaimed}
        type="button"
        className={cn('btn btn btn-primary', {
          'btn-secondary': isClaimed
        })}
        onClick={handleClaimOne}
      >
        Claim
      </button>
    </div>
  );
};

export default EmployeeTaskPeriod;
