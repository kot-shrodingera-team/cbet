interface BookmakerApi {
  data: string;
}

declare global {
  const api: BookmakerApi;
  interface GermesData {
    decreasingMaximumStake: number;
    stakeDisabled: boolean;
  }
}

export const clearGermesData = (): void => {
  window.germesData = {
    bookmakerName: 'Cbet',
    betProcessingStep: undefined,
    betProcessingAdditionalInfo: undefined,
    doStakeTime: undefined,
    betProcessingTimeout: 50000,

    decreasingMaximumStake: undefined,
    stakeDisabled: undefined,
  };
};

export default {};
