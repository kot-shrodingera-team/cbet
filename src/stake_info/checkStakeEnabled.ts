import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import { log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from './getStakeCount';

const preCheck = (): boolean => {
  if (window.germesData.stakeDisabled) {
    log('Ставка недоступна (превышен макс)', 'crimson');
    return false;
  }
  return true;
};

const checkStakeEnabled = checkStakeEnabledGenerator({
  preCheck,
  getStakeCount,
  betCheck: {
    selector: '.betslip-body li.price',
    errorClasses: [
      {
        className: 'item-with-error',
        message: 'ошибка в купоне',
      },
    ],
  },
  errorsCheck: [
    {
      selector: '.betslip-body li.price .betslip-coef .material-icons',
      message: 'ставка заблокирована',
    },
  ],
  context: () => window.frames[1].document,
});

export default checkStakeEnabled;
