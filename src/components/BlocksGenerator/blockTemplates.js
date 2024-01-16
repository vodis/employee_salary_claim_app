import { dex } from './cubics/dex';
import { aave } from './cubics/aave';
import { compound } from './cubics/compound';
import { ens } from './cubics/ens';
import { holograph } from './cubics/holograph';
import { mercly } from './cubics/mercly';
import { nomis } from './cubics/nomis';
import { lido } from './cubics/lido';
import { wNativeUnwrap, wNativeWrap } from './cubics/w-native';
import { bungee } from './cubics/bungee';
import { stargate } from './cubics/stargate';
import { testnet } from './cubics/testnet';

// @dev: status - works with values 'open' or 'close'. If status is 'close' then block will be excluded from final data.
// @dev: transactions[n].status - is 'close' by default and should be regular by 'ref'
// @dev: Approve - is always [0] in transactions
const blockTemplates = {
  ...dex,
  ...aave,
  ...compound,
  ...ens,
  ...holograph,
  ...mercly,
  ...nomis,
  ...lido,
  ...wNativeWrap,
  ...wNativeUnwrap,
  ...bungee,
  ...stargate,
  ...testnet
};

export default blockTemplates;
