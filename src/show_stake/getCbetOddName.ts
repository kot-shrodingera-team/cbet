import WorkerBetObject from '@kot-shrodingera-team/worker-declaration/workerBetObject';

const getCbetOddName = (marketName: string): string => {
  const { market, odd, param, period, subperiod, overtimeType } = JSON.parse(
    worker.ForkObj
  ) as WorkerBetObject;
  const parameter = Number(param);
  if (/^ML1$/i.test(odd)) {
    return '1';
  }
  if (/^ML2$/i.test(odd)) {
    return '2';
  }
  if (/^1$/i.test(odd)) {
    return '1';
  }
  if (/^X$/i.test(odd)) {
    return 'X';
  }
  if (/^2$/i.test(odd)) {
    return '2';
  }
  if (/^1X$/i.test(odd)) {
    return '1X';
  }
  if (/^12$/i.test(odd)) {
    return '12';
  }
  if (/^X2$/i.test(odd)) {
    return 'X2';
  }
  if (/^Y$/i.test(odd)) {
    return 'Yes';
  }
  if (/^N$/i.test(odd)) {
    return 'No';
  }
  if (/^F1$/i.test(odd)) {
    if (parameter === 0) {
      return '1';
    }
    return `1 (${parameter})`;
  }
  if (/^F2$/i.test(odd)) {
    if (parameter === 0) {
      return '2';
    }
    return `2 (${parameter})`;
  }
  if (/^TO$/i.test(odd)) {
    if (/exact goals 3+/i.test(marketName)) {
      if (parameter === 2.5) {
        return '3+';
      }
      return '';
    }
    return `Over (${parameter})`;
  }
  if (/^TU$/i.test(odd)) {
    return `Under (${parameter})`;
  }
  return '';
};

export default getCbetOddName;
