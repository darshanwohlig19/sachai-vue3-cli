<template>
  <Catagory />
  <div class="ml-[20px] mr-[20px] sm:mr-[60px] sm:ml-[60px]">
    <div
      class="news-section-categories mt-12 flex justify-between items-center"
    >
      <div class="text-2xl font-bold">Breaking News</div>
      <div class="see-all-style"><a href="#">See all &nbsp;→</a></div>
    </div>
    <div class="flex flex-wrap justify-center gap-4 sm:justify-between mt-6">
      <div
        v-for="item in displayedNews"
        :key="item._id"
        class="sm:w-[32%] lg:w-[32%] bg-white flex flex-col sm:flex-row rounded-lg overflow-hidden"
      >
        <div class="w-full sm:w-[40%]">
          <a :href="`${SACHAI_NEWS_URL}${item._id}`">
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
              :href="`${SACHAI_NEWS_URL}${item._id}`"
              class="hover:text-current font-semibold"
            >
              {{ item.headline }}
            </a>
          </div>
          <div class="text-xs mb-2">
            <a
              :href="`${SACHAI_NEWS_URL}${item._id}`"
              class="hover:text-current"
            >
              {{ truncateText(item.summary, 100) }}
            </a>
          </div>
          <div class="text-xs text-gray-500 flex items-center">
            <span class="text-red-500 mr-1">Politics</span>
            <span>| 4 min read</span>
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
      languageId: "6421a32aa020a23deacecf92",
      categories: [],
      navcategories: [],
      navcategories3: [],
      latestNews: [],
      SACHAI_NEWS_URL: "https://news.sachai.io/news/",
      screenWidth: window.innerWidth, // Track screen width
    };
  },
  async created() {
    try {
      const blogs = await axios.post(
        "https://dev-api.askus.news/news/getAllBlogsForWeb",
        {
          language: this.languageId,
          page: 1,
        }
      );

      this.latestNews = blogs.data.slice(0, 6);
    } catch (error) {
      console.error(error);
    }
  },
  mounted() {
    window.addEventListener("resize", this.updateScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  computed: {
    displayedNews() {
      // Display only 2 items if screen width is less than 640px
      if (this.screenWidth < 640) {
        return this.latestNews.slice(0, 2);
      }
      // Otherwise, display all 6 items
      return this.latestNews;
    },
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      }
      return text;
    },
    formatDate(date) {
      return moment(date).fromNow();
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>

<style scoped>
.see-all-style {
  color: #ff0053;
  text-decoration: none;
}
.chip-button {
  background-color: #f0f0f0;
  border: 1px solid #676767;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 14px;
  color: #676767;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
  text-transform: capitalize;
}
.chip-button:hover {
  background-color: #e0e0e0;
}
.chip-button:active {
  background-color: #d0d0d0;
}
.news-section-categories {
  flex-direction: row;
  margin-top: 50px;
}
</style>
