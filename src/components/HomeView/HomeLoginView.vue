<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <div class="input-container">
        <input v-model="username" placeholder="Username" class="small-input" />
      </div>
      <div class="input-container">
        <input v-model="password" placeholder="Password" type="password" class="small-input" />
      </div>
      <div class="input-container">
        <button type="submit" class="small-button">로그인</button>
      </div>
    </form>
    <p v-if="error">{{ error }}</p>
    
    <div class="signup-container">
      <button @click="goToSignup" class="small-button signup-button">회원가입</button>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../../axios.js'

export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axiosInstance.post('/auth/login', {
          username: this.username,
          password: this.password,
        });

        sessionStorage.setItem('token', response.data); // JWT 토큰 저장
        sessionStorage.setItem('username', this.username); // username 저장

        // 로그인 상태를 강제로 업데이트
        window.dispatchEvent(new Event("storage"));

        // Mypage로 이동
        this.$router.push("/mypage");
      } catch (error) {
        this.error = "로그인 실패: " + error.response.data.message;
        console.error("Login failed", error);
      }
    },

    goToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.input-container {
  width: 100%; /* 모든 요소를 30% 크기로 설정 */
  margin: 10px 0; /* 요소 간의 간격을 추가 */
}

.small-input {
  width: 100%; /* 인풋 박스가 부모 요소의 너비에 맞게 크기 조정 */
  padding: 8px;
  box-sizing: border-box; /* padding을 포함한 전체 크기 계산 */
}

button.small-button {
  width: 100%; /* 버튼이 부모 요소의 너비에 맞게 크기 조정 */
  padding: 10px;
  margin-top: 10px;
}

.signup-container {
  margin-top: 10px; /* 로그인 버튼과 회원가입 버튼 사이의 간격 */
}

.signup-button {
  background-color: green; /* 녹색 배경 */
  color: white; /* 텍스트 색상 흰색 */
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.signup-button:hover {
  background-color: darkgreen; /* 버튼 hover 시 색상 변경 */
}
</style>
