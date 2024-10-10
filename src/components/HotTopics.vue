<template>
  <div class="bg-white rounded-xl p-3">
    <div class="flex flex-row items-center gap-1">
      <div class="bg-[#FF0053] w-[3px] h-[10px] rounded-md"></div>
      <div class="heads1">Hot Topics</div>
    </div>
    <div v-if="!loading">
      <div
        class="flex items-center drop-shadow-lg border-1 p-2 mt-3 gap-4 sm:gap-0"
        v-for="n in 12"
        :key="n"
      >
        <div class="flex w-[20%] justify-center items-center">
          <Skeleton class="rounded-md" height="30px" size="3rem"></Skeleton>
        </div>
        <div class="flex flex-col w-[80%] justify-between">
          <Skeleton class="rounded-md" height="20px"></Skeleton>
          <Skeleton class="rounded-md mt-2" height="12px"></Skeleton>
        </div>
      </div>
    </div>
    <!-- <div
      v-else-if="!hot.length"
      class="flex justify-center items-center h-[400px]"
    >
      <p class="text-lg font-bold">No Topics Available</p>
    </div> -->
    <div
      v-else
      v-for="(item, index) in hot"
      :key="index"
      class="mt-3 gap-4 items-center shadow-md rounded-[8px] p-2"
    >
      <BlogCard
        :headline="item.headline"
        :image="item.imgixUrlHighRes || fallbackImage"
      />
    </div>
  </div>
</template>
<script>
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import moment from "moment"; // Import moment;
import fallbackImage from "../common/config/GlobalConstants";
import BlogCard from "../components/SIdeNews.vue/sideNews.vue";

export default {
  data() {
    return {
      hot: [],
      loading: true, // Add loading state
      SACHAI_NEWS_URL: "https://news.sachai.io/news/",
      languageId: "6421a32aa020a23deacecf92",
      fallbackImage: fallbackImage.variables.fallbackImage,
    };
  },
  components: {
    BlogCard,
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
        this.hot = response.data.slice(0, 15); // Assign the fetched blogs to 'hot'
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
    navigateToNewsDetail(id) {
      this.$router.push(`/news/${id}`);
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
