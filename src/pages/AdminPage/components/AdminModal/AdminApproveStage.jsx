import { useState } from 'react';
import { getRefContractForTaskManager } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { useNotifications } from '../../../../providers/Notifications';

export const AdminApproveStage = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const { alert, success } = useNotifications();
  const [formData, setFormData] = useState({
    taskId: ''
  });

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleApproveStage = (e) => {
    e.preventDefault();
    // TODO Add field validations before send tx
    handleSendTransaction();
  };

  const handleSendTransaction = async () => {
    try {
      const contract = getRefContractForTaskManager(chainId, signer);
      const values = [formData.taskId];
      const data = contract.interface.encodeFunctionData('approveTaskById', values);

      const gasLimit = await contract.estimateGas.approveTaskById(...values);
      const tx = {
        to: contract.address,
        data,
        gasLimit: gasLimit * 2
      };

      const transaction = await signer.sendTransaction(tx);
      const receipt = await transaction.wait();

      callback(transaction, receipt);

      success(`Task ${formData.taskId} Stage Period has been completed`);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      className="modal fade"
      id="approve-stage"
      tabIndex="-1"
      aria-labelledby="approveStage"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form className="row g-3">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="approveStage">
                Confirm that task has passed the Alpha Stage!
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
                  placeholder="Specify the TaskId of the task"
                  aria-label="taskId"
                  aria-describedby="basic-addon1"
                  value={formData.taskId}
                  onChange={(e) => handleChangeField('taskId', e.target.value)}
                />
              </div>
            </div>
            <div className="p-2">
              <div className="d-flex gap-3 w-100 p-2">
                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={handleApproveStage}
                >
                  Confirm stage
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
