<template>
  <div class="page-container">
    <!-- 가져온 데이터를 아래에 표시 -->
    <div v-if="characterData" class="character-data">
      <table class="character-table">
        <thead>
          <tr>
            <th>아이템 레벨</th>
            <th>직업</th>
            <th>캐릭터 명</th>
            <th>직업 유형</th>
            <th>서버 명</th>
            <th>대표 캐릭터</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in characterData" :key="key">
            <td>{{ value.ItemMaxLevel || 'N/A' }}</td>
            <td>{{ value.CharacterClassName || 'N/A' }}</td>
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
import axios from "axios";

export default {
  name: "MypageMainCharacter",
  data() {
    return {
      characterName: "", // input에서 값을 바인딩할 변수
      username: sessionStorage.getItem("username") || "", // 세션에서 username 가져오기
      characterData: null, // 가져온 데이터를 저장할 변수
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
        const response = await axios.get(
          `http://34.47.90.90:8081/api/lostark/characters/${this.username}`,
          {
            params: {
              username: this.username, // 쿼리 파라미터로 username 전달
            },
          }
        );

        console.log("Fetched character data:", response.data); // 응답 데이터 출력
        this.characterData = response.data; // 응답 데이터 저장
      } catch (error) {
        console.error("API 호출 실패:", error);
        // 오류 처리 추가 (예: 오류 메시지 표시)
      }
    },

    async submitCharacterName() {
      try {
        // POST 방식으로 데이터 전송
        const response = await axios.post(
          "http://34.47.90.90:8081/api/lostark/characters",
          {
            characterName: this.characterName,
            username: this.username, // 세션에서 가져온 username 추가
          }
        );

        console.log("Character data:", response.data); // 응답 데이터 출력
        // POST 요청 후 가져온 데이터가 있다면 화면에 표시
        this.characterData = response.data; // 응답 데이터 저장
      } catch (error) {
        console.error("API 호출 실패:", error);
        // 오류 처리 추가 (예: 오류 메시지 표시)
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.character-data {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.character-table {
  width: 100%;
  border-collapse: collapse;
}

.character-table thead {
  background-color: #000; /* 검은색 배경 */
  color:#000; /* 글자색은 흰색 */
  font-weight: bold; /* 글자 굵게 */
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
