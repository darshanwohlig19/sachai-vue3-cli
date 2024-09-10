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

    <div v-if="conversation.length" class="p-4 space-y-4 h-content-fixed">
      <div
        v-for="(message, index) in conversation"
        :key="index"
        :class="{
          'flex justify-end': message.type === 'user',
          'text-left': message.type === 'bot',
        }"
      >
        <div
          :class="{
            'bg-blue-100': message.type === 'user',
            'bg-gray-100': message.type === 'bot',
          }"
          class="p-4 rounded-lg"
        >
          <p>{{ message.text }}</p>
          <hr v-if="message.type === 'bot'" />
          <div
            class="flex items-center space-x-4"
            v-if="message.type === 'bot'"
          >
            <div class="flex-grow flex items-center space-x-4">
              <span class="text-gray-500 text-sm">
                {{ count }} questions left
              </span>
              <div class="flex-grow"></div>
            </div>
            <button
              class="p-1 rounded-full bg-gray-100 flex items-center space-x-2"
              aria-label="Like or Dislike"
            >
              <span
                :class="[
                  'p-1 rounded-full w-10 flex items-center justify-center',
                  thumbsUpSelected ? 'text-green-500' : 'bg-gray-400',
                ]"
                @click.stop="toggleThumbsUp"
              >
                <i class="pi pi-thumbs-up text-xl text-white"></i>
              </span>
              <span
                :class="[
                  'p-1 rounded-full w-10 flex items-center justify-center',
                  thumbsDownSelected ? 'text-red-500' : 'bg-gray-400',
                ]"
                @click.stop="toggleThumbsDown"
              >
                <i class="pi pi-thumbs-down text-xl text-white"></i>
              </span>
            </button>
          </div>
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
              class="p-1 rounded-full bg-gray-100 flex items-center space-x-2"
              aria-label="Like or Dislike"
            >
              <span
                :class="[
                  'p-1 rounded-full w-10 flex items-center justify-center',
                  thumbsUpSelected ? 'bg-green-500' : 'bg-gray-400',
                ]"
                @click.stop="toggleThumbsUp"
              >
                <i class="pi pi-thumbs-up text-xl text-white"></i>
              </span>
              <span
                :class="[
                  'p-1 rounded-full w-10 flex items-center justify-center',
                  thumbsDownSelected ? 'bg-red-500' : 'bg-gray-400',
                ]"
                @click.stop="toggleThumbsDown"
              >
                <i class="pi pi-thumbs-down text-xl text-white"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="shouldShowQuestions"
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
import { defineProps, ref, computed } from "vue";
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
const userQuestion = ref("");
const conversation = ref([]);
const showQuestions = ref(true);
const selectedQuestionIndex = ref(null);
const selectedQuestionAnswers = ref([]);
const thumbsUpSelected = ref(false);
const thumbsDownSelected = ref(false);

const newsId = route.params.id;

const toggleQuestionsVisibility = () => {
  showQuestions.value = !showQuestions.value;
};
const shouldShowQuestions = computed(() => {
  // Hide questions if there are messages in the conversation
  return conversation.value.length === 0 && showQuestions.value;
});

const handleQnAClick = async (question, index) => {
  userQuestion.value = question;
  selectedQuestionIndex.value = index;
  selectedQuestionAnswers.value = props.category?.suggestedQnA[index]?.answer;

  // Add user message to the conversation
  conversation.value.push({ type: "user", text: question });

  // Add the suggested answer from category to the conversation as a simulated bot response
  const suggestedAnswer = props.category?.suggestedQnA[index]?.answer;
  if (suggestedAnswer) {
    conversation.value.push({ type: "bot", text: suggestedAnswer });
  }
};

const handleChatClick = async () => {
  if (!userQuestion.value.trim()) return;
  conversation.value.push({ type: "user", text: userQuestion.value });
  try {
    const payload = { question: userQuestion.value };
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.CHAT_BOT_DATA}/${newsId}`,
      payload
    );
    const botResponse = response.data.answer; // Adjust based on API response structure

    // Add bot response to the conversation
    conversation.value.push({ type: "bot", text: botResponse });
  } catch (error) {
    console.error("Error fetching response:", error);
    conversation.value.push({
      type: "bot",
      text: "Sorry, there was an error processing your request.",
    });
  } finally {
    // Clear the input field after submission
    userQuestion.value = "";
  }
};

const toggleThumbsUp = () => {
  thumbsUpSelected.value = !thumbsUpSelected.value;
  if (thumbsUpSelected.value) {
    thumbsDownSelected.value = false;
  }
};

const toggleThumbsDown = () => {
  thumbsDownSelected.value = !thumbsDownSelected.value;
  if (thumbsDownSelected.value) {
    thumbsUpSelected.value = false;
  }
};
</script>

<style scoped>
.h-content-fixed {
  height: 400px;
  overflow-y: auto; /* Allow scrolling if content overflows */
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

/* Add styles for user and bot messages */
/* Add styles for user and bot messages */
.message {
  max-width: 75%; /* Adjust width as needed */
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 10px;
  line-height: 1.4;
}

.message-user {
  background-color: #d1e7dd; /* Light green for user messages */
  align-self: flex-end;
}

.message-bot {
  background-color: #f8f9fa; /* Light gray for bot messages */
  align-self: flex-start;
}

.message-container {
  display: flex;
  justify-content: flex-end; /* Default alignment for user messages */
}

.message-container.bot {
  justify-content: flex-start; /* Alignment for bot messages */
}

/* Icon button styles */
.bg-green-500 {
  background-color: #34d399; /* Tailwind's green-500 color */
}

.bg-red-500 {
  background-color: #ef4444; /* Tailwind's red-500 color */
}

.text-white {
  color: #ffffff;
}
</style>
