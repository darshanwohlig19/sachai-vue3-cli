<template>
  <Navbarrr />
  <div class="mx-[30px] mt-3">
    <div class="font-24 mb-3">Bookmarks</div>
    <div class="flex flex-col bg-white rounded-[10px] p-3">
      <div v-if="BookmarkData.length > 0">
        <div v-for="item in BookmarkData" :key="item._id" class="my-3">
          <div class="w-full bg-white flex rounded-lg drop-shadow-md">
            <div class="w-[30%] h-full items-center cursor-pointer">
              <img
                class="w-full h-full rounded-md object-contain"
                :src="item.imgixUrlHighRes || fallbackImage"
                @click="navigateToNewsDetail(item._id)"
                alt=""
              />
            </div>
            <div class="w-[70%] ml-4 mr-2 flex flex-col justify-evenly">
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
                class="text-[12px] md:text-[20px] fontCustom leading-1 bold mr-1 mt-2 cursor-pointer multiline-truncate1"
                @click="navigateToNewsDetail(item._id)"
              >
                {{ truncateText(item.headline || "No Headline", 80) }}
              </div>
              <div
                class="text-[10px] md:text-[14px] text-[#878787] multiline-truncate1 md:multiline-truncate font-lato leading-1 mr-1 mt-1 mb-1 cursor-pointer"
                @click="navigateToNewsDetail(item.newsId)"
              >
                {{ item.summary || "No summary" }}
              </div>
              <div class="flex justify-between mb-3 mt-2">
                <div class="text-[8px] lg:text-[12px] flex gap-3">
                  <span class="text-red-500">Politics</span>
                  <span>|</span>
                  <span> 4 min read</span>
                </div>
                <div class="text-[8px] lg:text-[12px] text-[#ff0053]">
                  <button @click="removeBookmark(item.newsId)">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">No Bookmarks</div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import moment from "moment";
import Navbarrr from "@/components/Navbarrr.vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const router = useRouter();
const BookmarkData = ref([]);

const truncateText = (text, length) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const navigateToNewsDetail = (id) => {
  router.push(`/news/${id}`);
};

const Bookmark = async () => {
  try {
    const token = localStorage.getItem("apiDataToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await axios.post(
      "https://api-uat.newsshield.io/bookmark/getBookmarkData",
      {
        language: "English",
        page: 1,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log("data", response);
    BookmarkData.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

const removeBookmark = async (id) => {
  try {
    const token = localStorage.getItem("apiDataToken");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const newStatus = "Disabled";
    console.log("This is id", id);
    const res = await axios.post(
      `https://api-uat.newsshield.io/bookmark/addBookmark/${id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
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
    toast.add({
      severity: "info",
      summary: "Bookmark removed!",
      group: "BookmarkRemove",
      life: 2000,
    });
  } catch (error) {
    console.error(`Error removing bookmark for news item ${id}:`, error);
  }
};

onMounted(() => {
  Bookmark();
});
</script>

<style scoped>
.multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* Number of lines to display */
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
