export const aave = {
  AAVE: {
    status: 'open',
    name: 'AAVE',
    path: 'scripts/functions/aave/',
    cmd: 'aaveSupply.js',
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
        name: 'Supply {{percent}} {{token}}',
        spender: {
          address: ['0x0FD7e72deA3785d040F4BaE96A01c0fEd72FCaf4']
        },
        srcChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
        ],
        refSrcChain: [],
        token: [
          {
            label: 'usdt',
            value: false
          },
          {
            label: 'usdc',
            value: false
          }
        ],
        refToken: [],
        percent: [0],
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      },
      {
        id: 2,
        name: 'Borrow {{percent}} {{token}}',
        spender: {
          address: ['0x0FD7e72deA3785d040F4BaE96A01c0fEd72FCaf4']
        },
        srcChain: [
          { label: 'eth', value: true },
          { label: 'polygon', value: false }
        ],
        refSrcChain: [],
        token: [
          {
            label: 'usdt',
            value: false
          },
          {
            label: 'usdc',
            value: false
          }
        ],
        refToken: [],
        percent: [0],
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  }
};
