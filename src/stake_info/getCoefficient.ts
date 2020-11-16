import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';

const getCoefficient = getCoefficientGenerator({
  coefficientSelector: '.betslip-body li.price .betslip-coef',
  context: () => window.frames[1].document,
});

export default getCoefficient;
