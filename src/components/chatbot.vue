<template>
  <div
    class="lg:max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg bg-assist-card"
  >
    <div class="bg-purple-900 text-white p-4">
      <h2 class="text-xl font-semibold leading-tight">
        {{ title }}
      </h2>
    </div>
    <div v-if="!showQuestions" class="h-content-fixed"></div>

    <div v-if="explainText" class="p-4 space-y-4 h-content-fixed">
      <div class="flex justify-end">
        <div class="bg-blue-100 text-blue-800 rounded-full px-4 py-2">
          {{ explainText }}
        </div>
      </div>

      <div v-if="content" class="flex items-start space-x-2 overflow-y-auto">
        <div class="bg-gray-100 rounded-lg p-4 flex-grow h-content-fixed-inner">
          <p>{{ content }}</p>
          <hr />
          <div class="flex items-center space-x-4">
            <div class="flex-grow flex items-center space-x-4">
              <span class="text-gray-500 text-sm">
                {{ questionsLeft }} questions left
              </span>
              <div class="flex-grow"></div>
            </div>
            <button
              @click="handleClick"
              class="p-1 rounded-full bg-gray-100 flex items-center space-x-2"
              aria-label="Like or Dislike"
            >
              <span
                class="p-1 rounded-full w-10 bg-gray-400 text-[#121212] flex items-center justify-center"
              >
                <i class="pi pi-thumbs-up text-xl"></i>
              </span>
              <span
                class="p-1 rounded-full w-10 bg-gray-400 text-[#121212] flex items-center justify-center"
              >
                <i class="pi pi-thumbs-down text-xl"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        showQuestions &&
        !explainText &&
        !content &&
        selectedQuestions.length === 0
      "
      class="p-3 bg-gray-100 rounded-lg shadow-md w-[85%] mx-auto h-assist-card mt-[3%] overflow-y-auto"
    >
      <h2 class="text-lg font-bold mb-2 text-gray-800">
        Need any assistance with your queries?
      </h2>
      <p class="text-gray-600 mb-2">
        Our AI chatbot support is always available to provide answers to any
        questions but to begin with, here are some of our most asked questions
      </p>
      <div class="space-y-4 max-h-96">
        <div
          v-for="(item, index) in category?.suggestedQnA"
          :key="index"
          @click="handleQnAClick(item.question, index)"
          class="bg-white p-2 rounded-lg shadow cursor-pointer"
        >
          <p class="text-gray-800 font-medium text-center">
            {{ item.question }}
          </p>
        </div>
        <div class="flex justify-center mt-2">
          <Button variant="outline" @click="toggleQuestionsVisibility">
            Hide Questions
          </Button>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 p-4 mt-input">
      <div class="flex items-center bg-white rounded overflow-hidden">
        <input
          type="text"
          v-model="userQuestion"
          placeholder="Ask a question about this article!"
          class="flex-grow px-4 py-2 focus:outline-none"
          aria-label="User question input"
        />
        <button
          @click="handleChatClick"
          class="bg-purple-900 text-white p-2 rounded"
          aria-label="Submit question"
        >
          <img :src="vectorImg" alt="Submit question" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import vectorImg from "@/assets/png/Vector.png";
import { useRoute } from "vue-router";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const title = ref(
  "Pro-Khalistani Protests Outside Indian Diplomatic Missions In London, Melbourne..."
);
const route = useRoute();
const explainText = ref();
const content = ref("");
const questionsLeft = ref(50);
const userQuestion = ref("");
const showQuestions = ref(true);
const selectedQuestions = ref([]);
const selectedQuestionIndex = ref(null);
const selectedQuestionAnswers = ref([]);
console.log(
  "selectedQuestionAnswersselectedQuestionAnswers",
  selectedQuestionAnswers
);
const chatData = ref([]);
const newsId = route.params.id;

const handleClick = () => {
  console.log("Button clicked!");
};

const toggleQuestionsVisibility = () => {
  showQuestions.value = !showQuestions.value;
};

const handleQnAClick = (question, index) => {
  console.log("Question Clicked:", question, "Index:", index);
  explainText.value = question;
  selectedQuestionIndex.value = index;
  selectedQuestionAnswers.value = props.category?.suggestedQnA[index]?.answer;
  console.log("Selected Question Answers:", selectedQuestionAnswers.value);
  content.value = selectedQuestionAnswers.value;
  console.log("Content Value Set To:", content.value);
};

const handleChatClick = async () => {
  try {
    explainText.value = userQuestion.value;

    const payload = {
      question: explainText.value,
    };

    const response = await apiService.apiCall(
      "post",
      `${apiConfig.CHAT_BOT_DATA}/${newsId}`,
      payload
    );
    chatData.value = response.data;
  } catch (error) {
    console.error("Error fetching news item:", error);
  }
};
</script>

<style scoped>
.h-content-fixed {
  height: 400px;
  overflow: hidden;
}

.h-content-fixed-inner {
  height: 100%;
}

.h-assist-card {
  height: 390px;
}

.mt-input {
  margin-top: 20px;
}

.bg-assist-card {
  background-image: url("../assets/png/chatbotbg.png");
  background-size: cover;
  background-position: center;
}
</style>
