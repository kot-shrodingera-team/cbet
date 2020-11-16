import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

// const setLoginType = async (): Promise<boolean> => {
//   return true;
// };

const authorize = authorizeGenerator({
  // openForm: {
  //   selector: '',
  //   openedSelector: '',
  //   afterOpenDelay: 1000,
  // },
  // setLoginType,
  loginInputSelector:
    '.authorize:not([style="display: none;"]) input[name="userName"]',
  passwordInputSelector:
    '.authorize:not([style="display: none;"]) input[name="password"]',
  submitButtonSelector:
    '.authorize:not([style="display: none;"]) button[type="submit"]',
  inputType: 'fireEvent',
  // beforeSubmitDelay: 0,
  // captchaSelector: '',
  // loginedWait: {
  //   loginedSelector: '',
  //   balanceReady,
  //   updateBalance,
  // },
  // afterSuccesfulLogin,
});

export default authorize;
