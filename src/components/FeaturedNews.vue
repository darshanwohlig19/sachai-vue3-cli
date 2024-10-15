<template>
  <!-- No News Message -->
  <!-- Main Content -->
  <div
    class="flex flex-col gap-4 sm:gap-0 sm:flex-row lg:flex-row flex-wrap p-3 mt-3 justify-between bg-white rounded-[10px]"
  >
    <!-- First Section -->
    <div class="w-[100%] md:w-[48%] lg:w-[30%] flex flex-col cursor-pointer">
      <div v-if="loading">
        <Skeleton width="100%" height="233px" />
      </div>
      <div v-else>
        <Image
          :blog="blogs[0]"
          :headline="blogs[0]?.headline"
          :newsId="blogs[0]?._id"
          :publishTime="formatPublishTime(blogs[0]?.publishTime)"
          :image="blogs[0]?.imgixUrlHighRes || fallbackImage"
          :source="blogs[0]?.source"
          @navigate="navigateToCategory"
        />
      </div>
      <div v-if="loading" class="mt-5">
        <div class="flex justify-between gap-3">
          <Skeleton width="45%" height="20px" />
          <div class="w-[1%]">
            <div class="standing_divider"></div>
          </div>
          <Skeleton width="45%" height="20px" />
        </div>
      </div>
      <div v-else class="flex flex-row gap-10 mt-3 md:mt-5 cursor-pointer">
        <div v-for="blog in blogs.slice(1, 3)" :key="blog._id">
          <BottomNews
            :headline="blog.headline"
            :newsId="blog._id"
            @navigate="navigateToCategory"
          />

          <div v-if="index === 0" class="standing_divider"></div>
        </div>
      </div>
    </div>

    <!-- Second Section -->
    <div
      class="w-[100%] lg:w-[30%] md:w-[50%] flex flex-col justify-between gap-3 sm:gap-0"
    >
      <div v-if="loading">
        <div
          v-for="b in 4"
          :key="b"
          class="shadow-md flex gap-2 w-full p-2 rounded-[8px]"
        >
          <div class="flex-shrink-0">
            <Skeleton width="78px" height="57px"></Skeleton>
          </div>
          <div class="flex justify-center flex-col w-full">
            <Skeleton width="100%" height="25px"></Skeleton>
          </div>
        </div>
      </div>

      <div
        v-else
        v-for="blog in blogs1"
        :key="blog._id"
        class="between-md-sm:mt-4"
      >
        <div
          class="gap-4 p-2.5 drop-shadow-md border-1 rounded-[8px] items-center cursor-pointer"
          @click="navigateToCategory(blog._id)"
        >
          <BlogCard
            :headline="blog.headline"
            :image="blog.imgixUrlHighRes || fallbackImage"
          />
        </div>
      </div>
    </div>

    <!-- Divider (hidden on small devices) -->
    <div class="w-[1%] lg:flex lg:justify-center hidden">
      <div class="standing_divider"></div>
    </div>

    <!-- Third Section -->
    <div
      v-if="loading"
      class="w-[100%] lg:w-[35%] md:w-[48%] mt-3 md:mt-0 justify-evenly lg:mt-0 flex flex-col gap-3"
    >
      <div class="w-full flex flex-col gap-1">
        <Skeleton width="100%" height="30px"></Skeleton>
        <Skeleton width="100%" height="30px"></Skeleton>
      </div>
      <div class="w-full flex flex-col gap-1">
        <Skeleton width="100%" height="30px"></Skeleton>
        <Skeleton width="100%" height="30px"></Skeleton>
      </div>
      <div class="w-full flex flex-col gap-1">
        <Skeleton width="100%" height="30px"></Skeleton>
        <Skeleton width="100%" height="30px"></Skeleton>
      </div>
    </div>
    <div v-else class="w-[100%] lg:w-[35%] flex flex-col justify-around">
      <div
        v-for="(item, index) in blogs2"
        :key="item._id"
        class="mt-4 md:mt-4 lg:mt-0 cursor-pointer"
      >
        <NewsCard
          :key="index"
          :item="item"
          @navigate="navigateToCategory"
          :show-divider="index < 2"
          headline-Class="line-clamp-1"
          summaryClass="line-clamp-3"
        />
        <!-- <hr
          v-if="index < blogs2.length - 1"
          class="mt-4 border-t border-gray-300"
        /> -->
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
import fallbackImage2 from "../common/config/GlobalConstants";
import BlogCard from "./BlogCard.vue";

const fallbackImage = fallbackImage2.variables.fallbackImage;

const blogs = ref([]);
const blogs1 = ref([]);
const blogs2 = ref([]);
const loading = ref(true);
const error = ref(false);
const router = useRouter(); // Use Vue Router

const languageId = ref("6421a32aa020a23deacecf92");

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
.standing_divider {
  height: 100%;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 1px;
}
</style>
