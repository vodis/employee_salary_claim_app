import { useState } from 'react';
import { getRefContractForEmployeeManager } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { useNotifications } from '../../../../providers/Notifications';

export const AdminFiredEmployee = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    nickname: ''
  });
  const { alert, success } = useNotifications();

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleFiredEmployee = (e) => {
    e.preventDefault();
    // TODO Add field validations before send tx
    handleSendTransaction();
  };

  const handleSendTransaction = async () => {
    try {
      const contract = getRefContractForEmployeeManager(chainId, signer);
      const values = [formData.nickname.toLowerCase()];
      const data = contract.interface.encodeFunctionData('fired', values);

      const gasLimit = await contract.estimateGas.fired(...values);
      const tx = {
        to: contract.address,
        data,
        gasLimit: gasLimit * 2
      };

      const transaction = await signer.sendTransaction(tx);
      const receipt = await transaction.wait();

      callback(transaction, receipt);

      success(`Пользователь ${formData.nickname} был уволен`);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      className="modal fade"
      id="fired-employee"
      tabIndex="-1"
      aria-labelledby="firedEmployee"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form className="row g-3">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="firedEmployee">
                Подтвердить увольнения сотрудника!
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
                  placeholder="Введить никнейм сотрудника"
                  aria-label="nickname"
                  aria-describedby="basic-addon1"
                  value={formData.nickname}
                  onChange={(e) => handleChangeField('nickname', e.target.value)}
                />
              </div>
            </div>
            <div className="p-2">
              <div className="d-flex gap-3 w-100 p-2">
                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
                  Закрыть
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={handleFiredEmployee}
                >
                  Да, уволить!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
