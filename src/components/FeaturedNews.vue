<template>
  <!-- Loader -->
  <div
    v-if="loading"
    class="flex justify-center items-center h-full bg-white rounded-[10px] mt-3"
  >
    <!-- Loader component or spinner -->
    <div class="text-center py-5">Loading...</div>
  </div>

  <!-- No News Message -->
  <div
    v-else-if="!blogs.length"
    class="flex justify-center items-center h-full text-center py-5 bg-white rounded-[10px] mt-3"
  >
    <div>No News Available</div>
  </div>

  <!-- Main Content -->
  <div
    v-else
    class="flex flex-col gap-4 sm:gap-0 sm:flex-row lg:flex-row flex-wrap p-3 mt-3 justify-between bg-white rounded-[10px]"
  >
    <div class="w-[100%] md:w-[48%] lg:w-[30%] flex flex-col cursor-pointer">
      <div
        class="relative drop-shadow-lg"
        @click="navigateToCategory(blogs[0]?._id)"
      >
        <img
          :src="blogs[0]?.imgixUrlHighRes || fallbackImage"
          class="rounded-[8px] h-[234px] w-full"
          alt=""
        />
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

      <div class="flex flex-row gap-10 mt-5 cursor-pointer">
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
    <div class="w-[100%] md:w-[48%] lg:w-[30%] flex flex-col justify-between">
      <div v-for="blog in blogs1" :key="blog._id" class="below-sm:mt-4">
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
    <div class="border-1 lg:flex hidden"></div>
    <div class="w-[100%] lg:w-[35%] flex flex-col justify-between">
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
import { ref, onMounted } from "vue";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import moment from "moment";
import { useRouter } from "vue-router";

const blogs = ref([]);
const blogs1 = ref([]);
const blogs2 = ref([]);
const loading = ref(true);
const error = ref(false);
const router = useRouter(); // Use Vue Router

const languageId = ref("6421a32aa020a23deacecf92");
const fallbackImage = "path/to/your/fallback-image.jpg"; // Define fallback image

function formatPublishTime(publishTime) {
  return moment(publishTime).fromNow();
}

async function fetchBlogs() {
  const payload = {
    language: languageId.value,
  };
  try {
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_TRENDING_NEWS}`,
      payload
    );
    // const response = await axios.post(
    //   "https://api-uat.newsshield.io/news/getTrendingNews",
    //   {
    //     language: languageId.value,
    //   }
    // );
    blogs.value = response.data.slice(0, 4);
    blogs1.value = response.data.slice(4, 8);
    blogs2.value = response.data.slice(8, 11);
    if (!blogs.value.length) {
      error.value = true;
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

function navigateToCategory(id) {
  if (id) {
    router.push(`/news/${id}`);
  }
}

onMounted(() => {
  fetchBlogs();
});
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
