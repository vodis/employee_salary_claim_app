const AdminModal = () => {
  return (
    <>
      <div
        class="modal fade"
        id="deposit"
        tabindex="-1"
        aria-labelledby="depositLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="depositLabel">
                Deposit
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
                  placeholder="Amount"
                  aria-label="Amount"
                  aria-describedby="basic-addon1"
                />
                <span class="input-group-text" id="basic-addon1">
                  USDT
                </span>
              </div>
            </div>
            <div class="d-flex gap-3 w-100 p-2">
              <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary w-100">
                Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModal;
