<template>
  <div class="bg-white rounded-xl p-3">
    <div class="flex flex-row items-center gap-1">
      <div class="bg-[#FF0053] w-[3px] h-[10px] rounded-md"></div>
      <div class="text-[20px] font-lato text-bold text-[#1E0627]">
        Hot Topics
      </div>
    </div>
    <div
      v-for="(item, index) in hot"
      :key="index"
      class="mt-3 flex gap-4 items-center drop-shadow-lg border-1 p-2"
    >
      <div class="flex w-[20%] justify-center items-center">
        <a :href="`${SACHAI_NEWS_URL}${item._id}`">
          <img
            class="h-[51px] w-[51px] rounded-md object-cover"
            :src="item?.imgixUrlHighRes || fallbackImage"
            alt=""
          />
        </a>
      </div>
      <div class="flex flex-col justify-between">
        <div class="text-[14px] mt-1 fontCustom">
          <a :href="`${SACHAI_NEWS_URL}${item._id}`" class="hover:text-current">
            {{ item?.headline || "No Headline" }}
          </a>
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
      hot: [],
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
        this.hot = response.data.slice(0, 10);
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
