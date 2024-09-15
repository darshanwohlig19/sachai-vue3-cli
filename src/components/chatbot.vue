<template>
  <div
    class="lg:max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg bg-assist-card h-[682px] flex flex-col w-screen"
  >
    <!-- Chat Header -->
    <div class="bg-[#320A38] text-white h-[70px]">
      <div class="text-base font-Lato leading-tight flex items-center">
        <div
          class="h-[2rem] w-[10%] bg-white rounded-full flex items-center justify-center overflow-hidden mt-3 ml-3"
        >
          <img :src="commentsImg" />
        </div>
        <span class="ml-2 mt-[10px]">Chat Assistant</span>
      </div>
    </div>

    <!-- Chat Body -->
    <div class="scrollable-container flex-grow overflow-y-auto p-1">
      <!-- Suggested QnA -->
      <div
        v-if="category?.suggestedQnA && category.suggestedQnA.length > 0"
        class="p-3 bg-gray-100 rounded-lg shadow-md w-[95%] mx-auto showQuestions ? 'h-assist-card' : 'h-0 overflow-hidden' mt-[3%]"
      >
        <h2 class="text-lg font-bold mb-2 text-[#131314]">
          Need any assistance with your queries?
        </h2>
        <p class="text-[#121212] mb-2">
          Our AI chatbot support is always available to provide answers to any
          questions but to begin with, here are some of our most asked questions
        </p>
        <div class="space-y-4 max-h-96" v-if="showQuestions">
          <div
            v-for="(item, index) in category?.suggestedQnA"
            :key="index"
            @click="handleQnAClick(item.question, index)"
            class="bg-white p-2 rounded-lg shadow cursor-pointer"
          >
            <p class="text-[#121212] font-medium text-center">
              {{ item.question }}
            </p>
          </div>
        </div>
        <div class="flex justify-center mt-3 text-[#3978E1]">
          <Button variant="outline" @click="toggleQuestionsVisibility">
            {{ showQuestions ? "Hide Questions" : "Show Questions" }}
          </Button>
        </div>
      </div>

      <!-- Conversation Messages -->
      <div v-if="conversation.length">
        <div
          v-for="(message, index) in conversation"
          :key="index"
          :class="{
            'flex justify-end mt-2 font-medium ': message.type === 'user',
            'flex justify-start mt-2 font-medium': message.type === 'bot',
          }"
        >
          <!-- Message Box for both User and Bot -->
          <div
            :class="{
              'bg-blue-100 text-blue-900 rounded-b-sm ':
                message.type === 'user',
              'bg-gray-100 text-gray-800': message.type === 'bot',
            }"
            class="p-3 rounded-lg max-w-[22rem] shadow"
          >
            <!-- Message Text -->
            <p v-if="message.type === 'user'">{{ message.text }}</p>
            <p v-if="message.type === 'bot'">{{ message.text }}</p>

            <!-- Bot-specific Feedback Section -->
            <div v-if="message.type === 'bot'">
              <hr class="my-2" />
              <div
                class="flex items-center justify-between text-sm text-gray-500"
              >
                <span>{{ questionsLeft }} questions left</span>

                <!-- Feedback Thumbs Up / Down -->
                <div class="flex space-x-2">
                  <!-- Thumbs Up Button -->
                  <button
                    class="p-1 rounded-full bg-blue-100 text-gray-700 hover:bg-blue-200"
                    aria-label="Thumbs up"
                    @click.stop="toggleThumbsUp"
                  >
                    <i
                      :class="
                        thumbsUpSelected ? 'text-green-500' : 'text-[#1E0627]'
                      "
                      class="pi pi-thumbs-up"
                    ></i>
                  </button>

                  <!-- Thumbs Down Button -->
                  <button
                    class="p-1 rounded-full bg-blue-100 text-gray-700 hover:bg-blue-200"
                    aria-label="Thumbs down"
                    @click.stop="toggleThumbsDown"
                  >
                    <i
                      :class="
                        thumbsDownSelected ? 'text-red-500' : 'text-[#1E0627]'
                      "
                      class="pi pi-thumbs-down"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input (Fixed at bottom) -->
    <div class="bg-gray-100 p-4">
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
          class="bg-[#320A38] text-white p-2 rounded"
          aria-label="Submit question"
        >
          <img :src="vectorImg" alt="Submit question" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import vectorImg from "@/assets/png/Vector.png";
