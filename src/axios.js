import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // API의 기본 URL
  timeout: 5000, // 요청 타임아웃
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt"); // JWT 토큰을 localStorage에서 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
