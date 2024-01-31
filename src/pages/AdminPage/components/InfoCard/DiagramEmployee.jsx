import {
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DiagramEmployee = ({ d }) => {
  return (
    <div>
      <div className="d-flex align-items-center mb-2">
        <h5 className="card-title m-0 p-0">Diagram:</h5>
        <div className="d-flex">
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              placeholder="from"
              aria-label="from"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              placeholder="to"
              aria-label="to"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={d}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis dataKey="price" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiagramEmployee;
