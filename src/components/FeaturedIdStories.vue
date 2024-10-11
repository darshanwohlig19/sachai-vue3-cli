<template>
  <div>
    <InviteLinkDialog
      :isVisible="isDialogVisible"
      :inviteLink="inviteLink"
      @close="isDialogVisible = false"
    />
    <div class="p-2 lg:h-full">
      <div
        class="flex justify-between items-center w-full mb-2 rounded-2xl mt-[5px]"
      >
        <div class="flex items-center mx-[15px]">
          <span
            class="border-l-4 border-[#FF0053] h-[13px] rounded-2xl mr-1"
          ></span>
          <span class="heads1 text-[#1E0627] ml-0 !leading-[18px]"
            >Related News</span
          >
        </div>
      </div>
      <!-- Loader -->
      <div v-if="!isLoading">
        <div v-for="n in itemsToShow" :key="n" class="flex w-full">
          <div
            v-for="n in itemsToShow1"
            :key="n"
            class="m-2 items-center shadow-md rounded-[8px] p-2 w-full"
          >
            <div class="flex flex-col sm:flex-row gap-2">
              <!-- Skeleton for Image Section -->
              <div
                class="relative sm:mx-[3px] sm:my-[3px] bg-white rounded-lg overflow-hidden w-[100%] sm:w-[25%] h-[100px] sm:h-auto"
              >
                <div class="relative w-full h-[100%]">
                  <!-- Background Skeleton -->
                  <div class="absolute inset-0">
                    <Skeleton class="w-full" />
                  </div>
                </div>
              </div>
              <!-- Skeleton for Text Section -->
              <div class="w-[100%] sm:w-[75%] flex flex-col justify-center">
                <div class="flex flex-row justify-between">
                  <div class="flex flex-row gap-1 time-date-home items-center">
                    <Skeleton width="50px" />
                    <div class="text-[#E9ECEF]">|</div>
                    <Skeleton width="80px" />
                  </div>
                  <div class="flex gap-1">
                    <Skeleton shape="circle" size="24px" />
                    <Skeleton shape="circle" size="24px" />
                  </div>
                </div>
                <div class="mt-1">
                  <div class="headline-tuncate-right flex gap-1 items-center">
                    <Skeleton width="80%" height="20px" />
                  </div>
                  <div class="headline-tuncate summary-home mt-1 text-gray-5">
                    <Skeleton width="80%" height="16px" />
                  </div>
                </div>
                <div class="time-date-home text-[#FF0053] mt-2">
                  <Skeleton width="70px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex flex-wrap lg:flex-row md:flex-row gap-3 justify-around cursor-pointer drop-shadow-lg mx-[15px] mt-[20px]"
      >
        <div
          v-for="(blog, index) in slicedData"
          :key="index"
          class="shadow-md between-Laptop-small:w-[100%] between-644-1024:!w-[100%] sm:w-[48%] flex flex-col md:flex-row sm:flex-row lg:flex-row gap-2 border-1 p-2 rounded-[8px] cursor-pointer flex-grow h-[156px] xs:!h-[100%] between-md-max-sm-max:!w-[100%]"
        >
          <div
            class="relative sm:mx-[3px] sm:my-[3px] bg-white rounded-lg overflow-hidden w-[100%] sm:w-[30%] h-[130px] sm:h-auto"
          >
            <div class="relative w-full h-[100%]">
              <img
                class="absolute inset-0 object-cover h-full w-full filter blur-md"
                :src="blog.imgixUrlHighRes || fallbackImage"
                alt="Background"
                @click="navigateToCampingNews(blog._id)"
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
                :src="blog.imgixUrlHighRes || fallbackImage"
                alt="Centered Image"
                @click="navigateToCampingNews(blog._id)"
              />
            </div>
          </div>
          <div class="w-[100%] sm:w-[65%]">
            <div
              class="flex flex-wrap items-center justify-between text-xs w-full mb-1"
            >
              <div
                class="flex gap-1 mb-[1px] time-date-home between-1023-1148:!text-[8px]"
              >
                <span class="text-[#1E0627] capitalize">
                  {{ blog?.source }}
                </span>
                <span class="text-[#1E0627]"> | </span>
                <span class="text-[#1E0627]">
                  {{ formatPublishTime(blog.publishTime) }}
                </span>
              </div>
              <div class="flex-row gap-1 pt-1 ml-auto flex items-center">
                <div>
                  <i
                    class="mdi mdi-share-variant text-black rounded-[50%] text-[19px]"
                    @click.stop="showDialog(blog)"
                  ></i>
                </div>
                <div>
                  <span
                    :class="[
                      'mdi',
                      'mdi-bookmark text-[19px] cursor-pointer',
                      getBookmarkColor(blog?.isBookmarked),
                    ]"
                    class="cursor-pointer"
                    @click.stop="addBookmark(blog)"
                  ></span>
                </div>
              </div>
            </div>

            <div
              class="headline-tuncate headine-home text-[#1E0627] cursor-pointer mb-[1px]"
              @click="navigateToFeaturedDetail(blog._id)"
            >
              {{ blog.headline || "-" }}
            </div>
            <div
              class="headline-truncate-single-line pt-[1px] summary-home text-[#878787] cursor-pointer mb-[1px]"
              @click="navigateToFeaturedDetail(blog._id)"
            >
              {{ blog.summary || "-" }}
            </div>
            <div class="flex gap-1 mt-[8px] time-date-home">
              <span class="text-neon-pink mr-1 capitalize">
                {{ blog?.category[0].name }}
              </span>
              <!-- <span class="text-[#1E0627]"> | </span> -->
              <!-- <span class="text-[#1E0627]">
                {{ formatPublishTime(blog.publishTime) }}
              </span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  onBeforeUnmount,
  defineProps,
  onMounted,
  computed,
} from "vue";
import axios from "axios";
import moment from "moment";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
// import { useRoute, useRouter } from "vue-router";
import { useRoute, useRouter } from "vue-router";
// import Button from "./ViewAll.vue";
import InviteLinkDialog from "@/common/config/shareLink.vue"; // Import the dialog component

