<template>
  <div class="bg-white mt-3 rounded-[10px] p-3">
    <div class="w-[100%] flex justify-between">
      <div class="flex flex-row items-center gap-2">
        <div class="bg-[#FF0053] w-[4px] h-[10px] rounded-md"></div>
        <div class="heads">Campaign</div>
      </div>
      <div class="see-all">See all →</div>
    </div>
    <div class="w-[100%] flex flex-col lg:flex-row gap-2 sm:gap-4 mt-3">
      <div class="w-[100%] sm:w-[100%] gap-4 flex justify-between">
        <div
          v-for="campaignNews in displayedNews(campaigns)"
          :key="campaignNews._id"
          class="w-[100%] sm:w-[100%] md-max:w-[100%] flex justify-between"
        >
          <div>
            <div>
              <img
                class="w-full h-[182px] rounded-[8px] object-contain"
                :src="campaignNews.imgixUrlHighRes || fallbackImage"
              />
            </div>
            <div class="p-2 shadow-lg rounded-b-[8px]">
              <div class="font-16 lines2">
                {{ campaignNews.headline || "No Headline" }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="divider1"></div>
      </div>
      <div
        class="w-[100%] sm:w-[100%] sm:gap-2 md-max:w-[100%] flex flex-col justify-between md-max:gap-5"
      >
        <div
          v-for="(item, index) in campaigns1"
          :key="item._id"
          :class="[
            'flex flex-row gap-2.5 items-center',
            index < campaigns1.length - 1
              ? 'border-b border-gray-300 pb-3'
              : '',
          ]"
        >
          <div class="w-[15px]">
            <img src="../assets/Group.png" alt="" />
          </div>
          <div class="font-14 lines2">
            {{ item.headline || "No Headline" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { computed, onMounted, onBeforeUnmount } from "vue";

export default {
  setup() {
    const screenWidth = ref(window.innerWidth);
    const campaigns = ref([]);
    const campaigns1 = ref([]);
    const languageId = ref("6421a32aa020a23deacecf92"); // Assuming you have a languageId, adjust this as needed
    // function formatPublishTime(publishTime) {
    //   return moment(publishTime).fromNow();
    // }

    async function fetchBlogs() {
      try {
        const response = await axios.post(
          `https://api-uat.newsshield.io/news/getAllBlogsForWeb`,
          {
            language: languageId?.value,
            page: 1,
          }
        );
        campaigns.value = response?.data?.slice(0, 3);
        console.log(campaigns?.value[0]);
        campaigns1.value = response?.data?.slice(3, 8);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    const displayedNews = computed(() => {
      return (news) => {
        if (screenWidth.value <= 425) return news?.slice(0, 1);
        return screenWidth.value > 1024 ? news : news?.slice(0, 2);
      };
    });

    const handleResize = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      fetchBlogs();
      window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });
    return {
      fetchBlogs,
      displayedNews,
      campaigns,
      campaigns1,
    };
  },
};
</script>
<style scoped>
.divider {
  height: 1px;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 100%;
}
.divider1 {
  height: 100%;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 1px;
}
.lines2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
