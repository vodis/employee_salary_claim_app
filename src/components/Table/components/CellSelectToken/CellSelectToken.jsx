import { cloneDeep } from 'lodash';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const CellSelectToken = (props) => {
  const {
    value,
    defaultValue,
    title,
    tableRows,
    tableIndex,
    tableRowId,
    cellKey,
    withApproveCheck,
    onChange
  } = props;

  let _title = value?.reduce((acc, el) => {
    const divider = acc.length ? ', ' : '';
    if (el.value) {
      acc += divider + `${el.label}`;
    }
    return acc;
  }, '');
  if (!_title) {
    _title = defaultValue;
  }

  const handleClick = (newValue, index) => {
    const cpTableRows = cloneDeep(tableRows);
    const cpValue = cloneDeep(value);
    cpValue[index] = newValue;
    cpTableRows[tableRowId][cellKey] = cpValue;

    if (
      withApproveCheck &&
      cpTableRows[tableRowId][cellKey].some((select) => select.value && select.label !== 'eth')
    ) {
      if (cpTableRows[0].id === 0) cpTableRows[0].status = 'open';
    } else {
      if (cpTableRows[0].id === 0) cpTableRows[0].status = 'close';
    }

    onChange(cpTableRows, tableIndex);
  };

  if (!value) {
    return null;
  }
  return (
    <DropdownButton
      key="start"
      id={`dropdown-button-drop-start`}
      variant="dark"
      title={_title}
      className="position-static"
      aria-label={title}
    >
      {value.map((el, i) => (
        <Dropdown.Item
          key={el.label}
          className="d-flex gap-3"
          onClick={() => handleClick({ ...el, value: !el.value }, i)}
        >
          {el.value ? <i className="bi bi-check-square"></i> : <i className="bi bi-square"></i>}
          {el.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CellSelectToken;
