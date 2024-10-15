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
          v-for="n in 8"
          :key="n"
          class="mt-2 items-center shadow-md rounded-[8px] p-2"
        >
          <div class="flex flex-col sm:flex-row gap-2">
            <!-- Skeleton for Image Section -->
            <div
              class="relative sm:mx-[3px] sm:my-[3px] bg-white rounded-lg overflow-hidden w-[100%] sm:w-[25%] h-[130px] sm:h-auto"
            >
              <div class="relative w-full h-[100%]">
                <!-- Background Skeleton -->
                <div class="absolute inset-0">
                  <Skeleton class="w-full h-full" />
                </div>
              </div>
            </div>
            <!-- Skeleton for Text Section -->
            <div class="w-[100%] sm:w-[75%]">
              <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-1 time-date-home items-center">
                  <Skeleton width="50px" />
                  <div class="text-[#EFF2F4]">|</div>
                  <Skeleton width="100px" />
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
            <div class="time-date-home text-[#FF0053] mt-2 capitalize">
              {{
                item?.category[0]?.name?.toLowerCase() === "ai"
                  ? item.category[0].name?.toUpperCase()
                  : item?.category[0].name?.replace(/-/g, " ")
              }}
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
import { useToast } from "primevue/usetoast";
// Refs for reactive data
const toast = useToast();
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
    if (currentStatus === "Enabled") {
      toast.add({
        severity: "success",
        summary: "Bookmark Added",
        group: "success",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "success",
        summary: "Bookmark Removed",
        group: "success",
        life: 3000,
      });
    }
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
