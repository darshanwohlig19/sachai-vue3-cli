<template>
  <Navbarrr />
  <div class="mx-[30px] mt-3">
    <div class="flex flex-col gap-3 bg-white rounded-[10px] p-3">
      <div v-for="item in BookmarkData" :key="item._id">
        <div class="w-full bg-white flex rounded-lg">
          <div class="w-[20%] h-full items-center">
            <a :href="`${SACHAI_NEWS_URL}${item._id}`">
              <img
                class="w-full h-full rounded-md object-contain"
                :src="item.imgixUrlHighRes || fallbackImage"
                alt=""
              />
            </a>
          </div>
          <div class="w-[80%] ml-4 mr-2 flex flex-col justify-evenly">
            <div class="flex justify-between items-center mt-1">
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
                <span
                  class="material-symbols-outlined text-[11px] lg:text-[19px] cursor-pointer"
                >
                  bookmark
                </span>
              </div>
            </div>
            <div
              class="text-[12px] md:text-[20px] fontCustom leading-1 bold mr-1 mt-2 cursor-pointer"
              @click="navigateToNewsDetail(item._id)"
            >
              {{ truncateText(item.headline || "No Headline", 80) }}
            </div>
            <div
              class="text-[10px] md:text-[14px] text-[#878787] multiline-truncate font-lato leading-1 mr-1 mt-1 mb-1"
            >
              {{ item.summary || "No summary" }}
            </div>
            <div class="text-[8px] lg:text-[12px] flex gap-3">
              <span class="text-red-500">Politics</span>
              <span>|</span>
              <span> 4 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import moment from "moment";
import Navbarrr from "@/components/Navbarrr.vue";
import { useRouter } from "vue-router";
// const route = useRoute();
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
    BookmarkData.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

onMounted(() => {
  Bookmark();
});
</script>
<style>
.multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
