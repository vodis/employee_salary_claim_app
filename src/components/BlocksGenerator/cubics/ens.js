export const ens = {
  ENS: {
    status: 'open',
    name: 'ENS',
    path: 'scripts/functions/ens/',
    cmd: 'ensCommit.js',
    transactions: [
      {
        id: 1,
        name: 'Commit ENS Domain on {{srcChain}}',
        srcChain: [{ label: 'eth', value: false }],
        gas: 43302
      },
      {
        id: 2,
        name: 'Registering ENS Domain on {{srcChain}}',
        srcChain: [{ label: 'eth', value: false }],
        wait_sec: '',
        wait_ran: '',
        gas: 43302
      }
    ]
  }
};
