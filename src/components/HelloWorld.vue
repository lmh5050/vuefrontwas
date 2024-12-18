<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="username">아이디</label>
        <input type="text" id="username" v-model="username" placeholder="아이디를 입력하세요" required />
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요" required />
      </div>
      <button type="submit" class="login-button">로그인</button>
    </form>
    <div class="signup-link">
      <button @click="goToSignUp" class="signup-button">회원가입</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // 로그인 처리 로직 추가
      console.log('로그인 시도', this.username, this.password);
    },
    goToSignUp() {
      // 회원가입 페이지로 이동하는 로직 추가
      console.log('회원가입 페이지로 이동');
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: 5px;
}

.login-button {
  background-color: #42b983;
  color: white;
  margin-bottom: 10px;
}

.signup-button {
  background-color: #f0f0f0;
  color: #42b983;
}

.signup-link {
  margin-top: 10px;
}
</style>
