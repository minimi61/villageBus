
//네이버 달력
//http://www.joshi.co.kr/index.php?mid=board_XbwP90&document_srl=237


// 양력
let solarHolidays = ['0101', '0301', '0505', '0606', '0815', '1003', '1009', '1225']
// 음력
let lunarHolidays =[
  ["설 전날", 12, 0, 2],
  ["설날", 1, 1, 2],
  ["설 다음날", 1, 2, 2],
  ["석가탄신일", 4, 8, 2],
  ["추석 전날", 8, 14, 2],
  ["추석", 8, 15, 2],
  ["추석 다음날", 8, 16, 2],
]
// 대체공휴일
let alternativeHolidays = ['0124']


// 내용, 월, 일, 양(1)/음(2)
// let holidayTable = [
//   ["신정", 1, 1, 1],
//   ["설 전날", 12, 0, 2],
//   ["설날", 1, 1, 2],
//   ["설 다음날", 1, 2, 2],
//   ["3·1절", 3, 1, 1],
//   ["석가탄신일", 4, 8, 2],
//   ["어린이날", 5, 5, 1],
//   ["현충일", 6, 6, 1],
//   ["광복절", 8, 15, 1],
//   ["추석 전날", 8, 14, 2],
//   ["추석", 8, 15, 2],
//   ["추석 다음날", 8, 16, 2],
//   ["개천절", 10, 3, 1],
//   ["한글날", 10, 9, 1],
//   ["성탄절", 12, 25, 1]
// ]



