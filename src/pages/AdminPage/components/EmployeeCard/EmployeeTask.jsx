import EmployeeTaskPeriond from './EmployeeTaskPeriond';

const EmployeeTask = ({ tasks }) => {
  if (!tasks) {
    return 'Loading...';
  }
  return tasks.map((t, i) => (
    <div key={i}>
      <h5>{t.title}</h5>
      <div className="border-bottom border-secondary mb-1"></div>
      {t?.taskPeriods?.map((period, i) => (
        <EmployeeTaskPeriond key={i} {...period} />
      ))}
    </div>
  ));
};

export default EmployeeTask;
