<template>
  <div
    class="flex flex-col gap-4 sm:gap-0 sm:flex-row lg:flex-row flex-wrap p-3 justify-between bg-white rounded-[10px] mt-3"
  >
    <div
      class="w-[100%] between-sm-md:w-[45%] lg:w-[30%] flex flex-col cursor-pointer"
    >
      <div
        class="relative drop-shadow-lg"
        @click="navigateToCategory(blogs[0]?._id)"
      >
        <div
          class="relative h-[234px] bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div class="relative w-[100%] h-[100%]">
            <img
              class="absolute inset-0 object-cover h-full w-full filter blur-sm"
              :src="blogs[0]?.imgixUrlHighRes || fallbackImage"
            />
            <div
              class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
            ></div>
          </div>
          <div
            class="absolute inset-0 flex flex-col justify-between text-white"
          >
            <img
              class="object-contain h-full w-[100%]"
              :src="blogs[0]?.imgixUrlHighRes || fallbackImage"
            />
          </div>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-[8px]"
        ></div>
        <div class="absolute bottom-0 p-3 w-full md:w-[405px]">
          <div
            class="text-[14px] sm:text-[16px] md:text-[16px] fontCustom text-white"
          >
            {{ blogs[0]?.headline || "No Headline" }}
          </div>
          <div
            class="flex gap-2 text-white text-[10px] sm:text-[12px] md:text-[12px] font-lato"
          >
            <div>{{ blogs[0]?.source }}</div>
            <div>|</div>
            <div>{{ formatPublishTime(blogs[0]?.publishTime) }}</div>
          </div>
        </div>
      </div>

      <div class="flex flex-row gap-10 mt-3 cursor-pointer leading-tight">
        <div
          class="font-14 multiline-truncate1"
          @click="navigateToCategory(blogs[1]?._id)"
        >
          {{ blogs[1]?.headline }}
        </div>
        <div class="border-1"></div>
        <div
          class="font-14 multiline-truncate1"
          @click="navigateToCategory(blogs[2]?._id)"
        >
          {{ blogs[2]?.headline }}
        </div>
      </div>
    </div>
    <div class="w-[100%] between-sm-md:w-[100%] lg:w-[25%] flex flex-col gap-2">
      <div v-for="blog in blogs1" :key="blog" class="below-sm:mt-4">
        <div
          class="flex flex-row gap-4 p-2.5 drop-shadow-md border-1 rounded-[8px] items-center cursor-pointer"
          @click="navigateToCategory(blog._id)"
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
    <div class="border-1 below-sm:hidden between-sm-md:hidden"></div>
    <div
      class="w-[100%] between-sm-md:w-[100%] lg:w-[40%] flex flex-col justify-between"
    >
      <div
        v-for="(item, index) in blogs2"
        :key="item._id"
        class="mt-4 md:mt-4 lg:mt-0 cursor-pointer"
      >
        <div class="flex flex-row gap-2" @click="navigateToCategory(item._id)">
          <div class="w-[5%] mt-2">
            <img src="../assets/Group.png" alt="" />
          </div>
          <div class="flex flex-col w-[100%]">
            <div class="font-16 multiline-truncate3">{{ item.headline }}</div>
            <div class="para multiline-truncate1">{{ item.summary }}</div>
          </div>
        </div>
        <hr
          v-if="index < blogs2.length - 1"
          class="mt-3 border-t border-gray-300"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import moment from "moment";
import { useRouter } from "vue-router";

const blogs = ref([]);
const blogs1 = ref([]);
const blogs2 = ref([]);
const router = useRouter(); // Use Vue Router

const languageId = ref("6421a32aa020a23deacecf92");
function formatPublishTime(publishTime) {
  return moment(publishTime).fromNow();
}

async function fetchBlogs() {
  try {
    const response = await axios.post(
      "https://api-uat.newsshield.io/news/gettrendingnews",
      {
        language: languageId.value,
      }
    );
    console.log("Trending " + response.data);
    blogs.value = response.data.slice(0, 4);
    blogs1.value = response.data.slice(4, 8);
    blogs2.value = response.data.slice(8, 11);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}
function navigateToCategory(id) {
  if (id) {
    router.push(`/news/${id}`);
  }
}
fetchBlogs();
</script>
<style scoped>
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
