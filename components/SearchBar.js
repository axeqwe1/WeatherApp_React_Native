import { View,TouchableOpacity,TextInput,Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
const SearchBar = ({handdleSearch,handdleSubmit}) => {
    const navigation = useNavigation()
    const navigateToLog = () => {
        navigation.navigate('Log')
    }
    return(
    <View  className="mx-auto relative z-50 flex-row">
        <View className="flex-row justify-end items-center rounded-full mt-12 w-64" 
          style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
            <TextInput 
              onChangeText={handdleSearch}
              placeholder='Search city' 
              placeholderTextColor={'lightgray'}
              className="pl-4 h-10 flex-1 text-base text-white "
              onSubmitEditing={handdleSubmit}
              showSoftInputOnFocus={true}
            />
          <TouchableOpacity
            onPress={handdleSubmit}
            style={{backgroundColor:'rgba(255,255,255,0.2)'}}
            className="rounded-full p-3 m-1"
          >
            <MagnifyingGlassIcon size="20" color="white"/>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-end items-center mt-12 ml-4" 
          style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
          <TouchableOpacity
            onPress={navigateToLog}
            style={{backgroundColor:'rgba(255,255,255,0.2)'}}
            className="p-3 m-1"
          >
            <Text className="text-center font-bold text-white text-sm">LOG</Text>
          </TouchableOpacity>
        </View>
    </View>
    )
}
export default SearchBar