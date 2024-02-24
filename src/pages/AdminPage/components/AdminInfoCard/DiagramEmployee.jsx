import {
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DEFAULT_DIAGRAM = [
  { date: '2024-01-01', price: 0 },
  { date: '2024-04-01', price: 0 }
];

const DiagramEmployee = ({ d }) => {
  return (
    <div>
      <div className="d-flex align-items-center mb-2 gap-1">
        <h6 className="card-title m-0 p-0">Chart by payment:</h6>
        <div className="d-flex gap-2">
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
          <LineChart data={d.length ? d : DEFAULT_DIAGRAM}>
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
