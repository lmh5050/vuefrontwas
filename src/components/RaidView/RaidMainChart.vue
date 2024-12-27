<template>
    <div class="raid-main-chart">
      <h2>Raid</h2>
      <table>
        <thead>
          <tr>
            <th>레이드 명</th>
            <th>1관 클골</th>
            <th>2관 클골</th>
            <th>3관 클골</th>
            <th>클골 합계</th>
            <th>재료명</th>
            <th>1관 개수 / (더보기) = 합계</th>
            <th>2관 개수 / (더보기) = 합계</th>
            <th>3관 개수 / (더보기) = 합계</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(RaidInfo, index) in Raid" :key="index">
            <td>{{ RaidInfo.raidName }}</td>
            <td>{{ RaidInfo.gold1 }}</td>
            <td>{{ RaidInfo.gold2 }}</td>
            <td>{{ RaidInfo.gold3 }}</td>
            <td class="gold-sum">
              {{ (getValidNumber(RaidInfo.gold1) + getValidNumber(RaidInfo.gold2) + getValidNumber(RaidInfo.gold3)).toLocaleString() }}
            </td>
            <td>{{ RaidInfo.reward1 }}</td>
            <td>
              {{ RaidInfo.plus1 }} / ({{ RaidInfo.plus1 }}) = 
              {{ (getValidNumber(RaidInfo.plus1) + getValidNumber(RaidInfo.plus1)).toLocaleString() }}
            </td>
            <td>
              {{ RaidInfo.plus2 }} / ({{ RaidInfo.plus2 }}) = 
              {{ (getValidNumber(RaidInfo.plus2) + getValidNumber(RaidInfo.plus2)).toLocaleString() }}
            </td>
            <td v-if="RaidInfo.plus3">
                {{ RaidInfo.plus3 }} / ({{ RaidInfo.plus3 }}) = 
                {{ (getValidNumber(RaidInfo.plus3) + getValidNumber(RaidInfo.plus3)).toLocaleString() }}
                </td>
                <td v-else>
                <!-- 빈 셀 -->
            </td>
            <td>
              <button @click="deleteRaid(RaidInfo.raidName)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import '../../css/components/RaidMainChart.css';
  import axios from 'axios';
  
  export default {
    name: 'RaidMainChart',
    data() {
      return {
        Raid: [], // 데이터를 저장할 배열
      };
    },
    mounted() {
      // 컴포넌트가 마운트되면 Spring API에서 데이터를 불러옴
      axios.get('http://34.47.90.90:8081/api/lostark/characters/raid')
        .then(response => {
          console.log(response.data);
          this.Raid = response.data;
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },
    methods: {
      getValidNumber(value) {
        return isNaN(parseFloat(value)) || value === null || value === '' ? 0 : parseFloat(value);
      },
      deleteRaid(raidName) {
    console.log(`${raidName} 레이드를 삭제합니다.`);
    axios
        .delete(`http://34.47.90.90:8081/api/lostark/characters/raid/${encodeURIComponent(raidName)}`, {
            data: {
                data: raidName  // 본문에 raidName을 data로 포함
            }
        })
        .then(response => {
            console.log(response.data);  // API 응답 데이터를 콘솔에 출력
            // 성공 시 처리 로직 추가 (예: UI에서 해당 항목 제거)
            this.Raid = this.Raid.filter(raid => raid.raidName !== raidName);
        })
        .catch(error => {
            console.error('There was an error!', error);  // 에러 처리
        });
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table, th, td {
    border: 1px solid black;
  }
  
  th, td {
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .gold-sum {
    background-color: #ffeb99;
  }
  
  button {
    padding: 5px 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369b71;
  }
  </style>
  