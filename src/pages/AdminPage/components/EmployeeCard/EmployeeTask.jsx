import EmployeeTaskPeriond from './EmployeeTaskPeriond';
import { useFakeLoader } from '../../../../hooks/useFakeLoader';

const EmployeeTask = ({ tasks, callback }) => {
  const { loading } = useFakeLoader();

  if (!tasks.length) {
    return loading ? (
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Загрузка...</span>
        </div>
      </div>
    ) : (
      <div>Не найдина ни одна задача</div>
    );
  }

  return tasks.map((t, i) => (
    <div key={i}>
      <h5>{`ID задачи: ${t.taskId} - Название: ${t.title}`}</h5>
      <div className="border-bottom border-secondary mb-1"></div>
      {t?.taskPeriods?.map((period, i) => {
        return <EmployeeTaskPeriond key={i} taskId={t.taskId} callback={callback} {...period} />;
      })}
    </div>
  ));
};

export default EmployeeTask;
