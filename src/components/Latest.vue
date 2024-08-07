<template>
  <section>
    <div class="mt-20 mr-[60px] ml-[60px]">
      <div class="flex justify-between w-full items-center mb-5">
        <div class="text-4xl font-bold">Latest News</div>
        <div class="text-red-500">See all &nbsp;→</div>
      </div>
      <div class="flex flex-wrap gap-4 justify-between">
        <div
          v-for="blog in slicedData"
          :key="blog._id"
          class="w-[307px] p-2 bg-white rounded-md flex flex-col justify-between"
        >
          <a :href="`${SACHAI_NEWS_URL}${blog._id}`" class="block">
            <img
              class="h-[212px] w-full rounded-md object-cover"
              :src="blog.imgixUrlHighRes"
              alt=""
            />
          </a>
          <div class="flex justify-between items-center p-2">
            <div class="flex gap-1 text-gray-400 text-xs">
              <div>{{ blog.source }}</div>
              <div>| {{ formatPublishTime(blog.publishTime) }}</div>
            </div>
            <div class="flex gap-1">
              <span class="material-symbols-outlined text-md">share</span>
              <span class="material-symbols-outlined text-md">bookmark</span>
            </div>
          </div>
          <div class="p-2 text-md font-semibold">
            <a
              :href="`${SACHAI_NEWS_URL}${blog._id}`"
              class="hover:text-current"
            >
              {{ blog.headline }}
            </a>
          </div>
          <div class="p-2 mt-4 text-base">
            <a
              :href="`${SACHAI_NEWS_URL}${blog._id}`"
              class="hover:text-current"
            >
              {{ truncateText(blog.summary, 100) }}
            </a>
          </div>
          <div class="p-2 mt-4 mb-3 text-sm flex gap-1">
            <span class="text-red-500">Politics</span>
            <span>| 4 min read</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      blogs: [],
      SACHAI_NEWS_URL: "https://news.sachai.io/news/",
      languageId: "6421a32aa020a23deacecf92",
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    slicedData() {
      if (this.screenWidth < 640) {
        return this.blogs.slice(0, 2);
      }
      return this.blogs.slice(0, 4);
    },
  },
  mounted() {
    this.fetchBlogs();
    window.addEventListener("resize", this.updateScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  methods: {
    async fetchBlogs() {
      try {
        const response = await axios.post(
          "https://dev-api.askus.news/news/getAllBlogsForWeb",
          {
            language: this.languageId,
            page: 1,
          }
        );
        this.blogs = response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      }
      return text;
    },
    formatPublishTime(publishTime) {
      return moment(publishTime).fromNow();
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>
