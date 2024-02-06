import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/providerAndSigner/user-selector';
import { useWallet } from './useWallet';
import {
  getRefContractForEmployeeManager,
  getRefContractForTaskManager
} from '../utils/ethereum/ethereumFunctions';
import moment from 'moment';
import { utils } from 'ethers';
import { getTaskInfoLibResponse } from '../pages/AdminPage/components/AdminCard/libResponse';

export const useEmployeeStatusesEvent = () => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const [employeesInfo, setEmployeesInfo] = useState([]);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const iId = setInterval(async () => {
      const contract = getRefContractForEmployeeManager(chainId, signer);
      const filter = contract.filters.eLog();
      const events = await contract.queryFilter(filter);

      if (events) {
        const userInfo = events
          .map((e) => e.args)
          .map((d) => ({
            nickname: d[2],
            createdAt: d[4]
          }));

        if (userInfo) {
          const getAllTaskIdsByNicknames = await Promise.all(
            userInfo.map(async ({ nickname }) => {
              const contract2 = getRefContractForTaskManager(chainId, signer);
              const data = contract2.interface.encodeFunctionData('getTaskIdsByNickname', [
                nickname
              ]);
              const gasLimit = await contract2.estimateGas.getTaskIdsByNickname(nickname);
              const tx = {
                to: contract2.address,
                data,
                gasLimit: gasLimit * 2
              };

              const result = await signer.call(tx);
              return utils.defaultAbiCoder.decode(['uint256[]'], result);
            })
          );

          const getTaskInfosByIdsMany = await Promise.all(
            getAllTaskIdsByNicknames.map(async (ids, i) => {
              const getTaskInfosByIdsSingle = await Promise.all(
                ids[0].map(async (id) => {
                  const contract3 = getRefContractForTaskManager(chainId, signer);
                  const data = contract3.interface.encodeFunctionData('getTaskInfo', [
                    id.toNumber()
                  ]);
                  const gasLimit = await contract3.estimateGas.getTaskInfo(id.toNumber());
                  const tx = {
                    to: contract3.address,
                    data,
                    gasLimit: gasLimit * 2
                  };

                  const result = await signer.call(tx);
                  const task = getTaskInfoLibResponse(result);
                  return {
                    nickname: task.nickname,
                    created: moment(userInfo[i].createdAt.toNumber() * 1000).format('YYYY-MM-DD'),
                    taskInWork: task.isTaskOpened && !task.isTaskStopped,
                    isApproved: task.isAlphaStageDone,
                    fired: null
                  };
                })
              );
              return getTaskInfosByIdsSingle;
            })
          );

          const combine = getTaskInfosByIdsMany.reduce((acc, el) => {
            const res = el.reduce((a, j, i) => {
              if (!i) {
                a.push({
                  ...j,
                  taskInWork: j.taskInWork ? 1 : 0,
                  isApproved: j.isApproved ? 1 : 0
                });
                return a;
              }
              a[0].taskInWork = j.taskInWork ? a[0].taskInWork + 1 : a[0].taskInWork;
              a[0].isApproved = j.isApproved ? a[0].isApproved + 1 : a[0].isApproved;
              return a;
            }, []);

            acc.push(res);
            return acc;
          }, []);

          setEmployeesInfo(...combine);
        }
      }
    }, 1000);
    return () => {
      clearInterval(iId);
    };
  }, [chainId]);

  return {
    employeesInfo
  };
};
