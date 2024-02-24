import EmployeeTaskPeriond from './EmployeeTaskPeriond';
import { useFakeLoader } from '../../../../hooks/useFakeLoader';

const EmployeeTask = ({ tasks, callback }) => {
  const { loading } = useFakeLoader(5000);

  if (!tasks.length) {
    return loading ? (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      <div>No tasks found</div>
    );
  }

  return tasks.map((t, i) => (
    <div key={i}>
      <h5>{`ID task: ${t.taskId} - Name: ${t.title}`}</h5>
      <div className="border-bottom border-secondary mb-1"></div>
      {t?.taskPeriods?.map((period, i) => {
        return <EmployeeTaskPeriond key={i} taskId={t.taskId} callback={callback} {...period} />;
      })}
    </div>
  ));
};

export default EmployeeTask;
