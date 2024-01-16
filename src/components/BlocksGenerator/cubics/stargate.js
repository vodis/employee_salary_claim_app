export const stargate = {
  STARGATE: {
    status: 'open',
    name: 'STARGATE',
    path: 'scripts/functions/',
    cmd: 'stargateBridge.js',
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
        name: 'Bridging {{percent}}% {{token}} {{srcChain}} -> {{dstToken}} {{dstChain}} via Stargate',
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
          },
          {
            label: 'usdc',
            value: false
          }
        ],
        refToken: [],
        dstChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
        ],
        refDstChain: [],
        dstToken: [
          {
            label: 'eth',
            value: false
          },
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
        percent: [0, 0],
        minValue: '',
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  }
};
