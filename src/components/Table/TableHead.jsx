import React from 'react';

export default function TableHead(props) {
  const { headCells } = props;
  return (
    <thead>
      <tr>
        {headCells.map((headCell) => (
          <th key={headCell.accessor} style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
            {headCell.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
