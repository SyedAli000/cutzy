import ActionCable from 'react-native-actioncable'

const cable = ActionCable.createConsumer(process.env.EXPO_PUBLIC_SOCKET_HOST)

export const connectCable = (options, events) => {
  if (cable.connection.isOpen() && cable.connection.isActive()) {
    return
  }

  return cable.subscriptions.create(options, events)
}

export const disconnectCable = (channelId) => {
  cable.disconnect()
  // cable.channel(channelId).unsubscribe()
  // delete (cable.channels[channelId])
}

export default cable
