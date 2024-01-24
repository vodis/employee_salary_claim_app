const InfoCard = () => {
  return (
    <div className="card w-100">
      <div className="card-body">
        <h5 className="card-title mb-2">Response:</h5>
        <pre>{JSON.stringify({ test: 'test' }, null, 2)}</pre>
      </div>
    </div>
  );
};

export default InfoCard;
