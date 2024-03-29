import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Button } from 'react-native';
import { GetTimeMs } from '../../hooks/GetTimeMs';
// import { setLunarToSolar } from '../hooks/holidayCalculate';
import { color } from '../../assets/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"
import ShowTimeTable from '../common/ShowTimeTable';
import BusStatus from './time-container/BusStatus';
import NowTime from '../common/NowTime';
import Today from '../common/Today';

const Main = () => {
  const date = new Date();
  const [nowData, setNowData] = useState(date)
  const [changeBusType, setChangeBusType] = useState('one')
  // console.log(setLunarToSolar())
  // isHoliday(2023,1,1,2,1)
  const newDateTime = () => {
    //////test용 1초 setInterval 중지 
    const date = new Date();
    setNowData(date)
    return
  }
  const { nextTime, deferenceValue } = GetTimeMs(nowData, changeBusType)
  let commingTime = nextTime?.slice(1)

  useEffect(() => {
    setInterval(newDateTime, 1000)
  }, [])

  return (
    <View style={{ flex: 1 }}>

      {/* 헤더 */}
      <View style={{ justifyContent: 'center', height: '12%', backgroundColor: color.MainYellow, alignItems: 'center', }}>
        <Today />
      </View>
      {/* 1번버스,2번버스 탭 */}
      <View style={{ flex: 0.6, flexDirection: 'row' }}>
        <TouchableOpacity style={[styles.centerAlign, { flex: 1, backgroundColor: changeBusType == 'one' ? '#ffd24c' : '#a7915385' }]} onPress={() => setChangeBusType('one')}>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '600', margin: 5 }}>1번</Text>
          <View style={[styles.centerAlign, { flexDirection: 'row' }]}>
            <Text style={styles.startText}>종점</Text>
            <FontAwesomeIcon icon={faArrowRight} style={styles.text} />
            <Text style={{ marginLeft: 10, fontSize: 15 }}>과천역</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.centerAlign, { flex: 1, backgroundColor: changeBusType == 'one' ? '#a7915385' : '#ffd24c' }]} onPress={() => setChangeBusType('two')}>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '600', margin: 5 }}>2번</Text>
          <View style={[styles.centerAlign, { flexDirection: 'row' }]}>
            <Text style={styles.startText}>종점</Text>
            <FontAwesomeIcon icon={faArrowRight} style={styles.text} />
            <Text style={{ marginLeft: 10, fontSize: 15 }}>정부과천청사역</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* 바디 */}
      {/* 시간비교와 버스 상태 */}
      <View style={[styles.body, styles.centerAlign]}>
        <View style={{ width: '70%', height: '15%', flexDirection: 'row', marginTop: -60 }}>
          <View style={[styles.centerAlign, { flex: 1, backgroundColor: '#26C886' }]}>
            <Text style={[styles.timeText, { color: 'white' }]}>현재 시간</Text>
            <NowTime hour={nowData.getHours()} minutes={nowData.getMinutes()} />
          </View>
          <View style={[styles.centerAlign, { flex: 1, backgroundColor: '#26C886' }]}>
            <Text style={[styles.timeText, { color: 'white' }]}>버스 출발 시간</Text>
            {/* <GetTimeMs date={nowData}/> */}
            <View>
              {nextTime.length > 0 ?
                <View style={styles.container}>
                  <Text style={{ marginTop: 8, color: color.DeepOrange, fontSize: 20, fontWeight: '700', letterSpacing: 3 }}>{nextTime[0]}</Text>
                </View>
                : <View style={styles.container}>
                  <Text>없음</Text>
                </View>
              }
            </View>
          </View>
        </View>
        <BusStatus nowTime={date} deference={deferenceValue[0] / 60000} commingTime={commingTime} />
        {/* 시간표 스크롤 */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
          style={[styles.commingContainer, { width: '70%', marginTop: 30 }]}>
          {nextTime.map((time, idx) => {
            return <ShowTimeTable nowTime={date} time={time} key={idx} soonTime={nextTime[0]} />
          })}
        </ScrollView>
      </View>
      {/* <StatusBar style="auto" /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 3.5,
    backgroundColor: color.MainWhite,
  },
  startText: {
    fontSize: 15,
    marginRight: 10
  },
  centerAlign: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  commingContainer: {
    width: 80,
    maxHeight: 200,
    backgroundColor: '#eff0ec',
    borderWidth: 0.5,
    borderColor: '#494a4a'
  },
  timeText: {
    fontSize: 15,
    fontWeight: '600'
  }
});
export default Main