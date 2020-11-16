import { log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';

const getMarketTitles = (): void => {
  const marketElements = window.frames[1].document.querySelectorAll(
    '.markets .market'
  );
  marketElements.forEach((marketElement) => {
    const mkey = marketElement.getAttribute('mkey');
    const marketTitleElement = marketElement.querySelector('.title');
    if (!marketTitleElement) {
      throw new JsFailError('Заголовок маркета не найден');
    }
    const marketTitle = marketTitleElement.getAttribute('title');
    log(`title = "${marketTitle}"; mkey = "${mkey}"`);
  });
};

export default getMarketTitles;
