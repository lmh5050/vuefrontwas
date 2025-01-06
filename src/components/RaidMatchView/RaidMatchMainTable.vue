<template>
    <div class="raid-modal">
      <h2>레이드 테이블</h2>
      <div v-if="loading">로딩 중...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <table class="raid-table">
          <thead>
            <tr>
              <th></th>
              <th>시간</th>
              <th>레이드 명</th>
              <th>대표 캐릭터</th>
              <th>메모</th>
              <th>레이드 신청</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(raid, index) in raidList" :key="index">
              <td>
                <input type="checkbox" :value="raid.no" />
              </td>
              <td>{{ raid.time }}</td>
              <td>
                <a href="#" @click.prevent="openRaidDetailModal(raid)">{{ raid.raidName }}</a>
              </td>
              <td>{{ raid.characterName }}</td>
              <td>{{ raid.text }}</td>
              <td>
                <button class="apply-button" @click="openApplyModal(raid)">신청</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer">
          <button class="register-button" @click="openRaidModal">등록</button>
        </div>
      </div>
  
      <!-- 등록 모달 -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <RaidMatchModal @close="closeModal" />
        </div>
      </div>
  
      <!-- 상세 모달 -->
      <div v-if="showDetailModal" class="modal-overlay" @click.self="closeDetailModal">
        <div class="modal-content">
          <RaidMatchDetailModal :raids="selectedRaids" :selectedRaidInfo="selectedRaidInfo" @close="closeDetailModal" />
        </div>
      </div>
  
      <!-- 신청 모달 -->
      <div v-if="showApplyModal" class="modal-overlay" @click.self="closeApplyModal">
        <div class="modal-content">
          <RaidMatchApplyModal :raidApplyCharacterInfo="raidApplyCharacterInfo" :raidNo="selectedRaidInfo.no" @close="closeApplyModal" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import RaidMatchModal from "./RaidMatchModal.vue";
  import RaidMatchDetailModal from "./RaidMatchDetailModal.vue";
  import RaidMatchApplyModal from "./RaidMatchApplyModal.vue";
  
  export default {
    name: "RaidModal",
    components: {
      RaidMatchModal,
      RaidMatchDetailModal,
      RaidMatchApplyModal,
    },
    data() {
      return {
        raidList: [],
        loading: true,
        error: null,
        selectedRaids: [],
        showModal: false,
        showDetailModal: false,
        showApplyModal: false, // 신청 모달 상태
        selectedRaidInfo: null, // 신청 모달에 전달할 데이터
      };
    },
    methods: {
      fetchRaidData() {
        axios
          .get("http://localhost:8080/api/lostark/characters/raidMatch")
          .then((response) => {
            this.raidList = response.data;
            this.loading = false;
          })
          .catch((error) => {
            console.error("Error fetching raid data:", error);
            this.error = "데이터를 불러오는 데 실패했습니다.";
            this.loading = false;
          });
      },
      registerRaid(raidNo) {
        axios
          .post("http://localhost:8080/api/lostark/characters/registerRaid", {
            raidNo,
          })
          .then(() => alert("신청이 완료되었습니다."))
          .catch(() => alert("신청에 실패했습니다."));
      },
      openRaidModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      openRaidDetailModal(raid) {
        this.loading = true;
        axios
          .get(`http://localhost:8080/api/lostark/characters/raidDetail/${raid.no}`)
          .then((response) => {
            this.selectedRaids = response.data;
            this.selectedRaidInfo = raid;
            this.showDetailModal = true;
          })
          .catch((error) => {
            console.error("Error fetching raid details:", error);
            alert("레이드 상세 정보를 불러오는 데 실패했습니다.");
          })
          .finally(() => {
            this.loading = false;
          });
      },
      closeDetailModal() {
        this.selectedRaids = [];
        this.showDetailModal = false;
      },
      openApplyModal(raid) {
        const id = sessionStorage.getItem("username");
        if (!id) {
          alert("로그인이 필요합니다.");
          return;
        }
        axios
          .get(`http://localhost:8080/api/lostark/characters/applyRaid/${id}`, {
            params: { raidId: raid.no, raidName: raid.raidName },
          })
          .then((response) => {
            this.raidApplyCharacterInfo = response.data;
            this.selectedRaidInfo = raid; // 선택된 레이드 정보를 저장
            this.showApplyModal = true;
            console.log(response);
          })
          .catch((error) => {
            console.error("Error applying for raid:", error);
            alert("레이드 신청에 실패했습니다.");
          });
      },
      closeApplyModal() {
        this.selectedRaidInfo = null; // 데이터 초기화
        this.showApplyModal = false; // 신청 모달 숨기기
      },
    },
    mounted() {
      this.fetchRaidData();
    },
  };
  </script>
  
  
  <style scoped>
  /* 기존 스타일 유지 */
  .raid-modal {
    text-align: center;
    padding: 20px;
  }
  
  .raid-table {
    margin: 0 auto;
    border-collapse: collapse;
    width: 80%;
  }
  
  .raid-table th,
  .raid-table td {
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
  
  .table-footer {
    margin-top: 3%;
    text-align: center;
    padding-top: 20px;
  }
  
  .apply-button {
    padding: 5px 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .apply-button:hover {
    background-color: #3a9b75;
  }
  
  .register-button {
    padding: 5px 10px;
    width: auto;
    max-width: 15%;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .register-button:hover {
    background-color: #0056b3;
  }
  
  /* 모달 스타일 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
  
.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 80% !important; /* 원하는 너비로 설정 */
    height: 80vh !important; /* 화면 높이에 비례하는 크기 */
    max-height: 90vh; /* 최대 높이를 90vh로 설정 */
    overflow-y: auto; /* 내용 스크롤 가능 */
}

  </style>
  