import { StatusBar } from 'expo-status-bar';
import { View,Text,Image,SafeAreaView, ScrollView, Alert,Keyboard,TouchableWithoutFeedback  } from 'react-native';
import React,{ useState,useEffect,useRef } from 'react';
import {MapPinIcon,CalendarDaysIcon} from 'react-native-heroicons/solid'
import Gradient from '../utils/Gradients';
import LoadingScreen from '../components/LoadingScreen'; 
import { fetchAirpoluteForPM, fetchRealtimeWeather,fetchWeatherForecast } from '../api/weather';
import { toUpper } from 'lodash';
import { weatherIcon } from '../constants';
import Status from '../components/status';
import SearchBar from '../components/SearchBar';
import { firebaseUrl } from '../constants';
import axios from 'axios';
export default function HomeScreen() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchText,setSearchText] = useState('')
  const [location,setLocation] = useState("Bangkok");
  const [previousLocation, setPreviousLocation] = useState('');
  const [humidity,setHumidity] = useState('')
  const [temparature,setTemparature] = useState('');
  const [statusWeather,setStatusWeather] = useState({})
  const [airPollute,setAirPollute] = useState({})
  const [time,setTime] = useState(new Date());
  const [forecast,setForecast] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      try {
        // realtime
        const dataRealtime = await fetchRealtimeWeather({name:location});
        // const dataAirpolute = await 
        if (dataRealtime && dataRealtime.main) {
          // for airPollute
          const dataAirpollute = await fetchAirpoluteForPM({lat:dataRealtime.coord.lat,lon:dataRealtime.coord.lon})
          setAirPollute(dataAirpollute.list[0].components)
          // 5 day / 3 hour forecast data
          const dataForecast = await fetchWeatherForecast({name:location});
            if(dataForecast && dataForecast.list){
              setForecast(dataForecast)
          }
          // Check if 'main' property exists in the data object
          setHumidity(dataRealtime.main.humidity);
          setTemparature(dataRealtime.main.temp);
          setLocation(dataRealtime.name);
          setStatusWeather(dataRealtime.weather[0]);
          setPreviousLocation(location);
          setTime(new Date(dataRealtime.dt*1000+(dataRealtime.timezone*1000)))
          // console.log('Humidity:', humidity);
          // console.log('Temp:', temparature);
          // console.log('status',statusWeather.icon)
          // console.log('airPollut',airPollute.pm2_5)
          // console.log(time)
          // console.log(time.getUTCHours()+':'+time.getUTCMinutes());
          setIsLoading(false);
        } else {
          // Handle the case where 'main' property is missing
          Alert.alert('Not Found', 'Not Have this Location');
          setIsLoading(false);
        }
      } catch (error) {
        // Handle errors from the API request
        console.error('An error occurred:', error);
      }
    };
    fetchData();

  
  }, [location]);
  const handdleSubmit = async () =>{
    Keyboard.dismiss();
    setIsLoading(true);
    const realtimeData = await fetchRealtimeWeather({name:searchText});
    
      if(searchText == ''){
        Alert.alert('Error','Please Enter Name City For Search');
        setIsLoading(false);
      }else{
        try{
        if(searchText.length> 2 && typeof searchText !== 'undefined'){
          if (realtimeData && realtimeData.error) {
            // Handle the error here
            Alert.alert('Error', console.error(error));
          } else {
            // Process the forecast data
                if(typeof realtimeData.name !== 'undefined'){
                  const dataAirpollute = await fetchAirpoluteForPM({lat:realtimeData.coord.lat,lon:realtimeData.coord.lon})
                  console.log('getLocation',realtimeData.name)
                  setLocation(realtimeData.name)
                  setSearchText('')
                  const postData = {
                    name:realtimeData.name,
                    temp:realtimeData.main.temp,
                    pm2_5:dataAirpollute.list[0].components.pm2_5,
                    humidity:realtimeData.main.humidity,
                    weather:realtimeData.weather[0].description,
                    date:new Date(realtimeData.dt*1000+(realtimeData.timezone*1000)).toLocaleDateString('en-US',{weekday:'long'}),
                    icon:realtimeData.weather[0].icon
                  }
                  axios.post(firebaseUrl,postData)
                  setIsLoading(false);
                }
                else{
                  Alert.alert('Not Found', 'Not Have this Location');
                  setIsLoading(false);
                }
              
          
          }
        }else{
          Alert.alert('Not Found', 'Not Have this Location');
          setIsLoading(false);
        }
      }catch(err){
        console.error(err)
      }
      }
    


  }

  const handdleSearch = value =>{
    setSearchText(value)
    console.log(value)

  }
  // const handleTextDebounce = useCallback(debounce(handdleSearch,600), [])
  return (
    
      <View className="flex flex-1">
        <Gradient fromColor='#006699' toColor='#7857D1' />
        <StatusBar style='auto' />
          {isLoading?(
            <LoadingScreen/>
          ):(
        <SafeAreaView className="flex-1"> 
          <SearchBar handdleSearch={handdleSearch} handdleSubmit={handdleSubmit}/>
          {/* forecast section */}
          <View className="mx-6 flex justify-around flex-1 mb-2">
              {/* location */}
              <Text className="text-white text-center text-3xl font-bold top-3">
                {location ? location : previousLocation}
              </Text>
              
              {/* WeatherImage */}
              <View className="flex-row justify-center">
                <Image source={weatherIcon[statusWeather?.icon]} className="w-40 h-40" />
              </View>

              {/* degree celcius */}
              <View className="space-y-2">
                <Text className="text-center font-bold text-white text-6xl ml-5">
                  { Math.ceil(temparature)}°
                </Text>
                <Text className="text-center font-bold text-white text-xl tracking-widest">
                  {toUpper(statusWeather.description)}
                </Text>
              </View>

              {/* other stats */}
              <Status pm2_5={airPollute.pm2_5} humidity={humidity} time={time.toLocaleTimeString('en-US',{ hour: "2-digit", minute: "2-digit"})}/>
          </View>
        {/* forecast next day */}

        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
              <CalendarDaysIcon size="22" color="white"/>
              <Text className="text-white text-base"> Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal:15}}
            showsHorizontalScrollIndicator={false}
            >
          {
            forecast?.list?.map((item,index) => {
              let date = new Date(item.dt_txt)
              let options = {weekday:'long'}
              let dayName = date.toLocaleDateString('en-US',options)
              let dayTime = date.toLocaleTimeString('en-US')
              dayName = dayName.split(',')[0]
              return (
              <View 
                  className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                  style={{backgroundColor:'rgba(255,255,255,0.2)'}}
                  key={index}
                  onstartshouldsetresponder={() => true}
                >
                <Image source={weatherIcon[item?.weather[0]?.icon]} className="h-11 w-11"/>
                <Text className="text-white">{dayName} </Text>
                <Text className="text-white">{dayTime} </Text>
                <Text className="text-white text-xl font-semibold"> {Math.ceil(item.main.temp)}&#176;</Text>
              </View>
              )
            })
        }
            </ScrollView>
        </View>
        </SafeAreaView>
          )}
      </View>
    
  );
  }




