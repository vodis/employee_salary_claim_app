import EmployeeTask from './EmployeeTask';
import { useGetAllTaskEvent } from '../../../../hooks/useGetAllTaskEvent';
import { useEffect, useState } from 'react';
import { useGetNicknameByWalletEvent } from '../../../../hooks/useGetNicknameByWalletEvent';

const EmployeeInfoCard = ({ callback }) => {
  const { tasks: allTasks } = useGetAllTaskEvent();
  const { nickname } = useGetNicknameByWalletEvent();
  const [tasksByEmployee, setTasksByEmployee] = useState([]);

  useEffect(() => {
    if (!allTasks) {
      return;
    }
    const tasks = allTasks
      .filter((fd) => fd.nickname === nickname)
      .map((t) => ({
        taskId: t.taskId.toNumber(),
        title: t.title,
        taskPeriods: t.periods.map((periodDate, i) => ({
          periodId: i,
          periodDate,
          periodPrice: t.prices[i],
          isClaimed: t.getIsAlreadyPaid[i]
        }))
      }));
    setTasksByEmployee(tasks);
  }, [allTasks, nickname]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">Секция сотрудника</h5>
        <EmployeeTask tasks={tasksByEmployee} callback={callback} />
      </div>
    </div>
  );
};

export default EmployeeInfoCard;