let lunarMonthTable = [
    [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
    [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],   /* 2021 */
    [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
    [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
    [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
    [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
    [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
    [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
    [1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
    [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
    [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
    [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1],   /* 2031 */
    [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
    [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
    [2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
    [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
    [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
    [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
    [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
    [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],  /* 2041 */
    [1, 5, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
    [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
    [2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2, 2],
    [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
    [2, 1, 2, 2, 4, 1, 2, 1, 1, 2, 1, 2],
    [1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1],
    [2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
    [1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2, 1],
]

//계산 빨리하기 위하여 기준 연도 구하기
const getBaseDate = (year, month, day) => {
  let solYear, solMonth, solDay;
  let lunYear, lunMonth, lunDay;
  let lunLeapMonth, lunMonthDay;
  let solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 2020 || year > 2041) {
    console.log("2020년부터 2041년까지만 확인 가능합니다.")
    }
  if (year >= 2040) {
      /* 기준일자 양력 2040년 1월 1일 (음력 2039년 11월 17일) */
      solYear = 2040;
      solMonth = 1;
      solDay = 1;
      lunYear = 2039;
      lunMonth = 11;
      lunDay = 17;
      lunLeapMonth = 0;
      solMonthDay[1] = 29; /* 2040 년 2월 28일 */
      lunMonthDay = 29; /* 2039년 11월 */
  } else if (year >= 2020) {
      /* 기준일자 양력 2020년 1월 1일 (음력 2019년 12월 7일) */
      solYear = 2020;
      solMonth = 1;
      solDay = 1;
      lunYear = 2019;
      lunMonth = 12;
      lunDay = 7;
      lunLeapMonth = 0;
      solMonthDay[1] = 29; /* 2020 년 2월 28일 */
      lunMonthDay = 30; /* 2019년 12월 */
  }
     return {
    solYear: solYear,
    solMonth: solMonth,
    solDay: solDay,
    lunYear: lunYear,
    lunMonth: lunMonth,
    lunDay: lunDay,
    solMonthDay: solMonthDay,
    lunLeapMonth: lunLeapMonth,
    lunMonthDay: lunMonthDay,
  };
}
const myDate = (year, month, day, leapMonth) =>
{
    this.year = year;
    this.month = month;
    this.day = day;
    this.leapMonth = leapMonth;
}

const lunarCalc = (year, month, day, leapmonth) => {
  let baseDate = getBaseDate(year);
  let solYear = baseDate.solYear;
  let solMonth = baseDate.solMonth;
  let solDay = baseDate.solDay;
  let lunYear = baseDate.lunYear;
  let lunMonth = baseDate.lunMonth;
  let lunDay = baseDate.lunDay;
  let solMonthDay = baseDate.solMonthDay;
  let lunLeapMonth = baseDate.lunLeapMonth;
  let lunMonthDay = baseDate.lunMonthDay;

  let lunIndex = lunYear - 2019;

  while (true) {
    if (
      year == lunYear &&
      month == lunMonth &&
      day == lunDay &&
      leapmonth == lunLeapMonth
    ) {
      // 날짜가 음력과 일치하면 양력을 리턴
      return new myDate(solYear, solMonth, solDay, 0);      // return {
      //   solYear: solYear,
      //   solMonth: solMonth,
      //   solDay: solDay,
      //   lunYear: lunYear,
      //   lunMonth: lunMonth,
      //   lunDay: lunDay,
      //   leapMonth: lunLeapMonth == 1 // 윤달 인지를 리턴
      // };
    }
    // 음력 데이터 (평달 - 작은달 :1,  큰달:2 )
    // (윤달이 있는 달 - 평달이 작고 윤달도 작으면 : 3 , 평달이 작고 윤달이 크면 : 4)
    // (윤달이 있는 달 - 평달이 크고 윤달이 작으면 : 5,  평달과 윤달이 모두 크면 : 6)
    // 음력 날짜를 더한다.
 
    // 년도를 계산하기 위하여 인덱스 값 변경 1799년부터 이므로 년도에서 1799를 뺀다.
    if (
      lunMonth == 12 &&
      ((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) || // 작은달 말일
        (lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30)) // 큰달 말일
    ) {
      // 12월 말일이면 년도증가 월일은 1일로
      lunYear++;
      lunMonth = 1;
      lunDay = 1;
 
      // 년도가 변경되었으므로 인덱스값 조정
      lunIndex = lunYear - 2019;

      // 1월의 마지막 날짜가 큰달인지 작은달인지 판단한다.
      if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) {
        lunMonthDay = 29;
      } else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) {
        lunMonthDay = 30;
      }
    }
    else if (lunDay == lunMonthDay) {
      // 말일이라면 월과 마지막 날짜를 다시 조정한다.
      if (lunarMonthTable[lunIndex][lunMonth - 1] >= 3 && lunLeapMonth == 0) {
        // 윤달이라면 (배열 값이 3이상)
        lunDay = 1;
        lunLeapMonth = 1; // 윤달
      } else {
        // 평달이라면
        lunMonth++;
        lunDay = 1;
        lunLeapMonth = 0; // 평달
      }
      // 월의 마지막 날짜 계산
      if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) {
        // 평달이면서 작은달은 29일
        lunMonthDay = 29;
      } else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) {
        // 평달이면서 큰달은 30일
        lunMonthDay = 30;
      } else if (lunarMonthTable[lunIndex][lunMonth - 1] == 3) {
        // 윤달이 있는 달이면 (평달이 작고 윤달도 작으면 : 3)
        lunMonthDay = 29;
      } else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
        lunLeapMonth == 0
      ) {
        // 윤달이 있는 달이면 (평달이 작고 윤달이 크면 : 4)  -- 평달이라면
        lunMonthDay = 29;
      } else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
        lunLeapMonth == 1
      ) {
        // 윤달이 있는 달이면 (평달이 작고 윤달이 크면 : 4)  -- 윤달이라면
        lunMonthDay = 30;
      } else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
        lunLeapMonth == 0
      ) {
        // 윤달이 있는 달이면 (평달이 크고 윤달이 작으면 : 5)  -- 평달이라면
        lunMonthDay = 30;
      } else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
        lunLeapMonth == 1
      ) {
        // 윤달이 있는 달이면 (평달이 크고 윤달이 작으면 : 5)  -- 윤달이라면
        lunMonthDay = 29;
      } else if (lunarMonthTable[lunIndex][lunMonth - 1] == 6) {
        // 윤달이 있는 달이면 ( 평달과 윤달이 모두 크면 : 6)
        lunMonthDay = 30;
      }
    } 
    else {
      // 일 증가
      lunDay++;
    }
   }
}

const setLunarToSolar = () => {
  for (let i = 0; i < lunarHolidays.length; i++) {
    const date = new Date();
    const year = date.getFullYear()
    let lunarDate = lunarCalc(year, lunarHolidays[i][1], lunarHolidays[i][2], 1)
    // console.log(lunarDate)
  }
}
export {setLunarToSolar}