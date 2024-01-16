import { cloneDeep } from 'lodash';
import { useNotifications } from '../../../../providers/Notifications';

const CellRef = (props) => {
  const {
    value,
    blocksData,
    id: blockId,
    tableRowId,
    tableIndex,
    cellKey,
    cellRef,
    tableCellRef,
    setTableCellRef,
    tableRows,
    onChange
  } = props;
  const { alert, success } = useNotifications();

  const currentCellRef = Array.of(blockId, tableRowId, cellKey).join(':');
  const currentCellRefRef = Array.of(blockId, tableRowId, cellRef).join(':');

  const isActive = tableCellRef !== null ? true : false;

  const findBlockByBlockId = blocksData.blocks.findIndex((bl) => bl.id === blockId);
  const isInRef = isActive ? tableCellRef[0] === currentCellRefRef : false;
  const isLocked = Boolean(
    blocksData.blocks[findBlockByBlockId].transactions[tableRowId][cellRef]?.length
  );

  const handleBoundAndStopRefRequest = () => {
    if (tableCellRef === null) {
      // Initial
      setTableCellRef([currentCellRefRef, null]);
    } else {
      // Mid
      if (tableCellRef[0] === currentCellRef) {
        alert('Error: Cyclic refs');
        return;
      }
      const matchRefRef = tableCellRef[0]
        .split(':')[2]
        .substring(3)
        .match(new RegExp(currentCellRef.split(':')[2], 'i'));
      if (!matchRefRef) {
        alert('Error: Can not be matched, please select cell in same column');
        return;
      }

      if (tableCellRef[0]) {
        setTableCellRef([tableCellRef[0], currentCellRef]);
        success('Success: Linked');
      }
    }
  };

  const handleClearRef = () => {
    const cpTableRows = cloneDeep(tableRows);
    cpTableRows[tableRowId][cellRef] = [];
    onChange(cpTableRows, tableIndex);
  };

  if (!value) {
    return null;
  }
  return (
    <div className="d-flex align-items-center gap-1">
      {!isLocked ? (
        !isInRef ? (
          isActive ? (
            <button
              className="btn btn-outline-primary btn-sm shake"
              onClick={handleBoundAndStopRefRequest}
            >
              <i className="bi bi-bullseye"></i>
            </button>
          ) : (
            <button className="btn btn-outline-dark btn-sm" onClick={handleBoundAndStopRefRequest}>
              <i className="bi bi-link-45deg"></i>
            </button>
          )
        ) : null
      ) : null}
      {isLocked ? (
        <>
          {isActive ? (
            <button
              className="btn btn-outline-primary btn-sm shake"
              onClick={handleBoundAndStopRefRequest}
            >
              <i className="bi bi-bullseye"></i>
            </button>
          ) : (
            <>
              <button className="btn btn-primary btn-sm disabled">
                <i className="bi bi-link btn-primary"></i>
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleClearRef}>
                <i className="bi bi-arrow-counterclockwise"></i>
              </button>
            </>
          )}
        </>
      ) : null}
      {isInRef ? <i className="bi bi-lock-fill"></i> : null}
    </div>
  );
};

export default CellRef;
