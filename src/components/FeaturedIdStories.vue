<template>
  <div class="bg-white p-3 rounded-lg shadow-md mx-auto h-[682px]">
    <span
      class="text-lg font-bold mb-4 border-l-4 text-[#1E0627] border-red-500 pl-2"
    >
      Featured News
    </span>
    <div class="space-y-4">
      <div
        v-for="(item, index) in newsItems"
        :key="index"
        class="flex items-start space-x-4"
      >
        <img
          :src="item.image"
          alt="News thumbnail"
          class="w-24 h-24 object-cover rounded-lg"
        />
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center space-x-2">
              <img
                src="/toi-logo.png"
                alt="Times of India"
                class="w-6 h-6 rounded-full"
              />
              <span class="text-sm text-gray-600">
                Times of India | {{ item.time }}
              </span>
            </div>
            <div class="flex space-x-2">
              <button class="text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                  />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
            </div>
          </div>
          <h3 class="font-semibold text-lg mb-1">{{ item.title }}</h3>
          <div class="flex items-center text-sm">
            <span class="text-red-500 font-medium mr-2">{{
              item.category
            }}</span>
            <span class="text-gray-500">{{ item.readTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    async fetchBlogs() {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        const response = await axios.post(
          "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb",
          { categoryId: "63d90fa9aabaf4bf0169c2b6", languageId: languageId }
        );
        console.log("Fetched blogs:", response.data);
        // Handle response.data as needed
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
  },
  mounted() {
    // this.fetchBlogs();
    console.log("Categories prop:", this.categories);
  },
};
</script>

<style>
.fontCustom {
  font-family: "source-serif-pro-semibold";
}
</style>
