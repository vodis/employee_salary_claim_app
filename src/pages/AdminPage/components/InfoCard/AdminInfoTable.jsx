const AdminInfoTable = ({ d }) => {
  const h = [
    {
      id: 'id',
      title: null
    },
    {
      id: 'nickname',
      title: 'Nickname'
    },
    {
      id: 'created',
      title: 'Created at'
    },
    {
      id: 'taskInOpen',
      title: 'Opened tasks'
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
      title: 'To pay'
    },
    {
      id: 'tg',
      title: 'Contact tg'
    },
    {
      id: 'email',
      title: 'Contact email'
    },
    {
      id: 'fired',
      title: 'Fired'
    }
  ];

  return (
    <div className="overflow-scroll mb-2">
      <table className="table">
        <thead>
          <tr>
            {h.map((name) => (
              <th key={name.id} scope="col">
                <h6 className="text-nowrap">{name.title}</h6>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {d?.map((data, i) => (
            <tr key={`d-${i}`}>
              {h.map((name, j) =>
                j === 0 ? (
                  <th key={`d-${name.id}-${j}`} scope="row">
                    {j + 1}
                  </th>
                ) : (
                  <td key={`d-${name.id}-${j}`}>{data[name.id]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminInfoTable;
