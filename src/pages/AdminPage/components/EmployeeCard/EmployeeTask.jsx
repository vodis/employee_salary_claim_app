import moment from 'moment';
import EmployeeTaskPeriond from './EmployeeTaskPeriond';

const EmployeeTask = () => {
  const tasks = {
    title: 'Задача засунуть коня в вакуум',
    taskPeriods: [
      {
        periodId: 1,
        periodDate: moment(new Date()).format('YYYY-MMM-MM'),
        periodPrice: 1000
      },
      {
        periodId: 2,
        periodDate: moment(new Date()).format('YYYY-MMM-MM'),
        periodPrice: 500
      }
    ]
  };
  return (
    <div>
      <h5>{tasks.title}</h5>
      <div className="border-bottom border-secondary mb-1"></div>
      {tasks.taskPeriods.map((period, i) => (
        <EmployeeTaskPeriond key={i} {...period} />
      ))}
    </div>
  );
};

export default EmployeeTask;
