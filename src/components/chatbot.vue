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

    <div
      ref="chatBodyRef"
      class="scrollable-container flex-grow overflow-y-auto p-1"
    >
      <div></div>
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

      <div v-if="conversation.length">
        <div
          v-for="(message, index) in conversation"
          :key="index"
          :class="{
            'bg-[#C9E6FC] text-[#1E0627] rounded-customChat flex justify-start p-2 shadow font-normal font-Lato m-2.5 ml-[122px]':
              message.type === 'user' || message.type === 'qnaQuestion',
            'bg-[#EFF2F7] text-[#1E0627] rounded-customAnswerChat p-2.5 shadow font-normal font-Lato ml-[10px] m-2.5':
              (message.type === 'bot' && !message.loading) ||
              (message.type === 'qnaAnswers' && !message.loading),
          }"
        >
          <div>
            <p v-if="message.type === 'user'">
              {{ message.text }}
            </p>
            <p v-if="message.type === 'qnaQuestion'">{{ message.text }}</p>
            <div
              v-if="
                (message.type === 'bot' && message.loading) ||
                (message.type === 'qnaAnswers' && message.loading)
              "
              class="bg-[#EFF2F7] rounded-customAnswerChat p-3 shadow !mr-[320px] !ml-[10px]"
            >
              <ChatLoading />
            </div>

            <div v-else-if="!message.loading && message.type === 'bot'">
              <div>
                {{ message.text }}
              </div>
            </div>

            <div v-else-if="!message.loading && message.type === 'qnaAnswers'">
              <div>
                {{ message.text }}
              </div>
            </div>

            <div v-if="message.type === 'bot' && !message.loading">
              <hr class="my-2 text-[#878787]" />
              <div
                class="flex items-center justify-end text-sm h-[30px] space-x-1"
                v-if="message.type === 'bot'"
              >
                <span
                  class="text-[#878787] mr-[5px]"
                  v-if="message.type === 'bot' && isLastBotMessage(index)"
                >
                  {{ remainingQuestions }} questions left
                </span>
                <div
                  v-if="message.type === 'bot'"
                  class="flex space-x-2 ml-auto"
                >
                  <button
                    class="p-2 rounded-lg bg-blue-100 text-gray-700 hover:bg-blue-200"
                    aria-label="Thumbs up"
                    @click.stop="toggleThumbsUp(index)"
                  >
                    <img
                      :src="
                        message.thumbsUpSelected ? thumbsUpSelected : thumbsUp
                      "
                      alt="Thumbs Up"
                    />
                  </button>
                  <button
                    class="p-2 rounded-lg bg-blue-100 text-gray-700 hover:bg-blue-200"
                    aria-label="Thumbs down"
                    @click.stop="toggleThumbsDown(index)"
                  >
                    <img
                      :src="
                        message.thumbsDownSelected
                          ? thumbsDownSelected
                          : thumbsDown
                      "
                      alt="Thumbs Up"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-3">
      <div
        class="flex items-center bg-white overflow-hidden rounded-3xl border h-[40px] border-[#eaeaea] shadow-custom-red"
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
          class="bg-[#320A38] text-white p-2 w-[48px] h-[32px] mr-[3px] rounded-2xl"
          aria-label="Submit question"
        >
          <img :src="vectorImg" alt="Submit question" class="ml-[10px]" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, nextTick, computed } from "vue";
import commentsImg from "@/assets/svg/chatComments.svg";
import { useRoute } from "vue-router";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import vectorImg from "@/assets/svg/chatVector.svg";
import ChatLoading from "@/common/config/chatLoader.vue";
import thumbsUp from "@/assets/svg/thumbsUp.svg";
import thumbsDown from "@/assets/svg/thumbsDown.svg";
import thumbsUpSelected from "@/assets/svg/thumbsUpSelected.svg";
import thumbsDownSelected from "@/assets/svg/thumbsDownSelected.svg";
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
console.log("selectedQuestionIndex", selectedQuestionIndex);
const selectedQuestionAnswers = ref([]);
console.log("selectedQuestionAnswers", selectedQuestionAnswers);

const newsId = route.params.id;
const chatBodyRef = ref(null);
const loading = ref(false);
const botDataCount = ref("");

const remainingQuestions = computed(() => {
  const limit = chatsLimitData.value?.limit;
  console.log("limit", limit);
  const count = chatsLimitData.value?.count;
  console.log("count", count);
  return limit - count;
});

const isLastBotMessage = (index) => {
  const lastBotMessageIndex = conversation.value
    .slice()
    .reverse()
    .findIndex((message) => message.type === "bot");
  return index === conversation.value.length - 1 - lastBotMessageIndex;
};

const toggleQuestionsVisibility = () => {
  showQuestions.value = !showQuestions.value;
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
  conversation.value.push({ type: "qnaQuestion", text: question });
  const suggestedAnswer = props.category?.suggestedQnA[index]?.answer;

  if (suggestedAnswer) {
    console.log("suggestedAnswer", suggestedAnswer);
    loading.value = true;
    const botMessage = typewriterEffect(suggestedAnswer);
    console.log("suggestedAnswer", suggestedAnswer);
    conversation.value.push({ type: "qnaAnswers", text: botMessage });
    console.log("conversation", conversation);
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
    chatBotLimitData();
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
      chatBotLimitData();
      scrollToBottom();
    }, 10000); // 10 second delay
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

const toggleThumbsUp = (index) => {
  const message = conversation.value[index];
  if (!message.thumbsUpSelected) {
    message.thumbsUpSelected = true;
    message.thumbsDownSelected = false;
    handleFeedbackClick("positive", index);
  }
};

const toggleThumbsDown = (index) => {
  const message = conversation.value[index];
  if (!message.thumbsDownSelected) {
    message.thumbsDownSelected = true;
    message.thumbsUpSelected = false;
    handleFeedbackClick("negative", index);
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
