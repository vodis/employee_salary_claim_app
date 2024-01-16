export const mercly = {
  MERCLY: {
    status: 'open',
    name: 'MERCLY',
    path: 'scripts/functions/merkly/',
    cmd: 'bridgeMerkly.js',
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
        name: 'Mint Merkly on {{srcChain}}',
        spender: {
          address: ['0x0FD7e72deA3785d040F4BaE96A01c0fEd72FCaf4']
        },
        srcChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false },
          { label: 'bnb', value: false },
          { label: 'arb', value: false },
          { label: 'avalanche', value: false },
          { label: 'fantom', value: false },
          { label: 'base', value: false },
          { label: 'opt', value: false }
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
        contractAddress: '',
        minValue: '',
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      },
      {
        id: 2,
        name: 'Bridge merkly nft from {{srcChain}} to {{dstChain}}',
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
        percent: [0, 0],
        contractAddress: '',
        minValue: '',
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  }
};
