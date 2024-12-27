<template>
    <div class="raid-modal">
      <h2>레이드를 추가</h2>
      <div v-if="loading">로딩 중...</div> <!-- 로딩 상태 표시 -->
      <div v-else-if="error">{{ error }}</div> <!-- 오류 메시지 표시 -->
      <div v-else>
        <table class="raid-table">
          <thead>
            <tr>
              <th></th> <!-- 체크박스 열 -->
              <th>레이드 명</th>
              <th>대표 캐릭터</th>
              <th>시간</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(raid, index) in raidList" :key="index">
              <td>
                <input type="checkbox" :value="raid.no" />
              </td>
              <td>{{ raid.raidName }}</td>
              <td>{{ raid.characterNameRepresent }}</td>
              <td>{{ raid.time }}</td>
              <td>{{ raid.text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import '../../css/components/RaidView/RaidModal.css';
  
  export default {
    name: 'RaidModal',
    data() {
      return {
        raidList: [], // API로부터 가져온 데이터 저장
        loading: true, // 로딩 상태 관리
        error: null, // 오류 메시지 저장
      };
    },
    methods: {
      fetchRaidData() {
        // 데이터 불러오는 API 호출
        axios
          .get('http://localhost:8080/api/lostark/characters/raidMatch')
          .then((response) => {
            this.raidList = response.data; // 데이터 저장
            this.loading = false; // 로딩 종료
          })
          .catch((error) => {
            console.error('Error fetching raid data:', error);
            this.error = '데이터를 불러오는 데 실패했습니다.';
            this.loading = false; // 로딩 종료
          });
      },
    },
    mounted() {
      // 컴포넌트가 로드될 때 데이터 가져오기
      this.fetchRaidData();
    },
  };
  </script>
  
  <style scoped>
  .raid-modal {
    text-align: center;
    padding: 20px;
  }
  
  .raid-table {
    margin: 0 auto; /* 테이블을 중앙에 배치 */
    border-collapse: collapse;
    width: 80%;
  }
  
  .raid-table th, .raid-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .raid-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .raid-table tr:hover {
    background-color: #f9f9f9;
  }
  
  input[type="checkbox"] {
    cursor: pointer;
  }
  </style>
  