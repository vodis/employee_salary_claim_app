import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { getRefContractForTaskManager } from '../../../../utils/ethereum/ethereumFunctions';
import {BigNumber} from "ethers";

export const AdminAddTaskModal = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    taskPrice: ''
  });
  const [errors, setErrors] = useState([]);

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const errors = Object.entries(formData)
      .filter(([key, value]) => !value)
      .map(([key]) => key);
    if (errors.length) {
      return setErrors(errors);
    }
    setErrors([]);
    handleSendTransaction();
  };

  const onlyNumbers = (value) => {
    return /^\d*\.?\d*$/.test(value) ? value : '';
  };

  const handleBlurDate = (fieldKey, fieldValue) => {
    if (+fieldValue === 0) {
      handleChangeField([fieldKey], '');
    }
  };

  const handleSendTransaction = async () => {
    const contract = getRefContractForTaskManager(chainId, signer);
    const values = [
      formData.title,
      formData.description,
      [BigNumber.from(new Date(new Date().getTime() + formData.dueDate * 60 * 60).getTime()).div(1000)],
      [BigNumber.from(formData.taskPrice)]
    ];
    const data = contract.interface.encodeFunctionData('addTask', values);
    // const gasLimit = await contract.estimateGas.addTask(values);
    const tx = {
      to: contract.address,
      data,
      // gasLimit: gasLimit * 2
    };

    const transaction = await signer.sendTransaction(tx);
    callback(transaction);
  };

  return (
    <div
      class="modal fade"
      id="add-task"
      tabindex="-1"
      aria-labelledby="addTaskLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <form className="row g-3">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addTaskLabel">
                Create Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  value={formData.title}
                  onChange={(e) => handleChangeField('title', e.target.value)}
                />
              </div>
              {errors.includes('title') && (
                <div class="alert alert-danger px-1 py-0" role="alert">
                  Please add title.
                </div>
              )}
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  aria-label="Description"
                  aria-describedby="basic-addon1"
                  value={formData.description}
                  onChange={(e) => handleChangeField('description', e.target.value)}
                />
              </div>
              {errors.includes('description') && (
                <div class="alert alert-danger px-1 py-0" role="alert">
                  Please add description.
                </div>
              )}
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task completion time in hours, like: 0.5 or any integer 40"
                  aria-label="Due date"
                  aria-describedby="basic-addon1"
                  value={formData.dueDate}
                  onChange={(e) => handleChangeField('dueDate', onlyNumbers(e.target.value))}
                  onBlur={(e) => handleBlurDate('dueDate', e.target.value)}
                />
              </div>
              {errors.includes('dueDate') && (
                <div class="alert alert-danger px-1 py-0" role="alert">
                  Please add hours.
                </div>
              )}
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  USDT
                </span>
                <input
                  type="number"
                  step="1"
                  id="taskPrice"
                  className="form-control"
                  placeholder="Task Price"
                  aria-label="Task Price"
                  aria-describedby="basic-addon1"
                  value={formData.taskPrice}
                  onChange={(e) => handleChangeField('taskPrice', e.target.value)}
                  onBlur={(e) => handleBlurDate('taskPrice', e.target.value)}
                />
              </div>
              {errors.includes('taskPrice') && (
                <div class="alert alert-danger px-1 py-0" role="alert">
                  Please add task price.
                </div>
              )}
            </div>
            <div className="p-2">
              <div class="d-flex gap-3 w-100 p-2">
                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary w-100" onClick={handleCreateTask}>
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
