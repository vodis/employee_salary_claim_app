import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { getRefContractForTaskManager } from '../../../../utils/ethereum/ethereumFunctions';
import { BigNumber } from 'ethers';

export const AdminAddTaskModal = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    periods: [],
    prices: []
  });
  const [errors, setErrors] = useState([]);
  const [taskPeriods, setTaskPeriods] = useState(0);

  const handleChangeField = (fieldKey, fieldValue, fieldIndex) => {
    if (['periods', 'prices'].includes(fieldKey)) {
      const updateFormValues = [...formData[fieldKey]];
      updateFormValues[fieldIndex] = fieldValue;
      setFormData({ ...formData, [fieldKey]: updateFormValues });
      return;
    }
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const errors = Object.entries(formData)
      .filter(([key, value]) => !value || !value.length)
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
      formData.periods.map((per) => BigNumber.from(new Date(new Date().getTime() + per * 60 * 60).getTime()).div(
          1000
      )),
      formData.prices.map((pr) => BigNumber.from(pr))
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

              <div className="border border-info rounded p-3 mb-3">
                {[...Array(taskPeriods).keys()].map((id) => (
                  <div key={id}>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Task completion time in hours, like: 0.5 or any integer 40"
                        aria-label="Due date"
                        aria-describedby="basic-addon1"
                        value={formData.periods[id]}
                        onChange={(e) =>
                          handleChangeField('periods', onlyNumbers(e.target.value), id)
                        }
                        onBlur={(e) => handleBlurDate('periods', e.target.value, id)}
                      />
                    </div>
                    {errors.includes('periods') && (
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
                        id="prices"
                        className="form-control"
                        placeholder="Task Price"
                        aria-label="Task Price"
                        aria-describedby="basic-addon1"
                        value={formData.prices[id]}
                        onChange={(e) => handleChangeField('prices', e.target.value, id)}
                        onBlur={(e) => handleBlurDate('prices', e.target.value, id)}
                      />
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-between">
                  <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => !!taskPeriods && setTaskPeriods(taskPeriods - 1)}
                  >
                    - period
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setTaskPeriods(taskPeriods + 1)}
                  >
                    + period
                  </button>
                </div>
              </div>
              {errors.includes('prices') && (
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
