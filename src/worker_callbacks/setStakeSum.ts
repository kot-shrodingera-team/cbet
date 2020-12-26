import setStakeSumGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/setStakeSum';

// const preInputCheck = (): boolean => {
//   return true;
// };

const setStakeSum = setStakeSumGenerator({
  sumInputSelector: 'input.bet-amount',
  alreadySetCheck: {
    falseOnSumChange: false,
  },
  inputType: 'fireEvent',
  // preInputCheck,
  context: () => window.frames[1].document,
});

export default setStakeSum;
