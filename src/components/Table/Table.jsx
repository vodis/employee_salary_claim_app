import { Table } from 'react-bootstrap';
import TableHead from './TableHead';
import TableBody from './TableBody';

export default function TableCustom(props) {
  const { responsive, tableColumns, tableData, ...rest } = props;

  return (
    <Table responsive={responsive}>
      <TableHead headCells={tableColumns} tableId={tableData.id} {...rest} />
      <TableBody tableRows={tableData} tableColumns={tableColumns} {...rest} />
    </Table>
  );
}
