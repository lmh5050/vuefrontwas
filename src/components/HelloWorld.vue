<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit">로그인</button>
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
    async login() {
      try {
        const response = await axios.post("/auth/login", {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;

        // JWT 저장
        localStorage.setItem("jwt", token);

        // 로그인 성공 시 메인 페이지로 이동
        this.$router.push("/");
      } catch (error) {
        this.error = "로그인에 실패했습니다. 사용자명을 확인하세요.";
      }
    },
  },
};
</script>
