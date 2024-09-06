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
    <!-- Conditional rendering for explainText -->
    <div v-if="explainText" class="p-4 space-y-4 h-content-fixed">
      <div class="flex justify-end">
        <div class="bg-blue-100 text-blue-800 rounded-full px-4 py-2">
          {{ explainText }}
        </div>
      </div>

      <!-- Conditional rendering for content -->
      <div v-if="content" class="flex items-start space-x-2">
        <div
          class="bg-gray-100 rounded-lg p-4 flex-grow h-content-fixed-inner overflow-y-auto"
        >
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

      <!-- New card showing "Hello" text if both explainText and content are present -->
    </div>
    <div
      v-if="showQuestions && !explainText && !content"
      class="p-3 bg-gray-100 rounded-lg shadow-md w-[85%] mx-auto h-assist-card mt-[3%]"
    >
      <h2 class="text-lg font-bold mb-2 text-gray-800">
        Need any assistance with your queries?
      </h2>
      <p class="text-gray-600 mb-2">
        Our AI chatbot support is always available to provide answers to any
        questions but to begin with, here are some of our most asked questions
      </p>
      <div class="space-y-4">
        <div class="bg-white p-2 rounded-lg shadow cursor-pointer">
          <p class="text-gray-800 font-medium text-center">
            How have real estate owners reacted to the provisions of Union
            Budget 2024?
          </p>
        </div>
        <div class="bg-white p-2 rounded-lg shadow">
          <p class="text-gray-800 font-medium text-center cursor-pointer">
            What is the main impact of Union Budget 2024 on property owners?
          </p>
        </div>
        <div class="flex justify-center mt-4">
          <Button variant="outline" class="" @click="toggleQuestionsVisibility">
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
          @click="submitQuestion"
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
import { ref, onMounted } from "vue";
import vectorImg from "@/assets/png/Vector.png";
import axios from "axios";
import { useRoute } from "vue-router";

// Define reactive state
const title = ref(
  "Pro-Khalistani Protests Outside Indian Diplomatic Missions In London, Melbourne..."
);
const route = useRoute();
const explainText = ref("");
const content = ref("");
const questionsLeft = ref(50);
const userQuestion = ref("");
const showQuestions = ref(true);
const newsItem = ref([]);
console.log("newsItem", newsItem);
const newsId = route.params.id;

// Method to handle button click
const handleClick = () => {
  console.log("Button clicked!");
};

const toggleQuestionsVisibility = () => {
  showQuestions.value = !showQuestions.value;
};
const handleQnAClick = async () => {
  const token = localStorage.getItem("apiDataToken");

  // Check if token exists before making the request
  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const response = await axios.post(
      `https://api-uat.newsshield.io/chats/saveClickedSuggestedQnA/${newsId}`,
      null,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    newsItem.value = response.data;
  } catch (error) {
    console.error("Error fetching news item:", error);
  }
};

onMounted(() => {
  handleQnAClick();
});
// Method to submit the user question
const submitQuestion = async () => {
  if (userQuestion.value.trim()) {
    explainText.value = userQuestion.value;
    try {
      const response = await fetch(
        `https://api.example.com/data?query=${encodeURIComponent(
          userQuestion.value
        )}`
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      content.value = data.content || "No content available";
      userQuestion.value = "";
    } catch (error) {
      console.error("Error fetching data:", error);
      content.value = "Failed to load content";
    }
  } else {
    console.log("Please enter a question");
  }
};
</script>

<style scoped>
.h-content-fixed {
  height: 400px; /* Adjust height as needed */
  overflow: hidden; /* To prevent content from overflowing */
}

.h-content-fixed-inner {
  height: 100%; /* Fill the height of the parent container */
}

.h-assist-card {
  height: 390px; /* Adjust height as needed */
}

.mt-input {
  margin-top: 20px; /* Adjust to your desired spacing */
}
.bg-assist-card {
  background-image: url("../assets/png/chatbotbg.png");
  background-size: cover;
  background-position: center;
}
</style>
