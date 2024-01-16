export const dex = {
  DEX: {
    status: 'open',
    name: 'DEX',
    path: 'scripts/functions/',
    cmd: '',
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
        name: 'Swapping {{percent}} {{token}} via {{func}}',
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
            label: 'eth',
            value: false
          },
          {
            label: 'usdt',
            value: false
          }
        ],
        refToken: [],
        dstToken: [
          {
            label: 'usdt',
            value: false
          },
          {
            label: 'usdc',
            value: false
          }
        ],
        refDstToken: [],
        func: [
          {
            label: 'uniswap',
            value: false
          },
          {
            label: 'inch',
            value: false
          },
          {
            label: 'sushi',
            value: false
          },
          {
            label: 'pancake',
            value: false
          }
        ],
        percent: [0, 0],
        minValue: '',
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  } // UNISWAP, SUSHI, 1INCH, PANCAKE
};
