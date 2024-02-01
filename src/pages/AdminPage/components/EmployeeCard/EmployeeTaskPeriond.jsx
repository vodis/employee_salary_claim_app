import moment from 'moment';

const EmployeeTaskPeriod = ({ periodId, periodDate, periodPrice }) => {
  return (
    <div className="d-flex gap-3 justify-content-between align-items-center mb-1">
      <span>{periodId + 1}</span>
      <span>{moment(new Date(periodDate * 1000)).format('YYYY-MM-DD')}</span>
      <span>${periodPrice.toNumber()}</span>
      <button type="button" className="btn btn btn-primary">
        Claim
      </button>
    </div>
  );
};

export default EmployeeTaskPeriod;
