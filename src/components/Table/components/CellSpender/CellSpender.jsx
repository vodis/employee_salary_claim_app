import { getChainNameFromId } from '../../../../utils';

const CellSpender = (props) => {
  const { value, tableRows } = props;

  if (value === undefined) {
    return null;
  }
  if (value?.ref === undefined) {
    return value.address;
  }

  let newValue = '';
  const extractRefValue = tableRows[value.ref.txId][value.ref.cellKey];

  if (extractRefValue.some((el) => el.value === true)) {
    const findEl = value.address.reduce((acc, el) => {
      const chain = getChainNameFromId(Number(el.split(':')[0]));
      const select = extractRefValue.find((el) => el.value && el.label === chain);
      if (select && chain === select.label) acc.push(el.split(':')[1]);
      return acc;
    }, []);
    newValue = findEl.join(', ');
  } else {
    newValue = '';
  }

  return newValue;
};

export default CellSpender;
