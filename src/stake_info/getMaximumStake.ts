// import getMaximumStakeGenerator, {
//   maximumStakeReadyGenerator,
// } from '@kot-shrodingera-team/germes-generators/stake_info/getMaximumStake';

import { getWorkerParameter } from '@kot-shrodingera-team/germes-utils';
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
  if (getWorkerParameter('DecreasingMaximumStake', 'number')) {
    if (window.germesData.decreasingMaximumStake === undefined) {
      window.germesData.decreasingMaximumStake = getWorkerParameter(
        'DecreasingMaximumStake',
        'number'
      );
    }
    return window.germesData.decreasingMaximumStake;
  }
  return getBalance();
};

export default getMaximumStake;
