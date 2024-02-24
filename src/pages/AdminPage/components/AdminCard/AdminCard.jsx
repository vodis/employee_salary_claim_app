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
import { getTaskInfoLibResponse, getEmployeeInfoLibResponse } from './libResponse';

const AdminCard = ({ callback }) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [formData, setFormData] = useState({
    taskId: '',
    nickname: '',
    nicknameInfo: ''
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
      ?.map((el) => el.toString())
      .map((el) => ({
        taskId: el
      }));

    callback(null, null, decodedResult);
  };

  const handleGetEmployeeInfo = async () => {
    const contract = getRefContractForEmployeeManager(chainId, signer);
    const data = contract.interface.encodeFunctionData('getEmployeeInfo', [formData.nicknameInfo]);
    const gasLimit = await contract.estimateGas.getEmployeeInfo(formData.nicknameInfo);
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit.mul(2)
    };

    const result = await signer.call(tx);
    const read = getEmployeeInfoLibResponse(result);

    callback(null, null, read);
  };

  return (
    <div className="card w-100">
      <div className="card-body">
        <h5 className="card-title text-center">Admin section</h5>

        <div className="d-flex align-items-center gap-2 mb-2">
          <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Get administrator addresses</p>
          <button
            type="button"
            className="btn btn-light flex-grow-2 flex-shrink-1"
            onClick={handleGetAdmins}
          >
            Request
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 mb-2">
          <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Get employee nicknames</p>
          <button
            type="button"
            className="btn btn-light flex-grow-2 flex-shrink-1"
            onClick={handleGetEmployees}
          >
            Request
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1 flex-shrink-1">
            <input
              type="text"
              className="form-control"
              placeholder="Get information about an employee by nickname"
              aria-label="nicknameInfo"
              aria-describedby="nicknameInfo"
              value={formData.nicknameInfo}
              onChange={(e) => handleChangeField('nicknameInfo', e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-light flex-grow-2 flex-shrink-1"
            onClick={handleGetEmployeeInfo}
          >
            Request
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1 flex-shrink-1">
            <input
              type="text"
              className="form-control"
              placeholder="Get all task IDs by nickname"
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
            Request
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1 flex-shrink-1">
            <input
              type="text"
              className="form-control"
              placeholder="Get information by task ID"
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
            Request
          </button>
        </div>

        <div className="border border-success rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Add a new employee</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add-employee"
              className="btn btn-success flex-grow-2 flex-shrink-1"
            >
              Add
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Create a task</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add-task"
              className="btn btn-success flex-grow-2 flex-shrink-1"
            >
              Add
            </button>
          </div>
        </div>

        <div className="border border-warning rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
              Confirm that the task has passed the Alpha version
            </p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#approve-stage"
              className="btn btn-warning flex-grow-2 flex-shrink-1"
            >
              Confirm
            </button>
          </div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Open a stopped task</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#open-close-task"
              className="btn btn-warning flex-grow-2 flex-shrink-1"
            >
              Open
            </button>
          </div>
        </div>

        <div className="border border-danger rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
              Stop a task by ID for an employee
            </p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#stop-task"
              className="btn btn-danger flex-grow-2 flex-shrink-1"
            >
              Stop
            </button>
          </div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">
              Transfer all tokens from the contract to the admin wallet
            </p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#withdraw"
              className="btn btn-danger flex-grow-2 flex-shrink-1"
            >
              Execute
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Change employee address</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#update-employee-addr"
              className="btn btn-danger flex-grow-2 flex-shrink-1"
            >
              Change
            </button>
          </div>
        </div>

        <div className="border border-dark rounded p-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Fire an employee</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#fired-employee"
              className="btn btn-dark flex-grow-2 flex-shrink-1"
            >
              Execute
            </button>
          </div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Add administrator</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add-admin"
              className="btn btn-dark flex-grow-2 flex-shrink-1"
            >
              Execute
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Remove administrator</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#delete-admin"
              className="btn btn-dark flex-grow-2 flex-shrink-1"
            >
              Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
