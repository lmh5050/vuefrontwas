<template>
  <div id="test">
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script>
import axios from 'axios';  // axios import

export default {
  name: 'MyTest',
  methods: {
    handleClick() {
      // 버튼 클릭 시 Spring Boot API로 GET 요청을 보냄
      axios.get('http://localhost:8080/logMessage')
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
#test {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
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
