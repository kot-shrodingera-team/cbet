import {
  balanceReadyGenerator,
  getBalanceGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getBalance';

export const balanceReady = balanceReadyGenerator({
  balanceSelector: '.user-info:not([style="display: none;"]) .balance .amount',
  // balanceRegex: null,
});

const getBalance = getBalanceGenerator({
  balanceSelector: '.user-info:not([style="display: none;"]) .balance .amount',
  // balanceRegex: null,
});

export const updateBalance = (): void => {
  worker.JSBalanceChange(getBalance());
};

export default getBalance;
