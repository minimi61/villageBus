import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import NowTime from '../components/NowTime';
import Today from '../components/Today';
import GetTimeMs from '../hooks/getTimeMs'
import { isHoliday } from '../hooks/copyCalendar';
// import { setLunarToSolar } from '../hooks/holidayCalculate';

const Main = () => {
  const date = new Date();
  const [nowData, setNowData] = useState(date)
  // console.log(setLunarToSolar())
  isHoliday(2023,1,1,2,1)
  const newDateTime = () => {
    //////test용 1초 setInterval 중지 
    // const date = new Date();
    // setNowData(date)
    return 
  }
  useEffect(() => {
    setInterval(newDateTime, 1000)
  }, [])
  return (
    <View style={styles.container}>   
      <Text>마을버스 시간표</Text>
      <Today />
      <NowTime hour={nowData.getHours()} minutes={nowData.getMinutes()} />
      <GetTimeMs date={nowData}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Main