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
      <!-- <div v-if="!isLoading">Loading...</div> -->
      <div
        class="flex flex-wrap lg:flex-row md:flex-row gap-3 justify-around cursor-pointer drop-shadow-lg mx-[15px] mt-[20px]"
      >
        <div
          v-for="(blog, index) in slicedData"
          :key="index"
          class="shadow-md between-Laptop-small:w-[100%] between-644-1024:!w-[100%] sm:w-[48%] flex flex-col md:flex-row sm:flex-row lg:flex-row gap-2 border-1 p-2 rounded-[8px] cursor-pointer flex-grow h-[156px] xs:!h-[100%]"
        >
          <img
            class="lg:!w-[106px] between-644-1024:w-[104px] md:!w-[106px] xxl:!w-[106px] object-contain rounded-[8px]"
            :src="blog.imgixUrlHighRes || fallbackImage"
            alt="Blog Image"
            @click="navigateToFeaturedDetail(blog._id)"
          />
          <div>
            <div
              class="flex flex-wrap items-center justify-between text-xs w-full mb-1"
            >
              <div class="flex gap-1 mb-[1px] time-date-home">
                <span class="text-[#1E0627] capitalize">
                  {{ blog?.source }}
                </span>
                <span class="text-[#1E0627]"> | </span>
                <span class="text-[#1E0627]">
                  {{ formatPublishTime(blog.publishTime) }}
                </span>
              </div>
              <div
                class="flex-row gap-1 pt-1 ml-auto flex items-center space-x-2"
              >
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
                      'mdi-bookmark text-[21px] cursor-pointer',
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
    return blogs.value.slice(0, 4);
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
    return blogs.value.slice(0, 8);
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
