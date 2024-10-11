<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div
      class="bg-white overflow-hidden shadow-lg flex flex-col bg-assist-card !h-full !w-full"
    >
      <div class="bg-[#320A38] text-white h-[70px]">
        <div
          class="text-base font-Lato leading-tight flex items-center !h-[55px] mb-[8px]"
        >
          <div class="flex items-center">
            <div
              class="h-[40px] w-[42px] bg-white rounded-full justify-center overflow-hidden mt-[8px] ml-3"
            >
              <img :src="commentsImg" class="mt-[6px] ml-[9px] w-[25px]" />
            </div>
            <span
              class="ml-2 mt-[8px] text-base font-normal font-lato !text-[#ffffff]"
              >Chat Assistant</span
            >
          </div>
        </div>
        <button
          @click="$emit('close')"
          aria-label="Close chat assistant"
          class="absolute top-2 mt-[5px] text-3xl right-2 text-white"
        >
          &times;
          <!-- You can use an icon here, this is just a simple close icon -->
        </button>
      </div>

      <div
        ref="chatMobileBodyRef"
        class="scrollable-mobile-container flex-grow overflow-y-auto p-1"
      >
        <div
          v-if="category?.suggestedQnA && category.suggestedQnA.length > 0"
          class="p-3 bg-soft-cloud-gray rounded-lg w-[95%] mx-auto mt-[3%] mb-[10px]"
        >
          <h2
            class="text-sm font-bold mb-2 text-purple-10 font-lato !leading-[16.8px]"
          >
            Need any assistance with your queries?
          </h2>
          <p class="text-[#121212] mb-2 font-lato text-xs !leading-[15.6px]">
            Our AI chatbot support is always available to provide answers to any
            questions but to begin with, here are some of our most asked
            questions
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
              :class="!isTokenAvailable ? 'opacity-50 cursor-not-allowed' : ''"
            >
              <p
                class="text-[#121212] font-medium text-center text-sm font-lato"
              >
                {{ item.question }}
              </p>
            </div>
          </div>
          <div
            class="flex justify-center font-semibold font-lato mt-3 text-blue-10 text-xs !leading-[18px]"
          >
            <Button variant="outline" @click="toggleQuestionsVisibility">{{
              showQuestions ? "Hide Questions" : "Show Questions"
            }}</Button>
          </div>
        </div>

        <div v-if="conversation.length">
          <div v-for="(message, index) in conversation" :key="index">
            <div>
              <div class="flex justify-end ml-5">
                <p
                  v-if="
                    message.type === 'user' || message.type === 'qnaQuestion'
                  "
                  class="bg-[#C9E6FC] text-purple-10 rounded-customChat flex justify-start p-2 shadow !font-normal !font-lato max-w-fit w-[286px] text-sm md:!w-[400px]"
                  v-html="message.text"
                ></p>
              </div>

              <div
                v-if="
                  (message.type === 'bot' && message.loading) ||
                  (message.type === 'qnaAnswers' && message.loading)
                "
                class="bg-soft-cloud-gray rounded-customAnswerChat p-3 shadow !mr-[320px] !ml-[10px] w-[75px]"
              >
                <ChatLoading />
              </div>

              <div
                v-else-if="
                  !message.loading &&
                  (message.type === 'qnaAnswers' || message.type === 'bot')
                "
                class="bg-soft-cloud-gray text-purple-10 rounded-customAnswerChat p-2.5 shadow text-sm font-normal font-lato ml-[10px] mt-[10px] mb-[10px] xs:w-[286px] md:!w-[535px]"
              >
                <p v-html="message.text"></p>
                <div
                  v-if="
                    !message.loading &&
                    (message.type === 'qnaAnswers' || message.type === 'bot')
                  "
                >
                  <hr
                    class="my-2 text-[#878787]"
                    v-if="
                      message.type === 'bot' || message.type === 'qnaAnswers'
                    "
                  />
                  <div
                    class="flex items-center justify-end text-sm h-[20px] space-x-1"
                  >
                    <span
                      class="text-[#878787] !text-sm !font-lato !font-normal mr-[5px] flex items-center"
                      v-if="
                        (message.type === 'bot' && isLastBotMessage(index)) ||
                        (message.type === 'qnaAnswers' &&
                          isLastBotMessage(index))
                      "
                    >
                      {{ remainingQuestions }} questions left
                      <img
                        :src="exclamatory"
                        alt="exclamatory"
                        class="ml-[8px]"
                      />
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
                            message.feedback === 'positive' ||
                            message.thumbsUpSelected
                              ? thumbsUpSelected
                              : thumbsUp
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
                            message.feedback === 'negative' ||
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
      </div>

      <div class="m-[10px]">
        <div
          class="flex items-center bg-white overflow-hidden rounded-3xl border h-[40px] border-[#eaeaea] shadow-custom-red"
        >
          <input
            type="text"
            v-model="userQuestion"
            placeholder="Ask a question about this article!"
            class="flex-grow px-2 py-2 !font-lato !text-xs focus:outline-none h-full placeholder:font-normal placeholder:font-lato placeholder:text-xs !leading-[14.4px]"
            aria-label="User question input"
            @keyup.enter="handleChatClick"
          />
          <button
            @click="handleChatClick"
            class="bg-Secondary text-white p-2 w-[48px] h-[32px] mr-[3px] rounded-2xl"
            aria-label="Submit question"
          >
            <img :src="vectorImg" alt="Submit question" class="ml-[10px]" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="!hidden lg:!block mx-auto bg-white rounded-lg overflow-hidden bg-assist-card flex flex-col !h-[669px] !w-[440px] md:h-[85vh] lg:h-[670px] between-644-1024:!h-[83vh] between-Laptop:!h-[95.5vh] between-2560-187:!h-[35.5vh] !ml-[10px] between-1011-1200:!h-[725px]"
  >
    <div class="bg-[#320A38] text-white h-[55px]">
      <div class="text-base font-Lato leading-tight flex items-center mt-[2px]">
        <div class="flex items-center mt-[2px]">
          <div
            class="h-[36px] w-[36px] bg-white rounded-full justify-center overflow-hidden mt-[8px] ml-3"
          >
            <img
              :src="commentsImg"
              class="mt-[8px] ml-[8px] w-[20px] h-[20px]"
            />
          </div>
          <span
            class="ml-2 mt-[8px] text-[16px] !text-[#ffffff] font-normal font-lato"
            >Chat Assistantt</span
          >
        </div>
      </div>
    </div>

    <div
      ref="chatBodyRef"
      class="scrollable-container flex-grow overflow-y-auto p-1"
    >
      <div
        v-if="category?.suggestedQnA && category.suggestedQnA.length > 0"
        class="p-3 bg-soft-cloud-gray rounded-lg w-[95%] mx-auto mt-[3%] mb-[10px]"
      >
        <h2
          class="text-sm !leading-[16.8px] font-bold mb-2 text-[#1E0627] font-lato"
        >
          Need any assistance with your queries?
        </h2>

        <p class="text-[#121212] mb-2 text-xs font-lato !leading-[15.6px]">
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
            class="bg-white p-2 rounded-lg shadow cursor-pointer"
            :class="{
              'opacity-50 cursor-not-allowed': !isTokenAvailable,
              'cursor-pointer': isTokenAvailable,
            }"
            @click="
              isTokenAvailable ? handleQnAClick(item.question, index) : null
            "
          >
            <p class="text-[#121212] font-medium text-center text-sm font-lato">
              {{ item.question }}
            </p>
          </div>
        </div>

        <div
          class="flex justify-center font-bold font-lato text-xs mt-3 text-[#3978E1]"
        >
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
        <div v-for="(message, index) in conversation" :key="index">
          <div>
            <div class="flex justify-end ml-5">
              <p
                v-if="message.type === 'user' || message.type === 'qnaQuestion'"
                class="bg-blue-5 text-purple-10 rounded-customChat flex justify-start p-2 !font-normal !font-lato max-w-fit w-[286px] text-xs !md:w-[400px] leading-[14.4px]"
                v-html="message.text"
              ></p>
            </div>

            <div
              v-if="
                (message.type === 'bot' && message.loading) ||
                (message.type === 'qnaAnswers' && message.loading)
              "
              class="bg-soft-cloud-gray rounded-customAnswerChat p-3 !mr-[320px] !ml-[10px] w-[75px]"
            >
              <ChatLoading />
            </div>

            <div
              v-else-if="
                !message.loading &&
                (message.type === 'qnaAnswers' || message.type === 'bot')
              "
              class="bg-soft-cloud-gray text-purple-10 rounded-customAnswerChat p-2.5 !text-xs !font-normal !font-lato ml-[10px] mt-[10px] mb-[10px] w-[388px] !leading-[14.4px]"
            >
              <p v-html="message.text"></p>
              <div
                v-if="
                  !message.loading &&
                  (message.type === 'qnaAnswers' || message.type === 'bot')
                "
              >
                <hr
                  class="my-2 text-[#878787]"
                  v-if="
                    message.type === 'bot' ||
                    (message.type === 'qnaAnswers' && isLastBotMessage(index))
                  "
                />
                <div
                  class="flex items-center justify-end text-sm h-[23px] space-x-1"
                  v-if="message.type === 'bot' || message.type === 'qnaAnswers'"
                >
                  <span
                    class="text-gray-5 !text-xs !font-lato !leading-[14.4px] !font-normal mr-[5px] flex items-center"
                    v-if="
                      (message.type === 'bot' && isLastBotMessage(index)) ||
                      (message.type === 'qnaAnswers' && isLastBotMessage(index))
                    "
                  >
                    {{ remainingQuestions }} questions left
                    <img
                      :src="exclamatory"
                      alt="exclamatory"
                      class="ml-[8px]"
                    />
                  </span>

                  <div
                    v-if="message.type === 'bot'"
                    class="flex space-x-2 ml-auto"
                  >
                    <button
                      class="p-1 rounded-lg bg-blue-5 text-gray-700 hover:bg-blue-200 h-[24px] w-[25px]"
                      aria-label="Thumbs down"
                      @click.stop="toggleThumbsDown(index)"
                    >
                      <img
                        :src="
                          message.feedback === 'negative' ||
                          message.thumbsDownSelected
                            ? thumbsDownSelected
                            : thumbsDown
                        "
                        alt="Thumbs Up"
                      />
                    </button>
                    <button
                      class="p-1 rounded-lg bg-blue-5 text-gray-700 hover:bg-blue-200 h-[24px] w-[25px]"
                      aria-label="Thumbs up"
                      @click.stop="toggleThumbsUp(index)"
                    >
                      <img
                        :src="
                          message.feedback === 'positive' ||
                          message.thumbsUpSelected
                            ? thumbsUpSelected
                            : thumbsUp
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
    </div>
    <div class="m-[10px]">
      <div
        class="flex items-center bg-white overflow-hidden rounded-3xl border h-[40px] border-[#eaeaea] shadow-custom-red"
      >
        <input
          type="text"
          v-model="userQuestion"
          placeholder="Ask a question about this article!"
          class="flex-grow px-2 py-2 !font-lato !text-xs focus:outline-none h-full placeholder:font-normal placeholder:font-lato placeholder:text-sm"
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
import { defineProps, ref, onMounted, nextTick, computed, watch } from "vue";
import commentsImg from "@/assets/svg/chatComments.svg";
import { useRoute, useRouter } from "vue-router";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import vectorImg from "@/assets/svg/chatVector.svg";
import exclamatory from "@/assets/svg/exclamatory.svg";
import ChatLoading from "@/common/config/chatLoader.vue";
import thumbsUp from "@/assets/svg/thumbsUp.svg";
import thumbsDown from "@/assets/svg/thumbsDown.svg";
import thumbsUpSelected from "@/assets/svg/thumbsUpSelected.svg";
import thumbsDownSelected from "@/assets/svg/thumbsDownSelected.svg";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  category: {
    type: Object,
    required: true,
  },
  isTokenAvailable: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();

