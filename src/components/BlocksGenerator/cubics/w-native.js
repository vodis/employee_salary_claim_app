export const wNativeWrap = {
  W_NATIVE_WRAP: {
    status: 'open',
    name: 'W-NATIVE-WRAP',
    transactions: [
      {
        id: 0,
        status: 'close',
        name: 'Approve tokens',
        srcChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
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
        percent: [0],
        gas: 43302
      },
      {
        id: 1,
        name: 'Wrap native on {{srcChain}}',
        spender: {
          address: ['0x0FD7e72deA3785d040F4BaE96A01c0fEd72FCaf4']
        },
        srcChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
        ],
        refSrcChain: [],
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  }
};

export const wNativeUnwrap = {
  W_NATIVE_UNWRAP: {
    status: 'open',
    name: 'W-NATIVE-UNWRAP',
    transactions: [
      {
        id: 0,
        status: 'close',
        name: 'Approve tokens',
        srcChain: [
          { label: 'eth', value: false },
          { label: 'polygon', value: false }
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
        percent: [0],
        gas: 43302
      },
      {
        id: 1,
        name: 'Unwrap native on {{srcChain}}',
        spender: {
          address: ['0x0FD7e72deA3785d040F4BaE96A01c0fEd72FCaf4']
        },
        srcChain: [
          { label: 'eth', value: true },
          { label: 'polygon', value: false }
        ],
        refSrcChain: [],
        percent: [0, 0],
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  }
};
