<template>
  <div
    class="text-[45px] font-bold font-lato mt-4 mr-[10px] ml-[10px] sm:mr-[60px] sm:ml-[60px]"
  >
    Browse By Topic
  </div>
  <Catagory
    @categorySelected="handleCategorySelection"
    :defaultCategoryId="defaultCategoryId"
  />
  <div class="ml-[20px] mr-[20px] sm:mr-[60px] sm:ml-[60px]">
    <div
      class="news-section-categories mt-12 flex justify-between items-center"
    >
      <div class="text-[24px] bold capitalize">{{ selectedCategoryName }}</div>
      <div class="see"><a href="#">See all &nbsp;→</a></div>
    </div>
    <div class="flex flex-wrap justify-center gap-4 sm:justify-between mt-6">
      <div
        v-for="item in displayedNews"
        :key="item._id"
        class="bg-white flex flex-col w-[418px] h-auto sm:h-[100px] sm:flex-row rounded-lg overflow-hidden"
      >
        <div class="w-full sm:w-[40%]">
          <a :href="SACHAI_NEWS_URL + item._id">
            <img
              class="w-[100%] h-[100%] sm:h-full object-cover"
              :src="item.imgixUrlHighRes"
              alt=""
            />
          </a>
        </div>
        <div
          class="w-full sm:w-[60%] pt-3 pl-3 pr-3 flex flex-col justify-between"
        >
          <div class="text-gray-400 text-[10px] flex gap-1">
            <div>{{ item.source }}</div>
            <div>| {{ formatDate(item.publishTime) }}</div>
          </div>
          <div
            class="text=[13.7px] truncate-lines-3 mt-1"
            style="line-height: 1.1"
          >
            <a class="text-[13.7px]" :href="SACHAI_NEWS_URL + item._id">
              {{ item.headline }}
            </a>
          </div>
          <div class="text-[12.6px] mt-2">
            <a
              style="color: #2a2a2a"
              :href="SACHAI_NEWS_URL + item._id"
              class="text-[12.6px]"
            >
              {{ truncateText(item.summary, 100) }}
            </a>
          </div>
          <div class="text-[10px] text-gray-500 flex items-center mt-2 mb-3">
            <span class="text-red-500 text-[10px] mr-1">Politics</span>
            <span class="text-[10px]"
              >| {{ calculateReadTime(item.content) }} min read</span
            >
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
      defaultCategoryId: localStorage.getItem("selectedCategoryId") || null,
      latestNews: [],
      SACHAI_NEWS_URL: "https://news.sachai.io/news/",
      screenWidth: window.innerWidth,
      selectedCategoryName: "Breaking News", // Default heading
    };
  },
  async created() {
    const storedCategoryId = localStorage.getItem("selectedCategoryId");
    if (storedCategoryId) {
      // Fetch news for the stored category
      this.handleCategorySelection(
        storedCategoryId,
        localStorage.getItem("selectedCategoryName") || "Breaking News"
      );
    } else {
      // Simulate the category selection event for the default category
      this.handleCategorySelection(this.defaultCategoryId, "Breaking News");
    }
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
          "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb",
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
      localStorage.setItem("selectedCategoryId", categoryId);
      localStorage.setItem("selectedCategoryName", categoryName);
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