const chatsData = ref([]);
console.log("chatsData", chatsData);
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
const toast = useToast();
const newsId = route.params.id;
const chatBodyRef = ref(null);
const chatMobileBodyRef = ref(null);
const loading = ref(false);
const botDataCount = ref("");
const isTokenAvailable = computed(() => {
  return !!localStorage.getItem("apiDataToken");
});
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
    .findIndex(
      (message) => message.type === "bot" || message.type === "qnaAnswers"
    );
  return index === conversation.value.length - 1 - lastBotMessageIndex;
};

const toggleQuestionsVisibility = () => {
  showQuestions.value = !showQuestions.value;
};

const scrollToBottom = () => {
  requestAnimationFrame(() => {
    chatBodyRef.value?.scrollTo({
      top: chatBodyRef.value.scrollHeight,
      behavior: "smooth",
    });
  });
};
const scrollMobileToBottom = () => {
  requestAnimationFrame(() => {
    chatMobileBodyRef.value?.scrollTo({
      top: chatMobileBodyRef.value.scrollHeight,
      behavior: "smooth",
    });
  });
};
watch(
  () => conversation.value.length, // Watch the length of the conversation array
  () => {
    nextTick(() => {
      scrollToBottom();
      scrollMobileToBottom();
    });
  }
);
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
    scrollToBottom();
    scrollMobileToBottom();
    console.log("conversation", conversation);
    await nextTick();
    scrollToBottom();
    scrollMobileToBottom();
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
      loading.value = false;
    }, 100);
  }
};

