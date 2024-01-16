import { cloneDeep } from 'lodash';

const CellPercent = (props) => {
  const { value, tableRows, tableRowId, cellKey, tableIndex, onChange } = props;

  if (!value?.length) {
    return null;
  }

  const handleChangeMin = (value) => {
    const cpTableRows = cloneDeep(tableRows);
    const cpValue = cpTableRows[tableRowId][cellKey];
    cpValue[0] = value;
    onChange(cpTableRows, tableIndex);
  };
  const handleChangeMax = (value) => {
    const cpTableRows = cloneDeep(tableRows);
    const cpValue = cpTableRows[tableRowId][cellKey];
    cpValue[1] = value;
    onChange(cpTableRows, tableIndex);
  };

  return (
    <div className="input-group" style={{ minWidth: 200 }}>
      {value.length ? (
        <input
          onChange={(e) => handleChangeMin(e.target.value)}
          value={value[0]}
          type="number"
          className="form-control"
          placeholder="min"
          min={0}
          max={100}
        />
      ) : null}
      {value.length === 2 ? (
        <input
          onChange={(e) => handleChangeMax(e.target.value)}
          value={value[1]}
          type="number"
          className="form-control"
          placeholder="max"
          min={0}
          max={100}
        />
      ) : null}
      <span className="input-group-text" id="basic-addon2">
        %
      </span>
    </div>
  );
};

export default CellPercent;
