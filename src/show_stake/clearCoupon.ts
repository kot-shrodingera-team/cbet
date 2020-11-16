import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';
// import getMaximumStake from '../stake_info/getMaximumStake';

// const apiClear = (): void => {};

const clearCoupon = clearCouponGenerator({
  getStakeCount,
  // apiClear,
  clearSingleSelector: '',
  clearAllSelector: '.clear-all',
  clearMode: 'all-only',
  // maxUnload: {
  //   getMaximumStake,
  // },
  context: () => window.frames[1].document,
});

export default clearCoupon;
