import { awaiter, getElement, log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from '../stake_info/getStakeCount';
import JsFailError from './errors/jsFailError';
import getCbetOddName from './getCbetOddName';

const openBet = async (): Promise<void> => {
  const [
    marketName,
    marketTypeId,
    runnerPid,
    runnerFpid,
    runnerId,
    parameter,
  ] = worker.BetId.split('|');

  // getMarketTitles();

  log('Ищем маркет', 'steelblue');
  const marketElement = (await getElement(
    `.markets .market[mkey^="${marketTypeId}"]`,
    10000,
    window.frames[1].document
  )) as HTMLElement;
  if (!marketElement) {
    throw new JsFailError('Нужный маркет не найден');
  }
  const marketElements = window.frames[1].document.querySelectorAll(
    `.markets .market[mkey^="${marketTypeId}"]`
  );
  if (marketElements.length !== 1) {
    throw new JsFailError('Найдено более одного подходящего маркета');
  }
  const marketTitleElement = marketElement.querySelector('.title');
  if (!marketTitleElement) {
    throw new JsFailError('Заголовок маркета не найден');
  }
  const marketTitle = marketTitleElement.getAttribute('title');
  log(`Маркет найден. Заголовок: "${marketTitle}"`, 'steelblue');

  const oddElements = marketElement.querySelectorAll('.market-odds > div');
  if (oddElements.length === 0) {
    throw new JsFailError('Не найдены ставки в маркете');
  }
  log(`Найдено ставок в маркете: ${oddElements.length}`, 'steelblue');
  oddElements.forEach((odd) => {
    const title = odd.getAttribute('title');
    log(title);
  });

  const cbetOddName = getCbetOddName(marketName);
  if (!cbetOddName) {
    throw new JsFailError('Не удалось сформировать роспись ставки для поиска');
  }
  const odd = marketElement.querySelector(
    `.market-odds > div[title="${cbetOddName}"]`
  ) as HTMLElement;
  if (!odd) {
    throw new JsFailError(`Нужная ставка не найдена (${cbetOddName})`);
  }

  const maxTryCount = 5;
  for (let i = 1; i <= maxTryCount; i += 1) {
    odd.click();
    // eslint-disable-next-line no-await-in-loop
    const betAdded = await awaiter(() => getStakeCount() === 1, 1000, 50);

    if (!betAdded) {
      if (i === maxTryCount) {
        throw new JsFailError('Ставка так и не попала в купон');
      }
      log(`Ставка не попала в купон (попытка ${i})`, 'steelblue');
    } else {
      log('Ставка попала в купон', 'steelblue');
      break;
    }
  }
};

export default openBet;
