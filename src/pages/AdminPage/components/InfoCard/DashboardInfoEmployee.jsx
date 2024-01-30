import React from 'react';
import DiagramEmployee from './DiagramEmployee';

export const DashboardInfoEmployee = () => {
  return (
    <div className="card w-100 h-100">
      <div className="card-body">
        <div className="d-flex gap-3 align-items-center mb-4">
          <h5 className="card-title mb-2 flex-shrink-0">Employee Info:</h5>
          <select className="form-select flex-shrink-1" aria-label="Default select example">
            <option selected>Select nickname</option>
            <option value="1">vodis</option>
          </select>
        </div>
        <div className="d-flex flex-column mb-2">
          <div className="d-flex justify-content-between">
            <span>Count of Open Tasks:</span>
            <span>null</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Count of Blocked Tasks:</span>
            <span>null</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total Available to Claim now:</span>
            <span>null</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total will be available for request on the 5th:</span>
            <span>null</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total Locked in all Task (exclude total available):</span>
            <span>null</span>
          </div>
        </div>

        <DiagramEmployee />
      </div>
    </div>
  );
};
