import { checkBookerHost, log } from '@kot-shrodingera-team/germes-utils';
// import setBetAcceptMode from './setBetAcceptMode';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';
import openBet from './openBet';
import openEvent from './openEvent';
import preCheck from './preCheck';
import { clearGermesData } from '../bookmakerApi';

let couponOpenning = false;

export const isCouponOpenning = (): boolean => couponOpenning;

const showStake = async (): Promise<void> => {
  clearGermesData();
  localStorage.setItem('couponOpening', '1');
  couponOpenning = true;
  try {
    if (!checkBookerHost()) {
      log('Открыта не страница конторы (или зеркала)', 'crimson');
      window.location.href = new URL(worker.BookmakerMainUrl).href;
      throw new NewUrlError('Открывает страницу БК');
    }

    await authStateReady();
    worker.Islogin = checkAuth();
    worker.JSLogined();
    if (!worker.Islogin) {
      throw new JsFailError('Нет авторизации');
    }
    log('Есть авторизация', 'steelblue');

    log(
      `Ищем ставку\nСобытие: ${worker.TeamOne} - ${worker.TeamTwo}\nИсход: ${worker.BetName}`,
      'steelblue'
    );

    await preCheck();

    await openEvent();

    await openBet();

    log('Ставка успешно открыта', 'green');
    // setBetAcceptMode();
    couponOpenning = false;
    localStorage.setItem('couponOpening', '0');
    worker.JSStop();
  } catch (error) {
    if (error instanceof JsFailError) {
      log(error.message, 'red');
      couponOpenning = false;
      localStorage.setItem('couponOpening', '0');
      worker.JSFail();
    }
    if (error instanceof NewUrlError) {
      log(error.message, 'orange');
    }
  }
};

export default showStake;
