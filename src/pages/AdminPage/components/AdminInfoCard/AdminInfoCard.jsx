import { useEffect, useState } from 'react';
import AdminInfoTable from './AdminInfoTable';
import cn from 'classnames';
import { useEmployeesInfo } from '../../../../hooks/useEmployeeInfo';
import moment from 'moment';

const AdminInfoCard = ({ tx, receipt, read, isForceActiveTab }) => {
  const [formData, setFormData] = useState({
    isOnlyLogs: true
  });
  const [activeTab, setActiveTab] = useState(0);
  const [adminInfoTableData, setAdminInfoTableData] = useState([]);

  const { employeesInfo } = useEmployeesInfo();

  const handleChangeField = (fieldKey, fieldValue) => {
    setFormData({ ...formData, [fieldKey]: fieldValue });
  };

  useEffect(() => {
    if (activeTab !== 1 && isForceActiveTab) {
      setActiveTab(1);
    }
  }, [isForceActiveTab, activeTab]);

  useEffect(() => {
    if (!employeesInfo.length) {
      return;
    }
    const reassembleData = employeesInfo.reduce((a, el, i, arr) => {
      a.push({
        id: i,
        nickname: el.nickname,
        created: moment(el.createdAt).format('YYYY-MM-DD'),
        address: el.address,
        isFired: el.isFired
      });
      return a;
    }, []);
    setAdminInfoTableData(reassembleData);
  }, [employeesInfo]);

  return (
    <div className="card w-100 h-100">
      <div className="card-body">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              onClick={() => setActiveTab(0)}
              className={cn('nav-link btn btn-link', {
                active: activeTab === 0
              })}
            >
              {' '}
              Таблица по сотрудникам
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setActiveTab(1)}
              className={cn('nav-link btn btn-link', {
                active: activeTab === 1
              })}
            >
              Лог последней транзакции
            </button>
          </li>
        </ul>

        {activeTab === 0 && <AdminInfoTable d={adminInfoTableData} />}
        {activeTab === 1 && (
          <>
            <div className="d-flex gap-2 w-100 justify-content-end align-items-center">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="isOnlyLogs"
                checked={formData.isOnlyLogs}
                onChange={(e) => handleChangeField('isOnlyLogs', e.target.checked)}
                aria-label="isOnlyLogs"
              />
              <label className="form-check-label w-auto h-auto m-0" htmlFor="isProbation">
                Show only logs
              </label>
            </div>
            {formData.isOnlyLogs ? (
              <>
                <h5 className="card-title mb-2">Logs:</h5>
                <pre>{JSON.stringify(read || receipt?.logs || null, null, 2)}</pre>
              </>
            ) : (
              <>
                <h5 className="card-title mb-2">Transaction:</h5>
                <pre>{JSON.stringify(tx, null, 2)}</pre>
                <h5 className="card-title mb-2">receipt:</h5>
                <pre>{JSON.stringify(receipt, null, 2)}</pre>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminInfoCard;
