const AdminCard = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">Admin Section</h5>

        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1 flex-shrink-1">
            <input
              type="text"
              className="form-control"
              placeholder="Fill in Task ID"
              aria-label="Amount"
              aria-describedby="basic-addon1"
            />
          </div>
          <button type="button" className="btn btn-light flex-grow-2 flex-shrink-1">
            Task Info
          </button>
        </div>

        <div className="border border-success rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2">
            <p class="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Top up the contract (usdt)</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#deposit"
              className="btn btn-success flex-grow-2 flex-shrink-1"
            >
              Deposit
            </button>
          </div>
        </div>

        <div className="border border-secondary rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <p class="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Create task</p>
            <button type="button" className="btn btn-secondary flex-grow-2 flex-shrink-1">
              Deposit
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p class="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Add assignee to task</p>
            <button type="button" className="btn btn-secondary flex-grow-2 flex-shrink-1">
              Deposit
            </button>
          </div>
        </div>

        <div className="border border-danger rounded p-3">
          <div className="d-flex align-items-center gap-2">
            <p class="card-text p-0 m-0 flex-grow-1 flex-shrink-1">Fire an employee</p>
            <button type="button" className="btn btn-danger flex-grow-2 flex-shrink-1">
              Fired
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
