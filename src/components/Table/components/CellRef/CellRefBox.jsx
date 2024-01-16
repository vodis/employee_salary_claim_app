import { CellRef } from '../index';

const CellRefBox = (props) => {
  const { Component, title, defaultValue, cellRef } = props;

  return Boolean(props.value?.length) && props.tableRows[props.tableRowId][cellRef]?.length ? (
    <div className="d-flex align-items-center gap-1">
      {props.tableRows[props.tableRowId][cellRef]}
      <CellRef cellRef={cellRef} {...props} />
    </div>
  ) : (
    <div className="d-flex align-items-center gap-1">
      <Component title={title} defaultValue={defaultValue} {...props} />
      <CellRef cellRef={cellRef} {...props} />
    </div>
  );
};

export default CellRefBox;
