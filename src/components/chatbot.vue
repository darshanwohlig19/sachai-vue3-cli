<template>
  <div
    class="lg:max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg bg-assist-card h-full flex flex-col w-screen"
  >
    <!-- Chat Header -->
    <div class="bg-[#320A38] text-white h-[70px]">
      <div class="text-base font-Lato leading-tight flex items-center mt-[2px]">
        <div class="flex items-center">
          <div
            class="h-[38px] w-[46px] bg-white rounded-full justify-center overflow-hidden mt-[8px] ml-3"
          >
            <img :src="commentsImg" class="mt-[6px] ml-[10px] w-[25px]" />
          </div>
          <span class="ml-2 mt-[8px] text-[20px]">Chat Assistant</span>
        </div>
      </div>
    </div>

    <!-- Chat Body -->
    <div
      ref="chatBodyRef"
      class="scrollable-container flex-grow overflow-y-auto p-1"
    >
      <!-- Suggested QnA -->
      <div>
        <!-- <vue-markdown :content="MarkDownContent" /> -->
      </div>
      <div
        v-if="category?.suggestedQnA && category.suggestedQnA.length > 0"
        class="p-3 bg-gray-100 rounded-lg shadow-md w-[95%] mx-auto mt-[3%]"
      >
        <h2 class="text-lg font-bold mb-2 text-[#131314]">
          Need any assistance with your queries?
        </h2>

        <p class="text-[#121212] mb-2">
          Our AI chatbot support is always available to provide answers to any
          questions but to begin with, here are some of our most asked questions
        </p>
        <div
          class="space-y-4 max-h-96"
          v-if="
            (showQuestions && conversation.length === 0) ||
            (!showQuestions && conversation.length !== 0)
          "
        >
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
            {{
              showQuestions && conversation.length === 0
                ? "Hide Questions"
                : !showQuestions && conversation.length !== 0
                ? "Hide Questions"
                : showQuestions
                ? "Show Questions"
                : "Show Questions"
            }}
          </Button>
        </div>
      </div>

      <!-- Conversation Messages -->
      <div v-if="conversation.length">
        <div
          v-for="(message, index) in conversation"
          :key="index"
          :class="{
            'flex justify-end mt-2 text-base': message.type === 'user',
            'flex justify-start mt-2 text-base': message.type === 'bot',
          }"
        >
          <div
            :class="{
              'bg-[#C9E6FC] text-[#1E0627] rounded-customChat flex justify-end mt-2  max-w-[22rem] p-3 shadow font-normal font-Lato':
                message.type === 'user',
              'bg-[#EFF2F7] text-[#1E0627] rounded-customAnswerChat w-96 p-3 shadow font-normal font-Lato ml-[10px]':
                message.type === 'bot' && !message.loading,
            }"
          >
            <!-- User Message -->
            <p v-if="message.type === 'user'">{{ message.text }}</p>
            <div
              v-if="message.type === 'bot' && message.loading"
              class="bg-[#EFF2F7] rounded-customAnswerChat p-3 shadow"
            >
              <ChatLoading />
            </div>

            <div v-else-if="!message.loading && message.type === 'bot'">
              <div v-html="renderMarkdown(message.text)"></div>
            </div>

            <div v-if="message.type === 'bot' && !message.loading">
              <hr class="my-2 text-[#878787]" />
              <div class="flex items-center text-sm h-[30px] space-x-1">
                <span class="text-[#878787] mr-[5px]">
                  {{ remainingQuestions }} questions left
                </span>
                <img :src="chatVectorImage" alt="Vector Logo" />
                <!-- Feedback Thumbs Up / Down -->
                <div class="flex space-x-2 ml-auto">
                  <!-- Thumbs Up Button -->
                  <button
                    class="p-2 rounded-lg bg-blue-100 text-gray-700 hover:bg-blue-200"
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
                    class="p-2 rounded-lg bg-blue-100 text-gray-700 hover:bg-blue-200"
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
    <div class="p-3">
      <div
        class="flex items-center bg-white overflow-hidden rounded-3xl border h-[54px] border-[#eaeaea] shadow-custom-red"
      >
        <input
          type="text"
          v-model="userQuestion"
          placeholder="Ask a question about this article!"
          class="flex-grow px-2 py-2 focus:outline-none h-full"
          aria-label="User question input"
          @keyup.enter="handleChatClick"
        />
        <button
          @click="handleChatClick"
          class="bg-[#320A38] text-white p-2 w-[48px] h-[100px] rounded-2xl"
          aria-label="Submit question"
        >
          <img :src="vectorImg" alt="Submit question" class="ml-[6px]" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, nextTick, computed } from "vue";
