export const lido = {
  LIDO: {
    status: 'open',
    name: 'LIDO',
    path: 'scripts/functions/',
    cmd: 'lido.js',
    transactions: [
      {
        id: 0,
        status: 'close',
        name: 'Approve tokens',
        spender: {
          ref: {
            txId: 1,
            cellKey: 'srcChain'
          },
          address: [
            '1:0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2',
            '137:0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2'
          ]
        },
        gas: 43302
      },
      {
        id: 1,
        name: 'Stake {{token}} on {{srcChain}}',
        srcChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
        ],
        refSrcChain: [],
        token: [
          {
            label: 'eth',
            value: false
          }
        ],
        refToken: [],
        spender: {
          ref: {
            txId: 0,
            cellKey: 'srcChain'
          },
          address: [
            '1:0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2',
            '137:0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2'
          ]
        },
        percent: [0, 0],
        minValue: '',
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  }
};
