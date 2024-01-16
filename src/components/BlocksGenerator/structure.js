export const BLOCK_TABLE = {
  id: 'string',
  name: 'string',
  status: 0,
  transactions: [
    {
      status: 0,
      name: 'string',

      srcChain: [
        {
          label: 'string',
          value: true
        }
      ],
      refSrcChain: ['string'],

      token: [
        {
          label: 'string',
          value: true
        }
      ],
      refToken: ['string'],

      dstChain: [
        {
          label: 'string',
          value: true
        }
      ],
      refDstChain: 'string',

      dstToken: [
        {
          label: 'string',
          value: true
        }
      ],
      refDstToken: 'string',

      spender: {
        ref: {
          txId: 0,
          cellKey: 'string'
        },
        address: ['string']
      },
      percent: [0],
      minValue: 'string',
      wait_time: 'string',
      wait_sec: 'string',
      wait_ran: 'string',
      gas: 0
    }
  ]
};
