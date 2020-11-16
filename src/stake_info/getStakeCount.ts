import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

const getStakeCount = getStakeCountGenerator({
  stakeElementSelector: '.betslip-body li.price',
  context: () => window.frames[1].document,
});

export default getStakeCount;
