<template>
  <div class="login-container">
    <h2>회원가입</h2>
    <form @submit.prevent="register">
      <div class="input-container">
        <input v-model="username" placeholder="Username" class="small-input" />
      </div>
      <div class="input-container">
        <input v-model="password" placeholder="Password" type="password" class="small-input" />
      </div>
      <div class="input-container">
        <button type="submit" class="small-button">회원가입</button>
      </div>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/register", {
          username: this.username,
          password: this.password,
        });

        // 회원가입 성공 시 처리 (예: 로그인 페이지로 이동)
        if (response.status === 200) {
          this.$router.push("/login");  // 회원가입 후 로그인 페이지로 이동
        }
      } catch (error) {
        this.error = "회원가입에 실패했습니다. 다시 시도해 주세요.";
      }
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
  width: 100%;
  margin: 10px 0;
}

.small-input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button.small-button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}

.signup-container {
  margin-top: 10px;
}

.signup-button {
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.signup-button:hover {
  background-color: darkgreen;
}
</style>
