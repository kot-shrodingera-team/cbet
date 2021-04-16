import { log } from '@kot-shrodingera-team/germes-utils';

const checkStakeStatus = (): boolean => {
  const successMessageElement = window.frames[1].document.querySelector(
    '.betslip .success-msg'
  );
  const warningElement = window.frames[1].document.querySelector(
    '.betslip-footer .warning span:not(.icon)'
  );
  if (successMessageElement) {
    log('Ставка принята', 'green');
    return true;
  }
  if (warningElement) {
    const warningText = warningElement.textContent.trim();
    log(`Текст ошибки: "${warningText}"`, 'tomato');
    if (/Amount Is More Than Max Betting Amount/i.test(warningText)) {
      window.germesData.stakeDisabled = true;
    }
    log('Ставка не принята', 'red');
    return false;
  }
  log('Не найден результат ставки. Считаем ставку не принятой', 'red');
  return false;
};

export default checkStakeStatus;
