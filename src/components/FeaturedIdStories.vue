<template>
  <div class="bg-white p-3 rounded-lg shadow-md mx-auto h-[682px]">
    <div class="flex justify-between w-full items-center mb-3">
      <span
        class="text-[18px] font-bold mb-1 border-l-4 border-red-500 text-[#1E0627] pl-2"
      >
        Featured News
      </span>
      <button
        className="text-[#FF0053] bg-[#fff0f5] px-3 py-1 rounded-md text-sm font-medium flex items-center"
      >
        View all &nbsp;→
      </button>
    </div>
    <div class="space-y-4">
      <div
        v-for="(item, index) in newsItems.slice(0, 7)"
        :key="index"
        class="flex items-start space-x-4 bg-white rounded-[10px] drop-shadow-md p-1 leading-none"
      >
        <img
          :src="item.imgixUrlHighRes"
          alt="News thumbnail"
          class="w-24 h-16 object-cover rounded-lg"
        />
        <div class="flex-1">
          <span class="font-semibold multiline-truncate1 text-sm mb-1">{{
            item.headline
          }}</span>
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
    return {
      newsItems: [], // Initialize newsItems
    };
  },
  methods: {
    async fetchBlogs() {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        // const categoryData = this.categories?.categoriesId?.length
        //   ? this.categories.categoriesId[0]
        //   : null;
        const response = await axios.post(
          "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb",
          { categoryId: "63d90e4098d783ac0cbe2310", languageId: languageId }
        );
        console.log("Fetched blogs:", response.data);
        this.newsItems = response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
  },
  mounted() {
    this.fetchBlogs();
    console.log("Categories prop:", this.categories);
  },
};
</script>

<style>
.fontCustom {
  font-family: "source-serif-pro-semibold";
}
.multiline-truncate1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.font-semibold {
  font-family: "Source Serif Pro", serif;
  font-weight: 600;
}
</style>
