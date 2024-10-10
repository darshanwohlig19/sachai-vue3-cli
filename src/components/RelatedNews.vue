<template>
  <div class="p-2 mt-3">
    <InviteLinkDialog
      :isVisible="isDialogVisible"
      :inviteLink="inviteLink"
      @close="isDialogVisible = false"
    />

    <div class="flex justify-between items-center w-full mb-2 rounded-2xl">
      <div class="flex items-center mx-[15px]">
        <span
          class="border-l-4 border-[#FF0053] h-[13px] rounded-2xl mr-1"
        ></span>
        <span class="heads1 xs:!text-[17px] text-[#1E0627] ml-0 !leading-[18px]"
          >Featured News</span
        >
      </div>

      <div v-if="isLoading && featuredNewsItem.length > 0" class="mx-[15px]">
        <a href="/featured-news"> <Button /></a>
      </div>
    </div>
    <!-- Loader -->
    <div v-if="!isLoading" class="flex flex-row gap-3 justify-between mt-3 mx-[15px] mb-3 sm:mb-0">
      <div v-for="n in itemsToShow" :key="n" class="w-[33%] md-max:w-full">
        <div class="flex flex-col bg-white rounded-[10px] shadow-lg">
          <!-- Skeleton Image -->
          <Skeleton height="156px" width />

          <!-- Skeleton for Category & Time -->
          <div class="px-3 pb-3 mt-2 flex gap-1 w-[100%]">
            <div class="flex gap-1 w-[85%]">
              <Skeleton width="25%" height="12px" />
              <Skeleton width="25%" height="12px" />
            </div>
            <div class="flex gap-1 w-[15%]">
              <Skeleton shape="circle" size="20px" />
              <Skeleton shape="circle" size="20px" />
            </div>
          </div>
          <!-- Skeleton for Title -->
          <div class="pl-3 pr-3">
            <Skeleton width="100%" height="20px" />
          </div>

          <!-- Skeleton for Summary -->
          <div class="pl-3 pr-3 mt-3 mb-2">
            <Skeleton width="100%" height="50px" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col lg:flex-row md:flex-row gap-3 justify-between cursor-pointer drop-shadow-lg md:h-[330px] mx-[15px]"
    >
      <div
        v-for="news in slicedData"
        :key="news._id"
        class="w-full lg:w-[33%] sm:w-[48%] md:w-[32%]"
      >
        <div
          class="flex flex-col bg-white rounded-[10px] h-full drop-shadow-sm xs:!h-[325px] xxsss:!h-[325px]"
        >
          <div
            class="relative h-[40%] max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden w-full"
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
                @click="navigateToFeaturedDetail(news._id)"
              />
              <!-- <div
                      class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 rounded-[10px]"
                    ></div> -->
            </div>
          </div>
          <div class="h-[60%]">
            <div class="flex justify-between items-center p-3 py-0 !pt-[3%]">
              <div
                class="flex gap-1 text-[#676767] time-date-home between-644-1024:!text-[11px] text-xs"
              >
                <div @click="navigateToFeaturedDetail(news._id)">
                  {{ news.source }}
                </div>
                <div @click="navigateToFeaturedDetail(news._id)">
                  | {{ formatPublishTime(news.publishTime) }}
                </div>
              </div>
              <div class="flex gap-1">
                <span
                  class="mdi mdi-share-variant text-[19px] cursor-pointer text-[#1E0627]"
                  @click.stop="showDialog(news)"
                ></span>
                <span
                  :class="[
                    'mdi',
                    'mdi-bookmark text-[21px] cursor-pointer',
                    getBookmarkColor(news?.isBookmarked),
                  ]"
                  class="cursor-pointer"
                  @click.stop="addBookmark(news)"
                >
                </span>
              </div>
            </div>
            <div class="p-3 py-0 headine-home">
              <a
                @click="navigateToNewsDetail(news._id)"
                class="hover:text-current headine-home multiline-truncate1 !text-[#1E0627]"
              >
                {{ news?.headline }}
              </a>
            </div>
            <div
              class="p-3 para multiline-truncate summary-home !pt-[2%] text-[#878787]"
              @click="navigateToNewsDetail(news._id)"
            >
              {{ news?.summary }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- The rest of your code remains unchanged -->

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  defineProps,
  // toRefs,
} from "vue";

import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import axios from "axios";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
import Button from "./ViewAll.vue";
import InviteLinkDialog from "@/common/config/shareLink.vue"; // Import the dialog component
import fallbackImage2 from "../common/config/GlobalConstants";
const fallbackImage = fallbackImage2.variables.fallbackImage;
const route = useRoute();
const router = useRouter();
const featuredNewsItem = ref([]);
const isLoading = ref(true); // New state for loader
console.log("featuredNewsItem", featuredNewsItem);
const itemsToShow = ref(4);

const isDialogVisible = ref(false); // State for dialog visibility
const inviteLink = ref(""); // Link to share, set this appropriately
const props = defineProps(
  ["category"]
  //   {category: {
  //     type: Object,
  //     required: true,
  //   },
  // }
);

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
const categoryId = computed(() => {
  console.log("props---", props.value);
  console.log("props?.category--", props?.category);
  console.log("props?.category?.categoriesId", props?.category?.categoriesId);
  return props?.category?.categoriesId[0];
});
const blogs = ref([]);
console.log("blogs", blogs);
const screenWidth = ref(window.innerWidth);
const newsId = ref(route.params.id || "");

const fetchBlogs = async () => {
  isLoading.value = true; // Start loading
  const payload = {
    categoryId: categoryId.value,
  };
  console.log("payload", payload);
  try {
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_CATEGORY_WISE_NEWS_FOR_WEB}`,
      payload
    );
    featuredNewsItem.value = response.data;
    console.log(" featuredNewsItem.value----", featuredNewsItem.value);
    blogs.value = response.data.map((news) => ({
      ...news,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    isLoading.value = false; // Stop loading
  }
};
const getBookmarkColor = (isBookmarked) => {
  return isBookmarked === "Enabled" ? "text-[#FF0053]" : "mdi-bookmark-outline";
};

const addBookmark = async (news) => {
  const token = localStorage.getItem("apiDataToken");
  try {
    console.log("NEWS ID:" + news.isBookmarked);
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
const navigateToFeaturedDetail = (id) => {
  router.push(`/news/${id}`);
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

const showDialog = (news) => {
  isDialogVisible.value = true;
  inviteLink.value = news.newsLink;
};
// const addBookmark = async (id) => {
//   const newStatus = newsItems.value.bookmark ? "Disabled" : "Enabled";
//   const payload = { status: newStatus };
//   try {
//     await apiService.apiCall("post", `${apiConfig.BOOKMARK}/${id}`, payload);
//     newsItems.value.bookmark = !newsItems.value.bookmark;
//   } catch (error) {
//     console.error("Error fetching response:", error);
//   }
// };

const checkRouteParam = () => {
  newsId.value = route.params.id || "";
};

const slicedData = computed(() => {
  if (Array.isArray(featuredNewsItem.value)) {
    if (screenWidth.value <= 640) {
      return featuredNewsItem.value.slice(0, 4); // Mobile devices
    } else if (screenWidth.value > 425 && screenWidth.value < 1024) {
      return featuredNewsItem.value.slice(0, 2); // Tablet devices
    } else {
      return featuredNewsItem.value.slice(0, 4); // Desktop and larger devices
    }
  }
  return []; // Return an empty array if featuredNewsItem is not an array
});

onMounted(async () => {
  console.log("children----", categoryId);
  await checkRouteParam();
  await fetchBlogs();
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
.headline-tuncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
