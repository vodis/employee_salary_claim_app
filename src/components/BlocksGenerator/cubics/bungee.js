export const bungee = {
  BUNGEE: {
    status: 'open',
    name: 'BUNGEE',
    path: 'scripts/functions/',
    cmd: 'bungeeRefuel.js',
    transactions: [
      {
        id: 1,
        name: 'Refueling {{percent}}% Native {{srcChain}} -> Native {{dstChain}} via Bungee Refuel',
        spender: {
          address: ['0x0FD7e72deA3785d040F4BaE96A01c0fEd72FCaf4']
        },
        srcChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
        ],
        refSrcChain: [],
        dstChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
        ],
        refDstToken: [],
        percent: [0, 0],
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  }
};
