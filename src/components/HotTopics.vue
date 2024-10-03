<template>
  <div class="bg-white rounded-xl p-3">
    <div class="flex flex-row items-center gap-1">
      <div class="bg-[#FF0053] w-[3px] h-[10px] rounded-md"></div>
      <div class="heads1">Hot Topics</div>
    </div>
    <div v-if="loading" class="flex justify-center items-center h-[400px]">
      <p class="text-lg font-bold">Loading...</p>
    </div>

    <div
      v-else-if="!hot.length"
      class="flex justify-center items-center h-[400px]"
    >
      <p class="text-lg font-bold">No Topics Available</p>
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
      <div class="flex flex-col w-[80%] justify-between">
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
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import moment from "moment"; // Import moment

export default {
  data() {
    return {
      hot: [],
      loading: true, // Add loading state
      SACHAI_NEWS_URL: "https://news.sachai.io/news/",
      languageId: "6421a32aa020a23deacecf92",
    };
  },

  methods: {
    async fetchBlogs() {
      const payload = {
        language: this.languageId,
        page: 1,
      };
      try {
        this.loading = true; // Set loading to true when starting the API call
        const response = await apiService.apiCall(
          "post",
          `${apiConfig.GET_ALL_BLOGS_FOR_WEB}`,
          payload
        );
        // const response = await axios.post(
        //   "https://api-uat.newsshield.io/news/getAllBlogsForWeb",

        // );
        this.hot = response.data.slice(0, 10); // Assign the fetched blogs to 'hot'
      } catch (error) {
        console.error("Error fetching blogs:", error);
        this.hot = []; // Set hot to empty array in case of an error
      } finally {
        this.loading = false; // Set loading to false when API call is done
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
