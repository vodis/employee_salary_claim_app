import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { getRefContractForChargeVesting } from '../../../../utils/ethereum/ethereumFunctions';
import { useNotifications } from '../../../../providers/Notifications';

export const AdminWithdrawModal = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const { alert, success } = useNotifications();
  const [formData, setFormData] = useState({
    tokenAddress: '',
    amount: ''
  });

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleWithdraw = async () => {
    try {
      const contract = getRefContractForChargeVesting(chainId, signer);
      const values = [formData.tokenAddress, formData.amount];
      const data = contract.interface.encodeFunctionData('AdminGetToken', values);
      const gasLimit = await contract.estimateGas.AdminGetToken(...values);
      const tx = {
        to: contract.address,
        data,
        gasLimit: gasLimit * 2
      };

      const transaction = await signer.sendTransaction(tx);
      callback(transaction);

      success(
        `Tokens were successfully converted into a number ${formData.amount} to the administrator address`
      );
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      className="modal fade"
      id="withdraw"
      tabIndex="-1"
      aria-labelledby="withdrawLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="withdrawLabel">
              Withdraw tokens from the contract
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h5>
              Are you sure? The entire specified amount will be transferred to the owner account.
              All employees may be subject to limited benefits.
            </h5>
          </div>
          <div className="input-group mb-3 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter the address of the token to be withdrawn - USDT ..."
              aria-label="tokenAddress"
              aria-describedby="basic-addon1"
              value={formData.tokenAddress}
              onChange={(e) => handleChangeField('tokenAddress', e.target.value)}
            />
          </div>
          <div className="input-group mb-3 p-2">
            <input
              type="number"
              step="1"
              id="prices"
              className="form-control"
              placeholder="Number to output or 0 to output everything"
              aria-label="amount"
              aria-describedby="basic-addon2"
              value={formData.amount}
              onChange={(e) => handleChangeField('amount', e.target.value)}
            />
          </div>
          <div className="d-flex gap-3 w-100 p-2 mb-2">
            <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary w-100" onClick={handleWithdraw}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
