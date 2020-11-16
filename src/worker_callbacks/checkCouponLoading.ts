import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import { log } from '@kot-shrodingera-team/germes-utils';
import { getDoStakeTime } from '../stake_info/doStakeTime';

const check = () => {
  const loaderElement = window.frames[1].document.querySelector(
    '.betslip .loader'
  );
  const successMessageElement = window.frames[1].document.querySelector(
    '.betslip .success-msg'
  );
  const warningElement = window.frames[1].document.querySelector(
    '.betslip-footer .warning span:not(.icon)'
  );
  if (loaderElement) {
    log('Обработки ставки (индикатор)', 'tan');
    return true;
  }
  if (successMessageElement) {
    log('Обработки ставки завершена (успешная ставка)', 'orange');
    return false;
  }
  if (warningElement) {
    log('Обработки ставки завершена (ошибка ставки)', 'orange');
    return false;
  }
  log('Обработки ставки (нет индикатора)', 'tan');
  return true;
};

const checkCouponLoading = checkCouponLoadingGenerator({
  getDoStakeTime,
  bookmakerName: 'Cbet',
  timeout: 50000,
  check,
});

export default checkCouponLoading;
