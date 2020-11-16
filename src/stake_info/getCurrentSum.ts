import getCurrentSumGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCurrentSum';

const getCurrentSum = getCurrentSumGenerator({
  sumInput: 'input.bet-amount',
  // zeroValues: [],
  // currentSumRegex: null,
  context: () => window.frames[1].document,
});

export default getCurrentSum;
