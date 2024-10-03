<template>
  <div class="bg-white mt-3 rounded-[10px] p-3">
    <!-- Heading and Button -->
    <div class="w-[100%] flex justify-between">
      <div class="flex flex-row items-center gap-2">
        <div class="bg-[#FF0053] w-[4px] h-[10px] rounded-md"></div>
        <div class="heads">Campaign</div>
      </div>
      <!-- Conditionally render button based on loading state -->
      <div v-if="!isLoading && campaigns.length > 0 && campaigns1.length > 0">
        <a href="/Campaign"> <Button /></a>
      </div>
    </div>

    <!-- Loader -->
    <div
      v-if="isLoading"
      class="w-[100%] flex flex-col lg:flex-row gap-2 sm:gap-4 mt-3"
    >
      <!-- Skeleton for Campaign News -->
      <div class="w-[100%] sm:w-[100%] gap-4 flex justify-between">
        <div class="w-[100%] sm:w-[100%] md-max:w-[100%] flex justify-between">
          <Skeleton width="210px" height="100%"></Skeleton>
          <Skeleton width="210px" height="100%"></Skeleton>
          <Skeleton width="210px" height="100%"></Skeleton>
        </div>
      </div>

      <!-- Divider -->
      <div class="flex justify-center">
        <Skeleton class="skeleton w-full h-2"></Skeleton>
      </div>

      <!-- Skeleton for Campaigns List -->
      <div
        class="w-[100%] sm:w-[100%] sm:gap-2 md-max:w-[100%] flex flex-col justify-between md-max:gap-5"
      >
        <div
          class="flex flex-row gap-2.5 items-center border-b border-gray-300 pb-3"
          v-for="index in 3"
          :key="index"
        >
          <div class="w-[15px]">
            <Skeleton class="skeleton h-4 w-[15px]"></Skeleton>
          </div>
          <Skeleton class="skeleton h-4 w-[80%]"></Skeleton>
        </div>
      </div>
    </div>

    <!-- News Content -->
    <div
      v-if="!isLoading && (campaigns.length > 0 || campaigns1.length > 0)"
      class="w-[100%] flex flex-col lg:flex-row gap-2 sm:gap-4 mt-3"
    >
      <div class="w-[100%] sm:w-[100%] gap-4 flex justify-between">
        <div
          v-for="campaignNews in displayedNews(campaigns)"
          :key="campaignNews._id"
          class="w-[100%] sm:w-[100%] md-max:w-[100%] flex justify-between"
        >
          <div>
            <div
              class="relative sm:h-[220px] h-[180px] max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div class="relative w-full h-[100%]">
                <img
                  class="absolute inset-0 object-cover h-full w-full filter blur-sm"
                  :src="campaignNews.imgixUrlHighRes || fallbackImage"
                  alt="Background"
                  @click="navigateToCampingNews(campaignNews._id)"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
                ></div>
              </div>
              <div
                class="absolute inset-0 flex flex-col justify-between text-white"
              >
                <img
                  class="object-contain h-full w-full"
                  :src="campaignNews.imgixUrlHighRes || fallbackImage"
                  alt="Centered Image"
                  @click="navigateToCampingNews(campaignNews._id)"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 rounded-[10px]"
                ></div>
              </div>
            </div>

            <div class="p-2 shadow-lg rounded-b-[8px]">
              <div
                class="font-16 lines2 cursor-pointer"
                @click="navigateToCampingNews(campaignNews._id)"
              >
                {{ campaignNews.headline || "No Headline" }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="flex justify-center">
        <div class="divider1"></div>
      </div>

      <!-- Campaigns List -->
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
            <img src="@/assets/png/Group.png" alt="" />
          </div>
          <div
            class="font-14 lines2 cursor-pointer"
            @click="navigateToCampingNews(item._id)"
          >
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
import { useRouter } from "vue-router";
import Button from "./ViewAll.vue";

export default {
  components: {
    Button,
  },
  setup() {
    const screenWidth = ref(window.innerWidth);
    const campaigns = ref([]);
    const campaigns1 = ref([]);
    const isLoading = ref(true); // Loader state
    const languageId = ref("6421a32aa020a23deacecf92");
    const router = useRouter();

    async function fetchBlogs() {
      isLoading.value = true; // Start loading
      try {
        const response = await axios.post(
          `https://api-uat.newsshield.io/topic/apiForTopicsForWeb/65e17ea9842874dab8c45010`,
          {
            language: languageId.value,
            page: 1,
          }
        );
        campaigns.value = response.data.slice(0, 3);
        campaigns1.value = response.data.slice(3, 8);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        isLoading.value = false; // Stop loading
      }
    }

    const displayedNews = computed(() => {
      return (news) => {
        if (screenWidth.value <= 425) return news.slice(0, 1);
        return screenWidth.value > 1024 ? news : news.slice(0, 2);
      };
    });

    const handleResize = () => {
      screenWidth.value = window.innerWidth;
    };

    const navigateToCampingNews = (id) => {
      router.push(`/news/${id}`);
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
      navigateToCampingNews,
      isLoading, // Expose loader
      Button,
    };
  },
};
</script>

<style scoped>
.divider1 {
  height: 100%;
  background-color: #e5e7eb;
  width: 1px;
}

.lines2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
