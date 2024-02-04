import { useState } from 'react';
import AdminCard from './components/AdminCard/AdminCard';
import EmployeeInfoCard from './components/EmployeeInfoCard/EmployeeInfoCard';
import AdminInfoCard from './components/AdminInfoCard/AdminInfoCard';
import AdminModal from './components/AdminModal/AdminModal';
import { DashboardInfoEmployee } from './components/AdminInfoCard/DashboardInfoEmployee';
// import {useDebugEvent} from "../../hooks/useDebugEvent";

const AdminPage = () => {
  const [transaction, setTransaction] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [read, setRead] = useState(null);
  const [isForceActiveTab, setIsForceActiveTab] = useState(false);

  // useDebugEvent();

  const handleCallback = (transaction, receipt, read) => {
    setTransaction(transaction);
    setReceipt(receipt);
    setRead(read);

    setIsForceActiveTab(true);
    setTimeout(() => setIsForceActiveTab(false), 0);
  };

  return (
    <section className="page">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <div className="top-tabs justify-content-center">
              <a href="https://app.airdrop-hunter.site/" className="top-tabs__tab tab-1">
                Airdrops
              </a>
              <a href="https://claim.airdrop-hunter.site/" className="top-tabs__tab tab-2 ">
                Referrals
              </a>
              <a href="/" className="top-tabs__tab tab-3 active">
                Admin
              </a>
            </div>
          </div>
        </div>

        <div className="container my-4">
          <div className="row">
            <div className="col-xs-auto col-lg-6">
              <AdminInfoCard
                tx={transaction}
                receipt={receipt}
                read={read}
                isForceActiveTab={isForceActiveTab}
              />
            </div>
            <div className="col-xs-auto col-lg-6">
              <DashboardInfoEmployee />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-auto col-lg-6">
              <AdminCard callback={handleCallback} />
            </div>
            <div className="col-xs-auto col-lg-6">
              <EmployeeInfoCard callback={handleCallback} />
            </div>
          </div>
        </div>
      </div>

      <AdminModal callback={handleCallback} />
    </section>
  );
};

export default AdminPage;
