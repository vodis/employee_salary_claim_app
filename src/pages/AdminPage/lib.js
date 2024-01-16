import {
  CellChecks,
  CellSpender,
  CellPercent,
  CellInput,
  CellSelectToken,
  CellRefBox,
  CellName
} from '../../components/Table/components';

export const useColumns = () => {
  return [
    {
      accessor: 'id',
      header: 'Txns'
    },
    {
      accessor: 'name',
      header: 'Name',
      Cell: (props) => <CellName {...props} />
    },
    {
      accessor: 'gas',
      header: 'Gas'
    },
    {
      accessor: 'spender',
      header: 'Spender',
      Cell: (props) => props.value && <CellSpender {...props} />
    },
    {
      accessor: 'func',
      header: 'Func',
      Cell: (props) =>
        props.value && <CellChecks title="Select Func" defaultValue="Not Select" {...props} />
    },
    {
      accessor: 'srcChain',
      header: 'Src Chain',
      Cell: (props) => (
        <CellRefBox
          Component={CellChecks}
          title="Select Chains"
          defaultValue="Not Select"
          cellRef="refSrcChain"
          {...props}
        />
      )
    },
    {
      accessor: 'token',
      header: 'Token',
      Cell: (props) => (
        <CellRefBox
          Component={CellSelectToken}
          withApproveCheck
          title="Select Token"
          defaultValue="Not Select"
          cellRef="refToken"
          {...props}
        />
      )
    },
    {
      accessor: 'dstChain',
      header: 'Dst Chain',
      Cell: (props) => (
        <CellRefBox
          Component={CellChecks}
          title="Select Chains"
          defaultValue="Not Select"
          cellRef="refDstChain"
          {...props}
        />
      )
    },
    {
      accessor: 'dstToken',
      header: 'Dst Token',
      Cell: (props) => (
        <CellRefBox
          Component={CellSelectToken}
          title="select token"
          defaultValue="Not Select"
          cellRef="refDstToken"
          {...props}
        />
      )
    },
    {
      accessor: 'percent',
      header: 'Percent',
      Cell: (props) => props.value && <CellPercent {...props} />
    },
    {
      accessor: 'contractAddress',
      header: 'Contract Address',
      Cell: (props) => <CellInput placeholder="contractAddress" {...props} />
    },
    {
      accessor: 'minValue',
      header: 'Min Value',
      Cell: (props) => props.value && <CellInput placeholder="minValue" {...props} />
    },
    {
      accessor: 'wait_sec',
      header: 'Wait. sec',
      Cell: (props) => <CellInput placeholder="wait_sec" {...props} />
    },
    {
      accessor: 'wait_ran',
      header: 'Wait. ran',
      Cell: (props) => <CellInput placeholder="wait_ran" {...props} />
    }
  ];
};
