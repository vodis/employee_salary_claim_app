import React, { useState, useEffect } from 'react';
import DiagramEmployee from './DiagramEmployee';
import moment from 'moment';
import { useUsers } from '../../../../hooks/useUsers';
import { getRefContractForTaskManager } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';
import { useGetEmployeeInfoCalc } from '../../../../hooks/useGetEmployeeInfoCalc';

export const DashboardInfoEmployee = () => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const { users } = useUsers();
  const [selectEmployee, setSelectEmployee] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    nickname: '',
    chartData: [],
    isTaskOpened: 0,
    isTaskStopped: 0,
    isTaskDone: 0,
    totalToClaim: 0,
    totalToClaim5th: 0,
    totalLocked: 0
  });

  const { employeesInfoWithCalc } = useGetEmployeeInfoCalc(
    selectEmployee ? [{ nickname: selectEmployee }] : []
  );

  useEffect(() => {
    if (selectEmployee && chainId) {
      handleChangeDiagram();
    }
  }, [selectEmployee, chainId]);

  const handleChangeDiagram = async () => {
    const contract = getRefContractForTaskManager(chainId, signer);
    const filter = contract.filters.eLog();
    const events = await contract.queryFilter(filter);

    if (events) {
      const data = events
        .map((e) => e.args)
        .filter((d) => d[3] === selectEmployee)
        .filter((d) => d[1] === 'add_task')
        .map((d) => {
          return {
            dates: d[4].map((el) => moment(el.toNumber() * 1000).format('YYYY-MM-DD')),
            prices: d[5].map((el) => el.toNumber())
          };
        });
      const combine = data.reduce((acc, { dates, prices }, i) => {
        const datesMap = dates.map((el) => ({ date: el }));
        const pricesMap = prices.map((el) => ({ price: el }));
        const innerCombine = datesMap.reduce((a, el, j) => {
          a.push({ ...el, ...pricesMap[j] });
          return a;
        }, []);

        acc.push(...innerCombine);
        return acc;
      }, []);
      setEmployeeData({
        ...employeeData,
        chartData: combine
      });
    }
  };

  return (
    <div className="card w-100 h-100">
      <div className="card-body">
        <div className="d-flex gap-3 align-items-center mb-4">
          <h5 className="card-title mb-2 flex-shrink-0">Employee information:</h5>
          <select
            className="form-select flex-shrink-1"
            aria-label="users"
            onChange={(e) => setSelectEmployee(e.target.value)}
          >
            <option value={''}>Select nickname</option>
            {users.map(({ nickname }) => (
              <option key={nickname} value={nickname}>
                {nickname}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex flex-column mb-4">
          <div className="d-flex justify-content-between">
            <span>Total open tasks:</span>
            <span>
              {employeesInfoWithCalc.length && selectEmployee
                ? employeesInfoWithCalc[0].taskInOpen
                : 0}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total blocked tasks:</span>
            <span>
              {employeesInfoWithCalc.length && selectEmployee
                ? employeesInfoWithCalc[0].isBlocked
                : 0}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <span>Total tasks successfully completed:</span>
            <span>
              {employeesInfoWithCalc.length && selectEmployee
                ? employeesInfoWithCalc[0].isApproved
                : 0}
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Total available for receipt:</span>
            <span>0</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Will be available on the 5th to receive:</span>
            <span>
              {employeesInfoWithCalc.length && selectEmployee ? employeesInfoWithCalc[0].toPay : 0}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total blocked in tasks:</span>
            <span>0</span>
          </div>
        </div>

        <DiagramEmployee d={employeeData.chartData} />
      </div>
    </div>
  );
};
