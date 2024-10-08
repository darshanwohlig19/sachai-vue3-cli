<template>
  <!-- No News Message -->
  <!-- Main Content -->
  <div
    class="flex flex-col gap-4 sm:gap-0 sm:flex-row lg:flex-row flex-wrap p-4 mt-3 justify-between bg-white rounded-[10px]"
  >
    <!-- First Section -->
    <div class="w-[100%] md:w-[48%] lg:w-[30%] flex flex-col cursor-pointer">
      <div v-if="loading">
        <Skeleton width="100%" height="233px" />
      </div>
      <div
        v-else
        class="relative drop-shadow-lg"
        @click="navigateToCategory(blogs[0]?._id)"
      >
        <div>
          <!-- <img
            :src="blogs[0]?.imgixUrlHighRes || fallbackImage"
            class="rounded-[8px] h-[234px] w-full"
            alt=""
          /> -->
          <div
            class="relative sm:h-[220px] h-[180px] max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div class="relative w-[100%] h-[100%]">
              <img
                class="absolute inset-0 object-cover h-full filter blur-sm"
                :src="blogs[1]?.imgixUrlHighRes || fallbackImage"
                alt="Background"
                @click="navigateToCampingNews(news._id)"
              />
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
              ></div>
            </div>
            <div
              class="absolute inset-0 flex flex-col justify-between text-white"
            >
              <img
                class="object-contain h-full w-full"
                :src="blogs[0]?.imgixUrlHighRes || fallbackImage"
                alt="Centered Image"
                @click="navigateToCampingNews(news._id)"
              />
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 rounded-[10px]"
              ></div>
            </div>
            <!-- <div class="absolute bottom-0 p-3 w-full md:w-[405px]">
              <div
                class="multiline-truncate1 text-[16px] sm:text-[14px] md:text-[16px] fontCustom text-white w-full md:w-auto"
                :style="{ width: 'calc(100% - 30px)' }"
                @click="navigateToCampingNews(news._id)"
              >
                {{ news.headline || "No Headline" }}
              </div>
            </div> -->
          </div>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-[8px]"
        ></div>
        <div class="absolute bottom-0 p-3 w-full md:w-[405px]">
          <div class="headine-home text-white">
            {{ blogs[0]?.headline }}
          </div>
          <div
            class="flex gap-2 text-white time-date-home text-[10px] md:text-[12px] mt-1"
          >
            <div>{{ blogs[0]?.source }}</div>
            <div>|</div>
            <div>{{ formatPublishTime(blogs[0]?.publishTime) }}</div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="mt-5">
        <div class="flex justify-between gap-3">
          <Skeleton width="45%" height="20px" />
          <Skeleton width="45%" height="20px" />
        </div>
      </div>
      <div v-else class="flex flex-row gap-10 mt-5 cursor-pointer">
        <div
          class="headine-home multiline-truncate1"
          @click="navigateToCategory(blogs[1]?._id)"
        >
          {{ blogs[1]?.headline }}
        </div>
        <div class="w-[1%]">
          <div class="standing_divider"></div>
        </div>

        <div
          class="headine-home multiline-truncate1"
          @click="navigateToCategory(blogs[2]?._id)"
        >
          {{ blogs[2]?.headline }}
        </div>
      </div>
    </div>

    <!-- Second Section -->
    <div class="w-[100%] lg:w-[30%] md:w-[50%] flex flex-col gap-3">
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
        <div class="flex flex-row gap-2" @click="navigateToCategory(item._id)">
          <div class="w-[5%] mt-2">
            <img
              src="@/assets/png/Group.png"
              class="!h-[10px] !w-[10px]"
              alt=""
            />
          </div>
          <div class="flex flex-col w-[100%]">
            <div class="headine-home multiline-truncate3">
              {{ item.headline }}
            </div>
            <div class="summary-home text-gray-5 multiline-truncate1">
              {{ item.summary }}
            </div>
          </div>
        </div>
        <hr
          v-if="index < blogs2.length - 1"
          class="mt-4 border-t border-gray-300"
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
import fallbackImage2 from "../common/config/GlobalConstants";
import BlogCard from "../components/SIdeNews.vue/sideNews.vue";

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
