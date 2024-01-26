const InfoCard = ({ tx, receipt }) => {
  return (
    <div className="card w-100">
      <div className="card-body">
        <h5 className="card-title mb-2">Transaction:</h5>
        <pre>{JSON.stringify(tx, null, 2)}</pre>
        <h5 className="card-title mb-2">receipt:</h5>
        <pre>{JSON.stringify(receipt, null, 2)}</pre>
      </div>
    </div>
  );
};

export default InfoCard;
