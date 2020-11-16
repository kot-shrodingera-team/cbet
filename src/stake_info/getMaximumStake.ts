// import getMaximumStakeGenerator, {
//   maximumStakeReadyGenerator,
// } from '@kot-shrodingera-team/germes-generators/stake_info/getMaximumStake';

import getBalance from './getBalance';

// export const maximumStakeReady = maximumStakeReadyGenerator({
//   maximumStakeElementSelector: '',
//   maximumStakeRegex: null,
// });

// const getMaximumStake = getMaximumStakeGenerator({
//   maximumStakeElementSelector: '',
//   maximumStakeRegex: null,
// });

const getMaximumStake = (): number => {
  return getBalance();
};

export default getMaximumStake;
