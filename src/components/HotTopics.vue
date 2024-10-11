<template>
  <div>
    <InviteLinkDialog
      :isVisible="isDialogVisible"
      :inviteLink="inviteLink"
      @close="isDialogVisible = false"
    />
    <div class="bg-white rounded-xl p-3">
      <div class="flex flex-row items-center gap-1">
        <div class="bg-[#FF0053] w-[4px] h-[12px] rounded-md"></div>
        <div class="heads1">Hot Topics</div>
      </div>
      <div v-if="loading">
        <div
          class="mt-3 flex gap-4 items-center drop-shadow-lg border-1 p-2"
          v-for="n in 12"
          :key="n"
        >
          <div class="flex w-[20%] justify-center items-center">
            <Skeleton class="rounded-md" height="30px" size="3rem"></Skeleton>
          </div>
          <div class="flex flex-col w-[80%] justify-between">
            <Skeleton class="rounded-md" height="40px"></Skeleton>
          </div>
        </div>
      </div>
      <div
        v-else
        v-for="(item, index) in hot"
        :key="index"
        class="mt-2 items-center shadow-md rounded-[8px] p-2"
      >
        <div class="flex flex-col sm:flex-row gap-2">
          <div
            class="relative sm:mx-[3px] sm:my-[3px] bg-white rounded-lg overflow-hidden w-[100%] sm:w-[25%] h-[130px] sm:h-auto"
          >
            <div class="relative w-full h-[100%]">
              <img
                class="absolute inset-0 object-cover h-full w-full filter blur-md"
                :src="item.imgixUrlHighRes || fallbackImage"
                alt="Background"
                @click="navigateToNewsDetail(item._id)"
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
                :src="item.imgixUrlHighRes || fallbackImage"
                alt="Centered Image"
                @click="navigateToNewsDetail(item._id)"
              />
            </div>
          </div>
          <div class="w-[100%] sm:w-[75%]">
            <div class="flex flex-row justify-between">
              <div class="flex flex-row gap-1 time-date-home items-center">
                <div>{{ item?.source }}</div>
                <div>|</div>
                <div>
                  {{ moment(item?.publishTime || new Date()).fromNow() }}
                </div>
              </div>
              <div class="flex gap-1">
                <span
                  class="mdi mdi-share-variant text-[18px]"
                  @click.stop="showDialog(item)"
                ></span>
                <span
                  :class="[
                    'mdi',
                    'mdi-bookmark text-[18px] cursor-pointer',
                    getBookmarkColor(item?.isBookmarked),
                  ]"
                  @click="addBookmark(item)"
                >
                </span>
              </div>
            </div>
            <div class="mt-1">
              <div
                class="headline-tuncate-right flex gap-1 items-center headine-home"
              >
                {{ item?.headline || "No Headline" }}
              </div>
              <div class="headline-tuncate summary-home mt-1 text-gray-5">
                {{ item?.summary || "No summary" }}
              </div>
            </div>
            <div class="time-date-home text-[#FF0053] mt-2">
              {{ item.categories[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import moment from "moment";
import fallbackImage from "../common/config/GlobalConstants";
import axios from "axios";
import InviteLinkDialog from "@/common/config/shareLink.vue"; // Import the dialog component

// Refs for reactive data
const hot = ref([]);
const loading = ref(true);
const languageId = "6421a32aa020a23deacecf92";
const isDialogVisible = ref(false); // State for dialog visibility
const inviteLink = ref(""); // Link to share, set this appropriately
// Fetch blogs function
const fetchBlogs = async () => {
  const payload = {
    language: languageId,
    page: 1,
  };
  try {
    loading.value = true; // Set loading to true when starting the API call
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_ALL_BLOGS_FOR_WEB}`,
      payload
    );
    hot.value = response.data.slice(0, 8); // Assign the fetched blogs to 'hot'
    console.log("hot", response.data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    hot.value = []; // Set hot to empty array in case of an error
  } finally {
    loading.value = false; // Set loading to false when API call is done
  }
};

// Navigate to news detail function
const navigateToNewsDetail = (id) => {
  window.location.href = `/news/${id}`;
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
const showDialog = (news) => {
  isDialogVisible.value = true;
  inviteLink.value = news.newsLink;
};

// Fetch blogs on mount
onMounted(() => {
  fetchBlogs();
});
</script>

<style>
.fontCustom {
  font-family: "source-serif-pro-semibold";
}
.headline-tuncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1 !important;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
