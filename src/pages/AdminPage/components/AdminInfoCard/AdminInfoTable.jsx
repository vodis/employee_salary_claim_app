import { useFakeLoader } from '../../../../hooks/useFakeLoader';

const AdminInfoTable = ({ d, isLoading, withFakeLoader = false }) => {
  const { loading: fakeLoading } = useFakeLoader(5000); // 5 seconds

  const h = [
    {
      id: 'id',
      title: null
    },
    {
      id: 'address',
      title: 'Wallet'
    },
    {
      id: 'nickname',
      title: 'Nickname'
    },
    {
      id: 'taskInOpen',
      title: 'Open tasks'
    },
    {
      id: 'isApproved',
      title: 'Approved tasks'
    },
    {
      id: 'isBlocked',
      title: 'Blocked tasks'
    },
    {
      id: 'toPay',
      title: 'Payment on the 5th.'
    },
    {
      id: 'tg',
      title: 'Telegram'
    },
    {
      id: 'email',
      title: 'Email'
    },
    {
      id: 'isFired',
      title: 'Employee fired'
    },
    {
      id: 'createdAt',
      title: 'Created At'
    },
    {
      id: 'firedAt',
      title: 'Fired At'
    }
  ];

  const tableBodyPlaceholder = Array(5)
    .fill(0)
    .map((data, i) => (
      <tr key={`d-${i}`}>
        {h.map((name, j) =>
          j === 0 ? (
            <th key={`d-${name.id}-${j}`} scope="row">
              <p className="placeholder-glow">
                <span className="placeholder col-7"></span>
              </p>
            </th>
          ) : (
            <td key={`d-${name.id}-${j}`}>
              <p className="placeholder-glow">
                <span className="placeholder col-7"></span>
              </p>
            </td>
          )
        )}
      </tr>
    ));

  const tableBodyEmpty = (
    <tr>
      <td colSpan={h.length} className="text-center">
        It appears that no employees have been added yet. Add a new employee!
      </td>
    </tr>
  );

  const tableTypeData = (colName, colValue) => {
    switch (colName) {
      case 'isFired':
        return colValue ? 'Yes' : 'No';
      default:
        return colValue;
    }
  };

  const tableBodyData = d.length
    ? d.map((data, i) => (
        <tr key={`d-${i}`}>
          {h.map((name, j) =>
            j === 0 ? (
              <th key={`d-${name.id}-${j}`} scope="row">
                {data[name.id] + 1}
              </th>
            ) : (
              <td key={`d-${name.id}-${j}`}>{tableTypeData(name.id, data[name.id])}</td>
            )
          )}
        </tr>
      ))
    : tableBodyEmpty;

  const isOneOfLoading = withFakeLoader ? fakeLoading : isLoading;

  return (
    <div className="overflow-scroll mb-2">
      <table className="table table-bordered">
        <thead>
          <tr>
            {h.map((name) => (
              <td key={name.id} scope="col">
                <h6 className="text-nowrap">{name.title}</h6>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>{isOneOfLoading ? tableBodyPlaceholder : tableBodyData}</tbody>
      </table>
    </div>
  );
};

export default AdminInfoTable;
