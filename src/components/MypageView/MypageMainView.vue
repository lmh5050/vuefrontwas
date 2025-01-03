<template>
  <div class="page-container">
    <!-- 오른쪽 위에 위치할 입력박스와 등록 버튼 -->
    <div class="input-wrapper">
      <input v-model="characterName" type="text" class="small-input" placeholder="입력해주세요" />
      <button class="register-button" @click="submitCharacterName">등록</button>
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
  },
};
</script>

<style scoped>
.page-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.input-wrapper {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.small-input {
  padding: 8px;
  padding-top: 12px;
  width: 130px;
  box-sizing: border-box;
}

.register-button {
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
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
}
</style>
