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
            <td @click="editField(index, 'raidName')">
              <template v-if="editingField.index === index && editingField.field === 'raidName'">
                <input v-model="RaidInfo.raidName" />
              </template>
              <template v-else>
                {{ RaidInfo.raidName }}
              </template>
            </td>
            <td @click="editField(index, 'gold1')">
              <template v-if="editingField.index === index && editingField.field === 'gold1'">
                <input v-model="RaidInfo.gold1" type="number" />
              </template>
              <template v-else>
                {{ RaidInfo.gold1 }}
              </template>
            </td>
            <td @click="editField(index, 'gold2')">
              <template v-if="editingField.index === index && editingField.field === 'gold2'">
                <input v-model="RaidInfo.gold2" type="number" />
              </template>
              <template v-else>
                {{ RaidInfo.gold2 }}
              </template>
            </td>
            <td @click="editField(index, 'gold3')">
              <template v-if="editingField.index === index && editingField.field === 'gold3'">
                <input v-model="RaidInfo.gold3" type="number" />
              </template>
              <template v-else>
                {{ RaidInfo.gold3 }}
              </template>
            </td>
            <td class="gold-sum">
              {{ (getValidNumber(RaidInfo.gold1) + getValidNumber(RaidInfo.gold2) + getValidNumber(RaidInfo.gold3)).toLocaleString() }}
            </td>
            <td @click="editField(index, 'reward1')">
                <template v-if="editingField.index === index && editingField.field === 'reward1'">
                    <input v-model="RaidInfo.reward1" />
                </template>
                <template v-else>
                    {{ RaidInfo.reward1 }}
                </template>
                </td>
            <td @click="editField(index, 'plus1')">
              <template v-if="editingField.index === index && editingField.field === 'plus1'">
                <input v-model="RaidInfo.plus1" />
              </template>
              <template v-else>
                {{ RaidInfo.plus1 }} / ({{ RaidInfo.plus1 }})  = {{ (getValidNumber(RaidInfo.plus1) + getValidNumber(RaidInfo.plus1)).toLocaleString() }}
              </template>
            </td>
            <td @click="editField(index, 'plus2')">
              <template v-if="editingField.index === index && editingField.field === 'plus2'">
                <input v-model="RaidInfo.plus2" />
              </template>
              <template v-else>
                {{ RaidInfo.plus2 }} / ({{ RaidInfo.plus2 }})  = {{ (getValidNumber(RaidInfo.plus2) + getValidNumber(RaidInfo.plus2)).toLocaleString() }}
              </template>
            </td>
            <td @click="editField(index, 'plus3')">
                <template v-if="RaidInfo.plus3">
                    <template v-if="editingField.index === index && editingField.field === 'plus3'">
                    <input v-model="RaidInfo.plus3" />
                    </template>
                    <template v-else>
                    {{ RaidInfo.plus3 }} / ({{ RaidInfo.plus3 }}) = {{ (getValidNumber(RaidInfo.plus3) + getValidNumber(RaidInfo.plus3)).toLocaleString() }}
                    </template>
                </template>
                <template v-else>
                    <span></span> <!-- 값이 없으면 빈 td로 처리 -->
                </template>
            </td>
            <td><button @click="deleteRaid(RaidInfo.raidName)">삭제</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import '../../css/components/RaidMainChart.css'; // 스타일 파일을 import
  import axios from 'axios';
  
  export default {
    name: 'RaidMainChart',
    data() {
      return {
        Raid: [], // 데이터를 저장할 배열
        editingField: { index: null, field: null }, // 어떤 셀이 편집 중인지 추적
      };
    },
    mounted() {
      // 컴포넌트가 마운트되면 Spring API에서 데이터를 불러옴
      axios.get('http://localhost:8080/api/lostark/characters/raid')
        .then(response => {
          console.log(response.data);  // 받아온 데이터를 콘솔로 확인
          this.Raid = response.data;
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },
    methods: {
      // 숫자 값이 없으면 0을 반환하는 메소드
      getValidNumber(value) {
        return isNaN(parseFloat(value)) || value === null || value === '' ? 0 : parseFloat(value);
      },
      // 셀 클릭 시 입력 필드로 전환
      editField(index, field) {
        this.editingField = { index, field };
      },
        // 삭제 버튼 클릭 시 실행될 메소드
        deleteRaid(raidName) {
        console.log(`${raidName} 레이드를 삭제합니다.`);
            // 여기에 삭제 로직을 추가합니다 (예: 삭제 확인 후 API 호출 등)
        }
    }
  }
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
    background-color: #ffeb99; /* 연노랑 배경색 */
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
  
  input {
    width: 80%;
    padding: 5px;
    margin: 5px;
  }
  </style>
  