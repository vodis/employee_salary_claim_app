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
      title: 'Created At'
    },
    {
      id: 'taskInWork',
      title: 'Tasks in work'
    },
    {
      id: 'isApproved',
      title: 'Tasks approved'
    },
    {
      id: 'fired',
      title: 'Fired'
    }
  ];

  return (
    <div>
      <h5 className="card-title mb-4">Admin Info:</h5>
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
            {d.map((data, i) => (
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
    </div>
  );
};

export default AdminInfoTable;
