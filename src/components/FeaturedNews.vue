<template>
  <div
    class="flex flex-col sm:flex-row p-4 bg-white rounded-[10px] gap-4 mt-10"
  >
    <div class="w-[100%] sm:w-[35%] flex flex-col">
      <div class="relative drop-shadow-lg">
        <img
          :src="blogs[0]?.imgixUrlHighRes || fallbackImage"
          class="rounded-[8px] h-[234px] w-full"
          alt=""
        />
        <div class="absolute bottom-0 p-3 w-[405px]">
          <div class="text-[16px] fontCustom text-white">
            {{ blogs[0]?.headline || "No Headline" }}
          </div>
          <div class="flex gap-2 text-white text-[12px] font-lato">
            <div>{{ blogs[0]?.source }}</div>
            <div>|</div>
            <div>{{ formatPublishTime(blogs[0]?.publishTime) }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-10 mt-5">
        <div class="font-14 multiline-truncate1">{{ blogs[1]?.headline }}</div>
        <div class="border-1"></div>
        <div class="font-14 multiline-truncate1">{{ blogs[2]?.headline }}</div>
      </div>
    </div>
    <div class="w-[100%] sm:w-[30%] flex flex-col justify-between">
      <div v-for="blog in blogs1" :key="blog">
        <div
          class="flex flex-row gap-4 p-2.5 drop-shadow-md border-1 rounded-[8px] items-center"
        >
          <div class="w-[20%]">
            <img
              class="rounded-[6px] h-[47px]"
              :src="blog.imgixUrlHighRes"
              alt=""
            />
          </div>
          <div class="font-14 w-[70%] multiline-truncate">
            {{ blog.headline }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-1"></div>
    <div class="w-[100%] sm:w-[40%] flex flex-col justify-between">
      <div v-for="item in blogs2" :key="item">
        <div class="flex flex-row gap-2">
          <div class="w-[5%] mt-2">
            <img src="../assets/Group.png" alt="" />
          </div>
          <div class="flex flex-col w-[100%]">
            <div class="font-16 multiline-truncate3">{{ item.headline }}</div>
            <div class="para multiline-truncate1">{{ item.summary }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import moment from "moment";

const blogs = ref([]);
const blogs1 = ref([]);
const blogs2 = ref([]);

const languageId = ref("6421a32aa020a23deacecf92"); // Assuming you have a languageId, adjust this as needed
function formatPublishTime(publishTime) {
  return moment(publishTime).fromNow();
}

async function fetchBlogs() {
  try {
    const response = await axios.post(
      "https://dev-api.askus.news/news/getAllBlogsForWeb",
      {
        language: languageId.value,
        page: 1,
      }
    );
    blogs.value = response.data.slice(0, 4);
    blogs1.value = response.data.slice(4, 8);
    blogs2.value = response.data.slice(8, 11);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

fetchBlogs();
</script>
<style>
.fontCustom {
  font-family: "source-serif-pro-semibold";
}
.multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
