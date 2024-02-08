import { useState } from 'react';
import {
  getRefContractForTaskManager,
  getRefContractForEmployeeManager,
  getRefContractForChargeVesting
} from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { utils } from 'ethers';
import { getTaskInfoLibResponse } from './libResponse';

const AdminCard = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    taskId: '',
    nickname: ''
  });

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  const handleGetAdmins = async () => {
    const contract = getRefContractForChargeVesting(chainId, signer);
    const data = contract.interface.encodeFunctionData('AdminList', []);
    const gasLimit = await contract.estimateGas.AdminList();
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit.mul(2)
    };

    const result = await signer.call(tx);
    const decodedResult = utils.defaultAbiCoder.decode(['address[]'], result)[0];

    callback(
      null,
      null,
      decodedResult.map((el) => ({
        adminAddress: el
      }))
    );
  };

  const handleGetEmployees = async () => {
    const contract = getRefContractForEmployeeManager(chainId, signer);
    const data = contract.interface.encodeFunctionData('getAllEmployeeNicknames', []);
    const gasLimit = await contract.estimateGas.getAllEmployeeNicknames();
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit.mul(2)
    };

    const result = await signer.call(tx);
    const decodedResult = utils.defaultAbiCoder.decode(['string[]'], result)[0];

    callback(
      null,
      null,
      decodedResult.map((el) => ({
        nickname: el
      }))
    );
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

    const result = await signer.call(tx);
    const read = getTaskInfoLibResponse(result);

    callback(null, null, read);
  };

  const handleGetTaskIds = async () => {
    const contract = getRefContractForTaskManager(chainId, signer);
    const data = contract.interface.encodeFunctionData('getTaskIdsByNickname', [formData.nickname]);
    const gasLimit = await contract.estimateGas.getTaskIdsByNickname(formData.nickname);
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit * 2
    };

    const result = await signer.call(tx);
    const decodedResult = utils.defaultAbiCoder
      .decode(['uint256[]'], result)
      ?.map((el) => el.toString());

    callback(null, null, decodedResult);
  };

  return (
    <div className="card w-100">
      <div className="card-body">
        <h5 className="card-title text-center">Секция администратора</h5>

        <div className="d-flex align-items-center gap-2 mb-2">
          <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
            Получить адреса администраторов
          </p>
          <button
            type="button"
            className="btn btn-light flex-grow-2 flex-shrink-1"
            onClick={handleGetAdmins}
          >
            Запросить
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 mb-2">
          <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
            Получить никнеймы сотрудников
          </p>
          <button
            type="button"
            className="btn btn-light flex-grow-2 flex-shrink-1"
            onClick={handleGetEmployees}
          >
            Запросить
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1 flex-shrink-1">
            <input
              type="text"
              className="form-control"
              placeholder="Получить информацию по ID задачи"
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
            Запросить
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1 flex-shrink-1">
            <input
              type="text"
              className="form-control"
              placeholder="Получить все ID задачь по никнейму"
              aria-label="nickname"
              aria-describedby="nickname"
              value={formData.nickname}
              onChange={(e) => handleChangeField('nickname', e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-light flex-grow-2 flex-shrink-1"
            onClick={handleGetTaskIds}
          >
            Запросить
          </button>
        </div>

        <div className="border border-success rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Создать задачу</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add-task"
              className="btn btn-success flex-grow-2 flex-shrink-1"
            >
              Добавить
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
              Добавить нового сотрудника
            </p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add-employee"
              className="btn btn-success flex-grow-2 flex-shrink-1"
            >
              Добавить
            </button>
          </div>
        </div>

        <div className="border border-warning rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
              Подтвердить что задача прошла Алфа версию
            </p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#approve-stage"
              className="btn btn-warning flex-grow-2 flex-shrink-1"
            >
              Подтрердить
            </button>
          </div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
              Открыть остановленную задачу
            </p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#open-close-task"
              className="btn btn-warning flex-grow-2 flex-shrink-1"
            >
              Открыть
            </button>
          </div>
        </div>

        <div className="border border-danger rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
              Остановить задачу по ID для сотрудника
            </p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#stop-task"
              className="btn btn-danger flex-grow-2 flex-shrink-1"
            >
              Остановить
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
              Перевести все токены с контракта на кошелек администратора
            </p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#withdraw"
              className="btn btn-danger flex-grow-2 flex-shrink-1"
            >
              Выполнить
            </button>
          </div>
        </div>

        <div className="border border-dark rounded p-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Уволить сотрудника</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#fired-employee"
              className="btn btn-dark flex-grow-2 flex-shrink-1"
            >
              Выполнить
            </button>
          </div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Добавить администратора</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add-admin"
              className="btn btn-dark flex-grow-2 flex-shrink-1"
            >
              Выполнить
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Удалить администратора</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#delete-admin"
              className="btn btn-dark flex-grow-2 flex-shrink-1"
            >
              Выполнить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
