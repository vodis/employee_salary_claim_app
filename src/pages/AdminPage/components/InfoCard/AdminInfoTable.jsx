const AdminInfoTable = () => {
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
      title: 'Task in work'
    },
    {
      id: 'taskInBlocked',
      title: 'Task in blocked'
    },
    {
      id: 'fired',
      title: 'Fired'
    }
  ];

  const d = [
    {
      nickname: 'vodis',
      created: new Date().getTime(),
      taskInWork: 6,
      taskInBlocked: 0,
      fired: null
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
