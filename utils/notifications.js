import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import Constants from 'expo-constants'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

export async function registerForPushNotificationsAsync () {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }

    if (!Constants.expoConfig.extra.eas.projectId) {
      return
    }

    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data
  } else {
    alert('Must use physical device for Push Notifications')
  }

  return token
}

export const NotificationNavigation = {
  reservation_generated: {
    screen: 'BookingStack',
    params: (notification) => {
      return { screen: 'BookingList', params: { tabIndex: 0 } }
    }
  },
  booking_paid: {
    screen: 'BookingStack',
    params: (notification) => {
      return { screen: 'BookingList', params: { tabIndex: 1 } }
    }
  }
}

export async function navigateToNotification (navigation, notification) {
  if (NotificationNavigation[notification.purpose] && notification.url) {
    navigation.navigate(
      NotificationNavigation[notification.purpose].screen,
      NotificationNavigation[notification.purpose].params(notification)
    )
  }
}

export default Notifications
