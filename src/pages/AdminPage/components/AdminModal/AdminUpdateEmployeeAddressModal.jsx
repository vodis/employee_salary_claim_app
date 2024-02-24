import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { getRefContractForEmployeeManager } from '../../../../utils/ethereum/ethereumFunctions';
import { useNotifications } from '../../../../providers/Notifications';

export const AdminUpdateEmployeeAddressModal = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const { alert, success } = useNotifications();
  const [formData, setFormData] = useState({
    addr: '',
    nickname: ''
  });

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleUpdateAddress = async () => {
    try {
      const contract = getRefContractForEmployeeManager(chainId, signer);
      const values = [formData.nickname, formData.addr];
      const data = contract.interface.encodeFunctionData('updateEmployeeAddr', values);
      const gasLimit = await contract.estimateGas.updateEmployeeAddr(...values);
      const tx = {
        to: contract.address,
        data,
        gasLimit: gasLimit * 2
      };

      const transaction = await signer.sendTransaction(tx);
      callback(transaction);

      success(`Employee address ${formData.nickname} was changed to ${formData.addr}`);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      className="modal fade"
      id="update-employee-addr"
      tabIndex="-1"
      aria-labelledby="withdrawLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="withdrawLabel">
              Change the address for payments to an employee
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="input-group mb-3 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter the employee nickname"
              aria-label="nickname"
              aria-describedby="basic-addon2"
              value={formData.nickname}
              onChange={(e) => handleChangeField('nickname', e.target.value)}
            />
          </div>
          <div className="input-group mb-3 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a new address"
              aria-label="address"
              aria-describedby="basic-addon1"
              value={formData.addr}
              onChange={(e) => handleChangeField('addr', e.target.value)}
            />
          </div>
          <div className="d-flex gap-3 w-100 p-2 mb-2">
            <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary w-100" onClick={handleUpdateAddress}>
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
