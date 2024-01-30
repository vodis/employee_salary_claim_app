import {
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DiagramEmployee = () => {
  const d = [
    { date: '2017-02-01', price: 231 },
    { date: '2017-04-01', price: 453 },
    { date: '2017-16-01', price: 123 },
    { date: '2018-01-01', price: 234 },
    { date: '2018-04-01', price: 958 },
    { date: '2018-11-01', price: 163 },
    { date: '2018-11-02', price: 163 },
    { date: '2018-11-03', price: 163 },
    { date: '2018-11-04', price: 163 },
    { date: '2019-03-01', price: 293 },
    { date: '2019-10-01', price: 471 },
    { date: '2020-07-01', price: 881 },
    { date: '2020-09-01', price: 122 }
  ];

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
