import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { getRefContractForTaskManager } from '../../../../utils/ethereum/ethereumFunctions';
import { BigNumber } from 'ethers';
import { useNotifications } from '../../../../providers/Notifications';
import cn from 'classnames';

export const AdminAddTaskModal = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nickname: '',
    periods: [],
    prices: [],
    time: []
  });
  const [errors, setErrors] = useState([]);
  const [taskPeriods, setTaskPeriods] = useState(0);
  const { alert, success } = useNotifications();

  const handleChangeField = (fieldKey, fieldValue, fieldIndex) => {
    if (['periods', 'prices', 'time'].includes(fieldKey)) {
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
        formData.periods.map((per, i) => {
          const [hours, minuts] = formData.time[i].split(':');
          const inputDate = new Date(per + `T${hours}:${minuts}:00Z`);
          inputDate.setUTCHours(hours, minuts, 0, 0);
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
                Создать задачу для сотрудника
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
                  placeholder="Название задачи"
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  value={formData.title}
                  onChange={(e) => handleChangeField('title', e.target.value)}
                />
              </div>
              {errors.includes('title') && (
                <div className="alert alert-danger px-1 py-0" role="alert">
                  Название задачи должно быть заполнено
                </div>
              )}

              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Описание задачи"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  aria-label="Description"
                  value={formData.description}
                  onChange={(e) => handleChangeField('description', e.target.value)}
                ></textarea>
                <label htmlFor="floatingTextarea2">Описание задачи</label>
              </div>
              {errors.includes('description') && (
                <div className="alert alert-danger px-1 py-0" role="alert">
                  Описание задачи должно быть заполнено
                </div>
              )}

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Никней"
                  aria-label="Nickname"
                  aria-describedby="basic-addon1"
                  value={formData.nickname}
                  onChange={(e) => handleChangeField('nickname', e.target.value)}
                />
              </div>
              {errors.includes('nickname') && (
                <div className="alert alert-danger px-1 py-0" role="alert">
                  Никней должне быть указан
                </div>
              )}

              <div className="border border-light rounded p-3 mb-3">
                {[...Array(taskPeriods).keys()].map((id) => {
                  return (
                    <div key={id} className="border border-secondary rounded p-2 mb-2">
                      <div className="form-floating mb-3">
                        <label className="py-0" htmlFor="taskPeriodDate">
                          Дата завершения периода
                        </label>
                        <input
                          id="taskPeriodDate"
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
                          Пожалуйста добавьте дату выполнения задачи
                        </div>
                      )}

                      <div className="form-floating mb-3">
                        <label className="py-0" htmlFor="taskPeriodTime">
                          Время завершения периода
                        </label>
                        <input
                          id="taskPeriodTime"
                          type="time"
                          className="form-control"
                          placeholder="Task should be completed in a date till 12-00 UTC"
                          aria-label="Due time"
                          aria-describedby="basic-addon1"
                          value={formData.time[id]}
                          onChange={(e) => handleChangeField('time', e.target.value, id)}
                          onBlur={(e) => handleBlurDate('time', e.target.value, id)}
                        />
                      </div>
                      {errors.includes('time') && (
                        <div className="alert alert-danger px-1 py-0" role="alert">
                          Пожалуйста добавьте время когда задача должны быть выполенна
                        </div>
                      )}

                      <div className="input-group mb-3">
                        <input
                          type="number"
                          step="1"
                          id="prices"
                          className="form-control"
                          placeholder="Цена"
                          aria-label="Task Price"
                          aria-describedby="basic-addon2"
                          value={formData.prices[id]}
                          onChange={(e) => handleChangeField('prices', e.target.value, id)}
                          onBlur={(e) => handleBlurDate('prices', e.target.value, id)}
                        />
                        <span className="input-group-text" id="basic-addon2">
                          USD
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className={cn('btn btn-secondary', {
                      'btn-warning': !!taskPeriods
                    })}
                    onClick={() => !!taskPeriods && setTaskPeriods(taskPeriods - 1)}
                    disabled={!taskPeriods}
                  >
                    Удалить дату
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setTaskPeriods(taskPeriods + 1)}
                  >
                    Добавить дату
                  </button>
                </div>
              </div>
              {errors.includes('prices') && (
                <div className="alert alert-danger px-1 py-0" role="alert">
                  Пожалуйста укажите стоимость задачи
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
