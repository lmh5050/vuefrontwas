<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>레이드 일정을 추가</h2>
      <form @submit.prevent="submitForm">
        <!-- 레이드명 (드롭다운) -->
        <div class="form-group">
          <label for="raidName">레이드 명</label>
          <select v-model="formData.raidName" required class="raid-select">
            <option value="" disabled>선택하세요</option>
            <option v-for="raid in raidNames" :key="raid.id" :value="raid.raidName">{{ raid.raidName }}</option>
          </select>
        </div>

        <!-- 대표 캐릭터 (드롭다운) -->
        <div class="form-group">
          <label for="characterName">캐릭터</label>
          <select v-model="formData.characterName" required class="character-select">
            <option value="" disabled>캐릭터를 선택하세요</option>
            <option v-for="character in raidApplyCharacterInfo" :key="character.id" :value="character.characterName">
              {{ character.characterName }} - {{ character.itemMaxLevel }} - {{ character.CharacterClassName }} - {{ character.classType }}
            </option>
          </select>
        </div>

        <!-- 시간 (달력) -->
        <div class="form-group">
          <label for="time">시간</label>
          <input type="datetime-local" id="time" v-model="formData.time" required />
        </div>

        <!-- 메모 -->
        <div class="form-group">
          <label for="text">메모</label>
          <input
            type="text"
            id="text"
            v-model="formData.text"
            required
          />
        </div>

        <div class="form-group">
          <button type="submit">등록</button>
        </div>
      </form>

      <button @click="close">닫기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // axios import 추가

export default {
  name: "RaidMatchModal",
  data() {
    return {
      raidNames: [], // 레이드명을 담을 배열
      raidApplyCharacterInfo: [], // 캐릭터 정보를 담을 배열
      formData: {
        raidName: "",
        characterName: "",
        time: "",
        text: "",
      },
      defaultDate: this.getDefaultDate(), // 기본 날짜는 오늘 날짜
    };
  },
  methods: {
    // 모달 닫기
    close() {
      this.$emit("close"); // 부모에게 모달 닫기 이벤트 전달
    },
    // 오늘 날짜를 기본 값으로 설정하는 함수
    getDefaultDate() {
      const date = new Date();
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    },
    // 레이드명 및 캐릭터 목록을 가져오는 함수
    fetchRaidNames() {
      const id = sessionStorage.getItem('username'); // 세션에서 username 가져오기
      console.log("Username from session storage:", id);

      // 캐릭터 정보 가져오기
      axios
        .get(`http://34.47.90.90:8081/api/lostark/characters/apply-raid/${id}`)
        .then((response) => {
          this.raidApplyCharacterInfo = response.data; // 서버에서 반환된 데이터 저장
        })
        .catch((error) => {
          console.error("Error fetching character info:", error);
          alert("캐릭터 정보를 불러오는 데 실패했습니다.");
        });

      // 레이드명 가져오기
      axios
        .get("http://34.47.90.90:8081/api/lostark/characters/raid")
        .then((response) => {
          this.raidNames = response.data; // 레이드명 목록을 배열에 담음
        })
        .catch((error) => {
          console.error("Error fetching raid names:", error);
        });
    },
    // 폼 제출 시 호출되는 함수
    submitForm() {
      const username = sessionStorage.getItem('username'); // 세션에서 username 가져오기
      console.log("Username from session storage:", username);

      // formData에 username 추가
      const formDataWithUsername = {
        ...this.formData,
        id: username, // username 추가
      };

      axios
        .post("http://34.47.90.90:8081/api/lostark/characters/raid-match", formDataWithUsername)
        .then((response) => {
          // 성공적으로 등록된 후 처리할 작업
          console.log("등록 성공:", response.data);
          window.location.reload(); // 페이지 새로 고침
        })
        .catch((error) => {
          // 에러 처리
          console.error("등록 실패:", error);
        });
    },
  },
  mounted() {
    this.fetchRaidNames(); // 컴포넌트가 마운트되면 레이드명 및 캐릭터 목록을 가져옵니다.
  },
};
</script>

<style scoped>
/* 셀렉트 박스 크기 조정 */
.raid-select, .character-select {
  width: 100%; /* 너비를 100%로 설정 */
  height: 40px; /* 높이를 40px로 설정 (적당한 높이로 조정) */
  font-size: 16px; /* 글자 크기를 조금 키움 */
  padding: 5px; /* 패딩을 추가하여 클릭 영역을 키움 */
}
</style>
