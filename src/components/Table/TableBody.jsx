import React from 'react';

export default function TableBody(props) {
  const { index, tableColumns, tableRows, injectTableRowsLogic, ...rest } = props;

  if (!tableRows.length) {
    return null;
  }
  return (
    <tbody>
      {tableRows.map((tableRow, tableRowId) => {
        if (injectTableRowsLogic(tableRow)) {
          return null;
        }
        return (
          <tr key={tableRow.index + '-' + tableRowId}>
            {tableColumns.map((bodyCell) => (
              <td
                key={index + '-' + bodyCell.accessor + '-' + tableRow.index}
                style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}
              >
                {bodyCell.Cell
                  ? bodyCell.Cell({
                      tableIndex: index,
                      tableRowId,
                      tableRows,
                      cellKey: bodyCell.accessor,
                      value: tableRow[bodyCell.accessor],
                      ...rest
                    })
                  : tableRow[bodyCell.accessor]}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}
