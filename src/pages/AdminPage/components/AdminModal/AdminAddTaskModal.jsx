import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { getRefContractForTaskManager } from '../../../../utils/ethereum/ethereumFunctions';
import { BigNumber } from 'ethers';
import { useNotifications } from '../../../../providers/Notifications';

export const AdminAddTaskModal = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nickname: '',
    periods: [],
    prices: []
  });
  const [errors, setErrors] = useState([]);
  const [taskPeriods, setTaskPeriods] = useState(0);
  const { alert, success } = useNotifications();

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

  const findNextPeriods = (id) => {
    const isNextStepExist = formData.periods.length > id + 2 ? findNextPeriods(id + 1) : '';
    return formData.periods[id + 1] ? formData.periods[id + 1] : isNextStepExist;
  };

  const handleBlurDate = (fieldKey, fieldValue) => {
    if (+fieldValue === 0) {
      handleChangeField([fieldKey], '');
    }
  };

  const handleSendTransaction = async () => {
    try {
      const contract = getRefContractForTaskManager(chainId, signer);
      const values = [
        formData.title,
        formData.description,
        formData.nickname,
        formData.periods.map((per) => {
          const inputDate = new Date(per + 'T00:00:00Z');
          inputDate.setUTCHours(12, 0, 0, 0);
          const timestamp = inputDate.getTime();
          return BigNumber.from(timestamp).div(1000);
        }),
        formData.prices.map((pr) => BigNumber.from(pr))
      ];
      const data = contract.interface.encodeFunctionData('addTask', values);

      const gasLimit = await contract.estimateGas.addTask(...values);
      const tx = {
        to: contract.address,
        data,
        gasLimit: gasLimit * 2
      };

      const transaction = await signer.sendTransaction(tx);
      const receipt = await transaction.wait();

      callback(transaction, receipt);

      success(`Задача - ${formData.title} была создана для ${formData.nickname}`);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      className="modal fade"
      id="add-task"
      tabIndex="-1"
      aria-labelledby="addTaskLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form className="row g-3">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addTaskLabel">
                Create Task
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
                  placeholder="Title"
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  value={formData.title}
                  onChange={(e) => handleChangeField('title', e.target.value)}
                />
              </div>
              {errors.includes('title') && (
                <div className="alert alert-danger px-1 py-0" role="alert">
                  Please add title.
                </div>
              )}

              <div className="input-group mb-3">
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
                <div className="alert alert-danger px-1 py-0" role="alert">
                  Please add description.
                </div>
              )}

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
              {errors.includes('nickname') && (
                <div className="alert alert-danger px-1 py-0" role="alert">
                  Please add nickname.
                </div>
              )}

              <div className="border border-info rounded p-3 mb-3">
                {[...Array(taskPeriods).keys()].map((id) => {
                  return (
                    <div key={id}>
                      <div className="input-group mb-3">
                        <input
                          type="date"
                          min={id ? formData.periods[id - 1] : ''}
                          max={id < formData.periods.length ? findNextPeriods(id) : ''}
                          className="form-control"
                          placeholder="Task should be completed in a date till 12-00 UTC"
                          aria-label="Due date"
                          aria-describedby="basic-addon1"
                          value={formData.periods[id]}
                          onChange={(e) => handleChangeField('periods', e.target.value, id)}
                          onBlur={(e) => handleBlurDate('periods', e.target.value, id)}
                        />
                      </div>
                      {errors.includes('periods') && (
                        <div className="alert alert-danger px-1 py-0" role="alert">
                          Please add hours.
                        </div>
                      )}
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
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
                  );
                })}
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
                <div className="alert alert-danger px-1 py-0" role="alert">
                  Please add task price.
                </div>
              )}
            </div>
            <div className="p-2">
              <div className="d-flex gap-3 w-100 p-2">
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
