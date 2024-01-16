import { cloneDeep } from 'lodash';

const CellInput = (props) => {
  const { value, placeholder, tableRows, tableRowId, tableIndex, cellKey, onChange } = props;

  if (value === undefined) {
    return null;
  }

  const handleChange = (value) => {
    const cpTableRows = cloneDeep(tableRows);
    cpTableRows[tableRowId][cellKey] = value;
    onChange(cpTableRows, tableIndex);
  };

  return (
    <div className="input-group" style={{ minWidth: 200 }}>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default CellInput;
