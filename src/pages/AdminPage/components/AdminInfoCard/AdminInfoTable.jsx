import { useFakeLoader } from '../../../../hooks/useFakeLoader';

const AdminInfoTable = ({ d }) => {
  const { loading } = useFakeLoader(5000);

  const h = [
    {
      id: 'id',
      title: null
    },
    {
      id: 'nickname',
      title: 'Никнейм'
    },
    {
      id: 'address',
      title: 'Кошелек'
    },
    {
      id: 'created',
      title: 'Дата создания'
    },
    {
      id: 'taskInOpen',
      title: 'Открытые задачи'
    },
    {
      id: 'isApproved',
      title: 'Подтрержденные задачи'
    },
    {
      id: 'isBlocked',
      title: 'Заблокированные задачи'
    },
    {
      id: 'toPay',
      title: 'К оплате на 5 число'
    },
    {
      id: 'tg',
      title: 'Телеграмм'
    },
    {
      id: 'email',
      title: 'Email'
    },
    {
      id: 'fired',
      title: 'Сотрудник уволен'
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
                <span class="placeholder col-7"></span>
              </p>
            </th>
          ) : (
            <td key={`d-${name.id}-${j}`}>
              <p className="placeholder-glow">
                <span class="placeholder col-7"></span>
              </p>
            </td>
          )
        )}
      </tr>
    ));

  const tableBodyEmpty = (
    <td colspan={h.length}>
      Похоже что ни один сотрудник еще небыл добавлне. Добавьте нового сотрудника!
    </td>
  );

  const tableBodyData = d
    ? d.map((data, i) => (
        <tr key={`d-${i}`}>
          {h.map((name, j) =>
            j === 0 ? (
              <th key={`d-${name.id}-${j}`} scope="row">
                {data[name.id] + 1}
              </th>
            ) : (
              <td key={`d-${name.id}-${j}`}>{data[name.id]}</td>
            )
          )}
        </tr>
      ))
    : tableBodyEmpty;

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
        <tbody>{loading ? tableBodyPlaceholder : tableBodyData}</tbody>
      </table>
    </div>
  );
};

export default AdminInfoTable;
