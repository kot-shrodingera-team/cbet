import {
  awaiter,
  getElement,
  log,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';

// let hiddenLink: HTMLAnchorElement;

// const openHiddenLink = (url: string) => {
//   if (!hiddenLink) {
//     hiddenLink = document.createElement('a');
//     const body = document.querySelector('body');
//     body.insertBefore(hiddenLink, body.childNodes[0]);
//   }
//   hiddenLink.href = url;
//   hiddenLink.click();
// };

const openEvent = async (): Promise<void> => {
  const eventUrl = worker.EventUrl;
  if (window.location.href === eventUrl) {
    log('Открыта страница нужного события', 'steelblue');
    return;
  }
  log('Открыта не страница нужного события', 'steelblue');

  const filterButton = window.frames[1].document.querySelector(
    '.eye'
  ) as HTMLElement;
  if (!filterButton) {
    throw new JsFailError('Не найдена кнопка фильтров событий');
  }
  const filterTitleElement = filterButton.querySelector('img[title]');
  if (!filterTitleElement) {
    throw new JsFailError('Не удалось определить состояние фильтра');
  }
  const filterTitle = filterTitleElement.getAttribute('title');
  if (filterTitle === 'Collapse all') {
    log('Сворачиваем все события', 'orange');
    filterButton.click();
    const expandAllFilterTitleElement = await getElement(
      '[title="Expand all"]',
      5000,
      filterButton
    );
    if (!expandAllFilterTitleElement) {
      throw new JsFailError('Состояние фильтра не изменилось на Expand all');
    }
  }
  log('Разворачиваем все события', 'orange');
  filterButton.click();
  const collapseAllFilterTitleElement = await getElement(
    '[title="Collapse all"]',
    5000,
    filterButton
  );
  if (!collapseAllFilterTitleElement) {
    throw new JsFailError('Состояние фильтра не изменилось на Collapse all');
  }

  const mid = worker.EventId;
  const eventLink = (await getElement(
    `[mid="${mid}"]`,
    5000,
    window.frames[1].document
  )) as HTMLElement;
  if (!eventLink) {
    throw new JsFailError('Событие не найдено');
  }
  const teamOneElement = eventLink.querySelector(
    '.match-name > p:nth-child(1)'
  );
  const teamTwoElement = eventLink.querySelector(
    '.match-name > p:nth-child(2)'
  );
  if (!teamOneElement) {
    throw new JsFailError(
      'Не найдено название первой команды/игрока в названии события'
    );
  }
  if (!teamTwoElement) {
    throw new JsFailError(
      'Не найдено название второй команды/игрока в названии события'
    );
  }
  const teamOne = teamOneElement.getAttribute('title');
  const teamTwo = teamTwoElement.getAttribute('title');
  log(`Найдено событие: "${teamOne} - ${teamTwo}"`, 'steelblue');

  log('Переходим на нужное событие', 'orange');

  eventLink.click();

  const eventOpened = await awaiter(() => {
    const currentTeamOneElement = window.frames[1].document.querySelector(
      '#live-header .team1'
    );
    const currentTeamTwoElement = window.frames[1].document.querySelector(
      '#live-header .team2'
    );
    if (currentTeamOneElement && currentTeamTwoElement) {
      const currentTeamOne = currentTeamOneElement.textContent.trim();
      const currentTeamTwo = currentTeamTwoElement.textContent.trim();
      return currentTeamOne === teamOne && currentTeamTwo === teamTwo;
    }
    return false;
  });
  if (!eventOpened) {
    throw new JsFailError('Нужное событие так ине открылось');
  }
  log('Открыто нужное событие', 'steelblue');
  // await sleep(1000);
  // openHiddenLink(eventUrl);
  // throw new NewUrlError('Открываем страницу события');
};

export default openEvent;
