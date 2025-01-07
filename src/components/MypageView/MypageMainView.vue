<template>
  <div class="page-container">
    <!-- 오른쪽 위에 위치할 입력박스와 등록 버튼 -->
    <div class="input-wrapper">
      <input v-model="characterName" type="text" class="small-input" placeholder="입력해주세요" />
      <button class="register-button" @click="submitCharacterName">등록</button>
    </div>

    <!-- 가져온 데이터를 아래에 표시 -->
    <div v-if="characterData" class="character-data">
      <table class="character-table">
        <thead>
          <tr class="table-header">
            <th @click="sortData('ItemMaxLevel')" class="table-header-cell">
              아이템 레벨
              <span :class="{'sort-arrow': true, 'asc': sortKey === 'ItemMaxLevel' && sortAsc, 'desc': sortKey === 'ItemMaxLevel' && !sortAsc}"></span>
            </th>
            <th @click="sortData('className')" class="table-header-cell">
              직업
              <span :class="{'sort-arrow': true, 'asc': sortKey === 'className' && sortAsc, 'desc': sortKey === 'className' && !sortAsc}"></span>
            </th>
            <th @click="sortData('CharacterName')" class="table-header-cell">
              캐릭터 명
              <span :class="{'sort-arrow': true, 'asc': sortKey === 'CharacterName' && sortAsc, 'desc': sortKey === 'CharacterName' && !sortAsc}"></span>
            </th>
            <th @click="sortData('classType')" class="table-header-cell">
              직업 유형
              <span :class="{'sort-arrow': true, 'asc': sortKey === 'classType' && sortAsc, 'desc': sortKey === 'classType' && !sortAsc}"></span>
            </th>
            <th @click="sortData('ServerName')" class="table-header-cell">
              서버 명
              <span :class="{'sort-arrow': true, 'asc': sortKey === 'ServerName' && sortAsc, 'desc': sortKey === 'ServerName' && !sortAsc}"></span>
            </th>
            <th @click="sortData('characterNameRepresent')" class="table-header-cell">
              대표 캐릭터
              <span :class="{'sort-arrow': true, 'asc': sortKey === 'characterNameRepresent' && sortAsc, 'desc': sortKey === 'characterNameRepresent' && !sortAsc}"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in sortedCharacterData" :key="key">
            <td>{{ value.ItemMaxLevel || 'N/A' }}</td>
            <td>{{ value.className || 'N/A' }}</td>
            <td>{{ value.CharacterName || 'N/A' }}</td>
            <td>{{ value.classType || 'N/A' }}</td>
            <td>{{ value.ServerName || 'N/A' }}</td>
            <td>{{ value.characterNameRepresent || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MypageMainView',
  data() {
    return {
      characterName: '',  // input에서 값을 바인딩할 변수
      username: sessionStorage.getItem('username') || '', // 세션에서 username 가져오기
      characterData: null,  // 가져온 데이터를 저장할 변수
      sortKey: '',          // 현재 정렬된 기준
      sortAsc: true,        // 오름차순 정렬 여부
    };
  },
  mounted() {
    // 페이지가 로드될 때, username을 사용하여 GET 요청을 보냄
    if (this.username) {
      this.fetchCharacterData();
    }
  },
  methods: {
    async fetchCharacterData() {
      try {
        // GET 방식으로 데이터 요청
        const response = await axios.get(`http://localhost:8080/api/lostark/characters/${this.username}`, {
          params: {
            username: this.username,  // 쿼리 파라미터로 username 전달
          },
        });

        console.log('Fetched character data:', response.data);  // 응답 데이터 출력
        this.characterData = response.data;  // 응답 데이터 저장
      } catch (error) {
        console.error('API 호출 실패:', error);
        // 오류 처리 추가 (예: 오류 메시지 표시)
      }
    },

    async submitCharacterName() {
      try {
        // POST 방식으로 데이터 전송
        const response = await axios.post('http://localhost:8080/api/lostark/characters', {
          characterName: this.characterName,
          username: this.username,  // 세션에서 가져온 username 추가
        });

        console.log('Character data:', response.data);  // 응답 데이터 출력
        // POST 요청 후 가져온 데이터가 있다면 화면에 표시
        this.characterData = response.data;  // 응답 데이터 저장
      } catch (error) {
        console.error('API 호출 실패:', error);
        // 오류 처리 추가 (예: 오류 메시지 표시)
      }
    },

    sortData(key) {
      if (this.sortKey === key) {
        // 이전에 같은 컬럼을 클릭했을 경우 정렬 방향을 반전시킴
        this.sortAsc = !this.sortAsc;
      } else {
        // 다른 컬럼을 클릭했을 경우 기본값은 오름차순
        this.sortAsc = true;
      }
      this.sortKey = key;
    },

    getSortedCharacterData() {
      if (!this.characterData) return [];
      return [...this.characterData].sort((a, b) => {
        const valueA = a[this.sortKey];
        const valueB = b[this.sortKey];

        if (valueA === undefined || valueB === undefined) return 0;

        // 정렬 순서에 따라 값 비교
        if (this.sortAsc) {
          return (valueA < valueB ? -1 : (valueA > valueB ? 1 : 0));
        } else {
          return (valueA > valueB ? -1 : (valueA < valueB ? 1 : 0));
        }
      });
    },
  },
  computed: {
    sortedCharacterData() {
      return this.getSortedCharacterData();
    },
  },
};
</script>

<style scoped>
.page-container {
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 40px; /* 상단 여백 추가 */
}

.input-wrapper {
  position: absolute; /* 절대 위치 */
  top: 20px;  /* 상단에서 20px 여백 */
  right: 20px; /* 오른쪽에서 20px 여백 */
  width: 20%; /* 전체 화면의 20% 크기 */
  display: flex;
  align-items: center;
  justify-content: space-between; /* 입력박스와 버튼 사이 공간 균등 배분 */
  gap: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.small-input {
  width: 60%; /* 입력 박스가 60% 차지 */
  padding: 8px;
  box-sizing: border-box;
}

.register-button {
  width: 35%; /* 버튼이 35% 차지 */
  padding: 8px 16px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
}

.register-button:hover {
  background-color: darkgreen;
}

.character-data {
  margin-top: 80px; /* 입력 박스와 겹치지 않도록 여백을 주었음 */
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
}

.character-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  background-color: black; /* 검은색 배경 */
}

.table-header-cell {
  color: #000; /* 글자색 흰색 */
  background-color: #27f024;
  text-align: center; /* 글자 중앙 정렬 */
  padding: 12px;
  border: 1px solid #ddd;
  cursor: pointer; /* 클릭할 수 있다는 표시 */
}

.sort-arrow {
  margin-right: 8px; /* 오른쪽에 여백 추가 */
  font-size: 12px;
  float: right; /* 오른쪽으로 정렬 */
}

.sort-arrow.asc::before {
  content: "↑";
  color: green;
}

.sort-arrow.desc::before {
  content: "↓";
  color: red;
}

.character-table th,
.character-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.character-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.character-table tbody tr:hover {
  background-color: #ddd;
}

.character-table th {
  text-align: center;
}

.character-table td {
  text-align: center;
}
</style>
