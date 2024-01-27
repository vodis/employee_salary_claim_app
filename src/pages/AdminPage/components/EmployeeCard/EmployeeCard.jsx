import { useState } from 'react';
import { getRefContractForChargeVesting } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';

const EmployeeCard = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    taskId: ''
  });

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleClaimByTaskId = async () => {
    const contract = getRefContractForChargeVesting(chainId, signer);
    const data = contract.interface.encodeFunctionData('claim', [formData.taskId]);
    const gasLimit = await contract.estimateGas.claim(formData.taskId);
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit * 2
    };

    const transaction = await signer.sendTransactions(tx);
    const receipt = await transaction.wait();

    callback(transaction, receipt);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">Employee Section</h5>
        <div className="d-flex align-items-center gap-2 mb-3">
          <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
            Claim all <b>available</b> tokens
          </p>
          <button type="button" className="btn btn-primary flex-grow-2 flex-shrink-1">
            ClaimAll
          </button>
        </div>
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1 flex-shrink-1">
            <input
              type="text"
              className="form-control"
              placeholder="Fill in Task ID"
              aria-label="taskId"
              aria-describedby="taskId"
              value={formData.taskId}
              onChange={(e) => handleChangeField('taskId', e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-light flex-grow-2 flex-shrink-1"
            onClick={handleClaimByTaskId}
          >
            ClaimOne
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