import fallbackImage2 from "../common/config/GlobalConstants";
const fallbackImage = fallbackImage2.variables.fallbackImage;
const router = useRouter();
const isDialogVisible = ref(false); // State for dialog visibility
const inviteLink = ref(""); // Link to share, set this appropriately
const isLoading = ref(true);
const itemsToShow = ref(2);
const itemsToShow1 = ref(2);

const updateItemsToShow = () => {
  const width = window.innerWidth;
  if (width < 640) {
    itemsToShow.value = 1; // 1 on mobile
    itemsToShow1.value = 1; // 1 on mobile
  } else if (width <= 1024) {
    itemsToShow.value = 2; // 3 on tablet
    itemsToShow1.value = 1; // 3 on tablet
  } else {
    itemsToShow.value = 2; // 4 on desktop
    itemsToShow1.value = 2; // 4 on desktop
  }
};

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});
console.log("category", props);

const route = useRoute();
// const router = useRouter();

const blogs = ref([]);
const screenWidth = ref(window.innerWidth);
const newsId = ref(route.params.id || "");

const showDialog = (blog) => {
  isDialogVisible.value = true;
  inviteLink.value = blog.newsLink;
};
const fetchBlogs = async () => {
  try {
    const payload = {
      language: "6421a32aa020a23deacecf92",
    };
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_RELATED_NEWS}/${newsId.value}`,
      payload
    );
    blogs.value = response.data.map((news) => ({
      ...news,
      bookmarked: false,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    isLoading.value = false;
  }
};

const formatPublishTime = (publishTime) => {
  return moment(publishTime).fromNow();
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};
const navigateToFeaturedDetail = (id) => {
  router.push(`/news/${id}`);
};

const checkRouteParam = () => {
  newsId.value = route.params.id || "";
};
const addBookmark = async (blog) => {
  const token = localStorage.getItem("apiDataToken");
  try {
    console.log("NEWS ID:" + blog);
    const currentStatus =
      blog.isBookmarked === "Enabled" ? "Disabled" : "Enabled";

    const response = await axios.post(
      `https://api-uat.newsshield.io/bookmark/addBookmark/${blog._id}`,
      {
        status: currentStatus,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    blog.isBookmarked = currentStatus;
    return response.data;
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};
const slicedData = computed(() => {
  if (screenWidth.value < 640) {
    // Mobile devices
    return blogs.value.slice(0, 2);
  } else if (screenWidth.value >= 640 && screenWidth.value < 1024) {
    // Tablets
    return blogs.value.slice(0, 2);
  } else if (screenWidth.value >= 640 && screenWidth.value < 1025) {
    // Width between 640 and 1024
    return blogs.value.slice(0, 4);
  } else if (screenWidth.value >= 1024 && screenWidth.value < 860) {
    // Tablets
    return blogs.value.slice(0, 4);
  } else if (screenWidth.value >= 1024 && screenWidth.value <= 1400) {
    // Tablets
    return blogs.value.slice(0, 4);
  } else if (screenWidth.value >= 1400 && screenWidth.value <= 1600) {
    // Tablets
    return blogs.value.slice(0, 4);
  } else {
    // Desktop and larger devices
    return blogs.value.slice(0, 4);
  }
});
const getBookmarkColor = (isBookmarked) => {
  return isBookmarked === "Enabled" ? "text-[#FF0053]" : "mdi-bookmark-outline";
};

onBeforeMount(() => {
  fetchBlogs();
  checkRouteParam();
  window.addEventListener("resize", updateScreenWidth);
});
onMounted(() => {
  updateItemsToShow();
  window.addEventListener("resize", updateItemsToShow);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
</script>

<style scoped>
.headline-tuncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.headline-truncate-single-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
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
.multiline-truncate-one-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
