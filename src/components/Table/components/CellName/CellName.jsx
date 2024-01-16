import { injector } from '../../../../utils';
import { min } from 'lodash';

const CellName = (props) => {
  const { value, tableRows, tableRowId } = props;

  if (!value) {
    return value;
  }

  const extractToken = tableRows[tableRowId].token
    ?.filter((el) => el.value)
    .map((el) => el.label.toUpperCase())
    .join('/');
  const extractRefToken = tableRows[tableRowId].refToken?.length
    ? tableRows[tableRowId].refToken
    : '';

  const token = extractRefToken || extractToken;
  const percent = tableRows[tableRowId].percent
    ? tableRows[tableRowId].percent.join('-') + '%'
    : '';
  const func = tableRows[tableRowId].func
    ? tableRows[tableRowId].func
        .filter((el) => el.value)
        ?.map((el) => el.label.toUpperCase())
        .join(', ') || ''
    : '';
  const srcChain = tableRows[tableRowId].srcChain
    ? tableRows[tableRowId].srcChain
        .filter((el) => el.value)
        ?.map((el) => el.label.toUpperCase())
        .join(', ') || ''
    : '';
  const dstChain = tableRows[tableRowId].dstChain
    ? tableRows[tableRowId].dstChain
        .filter((el) => el.value)
        ?.map((el) => el.label.toUpperCase())
        .join(', ')
    : '';
  const dstToken = tableRows[tableRowId].dstToken
    ? tableRows[tableRowId].dstToken
        .filter((el) => el.value)
        ?.map((el) => el.label.toUpperCase())
        .join(', ')
    : '';

  return injector(
    '{{token}}',
    token,
    injector(
      '{{percent}}',
      percent,
      injector(
        '{{func}}',
        func,
        injector(
          '{{srcChain}}',
          srcChain,
          injector('{{dstChain}}', dstChain, injector('{{dstToken}}', dstToken, value))
        )
      )
    )
  );
};

export default CellName;
