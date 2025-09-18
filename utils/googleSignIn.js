import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID, WEB_GOOGLE_CLIENT_ID } from './urls'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/calendar'],
  // scopes: ['https://www.googleapis.com/auth/drive.readonly']
  webClientId: WEB_GOOGLE_CLIENT_ID,
  androidClientId: ANDROID_GOOGLE_CLIENT_ID,
  // accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: IOS_GOOGLE_CLIENT_ID,
  offlineAccess: true
  // forceCodeForRefreshToken: true
})

export default GoogleSignin
export { statusCodes, GoogleSigninButton }
