export const deepLinkingConf = {
  prefixes: ['https://manager.thegameon.co', 'com.itbarrel.gameon.manager://'],
  config: {
    screens: {
      Login: 'Login',
      VerifyAccount: 'VerifyAccount',
      ResetPassword: 'ResetPassword/:token'
    }
  }
}
