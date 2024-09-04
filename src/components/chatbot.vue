<template>
  <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
    <div class="bg-purple-900 text-white p-4">
      <h2 class="text-xl font-semibold leading-tight">
        {{ title }}
      </h2>
    </div>
    <div class="p-4 space-y-4">
      <div class="flex justify-end">
        <div class="bg-blue-100 text-blue-800 rounded-full px-4 py-2">
          {{ helloText }}
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div class="bg-gray-100 rounded-lg p-4 flex-grow">
          <p class="font-semibold">{{ greeting }}</p>
        </div>
      </div>
      <div class="flex justify-end">
        <div class="bg-blue-100 text-blue-800 rounded-full px-4 py-2">
          {{ explainText }}
        </div>
      </div>
      <div class="flex items-start space-x-2">
        <div class="bg-gray-100 rounded-lg p-4 flex-grow">
          <p>{{ content }}</p>
          <hr />
          <div class="flex items-center space-x-4">
            <div class="text-gray-500 text-sm flex items-center space-x-2">
              <span>{{ questionsLeft }} questions left</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <button @click="handleClick" class="p-1 rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 p-4">
      <div class="flex items-center bg-white rounded overflow-hidden">
        <input
          type="text"
          v-model="userQuestion"
          placeholder="Ask a question about this article!"
          class="flex-grow px-4 py-2 focus:outline-none"
        />
        <button
          @click="submitQuestion"
          class="bg-purple-900 text-white p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define reactive state
const title = ref(
  "Pro-Khalistani Protests Outside Indian Diplomatic Missions In London, Melbourne..."
);
const helloText = ref("hello");
const explainText = ref("explain");
const greeting = ref("Hello! How can I assist you today?");
const content = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla lobortis enim, a vulputate lorem tincidunt et. Praesent sagittis finibus nisl sed venenatis. Sed tristique ligula eget eros venenatis, vel"
);
const questionsLeft = ref(50);
const userQuestion = ref("");

// Define methods
const handleClick = () => {
  // Logic for button click
  console.log("Button clicked!");
};

const submitQuestion = () => {
  // Logic for submitting the question
  console.log(`Question submitted: ${userQuestion.value}`);
  userQuestion.value = ""; // Clear the input after submission
};
</script>
