import { useState } from 'react';
import { getRefContractForChargeVesting } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';

const EmployeeCard = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    nickname: ''
  });

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleClaimByNickname = async () => {
    const contract = getRefContractForChargeVesting(chainId, signer);
    const data = contract.interface.encodeFunctionData('claim', [formData.nickname]);
    const gasLimit = await contract.estimateGas.claim(formData.nickname);
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
          <div className="flex-grow-1 flex-shrink-1">
            <input
              type="text"
              className="form-control"
              placeholder="Fill in your nickname"
              aria-label="nickname"
              aria-describedby="nickname"
              value={formData.nickname}
              onChange={(e) => handleChangeField('nickname', e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary flex-grow-2 flex-shrink-1"
            onClick={handleClaimByNickname}
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