const handleChatClick = async () => {
  const tokenAvailable = localStorage.getItem("apiDataToken");
  if (!tokenAvailable) {
    toast.add({
      severity: "warn",
      summary: "Login Required",
      summary2:
        "Please log in to start chatting and enjoy seamless communication.",
      group: "warn",
      life: 3000,
    });
    router.push("/");
    return;
  }

  // Proceed with handling the chat input
  if (!userQuestion.value.trim()) return;

  conversation.value.push({ type: "user", text: userQuestion.value });
  await nextTick();
  scrollToBottom();
  scrollMobileToBottom();
  const question = userQuestion.value;
  userQuestion.value = "";

  // Indicate loading status for bot response
  conversation.value.push({ type: "bot", loading: true });
  await nextTick();
  scrollToBottom();
  scrollMobileToBottom();

  try {
    const payload = { question: question };
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.CHAT_BOT_DATA}/${newsId}`,
      payload
    );

    if (response?.status === 200) {
      botDataCount.value = response?.data?.count;

      const botData = response?.data;
      const botResponse = botData.answer.answer;

      setTimeout(() => {
        // Remove loading status from messages
        conversation.value = conversation.value.filter(
          (message) => !message.loading
        );
        conversation.value.push({
          type: "bot",
          text: typewriterEffect(botResponse),
        });
        chatBotLimitData();
        scrollToBottom();
        scrollMobileToBottom();
      }, 100);
    } else {
      setTimeout(() => {
        // Handle error in response
        conversation.value = conversation.value.filter(
          (message) => !message.loading
        );
        conversation.value.push({
          type: "bot",
          text: "I'm sorry, something went wrong. Please try again.",
        });
        scrollToBottom();
        scrollMobileToBottom();
      }, 100);
    }
  } catch (error) {
    console.error("Error fetching response:", error);

    setTimeout(() => {
      // Handle error during the API call
      conversation.value = conversation.value.filter(
        (message) => !message.loading
      );
      conversation.value.push({
        type: "bot",
        text: "I'm sorry, something went wrong. Please try again.",
      });
      scrollToBottom();
      scrollMobileToBottom();
    }, 100);
  }
};

const handleFeedbackClick = async (feedbackType, chatId) => {
  try {
    const payload = { feedback: feedbackType };
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.CHAT_BOT_Feedback}/${chatId}`,
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
      conversation.value.push({
        type: "user",
        text: chat.question,
        chatId: chat._id,
        feedback: chat.feedback,
      });
      conversation.value.push({
        type: "bot",
        text: chat.answer,
        chatId: chat._id,
        feedback: chat.feedback,
      });
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

const typewriterEffect = (text, delay = 30) => {
  const message = ref("");
  let index = 0;

  const type = () => {
    if (index < text.length) {
      message.value += text[index];
      index++;
      setTimeout(type, delay);
    } else {
      scrollToBottom();
      scrollMobileToBottom();
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
    handleFeedbackClick("positive", message.chatId);
  }
};

const toggleThumbsDown = (index) => {
  const message = conversation.value[index];
  if (!message.thumbsDownSelected) {
    message.thumbsDownSelected = true;
    message.thumbsUpSelected = false;
    handleFeedbackClick("negative", message.chatId);
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
  background-image: url("../assets/png/chatBg.png");
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
  height: 82%;
  overflow-y: auto;
  scrollbar-width: thin;
}

/* For Webkit browsers (Chrome, Safari) */
.scrollable-container::-webkit-scrollbar {
  width: 8px; /* Slim width */
  background-color: transparent; /* Background of the scrollbar */
}

.scrollable-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background-color: #5c2a5b;
}
</style>
