import {
  getWorkerParameter,
  log,
  round,
} from '@kot-shrodingera-team/germes-utils';

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
      log('Превышена максимальная ставка', 'crimson');
      if (window.germesData.decreasingMaximumStake !== undefined) {
        const customDecreasingMaximumStakeStep = getWorkerParameter(
          'DecreasingMaximumStakeStep',
          'number'
        ) as number;
        if (!customDecreasingMaximumStakeStep) {
          log(
            'Не установлен шаг снижения максимальной ставки. Считаем по-умолчанию 1',
            'crimson'
          );
        }
        const decreasingMaximumStakeStep =
          customDecreasingMaximumStakeStep || 1;
        const newDecreasingMaximumStake = round(
          window.germesData.decreasingMaximumStake - decreasingMaximumStakeStep
        );
        log(
          `Уменьшаем максимальную ставку на ${decreasingMaximumStakeStep} (${window.germesData.decreasingMaximumStake} => ${newDecreasingMaximumStake})`,
          'crimson'
        );
        window.germesData.decreasingMaximumStake = newDecreasingMaximumStake;
      } else {
        log(
          'Считаем ставку недоступной. Чтобы настроить постепенное снижение максимальной ставки в боте, обратитесь в ТП',
          'crimson'
        );
        window.germesData.stakeDisabled = true;
      }
    }
    log('Ставка не принята', 'red');
    return false;
  }
  log('Не найден результат ставки. Считаем ставку не принятой', 'red');
  return false;
};

export default checkStakeStatus;
