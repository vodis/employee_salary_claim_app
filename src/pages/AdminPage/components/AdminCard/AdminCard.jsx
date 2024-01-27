import { useState } from 'react';
import { getRefContractForTaskManager } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';

const AdminCard = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    taskId: ''
  });

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleGetTaskInfo = async () => {
    const contract = getRefContractForTaskManager(chainId, signer);
    const data = contract.interface.encodeFunctionData('getTaskInfo', [formData.taskId]);
    const gasLimit = await contract.estimateGas.getTaskInfo(formData.taskId);
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit * 2
    };

    const transaction = await signer.call(tx);
    const receipt = await transaction.wait();

    callback(transaction, receipt);
  };

  return (
    <div className="card w-100">
      <div className="card-body">
        <h5 className="card-title text-center">Admin Section</h5>

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
            onClick={handleGetTaskInfo}
          >
            Task Info
          </button>
        </div>

        <div className="border border-success rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Create task</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add-task"
              className="btn btn-success flex-grow-2 flex-shrink-1"
            >
              Add task
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Add assignee with rate</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add-employee"
              className="btn btn-success flex-grow-2 flex-shrink-1"
            >
              Add assignee
            </button>
          </div>
        </div>

        <div className="border border-danger rounded p-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Fire an employee</p>
            <button type="button" className="btn btn-danger flex-grow-2 flex-shrink-1">
              Fired
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
              Withdraw USDT from contract
            </p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#withdraw"
              className="btn btn-danger flex-grow-2 flex-shrink-1"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
