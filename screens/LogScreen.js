import { View, first,Text,ScrollView,Button,Image} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Gradient from '../utils/Gradients';
import { firebaseUrl } from '../constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { weatherIcon } from '../constants';
const LogScreen = () =>{
    const [data,setData] = useState([])
    const[IsLoading,setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDataFromFirebase = async () => {
          try {
            const res = await axios.get(firebaseUrl);
            const fetchedData = [];
    
            for (const key in res.data) {
              const ObjData = {
                id: key,
                name: res.data[key].name,
                temp: res.data[key].temp,
                humidity: res.data[key].humidity,
                pm2_5: res.data[key].pm2_5,
                weather: res.data[key].weather,
                icon: res.data[key].icon,
                date: res.data[key].date,
              };
              fetchedData.push(ObjData);
            }
    
            setData(fetchedData);
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
          }
        };
    
        fetchDataFromFirebase();
      }, []);
    
    return(
        
        <View className="flex flex-1 justify-center items-center">
            <Gradient fromColor='#006699' toColor='#7857D1'/>
            <StatusBar style='auto' />
            {
                IsLoading? (
                    <LoadingScreen/>
                ):(
            <ScrollView
            vertical
            contentContainerStyle={{paddingHorizontal:50}}
            showsHorizontalScrollIndicator={false}
            >
                    {
                        data?.map((item,index) => {
                            console.log(item.name)
                            return (
                            <View 
                                  className="flex justify-center items-center w-80 rounded-3xl py-3 space-y-1 mx-auto mb-4"
                                  style={{backgroundColor:'rgba(255,255,255,0.2)'}}
                                  key={index}
                                  onstartshouldsetresponder={() => true}
                                >
                                
                                <Image source={weatherIcon[item?.icon]} className="h-28 w-28"/>
                                <Text className="text-white text-xl font-semibold">{item.name} </Text>
                                <Text className="text-white text-xl font-semibold">{item.date} </Text>
                                <Text className="text-white text-xl font-semibold">{item.weather} </Text>
                                <Text className="text-white text-xl "> temp: {Math.ceil(item.temp)}&#176;</Text>
                                <Text className="text-white text-xl "> humidity: {Math.ceil(item.humidity)}%</Text>
                                <Text className="text-white text-xl "> pm2.5: {item.pm2_5}</Text>
                              </View>
                              )
                        }).reverse()
                    }
            </ScrollView>
                )
            }
            
        </View>
    )
}

export default LogScreen;