import vectorImg from "@/assets/png/Vector.png";
import commentsImg from "@/assets/svg/chatComments.svg";
import { useRoute } from "vue-router";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import { marked } from "marked";
import DOMPurify from "dompurify";
import chatVectorImage from "@/assets/svg/chatVector.svg";

// import VueMarkdown from "vue-markdown-render";
// import loadingImg from "@/assets/gif/loading.gif";
import ChatLoading from "@/common/config/chatLoader.vue";
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const chatsData = ref([]);
const chatsLimitData = ref([]);
console.log("chatsLimitData", chatsLimitData);
const userQuestion = ref("");
const conversation = ref([]);
console.log("conversationconversation", conversation);
const showQuestions = ref(true);
console.log("showQuestions", showQuestions);
const selectedQuestionIndex = ref(null);
const selectedQuestionAnswers = ref([]);
console.log("selectedQuestionAnswers", selectedQuestionAnswers);
const thumbsUpSelected = ref(false);
const thumbsDownSelected = ref(false);
const newsId = route.params.id;
const chatBodyRef = ref(null);
const loading = ref(false);
const botDataCount = ref("");
const limit = 50;

const remainingQuestions = computed(() => {
  return limit - botDataCount.value;
});
const toggleQuestionsVisibility = () => {
  showQuestions.value = !showQuestions.value;
};
const renderMarkdown = (text) => {
  const html = marked.parse(text);
  return DOMPurify.sanitize(html);
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatBodyRef.value) {
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
    }
  });
};

const handleQnAClick = async (question, index) => {
  selectedQuestionIndex.value = index;
  selectedQuestionAnswers.value = props.category?.suggestedQnA[index]?.answer;

  conversation.value.push({ type: "user", text: question });

  const suggestedAnswer = props.category?.suggestedQnA[index]?.answer;

  if (suggestedAnswer) {
    console.log("suggestedAnswer", suggestedAnswer);
    loading.value = true;
    const botMessage = typewriterEffect(suggestedAnswer);
    console.log("suggestedAnswer", suggestedAnswer);
    conversation.value.push({ type: "bot", text: botMessage });
    await nextTick();
    scrollToBottom();
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
  } finally {
    setTimeout(() => {
      loading.value = false; // Hide loading image after 10 seconds
    }, 10000);
  }
};

const handleChatClick = async () => {
  if (!userQuestion.value.trim()) return;

  // Add user's question to the conversation
  conversation.value.push({ type: "user", text: userQuestion.value });
  nextTick(() => {
    scrollToBottom();
  });
  const question = userQuestion.value;
  userQuestion.value = "";

  // Show loading spinner
  conversation.value.push({ type: "bot", loading: true });

  try {
    const payload = { question: question };
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.CHAT_BOT_DATA}/${newsId}`,
      payload
    );
    botDataCount.value = response?.data?.count;

    const botData = response?.data;
    const botResponse = botData.answer.answer;

    setTimeout(() => {
      conversation.value = conversation.value.filter(
        (message) => !message.loading
      );
      conversation.value.push({
        type: "bot",
        text: typewriterEffect(botResponse),
      });
      scrollToBottom();
    }, 5000); // 10 second delay
  } catch (error) {
    console.error("Error fetching response:", error);
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
const chatBotLimitData = async () => {
  try {
    const response = await apiService.apiCall(
      "get",
      `${apiConfig.CHAT_BOT_LIMIT}`
    );
    chatsLimitData.value = response.data;
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
    } else {
      scrollToBottom();
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
  chatBotLimitData();
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
  height: 100%;
  overflow-y: auto;
}
</style>
