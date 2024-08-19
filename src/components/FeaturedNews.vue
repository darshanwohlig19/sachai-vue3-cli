<template>
  <div class="bg-white rounded-xl p-4">
    <div class="flex flex-row items-center gap-1">
      <div class="bg-[#FF0053] w-[3px] h-[10px] rounded-md"></div>
      <div class="text-[16px] font-lato bold">Featured News</div>
    </div>
    <div v-for="(item, index) in featured" :key="index" class="mt-3 flex gap-2">
      <div class="w-[30%]">
        <a :href="`${SACHAI_NEWS_URL}${item._id}`">
          <img
            class="w-full h-full rounded-md object-cover h-[79px]"
            :src="item?.imgixUrlHighRes || fallbackImage"
            alt=""
          />
        </a>
      </div>
      <div class="w-[70%] flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <div class="flex gap-1 text-[8px] text-gray-400 font-lato medium">
            <div class="text-[10px]">{{ item?.source || "No source" }}</div>
            <div class="text-[10px]">
              | {{ formatPublishTime(item.publishTime) }}
            </div>
          </div>
          <div class="flex gap-1">
            <span class="material-symbols-outlined text-[13px]"> share </span>
            <span class="material-symbols-outlined text-[13px]">
              bookmark
            </span>
          </div>
        </div>
        <div class="text-[11.91px] mt-1 fontCustom">
          <a :href="`${SACHAI_NEWS_URL}${item._id}`" class="hover:text-current">
            {{ item?.headline || "No Headline" }}
          </a>
        </div>
        <div class="text-[8px] font-lato mt-1 flex gap-1">
          <span class="text-red-500">Politics</span>
          <span>| 4 min read</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment"; // Import moment

export default {
  data() {
    return {
      featured: [],
      SACHAI_NEWS_URL: "https://news.sachai.io/news/",
      languageId: "6421a32aa020a23deacecf92",
    };
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
        this.featured = response.data.slice(0, 5);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
    formatPublishTime(publishTime) {
      return moment(publishTime).fromNow();
    },
  },
  mounted() {
    this.fetchBlogs();
  },
};
</script>
<style>
.fontCustom {
  font-family: "source-serif-pro-semibold";
}
</style>
