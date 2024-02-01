import React, { useState, useEffect } from 'react';
import DiagramEmployee from './DiagramEmployee';
import moment from 'moment';
import { useUsers } from '../../../../hooks/useUsers';
import { getRefContractForTaskManager } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { useWallet } from '../../../../hooks/useWallet';

export const DashboardInfoEmployee = () => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();
  const { users } = useUsers();
  const [formData, setFormData] = useState({
    users: []
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (users && formData.users.length !== users.length) {
      setFormData({
        ...formData,
        users: users.map(({ nickname }) => ({ nickname, selected: false }))
      });
    }
  }, [users, formData]);

  const handleChangeDiagram = async (fieldKey, fieldValue) => {
    setFormData({
      ...formData,
      [fieldKey]: formData.users.map((el) =>
        !el.nickname !== fieldValue ? { ...el, selected: false } : { ...el, selected: true }
      )
    });

    if (!chainId || !fieldValue) {
      setChartData([]);
      return;
    }
    const contract = getRefContractForTaskManager(chainId, signer);
    const filter = contract.filters.eLog();
    const events = await contract.queryFilter(filter);

    if (events) {
      const data = events
        .map((e) => e.args)
        // .filter((d) => d[3] === fieldValue)
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
      setChartData(combine);
    }
  };

  return (
    <div className="card w-100 h-100">
      <div className="card-body">
        <div className="d-flex gap-3 align-items-center mb-4">
          <h5 className="card-title mb-2 flex-shrink-0">Employee Info:</h5>
          <select
            className="form-select flex-shrink-1"
            aria-label="users"
            onChange={(e) => handleChangeDiagram('users', e.target.value)}
          >
            <option value={''}>Select nickname</option>
            {formData.users.map(({ nickname }) => (
              <option key={nickname} value={nickname}>
                {nickname}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex flex-column mb-2">
          <div className="d-flex justify-content-between">
            <span>Total open tasks:</span>
            <span>null</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total blocked tasks:</span>
            <span>null</span>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <span>Total successful finished tasks:</span>
            <span>null</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Total available to claim:</span>
            <span>$</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Will be available to claim on the 5th:</span>
            <span>$</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Blocked in tasks:</span>
            <span>$</span>
          </div>
        </div>

        <DiagramEmployee d={chartData} />
      </div>
    </div>
  );
};
