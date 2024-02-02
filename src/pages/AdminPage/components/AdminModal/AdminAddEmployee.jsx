import { useState } from 'react';
import { getRefContractForEmployeeManager } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { useNotifications } from '../../../../providers/Notifications';

export const AdminAddEmployee = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    nickname: '',
    address: '',
    isProbation: true
  });
  const { alert, success } = useNotifications();

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    // TODO Add field validations before send tx
    handleSendTransaction();
  };

  const handleSendTransaction = async () => {
    try {
      const contract = getRefContractForEmployeeManager(chainId, signer);
      const values = [formData.nickname.toLowerCase(), formData.address, formData.isProbation];
      const data = contract.interface.encodeFunctionData('addEmployee', values);

      const gasLimit = await contract.estimateGas.addEmployee(...values);
      const tx = {
        to: contract.address,
        data,
        gasLimit: gasLimit * 2
      };

      const transaction = await signer.sendTransaction(tx);
      const receipt = await transaction.wait();

      callback(transaction, receipt);

      success(
        `Сотрудник был создан под никтеймом - ${formData.nickname} и подключен к адресу ${formData.address}`
      );
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      className="modal fade"
      id="add-employee"
      tabIndex="-1"
      aria-labelledby="addEmployee"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form className="row g-3">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addEmployee">
                Add Employee
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nickname"
                  aria-label="Nickname"
                  aria-describedby="basic-addon1"
                  value={formData.nickname}
                  onChange={(e) => handleChangeField('nickname', e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  aria-label="Address"
                  aria-describedby="basic-addon1"
                  value={formData.address}
                  onChange={(e) => handleChangeField('address', e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <div className="d-flex gap-2 w-100 justify-content-end align-items-center">
                  <input
                    className="form-check-input m-0"
                    type="checkbox"
                    id="isProbation"
                    checked={formData.isProbation}
                    onChange={(e) => handleChangeField('isProbation', e.target.checked)}
                    aria-label="isProbation"
                  />
                  <label className="form-check-label w-auto h-auto m-0" htmlFor="isProbation">
                    Is probation period
                  </label>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="d-flex gap-3 w-100 p-2">
                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary w-100" onClick={handleAddEmployee}>
                  Add Employee
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
