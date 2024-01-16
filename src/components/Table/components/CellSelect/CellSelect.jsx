import { cloneDeep } from 'lodash';

const CellSelect = (props) => {
  const { value, defaultValue, title, tableRows, tableIndex, tableRowId, cellKey, onChange } =
    props;

  const handleChange = (select) => {
    const cpTableRows = cloneDeep(tableRows);
    const newValue = value.map((el) => {
      return el.label === select ? { ...el, value: true } : { ...el, value: false };
    });
    cpTableRows[tableRowId][cellKey] = newValue;
    onChange(cpTableRows, tableIndex);
  };

  if (!value) {
    return null;
  }
  return (
    <select
      className="form-select"
      style={{ minWidth: 150 }}
      aria-label={title}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option defaultValue>{defaultValue}</option>
      {value.map((option, i) => (
        <option key={`${option.label}-${i}`} defaultValue={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CellSelect;
