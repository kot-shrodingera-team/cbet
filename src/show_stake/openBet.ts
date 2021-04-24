import { awaiter, getElement, log } from '@kot-shrodingera-team/germes-utils';
import { updateBalance } from '../stake_info/getBalance';
import getStakeCount from '../stake_info/getStakeCount';
import clearCoupon from './clearCoupon';
import JsFailError from './errors/jsFailError';
import getCbetOddName from './getCbetOddName';

const openBet = async (): Promise<void> => {
  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    throw new JsFailError('Не удалось очистить купон');
  }
  updateBalance();

  const [
    marketName,
    // marketTypeId,
    // runnerPid,
    // runnerFpid,
    // runnerId,
    // parameter,
  ] = worker.BetId.split('|');

  // getMarketTitles();

  const correctMarketName = marketName.split(' – ').slice(0, -1).join(' - ');
  log(`Ищем маркет "${correctMarketName}"`, 'steelblue');
  log(`.markets .market [title="${correctMarketName}"]`, 'white', true);
  const marketElement = (
    await getElement(
      `.markets .market [title="${correctMarketName}"]`,
      10000,
      window.frames[1].document
    )
  ).parentElement as HTMLElement;
  if (!marketElement) {
    throw new JsFailError('Нужный маркет не найден');
  }
  const marketElements = window.frames[1].document.querySelectorAll(
    `.markets .market [title="${correctMarketName}"]`
  );
  if (marketElements.length !== 1) {
    throw new JsFailError('Найдено более одного подходящего маркета');
  }
  // const marketTitleElement = marketElement.querySelector('.title');
  // if (!marketTitleElement) {
  //   throw new JsFailError('Заголовок маркета не найден');
  // }
  // const marketTitle = marketTitleElement.getAttribute('title');
  // log(`Маркет найден. Заголовок: "${marketTitle}"`, 'steelblue');

  const oddElements = marketElement.querySelectorAll('.market-odds > div');
  if (oddElements.length === 0) {
    throw new JsFailError('Не найдены ставки в маркете');
  }
  log(`Найдено ставок в маркете: ${oddElements.length}`, 'steelblue');
  oddElements.forEach((odd) => {
    const title = odd.getAttribute('title');
    log(title, 'white', true);
  });

  const cbetOddName = getCbetOddName(marketName);
  if (!cbetOddName) {
    throw new JsFailError('Не удалось сформировать роспись ставки для поиска');
  }
  log(`Ищем ставку "${cbetOddName}"`, 'steelblue');
  const odd = marketElement.querySelector(
    `.market-odds > div[title="${cbetOddName}"]`
  ) as HTMLElement;
  if (!odd) {
    throw new JsFailError('Ставка не найдена');
  }
  log('Нашли ставку', 'steelblue');

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
