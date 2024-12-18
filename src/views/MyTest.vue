<template>
  <div id="container">
    <div id="navbar">
      <!-- 네비게이션 바 내용 (예시) -->
      <span>Navbar</span>
    </div>
    <div id="test">
      <input v-model="inputData" type="text" placeholder="Enter data" />
      <button @click="handleClick">등록</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';  // axios import

export default {
  name: 'MyTest',
  data() {
    return {
      inputData: ''  // 사용자 입력 데이터를 저장할 변수
    };
  },
  methods: {
    handleClick() {
      // 버튼 클릭 시 입력된 데이터를 Spring Boot API로 POST 요청
      axios.post(`http://localhost:8080/api/lostark/characters/${this.characterName}`, { data: this.inputData })
        .then(response => {
          console.log(response.data);  // API 응답 데이터를 콘솔에 출력
        })
        .catch(error => {
          console.error('There was an error!', error);  // 에러 처리
        });
    }
  }
};
</script>

<style>
#container {
  position: relative;  /* 자식 요소를 절대 위치로 배치하기 위해 부모에 relative 설정 */
}

#navbar {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
}

#test {
  position: absolute;
  top: 60px;  /* 네비게이션 바 끝에서 바로 아래 */
  right: 20px;  /* 우측에 배치 */
  display: flex;
  align-items: center;  /* 수직 정렬 */
}

input {
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
