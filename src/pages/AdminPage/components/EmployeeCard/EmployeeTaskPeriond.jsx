const EmployeeTaskPeriod = ({ periodId, periodDate, periodPrice }) => {
  return (
    <div className="d-flex gap-3 justify-content-between align-items-center mb-1">
      <span>{periodId}</span>
      <span>{periodDate}</span>
      <span>${periodPrice}</span>
      <button type="button" className="btn btn btn-primary">
        Claim
      </button>
    </div>
  );
};

export default EmployeeTaskPeriod;
