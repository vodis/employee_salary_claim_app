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
      'uint256[]'
    ],
    result
  );

  const [meta, statuses, additionalInfo, array1, array2] = decodedResult;

  // Convert BigNumber values to numbers
  const taskId = meta[0].toNumber();
  const isTaskOpened = statuses[0];
  const isTaskStopped = statuses[1];
  const isTaskDone = statuses[2];
  const isAlphaStageDone = statuses[3];
  const additionalStringInfo = additionalInfo;
  const uint256Array1 = array1.map((item) => item.toNumber());
  const uint256Array2 = array2.map((item) => item.toNumber());

  // Organize the enhanced response
  return {
    taskId,
    title: meta[1],
    description: meta[2],
    isTaskOpened,
    isTaskStopped,
    isTaskDone,
    isAlphaStageDone,
    additionalStringInfo,
    uint256Array1,
    uint256Array2
  };
};
