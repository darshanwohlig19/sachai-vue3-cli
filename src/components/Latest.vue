<template>
  <div>
    <InviteLinkDialog
      :isVisible="isDialogVisible"
      :inviteLink="inviteLink"
      @close="isDialogVisible = false"
    />
    <section class="mt-3">
      <div class="bg-white p-3 rounded-[10px]">
        <!-- Heading and Button -->
        <div class="flex justify-between w-full items-center mb-3">
          <div class="flex flex-row items-center gap-2">
            <div class="bg-[#FF0053] w-[4px] h-[13px] rounded-md"></div>
            <div class="text-[18px] font-bold font-lato">
              {{ headingText }}
            </div>
          </div>
          <!-- Conditionally render button based on loading state and data -->
          <div v-if="!isLoading && blogs.length > 0">
            <a href="/Latest"> <Button /></a>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading" class="flex flex-row gap-3 justify-between">
          <div v-for="n in itemsToShow" :key="n" class="w-[33%] md-max:w-full">
            <div class="flex flex-col bg-white rounded-[10px] shadow-lg">
              <!-- Skeleton Image -->
              <Skeleton height="156px" width />

              <!-- Skeleton for Source & Actions -->
              <div class="flex justify-between items-center p-3">
                <Skeleton width="25%" height="12px" />
              </div>
              <!-- Skeleton for Title -->
              <div class="pl-3 pr-3">
                <Skeleton width="100%" height="20px" />
              </div>

              <!-- Skeleton for Summary -->
              <div class="pl-3 pr-3 mt-3">
                <Skeleton width="100%" height="50px" />
              </div>

              <!-- Skeleton for Category & Time -->
              <div class="px-3 pb-3 mt-2 mb-2 flex gap-1">
                <Skeleton width="25%" height="12px" />
                <Skeleton width="25%" height="12px" />
              </div>
            </div>
          </div>
        </div>

        <!-- News Content -->
        <div v-if="!isLoading && blogs.length > 0">
          <div class="flex flex-row gap-3 justify-between cursor-pointer">
            <div
              v-for="news in slicedData"
              :key="news._id"
              class="w-[33%] md-max:w-full"
            >
              <div class="flex flex-col bg-white rounded-[10px] shadow-lg">
                <div
                  class="relative sm:h-[220px] h-[180px] max-w-md mx-auto bg-white rounded-lg overflow-hidden w-full"
                >
                  <div class="relative w-full h-[100%]">
                    <img
                      class="absolute inset-0 object-cover h-full w-full filter blur-md"
                      :src="news.imgixUrlHighRes || fallbackImage"
                      alt="Background"
                      @click="navigateToCampingNews(news._id)"
                    />
                    <div
                      class="absolute inset-0 bg-gradient from-transparent to-black opacity-75"
                    ></div>
                  </div>
                  <div
                    class="absolute inset-0 flex flex-col justify-between text-white"
                  >
                    <img
                      class="object-contain h-full w-full"
                      :src="news.imgixUrlHighRes || fallbackImage"
                      alt="Centered Image"
                      @click="navigateToCampingNews(news._id)"
                    />
                    <!-- <div
                      class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 rounded-[10px]"
                    ></div> -->
                  </div>
                </div>
                <div class="flex justify-between items-center pl-3 pr-3 mt-2">
                  <div
                    class="flex gap-1 text-[#676767] time-date-home text-[10px] md:text-[12px]"
                  >
                    <div>{{ news.source }}</div>
                    <span>
                      <div
                        class="text-[#676767] time-date-home text-[10px] md:text-[12px]"
                      >
                        | {{ formatPublishTime(news.publishTime) }}
                      </div>
                    </span>
                  </div>
                  <div class="flex gap-1">
                    <span
                      class="mdi mdi-share-variant text-[19px]"
                      @click.stop="showDialog(news)"
                    ></span>
                    <span
                      :class="[
                        'mdi',
                        'mdi-bookmark text-[21px] cursor-pointer',
                        getBookmarkColor(news?.isBookmarked),
                      ]"
                      @click="addBookmark(news)"
                    >
                    </span>
                  </div>
                </div>
                <div
                  class="pl-3 pr-3 mt-1 text-[16px] font-semibold"
                  @click="navigateToNewsDetail(news._id)"
                >
                  <a
                    class="hover:text-current headine-home multiline-truncate1"
                  >
                    {{ news.headline }}
                  </a>
                </div>
                <div
                  class="pl-3 pr-3 mt-1 summary-home text-gray-5 multiline-truncate"
                  @click="navigateToNewsDetail(news._id)"
                >
                  {{ news.summary }}
                </div>
                <div class="px-3 mb-3 mt-2 time-date-home flex gap-1">
                  <span class="text-red-500 bold capitalize">
                    {{
                      news?.category[0]?.name?.toLowerCase() === "ai"
                        ? news.category[0].name?.toUpperCase()
                        : news?.category[0].name?.replace(/-/g, " ")
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
import Button from "./ViewAll.vue";
import InviteLinkDialog from "@/common/config/shareLink.vue"; // Import the dialog component
import axios from "axios";
const route = useRoute();
const router = useRouter();
const isDialogVisible = ref(false); // State for dialog visibility
const inviteLink = ref(""); // Link to share, set this appropriately
import fallbackImage2 from "../common/config/GlobalConstants";
const fallbackImage = fallbackImage2.variables.fallbackImage;
const blogs = ref([]);
const relatedNews = ref([]);
const screenWidth = ref(window.innerWidth);
const headingText = ref("Latest News");
const isRelatedNews = ref(false);
const newsId = ref(route.params.id || "");
const isLoading = ref(true); // New state for loader
const itemsToShow = ref(4);

const updateItemsToShow = () => {
  const width = window.innerWidth;
  if (width < 640) {
    itemsToShow.value = 1; // 1 on mobile
  } else if (width < 1024) {
    itemsToShow.value = 3; // 3 on tablet
  } else {
    itemsToShow.value = 4; // 4 on desktop
  }
};

const showDialog = (news) => {
  isDialogVisible.value = true;
  inviteLink.value = news.newsLink;
};
const fetchBlogs = async () => {
  isLoading.value = true; // Start loading
  const payload = {
    language: "6421a32aa020a23deacecf92",
    page: 1,
  };
  try {
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_ALL_BLOGS_FOR_WEB}`,
      payload
    );
    // const response = await axios.post(
    //   "https://api-uat.newsshield.io/news/getAllBlogsForWeb",
    // );
    blogs.value = response.data.map((news) => ({
      ...news,
      bookmarked: localStorage.getItem(`bookmark_${news._id}`) === "Enabled",
    }));
    console.log("latest", response.data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    isLoading.value = false; // Stop loading
  }
};

const fetchRelatedNews = async () => {
  if (!newsId.value) return;
  isLoading.value = true; // Start loading

  const payload = {
    language: "6421a32aa020a23deacecf92",
  };
  try {
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.ADD_BOOKMARK}/${newsId.value}`,
      payload
    );
    // const response = await axios.post(
    //   `https://api-uat.newsshield.io/pinecone/getRelatedNews/${newsId.value}`
    // );
    relatedNews.value = response?.data;
    blogs.value = response.data.map((news) => ({
      ...news,
      bookmarked: localStorage.getItem(`bookmark_${news._id}`) === "Enabled",
    }));
  } catch (error) {
    console.error("Error fetching related news:", error);
  } finally {
    isLoading.value = false; // Stop loading
  }
};

