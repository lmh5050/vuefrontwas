<template>
  <div>
    <h3>레이드 상세 정보</h3>
    <div v-if="selectedRaidInfo" style="padding-bottom: 2%;">
      <span style="margin-right: 5px;">시간: <span style="font-weight: bold;">{{ selectedRaidInfo.time }}</span> |</span>
      <span style="margin-right: 5px;">레이드 명: <span style="font-weight: bold;">{{ selectedRaidInfo.raidName }}</span> |</span>
      <span style="margin-right: 5px;">공대장: <span style="font-weight: bold;">{{ selectedRaidInfo.characterName }}</span></span>
    </div>
    <div class="raid-details">
      <div v-for="(raid, index) in raids" :key="index" class="raid-item">
        <!-- 참여 여부 표시 (공대장일 경우만 조건부로 표시) -->
        <p v-if="isLeader === selectedRaidInfo.id && raid.status === '0'">
          참여 여부: 
          <span 
            style="font-size: 24px; color: green; cursor: pointer;" 
            @click="toggleParticipation(index, true)"
          >
            ✔
          </span>
          |
          <span 
            style="font-size: 24px; color: red; cursor: pointer;" 
            @click="toggleParticipation(index, false)"
          >
            ✘
          </span>
        </p>
        <p>참여 캐릭터: {{ raid.characterName }}</p>
        <p>아이템 최대 레벨: {{ raid.itemMaxLevel }}</p>
        <p>클래스 이름: {{ raid.characterClassName }}</p>
        <p>클래스 타입: {{ raid.classType }}</p>
      </div>
    </div>
    <button v-if="isLeader === selectedRaidInfo.id"
    @click="handleRegister" class="register-button"> 레이드 진행 완료 </button>
    <button @click="refreshPage" class="close-button"> 닫기 </button>
  </div>
</template>

<script>
import axiosInstance from '../../axios.js'

export default {
  name: "RaidMatchDetailModal",
  props: {
    selectedRaidInfo: Object, // 부모에서 받은 선택된 레이드 정보
    raids: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // 공대장인지 확인
    isLeader() {
      const username = sessionStorage.getItem("username"); // 세션스토리지에서 username 가져오기
      return username;
    },
  },
  methods: {
    async toggleParticipation(index, participation) {
      // 참여 캐릭터 데이터
      const characterName = this.raids[index].characterName;
      const raidNo = this.raids.raidNo;

      // 전송할 데이터 생성
      const payload = {
        characterName: characterName,
        status: participation ? 1 : 2, // 1은 참여, 2는 불참
        raidNo: raidNo,
      };

      // API 호출
      const response = await axiosInstance.post(
        "/lostark/characters/raid/raid-participate",
        payload
      );
      console.log("응답:", response.data);
      
      // 새로고침
      this.refreshPage();
    },

    async handleRegister() {
    // 완료 버튼 클릭 시 호출
      const payload = {
        raids: this.raids, // raids 배열 통째로 포함
        raidName: this.selectedRaidInfo.raidName, // 공대장 ID
        raidNo: this.raids.raidNo
      };

      try {
        console.log("전송 데이터:", payload);
        const response = await axiosInstance.post(
          "/lostark/characters/raid/raid-end",
          payload
        );
        console.log("등록 성공:", response.data);
        console.log(payload + "페이로드~");
        alert("레이드가 성공적으로 등록되었습니다.");
        this.refreshPage();
      } catch (error) {
        console.error("등록 실패:", error);
        alert("레이드 등록 중 오류가 발생했습니다.");
      }
    },

    // 페이지 새로고침 메서드
    refreshPage() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.raid-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
}

.raid-item {
  flex: 1 1 250px;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3a9b75;
}

.register-button {
  background-color: #007bff; /* 파란색 */
  color: white;
}

.register-button:hover {
  background-color: #0056b3; /* 더 진한 파란색 */
}

.close-button {
  background-color: #28a745; /* 초록색 */
  color: white;
}

.close-button:hover {
  background-color: #218838; /* 더 진한 초록색 */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* 더 진한 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  width: 90vw; /* 90% of the viewport width */
  height: 80vh; /* 80% of the viewport height */
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
}
</style>
