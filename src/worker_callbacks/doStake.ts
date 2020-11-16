import doStakeGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/doStake';
import { log } from '@kot-shrodingera-team/germes-utils';
import getCoefficient from '../stake_info/getCoefficient';
import { clearDoStakeTime } from '../stake_info/doStakeTime';

const preCheck = (): boolean => {
  const acceptChangesButton = window.frames[1].document.querySelector(
    '.betslip-footer form.actions .btn.accept-changes'
  ) as HTMLElement;
  if (acceptChangesButton) {
    log('Есть изменения принимаем. Ставку не делаем', 'orange');
    acceptChangesButton.click();
    return false;
  }
  return true;
};

// const postCheck = (): boolean => {
//   return true;
// };

const doStake = doStakeGenerator({
  preCheck,
  doStakeButtonSelector: '.betslip-footer form.actions .btn.bet',
  getCoefficient,
  disabledCheck: true,
  // errorClasses: [
  //   {
  //     className: '',
  //     message: '',
  //   },
  // ],
  // postCheck,
  clearDoStakeTime,
  context: () => window.frames[1].document,
});

export default doStake;
