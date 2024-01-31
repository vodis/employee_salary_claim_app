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
      <h5 className="card-title mb-2">Diagram:</h5>
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
