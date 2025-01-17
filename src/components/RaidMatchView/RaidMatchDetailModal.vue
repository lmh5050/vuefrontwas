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
        <!-- 참여 여부 표시 (조건부 렌더링 추가) -->
        <p v-if="isLeader">
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
    <button @click="$emit('close')"> 닫기 </button>
  </div>
</template>

<script>
import axios from "axios"; // axios 임포트

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
      return username === this.selectedRaidInfo.characterName; // username과 공대장이 일치하는지 확인
    },
  },
  methods: {
    async toggleParticipation(index, participation) {
      // 참여 캐릭터 데이터
      const characterName = this.raids[index].characterName;

      // 전송할 데이터 생성
      const payload = {
        characterName: characterName,
        status: participation ? 1 : 2, // 1은 참여, 2는 불참
      };

      try {
        // API 호출
        const response = await axios.post("http://34.47.90.90:8081/api/raid/participation", payload);
        console.log("응답:", response.data);

        // 성공 메시지 또는 UI 업데이트
        alert(`참여 상태가 성공적으로 업데이트되었습니다: ${characterName}`);
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        alert("참여 상태 업데이트 중 오류가 발생했습니다.");
      }
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
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3a9b75;
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
