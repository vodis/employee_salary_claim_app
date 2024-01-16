export const compound = {
  COMPOUND: {
    status: 'open',
    name: 'COMPOUND',
    path: 'scripts/functions/compound/',
    cmd: 'compoundAllow.js',
    transactions: [
      {
        id: 1,
        name: 'Compound allow deposit {{token}} on {{srcChain}}',
        srcChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
        ],
        token: [
          {
            label: 'eth',
            value: false
          }
        ],
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
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      },
      {
        id: 2,
        name: 'Compound deposit {{token}} on {{srcChain}}',
        srcChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
        ],
        token: [
          {
            label: 'eth',
            value: false
          }
        ],
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
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  }
};
