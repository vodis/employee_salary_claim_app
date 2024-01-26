import { useState } from 'react';
import AdminCard from './components/AdminCard/AdminCard';
import EmployeeCard from './components/EmployeeCard/EmployeeCard';
import InfoCard from './components/InfoCard/InfoCard';
import AdminModal from './components/AdminModal/AdminModal';

const AdminPage = () => {
  const [transaction, setTransaction] = useState(null);
  const [receipt, setReceipt] = useState(null);

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
        <div className="d-flex justify-content-between m-4">
          <InfoCard tx={transaction} receipt={receipt} />
        </div>
        <div className="d-flex justify-content-between m-4 gap-4 flex-wrap">
          <AdminCard />
          <EmployeeCard />
        </div>
      </div>

      <AdminModal
        callback={(transaction, receipt) => {
          setTransaction(transaction);
          setReceipt(receipt);
        }}
      />
    </section>
  );
};

export default AdminPage;
