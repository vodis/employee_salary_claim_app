import { utils } from 'ethers';

export const getTaskInfoLibResponse = (result) => {
  const decodedResult = utils.defaultAbiCoder.decode(
    [
      // Tuple for the "Meta" struct
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'string', name: 'description', type: 'string' }
        ],
        internalType: 'struct TaskManager.Meta',
        name: '',
        type: 'tuple'
      },
      // Tuple for the "Statuses" struct
      {
        components: [
          { internalType: 'bool', name: 'isTaskOpened', type: 'bool' },
          { internalType: 'bool', name: 'isTaskStoped', type: 'bool' },
          { internalType: 'bool', name: 'isTaskDone', type: 'bool' },
          { internalType: 'bool', name: 'isAlphaStageDone', type: 'bool' }
        ],
        internalType: 'struct TaskManager.Statuses',
        name: '',
        type: 'tuple'
      },
      // String
      'string',
      // Array of uint256
      'uint256[]',
      // Array of uint256
      'uint256[]',
      'bool[]'
    ],
    result
  );

  const [meta, statuses, nickname, array1, array2, array3] = decodedResult;

  // Convert BigNumber values to numbers
  const taskId = meta[0].toNumber();
  const isTaskOpened = statuses[0];
  const isTaskStopped = statuses[1];
  const isTaskDone = statuses[2];
  const isAlphaStageDone = statuses[3];
  const dates = array1.map((item) => item.toNumber());
  const prices = array2.map((item) => item.toNumber());
  const isAlreadyPaidPeriod = array3.map((item) => item);

  // Organize the enhanced response
  return {
    taskId,
    title: meta[1],
    description: meta[2],
    isTaskOpened,
    isTaskStopped,
    isTaskDone,
    isAlphaStageDone,
    nickname,
    dates,
    prices,
    isAlreadyPaidPeriod
  };
};

export const getEmployeeInfoLibResponse = (result) => {
  const decodedResult = utils.defaultAbiCoder.decode(
    [
      // Tuple for the "Meta" struct
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isProbationPassed',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'isFired',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'isBlocked',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'addr',
            type: 'address'
          }
        ],
        internalType: 'struct EmployeeManager.Statuses',
        name: '',
        type: 'tuple'
      }
    ],
    result
  );
  const [statuses] = decodedResult;

  return {
    employeeId: statuses[0].toNumber(),
    isProbationPassed: statuses[1],
    isFired: statuses[2],
    isBlocked: statuses[3],
    address: statuses[4]
  };
};
