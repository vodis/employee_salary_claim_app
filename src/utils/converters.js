export const getChainNameFromId = (chainId) => {
  switch (chainId) {
    case 1:
      return 'eth';

    case 56:
      return 'bsc';

    case 137:
      return 'polygon';

    case 43114:
      return 'avalanche';

    case 42161:
      return 'arbitrum one';
  }
};

export const onlyNumbers = (value) => {
  return /^\d*\.?\d*$/.test(value) ? value : '';
};
