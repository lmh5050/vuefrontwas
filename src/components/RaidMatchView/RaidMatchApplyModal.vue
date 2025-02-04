<template>
  <div>
    <!-- 드랍다운 박스 -->
    <div class="custom-dropdown-wrapper">
      <div class="custom-dropdown" @click="toggleDropdown">
        <span>{{ selectedCharacterInfo.characterName || '캐릭터 선택' }}</span>
        <span v-if="isOpen">▲</span>
        <span v-else>▼</span>
      </div>
      <ul v-if="isOpen" class="custom-dropdown-list">
        <li 
          v-for="(character, index) in raidApplyCharacterInfo" 
          :key="index" 
          @click="selectCharacter(character)"
          class="custom-dropdown-item"
        >
          {{ character.characterName }} - {{ character.itemMaxLevel }} - {{character.CharacterClassName}} - {{character.classType}}
        </li>
      </ul>
    </div>

    <hr>

    <!-- 선택된 캐릭터 정보 표시 -->
    <div v-if="selectedCharacterInfo.characterName">
      <p>선택된 캐릭터 정보:</p>
      <p>캐릭터 이름: {{ selectedCharacterInfo.characterName }}</p>
      <p>아이템 최대 레벨: {{ selectedCharacterInfo.itemMaxLevel }}</p>
      <p>클래스 이름: {{ selectedCharacterInfo.CharacterClassName }}</p>
      <p>클래스 타입: {{ selectedCharacterInfo.classType }}</p>
    </div>

    <!-- 신청 버튼 (선택된 캐릭터가 있을 때만 보이도록 조건 추가) -->
    <div v-if="selectedCharacterInfo.characterName" class="apply-button-wrapper">
      <button @click="applyForRaid" class="apply-button">신청</button>
    </div>

    <!-- 다른 Modal 내용들 -->
  </div>
</template>

<script>
import axiosInstance from '../../axios.js'

export default {
  props: {
    raidApplyCharacterInfo: {
      type: Array,
      required: true,
    },
    raidNo: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false, // 드롭다운이 열렸는지 여부
      selectedCharacterInfo: {}, // 선택된 캐릭터 정보
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen; // 드롭다운 열기/닫기
    },
    selectCharacter(character) {
      this.selectedCharacterInfo = character; // 선택된 캐릭터 정보 저장
      this.isOpen = false; // 드롭다운 닫기
    },
    applyForRaid() {
      if (!this.selectedCharacterInfo.characterName) {
        alert("캐릭터를 선택하세요."); // 캐릭터가 선택되지 않은 경우 경고 메시지
        return;
      }

      const username = sessionStorage.getItem('username'); // sessionStorage에서 username 가져오기

      // 서버로 신청 데이터 전송
      axiosInstance
        .post("/lostark/characters/raid-match-apply", {
          raidNo: this.raidNo, // 전달받은 raidNo 사용
          characterName: this.selectedCharacterInfo.characterName, // 선택된 캐릭터 이름
          username: username, // sessionStorage에서 가져온 username
        })
        .then(() => {
          alert("신청이 완료되었습니다."); // 성공 메시지
          this.$emit("close"); // 부모 컴포넌트로 close 이벤트 전달
        })
        .catch(() => alert("신청에 실패했습니다.")); // 실패 메시지
      console.log("Raid 신청됨:", {
        raidNo: this.raidNo,
        characterName: this.selectedCharacterInfo.characterName,
        username: username, // 로그에 username 포함
      });
    },
  },
};
</script>

<style scoped>
.custom-dropdown-wrapper {
  position: relative;
  width: 100%;
}

.custom-dropdown {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.custom-dropdown:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.custom-dropdown-list {
  position: absolute;
  width: 100%;
  max-height: 200px; /* 최대 높이 설정 */
  overflow-y: auto;
  margin-top: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  z-index: 10;
  padding: 0;
  list-style-type: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.custom-dropdown-item:hover {
  background-color: #f0f0f0;
}

.custom-dropdown-list li {
  padding: 10px;
}

/* 신청 버튼 스타일 */
.apply-button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.apply-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-button:hover {
  background-color: #0056b3;
}

.apply-button:focus {
  outline: none;
}
</style>
