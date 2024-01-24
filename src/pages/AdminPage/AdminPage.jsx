const AdminPage = () => {
  return (
    <section className="page">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <div className="top-tabs justify-content-center">
              <a href="/" className="top-tabs__tab tab-1">
                Airdrops
              </a>
              <a href="https://claim.airdrop-hunter.site/" className="top-tabs__tab tab-2 ">
                Referrals
              </a>
              <a href="/" className="top-tabs__tab tab-3 active">
                Stats
              </a>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">claim-v02</div>
      </div>
    </section>
  );
};

export default AdminPage;
