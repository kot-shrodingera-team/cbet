import { log, getElement } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';

const preCheck = async (): Promise<void> => {
  if (window.location.pathname.includes(worker.EventId)) {
    log('Уже открыта страница нужного события', 'steelblue');
    return;
  }
  if (!window.location.pathname.startsWith('/en/sportsbook/live')) {
    log('Открыт не Live', 'steelblue');
    const liveLink = (await getElement(
      'a[href="/en/sportsbook/live"]'
    )) as HTMLElement;
    if (!liveLink) {
      throw new JsFailError('Не найдена кнопка перехода на Live');
    }
    log('Переходим на Live', 'orange');
    liveLink.click();
    const liveMatches = await getElement(
      '.live-tree-match',
      10000,
      window.frames[1].document
    );
    if (!liveMatches) {
      throw new JsFailError('Не удалось перейти на Live');
    }
  }
  log('Открыт Live', 'steelblue');
  const sportsbookIFrame = await getElement('iframe[name="sportsbook_iframe"]');
  if (!sportsbookIFrame) {
    throw new JsFailError('Не дождались появления Sportsbook фрейма');
  }
};

export default preCheck;
