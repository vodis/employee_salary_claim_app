import { useState } from 'react';
import {
  getRefContractForChargeVesting,
  getRefContractForEmployeeManager,
  getRefContractForTaskManager
} from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { useNotifications } from '../../../../providers/Notifications';

export const AdminDeleteAdmin = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    address: ''
  });
  const { alert, success } = useNotifications();

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleDeleteAdmin = (e) => {
    e.preventDefault();
    // TODO Add field validations before send tx
    handleSendTransaction();
  };

  const deleteAdminAtChargeVesting = async (values) => {
    const contract = getRefContractForChargeVesting(chainId, signer);
    const data = contract.interface.encodeFunctionData('AdminDel', values);

    const gasLimit = await contract.estimateGas.AdminDel(...values);
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit * 2
    };

    const transaction = await signer.sendTransaction(tx);
    await transaction.wait();
  };

  const deleteAdminAtTaskManager = async (values) => {
    const contract = getRefContractForEmployeeManager(chainId, signer);
    const data = contract.interface.encodeFunctionData('AdminDel', values);

    const gasLimit = await contract.estimateGas.AdminDel(...values);
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit * 2
    };

    const transaction = await signer.sendTransaction(tx);
    await transaction.wait();
  };

  const deleteAdminAtEmployeeManager = async (values) => {
    const contract = getRefContractForTaskManager(chainId, signer);
    const data = contract.interface.encodeFunctionData('AdminDel', values);

    const gasLimit = await contract.estimateGas.AdminDel(...values);
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit * 2
    };

    const transaction = await signer.sendTransaction(tx);
    await transaction.wait();
  };

  const handleSendTransaction = async () => {
    try {
      if (!chainId) {
        throw new Error('Сhain id is not available');
      }
      const values = [formData.address.toLowerCase()];
      await deleteAdminAtChargeVesting(values);
      await deleteAdminAtTaskManager(values);
      await deleteAdminAtEmployeeManager(values);

      callback(null, null, { deleteAdminAddress: formData.address, success: true });
      success(`Administrator rights have been removed from ${formData.address}`);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      className="modal fade"
      id="delete-admin"
      tabIndex="-1"
      aria-labelledby="deleteAdmin"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form className="row g-3">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteAdmin">
                Confirm administrator removal!
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
                  placeholder="Administrator address"
                  aria-label="nickname"
                  aria-describedby="basic-addon1"
                  value={formData.nickname}
                  onChange={(e) => handleChangeField('address', e.target.value)}
                />
              </div>
            </div>
            <div className="p-2">
              <div className="d-flex gap-3 w-100 p-2">
                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary w-100" onClick={handleDeleteAdmin}>
                  Yes, remove admin!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
