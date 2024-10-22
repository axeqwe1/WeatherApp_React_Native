import { View,Text } from 'react-native'
const Status = ({pm2_5,humidity,time}) => {
    return(
        <View className="flex-row justify-between mx-4">
                <View className="flex-row space-x-1 items-center">
                  <Text className="text-white font-semibold text-base">PM2.5:</Text>
                  <Text className="text-white font-semibold text-base">
                    {pm2_5}
                  </Text>
                </View>
                <View className="flex-row space-x-1 items-center">
                <Text className="text-white font-semibold text-base">Humdity:</Text>
                  <Text className="text-white font-semibold text-base">
                    { humidity}%
                  </Text>
                </View>
                <View className="flex-row space-x-1 items-center">
                <Text className="text-white font-semibold text-base">Time:</Text>
                  <Text className="text-white font-semibold text-base">{time}</Text>
                </View>
              </View>
    )
}
export default Status;