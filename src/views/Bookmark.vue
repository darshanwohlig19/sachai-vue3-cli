<template>
  <Navbarrr />
  <div class="mx-[30px] mt-3">
    <div class="font-24 mb-3">Bookmarks</div>
    <div class="flex flex-col gap-3 bg-white rounded-[10px] p-3">
      <div v-if="BookmarkData.length > 0" class="flex flex-col gap-3">
        <div v-for="item in BookmarkData" :key="item._id">
          <div class="w-full bg-white flex rounded-lg">
            <div class="w-[20%] h-full cursor-pointer">
              <img
                class="w-full h-[100%] rounded-md"
                :src="item.imgixUrlHighRes || fallbackImage"
                @click="navigateToNewsDetail(item._id)"
                alt=""
              />
            </div>
            <div class="w-[80%] ml-4 mr-2 flex flex-col">
              <div class="flex justify-between items-center mt-3">
                <div class="flex gap-1 text-gray-400 medium">
                  <div class="text-[8px] lg:text-[12px] font-lato">
                    {{ item.source || "No source" }}
                  </div>
                  <div class="text-[8px] lg:text-[12px]">
                    | {{ moment(item.publishTime || new Date()).fromNow() }}
                  </div>
                </div>
                <div class="flex gap-1">
                  <span
                    class="material-symbols-outlined text-[11px] lg:text-[19px] cursor-pointer"
                  >
                    share
                  </span>
                </div>
              </div>
              <div
                class="text-[12px] md:text-[20px] fontCustom title-md-multiline-truncate leading-1 bold mr-1 cursor-pointer mt-3"
                @click="navigateToNewsDetail(item._id)"
              >
                {{ item.headline || "No Headline" }}
              </div>
              <div
                class="text-[10px] md:text-[14px] text-[#878787] md-multiline-truncate lg:multiline-truncate font-lato leading-1 mr-1 mt-1 mb-1 cursor-pointer"
                @click="navigateToNewsDetail(item.newsId)"
              >
                {{ item.summary || "No summary" }}
              </div>
              <div class="flex justify-between mt-3">
                <div class="text-[8px] lg:text-[12px] flex gap-3">
                  <span class="text-red-500">Politics</span>
                  <span>|</span>
                  <span> 4 min read</span>
                </div>
                <div class="font-12">
                  <button @click="removeBookmark(item.newsId)">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center font-24">No Bookmarks</div>
    </div>
  </div>
</template>
<script setup>
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import { ref, onMounted } from "vue";
import moment from "moment";
import Navbarrr from "@/components/Navbarrr.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const BookmarkData = ref([]);

const navigateToNewsDetail = (id) => {
  router.push(`/news/${id}`);
};

const Bookmark = async () => {
  try {
    const payload = {
      language: "English",
      page: 1,
    };
    const token = localStorage.getItem("apiDataToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_BOOKMARK_DATA}`,
      payload
    );
    // const response = await axios.post(
    //   "https://api-uat.newsshield.io/bookmark/getBookmarkData",
    // );
    console.log("data", response);
    BookmarkData.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

const removeBookmark = async (id) => {
  const newStatus = "Disabled";
  const payload = {
    status: newStatus,
  };
  try {
    const token = localStorage.getItem("apiDataToken");

    if (!token) {
      throw new Error("No authentication token found");
    }

    console.log("This is id", id);
    const res = await apiService.apiCall(
      "post",
      `${apiConfig.ADD_BOOKMARK}/${id}`,
      payload
    );
    // const res = await axios.post(
    //   `https://api-uat.newsshield.io/bookmark/addBookmark/${id}`
    // );
    if (res.status === 200) {
      // Remove the disabled news item from the BookmarkData array
      BookmarkData.value = BookmarkData.value.filter((item) => item._id !== id);
      localStorage.removeItem(`bookmark_${id}`);
      console.log(`News item ${id} removed from bookmarks successfully.`);
      Bookmark();
    } else {
      console.log("unable");
    }
    BookmarkData.value = BookmarkData.value.filter((item) => item._id !== id);
    localStorage.removeItem(`bookmark_${id}`);

    console.log(`News item ${id} removed from bookmarks successfully.`);
  } catch (error) {
    console.error(`Error removing bookmark for news item ${id}:`, error);
  }
};

onMounted(() => {
  Bookmark();
});
</script>

<style>
.title-md-multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
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
.md-multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
