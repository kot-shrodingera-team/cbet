interface BookmakerApi {
  data: string;
}

declare global {
  const api: BookmakerApi;
  interface GermesData {
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

    stakeDisabled: undefined,
  };
};

export default {};
