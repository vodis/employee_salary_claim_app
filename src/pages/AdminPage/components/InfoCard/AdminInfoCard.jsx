import { useState } from 'react';

const AdminInfoCard = ({ tx, receipt, read }) => {
  const [formData, setFormData] = useState({
    isOnlyLogs: true
  });

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  return (
    <div className="card w-100 h-100">
      <div className="card-body">
        <div className="d-flex gap-2 w-100 justify-content-end align-items-center">
          <input
            className="form-check-input m-0"
            type="checkbox"
            id="isOnlyLogs"
            checked={formData.isOnlyLogs}
            onChange={(e) => handleChangeField('isOnlyLogs', e.target.checked)}
            aria-label="isOnlyLogs"
          />
          <label className="form-check-label w-auto h-auto m-0" htmlFor="isProbation">
            Show only logs
          </label>
        </div>
        {formData.isOnlyLogs ? (
          <>
            <h5 className="card-title mb-2">Logs:</h5>
            <pre>{JSON.stringify(read || receipt?.logs || null, null, 2)}</pre>
          </>
        ) : (
          <>
            <h5 className="card-title mb-2">Transaction:</h5>
            <pre>{JSON.stringify(tx, null, 2)}</pre>
            <h5 className="card-title mb-2">receipt:</h5>
            <pre>{JSON.stringify(receipt, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminInfoCard;