const formatPublishTime = (publishTime) => {
  return moment(publishTime).fromNow();
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

const navigateToNewsDetail = (id) => {
  router.push(`/news/${id}`);
};

const getBookmarkColor = (isBookmarked) => {
  return isBookmarked === "Enabled" ? "text-[#FF0053]" : "mdi-bookmark-outline";
};

const addBookmark = async (news) => {
  const token = localStorage.getItem("apiDataToken");
  try {
    const currentStatus =
      news.isBookmarked === "Enabled" ? "Disabled" : "Enabled";

    const response = await axios.post(
      `https://api-uat.newsshield.io/bookmark/addBookmark/${news._id}`,
      {
        status: currentStatus,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    news.isBookmarked = currentStatus;
    return response.data;
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

const checkRouteParam = () => {
  newsId.value = route.params.id || "";
  if (newsId.value) {
    isRelatedNews.value = true;
    headingText.value = "Related News";
    fetchRelatedNews();
  } else {
    isRelatedNews.value = false;
    headingText.value = "Latest News";
    fetchBlogs();
  }
};

const slicedData = computed(() => {
  if (screenWidth.value < 640) {
    return blogs.value.slice(0, 1);
  } else if (screenWidth.value >= 640 && screenWidth.value < 768) {
    return blogs.value.slice(0, 2);
  } else if (screenWidth.value >= 767 && screenWidth.value < 1024) {
    return blogs.value.slice(0, 3);
  } else {
    return blogs.value.slice(0, 4);
  }
});

onMounted(() => {
  updateItemsToShow();
  window.addEventListener("resize", updateItemsToShow);

  checkRouteParam();
  window.addEventListener("resize", updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
</script>

<style scoped>
.multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}

.multiline-truncate1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
