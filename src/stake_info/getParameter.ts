import { log } from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  const betNameElement = window.frames[1].document.querySelector(
    '.betslip .odd span:nth-child(2)'
  );
  const marketNameElement = window.frames[1].document.querySelector(
    '.betslip .market-name'
  );
  if (!betNameElement) {
    log('Не найдена роспись ставки', 'crimson');
    return -9999;
  }
  if (!marketNameElement) {
    log('Не найден маркет ставки', 'crimson');
    return -9999;
  }
  const betName = betNameElement.textContent.trim();
  const market = marketNameElement.textContent.trim();
  const parameterRegex = /\(([+-]?\d+(?:\.\d+)?)\)/;
  const parameterMatch = betName.match(parameterRegex);
  if (parameterMatch) {
    return Number(parameterMatch[1]);
  }
  if (market === 'Draw no bet') {
    return 0;
  }
  // Ставка Exact total goals 3+ === Over (2.5)
  if (betName === '3+') {
    return 2.5;
  }
  return -6666;
};

export default getParameter;
