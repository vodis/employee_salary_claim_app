import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import { getRefContractForTaskManager } from '../utils/ethereum/ethereumFunctions';
import { utils } from 'ethers';
import { getTaskInfoLibResponse } from '../pages/AdminPage/components/AdminCard/libResponse';

export const useGetEmployeeInfoCalc = (employeesInfo) => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [employeesInfoWithCalc, setEmployeesInfoWithCalc] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const getTaskIds = async (nickname) => {
    const contract = getRefContractForTaskManager(chainId, signer);
    const data = contract.interface.encodeFunctionData('getTaskIdsByNickname', [nickname]);
    const gasLimit = await contract.estimateGas.getTaskIdsByNickname(nickname);
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit * 2
    };
    const result = await signer.call(tx);
    return utils.defaultAbiCoder.decode(['uint256[]'], result)[0];
  };

  const getTasksInfo = async (ids) => {
    return await Promise.all(
      ids.map(async (id) => {
        const contract = getRefContractForTaskManager(chainId, signer);
        const data = contract.interface.encodeFunctionData('getTaskInfo', [id.toNumber()]);
        const tx = {
          to: contract.address,
          data
        };
        const result = await signer.call(tx);
        return getTaskInfoLibResponse(result);
      })
    );
  };

  const getTsIn5th = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1, 5);
    return currentDate.getTime();
  };

  const getPaidAmountIn5th = (dates, prices, isPaid) => {
    const tsIn5thInSec = getTsIn5th() / 1000;
    return dates.reduce((a, date, i) => {
      if (date <= tsIn5thInSec && !isPaid[i]) {
        a += prices[i];
        return a;
      }
      return a;
    }, 0);
  };

  const calculate = (tasksInfos) => {
    let taskInOpen = 0;
    let isApproved = 0;
    let isBlocked = 0;
    let toPay = 0;
    tasksInfos.forEach(
      ({ isTaskOpened, isAlphaStageDone, isTaskStopped, dates, prices, isAlreadyPaidPeriod }) => {
        if (isTaskOpened) taskInOpen++;
        if (isAlphaStageDone) isApproved++;
        if (isTaskStopped) isBlocked++;
        toPay += getPaidAmountIn5th(dates, prices, isAlreadyPaidPeriod);
      }
    );
    return { taskInOpen, isApproved, isBlocked, toPay };
  };

  const handleGetCalc = async () => {
    const getAllCalc = await Promise.all(
      employeesInfo.map(async (eI) => {
        const taskIds = await getTaskIds(eI.nickname);
        const tasksInfos = await getTasksInfo(taskIds);
        return {
          ...eI,
          ...calculate(tasksInfos)
        };
      })
    );

    setEmployeesInfoWithCalc(getAllCalc);
    setIsFetched(true);
  };

  useEffect(() => {
    if (!chainId || !employeesInfo.length) {
      return;
    }
    handleGetCalc();
  }, [chainId, employeesInfo]);

  return {
    isFetched,
    employeesInfoWithCalc
  };
};