import commentsImg from "@/assets/svg/chatComments.svg";
import { useRoute } from "vue-router";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const chatsData = ref([]);
console.log("chatsDatachatsData", chatsData);
const userQuestion = ref("");
const conversation = ref([]);
console.log("conversationconversation", conversation);
const showQuestions = ref(true);
console.log("showQuestionsshowQuestions", showQuestions);
const selectedQuestionIndex = ref(null);
const selectedQuestionAnswers = ref([]);
console.log(
  "selectedQuestionAnswersselectedQuestionAnswers",
  selectedQuestionAnswers
);
const thumbsUpSelected = ref(false);
const thumbsDownSelected = ref(false);
const newsId = route.params.id;

// const shouldShowQuestions = computed(() => {
//   return conversation.value.length === 0 && showQuestions.value;
// });

const toggleQuestionsVisibility = () => {
  showQuestions.value = !showQuestions.value;
};
const handleQnAClick = async (question, index) => {
  selectedQuestionIndex.value = index;
  selectedQuestionAnswers.value = props.category?.suggestedQnA[index]?.answer;

  conversation.value.push({ type: "user", text: question });

  const suggestedAnswer = props.category?.suggestedQnA[index]?.answer;

  if (suggestedAnswer) {
    const botMessage = typewriterEffect(suggestedAnswer);
    conversation.value.push({ type: "bot", text: botMessage });
  }

  const payload = { question: question };
  try {
    await apiService.apiCall(
      "post",
      `${apiConfig.ADD_QA_DATA}/${newsId}`,
      payload
    );
  } catch (error) {
    console.error("Error fetching response:", error);
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

    const botResponse = typewriterEffect(response.data.answer.answer);
    conversation.value.push({ type: "bot", text: botResponse });

    userQuestion.value = "";
  } catch (error) {
    console.error("Error fetching response:", error);
    userQuestion.value = "";
  }
};

const handleFeedbackClick = async (feedbackType) => {
  try {
    const payload = { feedback: feedbackType };
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.CHAT_BOT_Feedback}/${newsId}`,
      payload
    );
    console.log("Feedback response:", response);
  } catch (error) {
    console.error("Error sending feedback:", error);
  }
};
const chatBotData = async () => {
  try {
    const response = await apiService.apiCall(
      "get",
      `${apiConfig.GET_CHAT_BOT_DATA}/${newsId}`
    );
    chatsData.value = response.data;

    // Populate conversation array with chatsData
    chatsData.value.forEach((chat) => {
      conversation.value.push({ type: "user", text: chat.question });
      conversation.value.push({ type: "bot", text: chat.answer });
    });
  } catch (error) {
    console.error("Error fetching news item:", error);
  }
};

const typewriterEffect = (text, delay = 50) => {
  const message = ref("");
  let index = 0;

  const type = () => {
    if (index < text.length) {
      message.value += text[index];
      index++;
      setTimeout(type, delay);
    }
  };

  type();
  return message;
};
const toggleThumbsUp = () => {
  thumbsUpSelected.value = !thumbsUpSelected.value;
  if (thumbsUpSelected.value) {
    thumbsDownSelected.value = false;
    handleFeedbackClick("positive");
  }
};

const toggleThumbsDown = () => {
  thumbsDownSelected.value = !thumbsDownSelected.value;
  if (thumbsDownSelected.value) {
    thumbsUpSelected.value = false;
    handleFeedbackClick("negative");
  }
};
onMounted(() => {
  chatBotData();
});
</script>

<style scoped>
.h-content-fixed {
  height: 400px;
  overflow-y: auto;
}

.h-assist-card {
  height: 390px;
}

.bg-assist-card {
  background-image: url("../assets/png/chatbotbg.png");
  background-size: cover;
  background-position: center;
}

.message {
  max-width: 75%;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 10px;
  line-height: 1.4;
}

.message-user {
  background-color: #d1e7dd;
  align-self: flex-end;
}

.message-bot {
  background-color: #f8f9fa;
  align-self: flex-start;
}

.message-container {
  display: flex;
  justify-content: flex-end;
}

.message-container.bot {
  justify-content: flex-start;
}

.bg-green-500 {
  background-color: #34d399;
}

.bg-red-500 {
  background-color: #ef4444;
}

.text-white {
  color: #ffffff;
}
.scrollable-container {
  height: 100%; /* Set your desired height */
  overflow-y: auto; /* Enable vertical scrolling */
}
</style>
