import { useState } from 'react';

export const AdminAddEmployee = () => {
  const [formData, setFormData] = useState({
    address: '',
    isProbation: ''
  });

  const handleAddEmployee = (fieldKey, fieldValue) => {
      setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  return (
    <div
      class="modal fade"
      id="add-employee"
      tabindex="-1"
      aria-labelledby="addEmployee"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <form className="row g-3">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addEmployee">
                Add Employee
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  aria-label="Address"
                  aria-describedby="basic-addon1"
                  value={formData.address}
                  // onChange={(e) => handleChangeField('title', e.target.value)}
                />
              </div>
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="isProbation"
                  aria-label="isProbation"
                  aria-describedby="basic-addon1"
                  value={formData.isProbation}
                  // onChange={(e) => handleChangeField('description', e.target.value)}
                />
              </div>
            </div>
            <div className="p-2">
              <div class="d-flex gap-3 w-100 p-2">
                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary w-100" onClick={handleAddEmployee}>
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
