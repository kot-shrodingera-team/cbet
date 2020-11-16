import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector:
    '.authorize[style="display: block"] input[name="userName"]',
  authElementSelector: '.user-info[style="display: block;"] .account-info',
  // maxDelayAfterNoAuthElementAppeared: 0,
  logging: true,
});

const checkAuth = checkAuthGenerator({
  authElementSelector: '.user-info[style="display: block;"] .account-info',
});

export default checkAuth;
