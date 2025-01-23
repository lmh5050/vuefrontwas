<template>
  <div class="page-container">

    <!-- 가져온 데이터를 아래에 표시 -->
    <div v-if="characterData" class="character-data">
      <table class="character-table">
        <thead>
          <tr class="table-header">
            <th class="table-header-cell">캐릭터 정보</th>
            <th class="table-header-cell">카멘1-3</th>
            <th class="table-header-cell">카맨4</th>
            <th class="table-header-cell">에키드나</th>
            <th class="table-header-cell">베히모스</th>
            <th class="table-header-cell">에기르</th>
            <th class="table-header-cell">아브렐슈드2막</th>
            <th class="table-header-cell">카던</th>
            <th class="table-header-cell">가디언토벌</th>
            <th class="table-header-cell">에포나</th>
            <th class="table-header-cell">길드주화</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="value in sortedCharacterData"
            :key="value.characterName"
            draggable="true"
            @dragstart="onDragStart(value)"
            @dragover="onDragOver($event)"
            @drop="onDrop(value)"
          >
            <td>{{ value.characterName || 'N/A' }} ({{ value.itemMaxLevel || 'N/A' }})</td>
            <td><input type="checkbox" v-model="value.karmen" :checked="value.karmen" /></td>
            <td><input type="checkbox" v-model="value.karmen4" :checked="value.karmen4" /></td>
            <td><input type="checkbox" v-model="value.echidna" :checked="value.echidna" /></td>
            <td><input type="checkbox" v-model="value.behimoth" :checked="value.behimoth" /></td>
            <td><input type="checkbox" v-model="value.egir" :checked="value.egir" /></td>
            <td><input type="checkbox" v-model="value.abrellshould" :checked="value.abrellshould" /></td>
            <td><input type="checkbox" v-model="value.chaos" :checked="value.chaos" /></td>
            <td><input type="checkbox" v-model="value.guardian" :checked="value.guardian" /></td>
            <td><input type="checkbox" v-model="value.epona" :checked="value.epona" /></td>
            <td><input type="checkbox" v-model="value.guildexchange" :checked="value.guildexchange" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 저장 버튼 추가 -->
    <button class="save-button" @click="saveCharacterData">저장</button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "MypageMainView",
  data() {
    return {
      characterName: "", // input에서 값을 바인딩할 변수
      username: sessionStorage.getItem("username") || "", // 세션에서 username 가져오기
      characterData: null, // 가져온 데이터를 저장할 변수
      sortKey: "", // 현재 정렬된 기준
      sortAsc: true, // 오름차순 정렬 여부
      dragIndex: null, // 드래그 시작한 행의 인덱스
    };
  },
  mounted() {
    if (this.username) {
      this.fetchCharacterData();
    }
  },
  methods: {
    async fetchCharacterData() {
      try {
        const response = await axios.get(`http://localhost:8080/api/lostark/characters/gold-check/${this.username}`, {
          params: {
            username: this.username,
          },
        });

        console.log("Fetched character data:", response.data);
        this.characterData = response.data;
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    },
    // 새로운 저장 버튼 기능
    async saveCharacterData() {
      try {
        // 체크된 값들을 데이터 형식으로 변환
        const payload = this.characterData.map(character => ({
          characterName: character.characterName,
          karmen: character.karmen,
          echidna: character.echidna,
          behimoth: character.behimoth,
          karmen4: character.karmen4,
          egir: character.egir,
          abrellshould: character.abrellshould,
          chaos: character.chaos,
          guardian: character.guardian,
          epona: character.epona,
          guildexchange: character.guildexchange,
        }));

        // POST 방식으로 데이터 전송
        const response = await axios.post("http://localhost:8080/api/lostark/characters/gold-check/save", payload);
        console.log("Saved character data:", response.data);
      } catch (error) {
        const payload = this.characterData.map(character => ({
          characterName: character.characterName,
          karmen: character.karmen,
          echidna: character.echidna,
          behimoth: character.behimoth,
          karmen4: character.karmen4,
          egir: character.egir,
          abrellshould: character.abrellshould,
          chaos: character.chaos,
          guardian: character.guardian,
          epona: character.epona,
          guildexchange: character.guildexchange,
        }));
        console.log(payload);
        console.error("API 호출 실패:", error);
      }
    },

    sortData(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
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

        if (this.sortAsc) {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
      });
    },

    onDragStart(value) {
      this.dragIndex = this.characterData.indexOf(value);
    },

    onDragOver(event) {
      event.preventDefault();
    },

    onDrop(value) {
      const dropIndex = this.characterData.indexOf(value);

      if (this.dragIndex === null || this.dragIndex === dropIndex) return;

      const movedItem = this.characterData.splice(this.dragIndex, 1)[0];
      this.characterData.splice(dropIndex, 0, movedItem);

      this.dragIndex = null;
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
  top: 20px; /* 상단에서 20px 여백 */
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
  position: relative; /* 부모 요소에 상대적인 위치 지정 */
  margin-top: 80px; /* 입력 박스와 겹치지 않도록 여백을 주었음 */
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  max-height: 400px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 숨김 */
}

.character-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* 테이블 열 크기를 고정 */
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
  word-wrap: break-word; /* 내용이 넘칠 경우 단어 단위로 줄 바꿈 */
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

.character-table tbody tr {
  cursor: move; /* 드래그 가능 표시 */
}

.character-table input[type="checkbox"] {
  transform: scale(1.5); /* 체크박스를 1.5배 크게 설정 */
  margin: 0; /* 기본 여백 제거 */
}

/* 스크롤바 스타일 */
.character-data::-webkit-scrollbar {
  width: 8px; /* 스크롤바 너비 */
}

.character-data::-webkit-scrollbar-track {
  background: #f1f1f1; /* 스크롤바 트랙(배경) */
  border-radius: 10px; /* 트랙의 둥근 모서리 */
}

.character-data::-webkit-scrollbar-thumb {
  background: #888; /* 스크롤바 thumb(슬라이더) */
  border-radius: 10px; /* thumb의 둥근 모서리 */
}

.character-data::-webkit-scrollbar-thumb:hover {
  background: #555; /* thumb에 마우스 오버 시 색 변경 */
}

.save-button {
  position: absolute; /* 표 안에서 절대 위치 */
  bottom: 170px; /* 표 하단에서 20px 여백 */
  right: 20px; /* 표 우측에서 20px 여백 */
  width: 10%; /* 너비 10% */
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.save-button:hover {
  background-color: #0056b3;
}
</style>
