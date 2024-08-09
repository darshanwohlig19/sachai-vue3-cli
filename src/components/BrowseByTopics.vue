<template>
  <Catagory @categorySelected="handleCategorySelection" />
  <div class="ml-[20px] mr-[20px] sm:mr-[60px] sm:ml-[60px]">
    <div
      class="news-section-categories mt-12 flex justify-between items-center"
    >
      <div class="h111 capitalize">{{ selectedCategoryName }}</div>
      <div class="see"><a href="#">See all &nbsp;→</a></div>
    </div>
    <div class="flex flex-wrap justify-center gap-4 sm:justify-between mt-6">
      <div
        v-for="item in displayedNews"
        :key="item._id"
        class="sm:w-[32%] lg:w-[32%] bg-white flex flex-col sm:flex-row rounded-lg overflow-hidden"
      >
        <div class="w-full sm:w-[40%]">
          <a :href="SACHAI_NEWS_URL + item._id">
            <img
              class="w-full h-40 sm:h-full object-cover"
              :src="item.imgixUrlHighRes"
              alt=""
            />
          </a>
        </div>
        <div class="w-full sm:w-[60%] p-4 flex flex-col justify-between">
          <div class="text-gray-400 text-xs flex gap-1 mb-2">
            <div>{{ item.source }}</div>
            <div>| {{ formatDate(item.publishTime) }}</div>
          </div>
          <div class="text-sm mb-2">
            <a
              :href="SACHAI_NEWS_URL + item._id"
              class="hover:text-current font-semibold"
            >
              {{ item.headline }}
            </a>
          </div>
          <div class="text-xs mb-2">
            <a :href="SACHAI_NEWS_URL + item._id" class="hover:text-current">
              {{ truncateText(item.summary, 100) }}
            </a>
          </div>
          <div class="text-xs text-gray-500 flex items-center">
            <span class="text-red-500 mr-1">{{ item.category }}</span>
            <span>| {{ calculateReadTime(item.content) }} min read</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import Catagory from "./Catagory.vue";

export default {
  components: {
    Catagory,
  },
  data() {
    return {
      latestNews: [],
      SACHAI_NEWS_URL: "https://news.sachai.io/news/",
      screenWidth: window.innerWidth,
      selectedCategoryName: "Breaking News", // Default heading
      defaultCategoryId: "breaking-news-id", // Replace with actual ID for "Breaking News"
    };
  },
  async created() {
    // Simulate the category selection event for the default category
    this.handleCategorySelection(this.defaultCategoryId, "Breaking News");
  },
  mounted() {
    this.updateScreenWidth();
    window.addEventListener("resize", this.updateScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  computed: {
    displayedNews() {
      return this.screenWidth < 640
        ? this.latestNews.slice(0, 2)
        : this.latestNews;
    },
  },
  methods: {
    async fetchNewsForCategory(
      categoryId = this.defaultCategoryId,
      categoryName = "Breaking News"
    ) {
      this.selectedCategoryName = categoryName; // Update the heading

      console.log("Fetching news for category:", categoryId);

      try {
        const response = await axios.post(
          "https://dev-api.askus.news/news/getCategoryWiseNewsForWeb",
          {
            categoryId,
          }
        );
        this.latestNews = response.data.slice(0, 6);
      } catch (error) {
        console.error(error);
      }
    },
    handleCategorySelection(categoryId, categoryName) {
      this.fetchNewsForCategory(categoryId, categoryName);
    },
    truncateText(text, maxLength) {
      return text && text.length > maxLength
        ? text.slice(0, maxLength) + "..."
        : text;
    },
    formatDate(date) {
      return moment(date).fromNow();
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    calculateReadTime(content) {
      if (!content || typeof content !== "string") {
        return "0"; // Return 0 if content is undefined or not a string
      }

      const wordsPerMinute = 200; // Average reading speed
      const words = content.split(" ").length;
      return Math.ceil(words / wordsPerMinute);
    },
  },
};
</script>

<style scoped>
/* Your existing styles for the news component */
</style>
