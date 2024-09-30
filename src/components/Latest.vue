<template>
  <section class="mt-3">
    <div class="bg-white p-3 rounded-[10px]">
      <!-- Heading and Button -->
      <div class="flex justify-between w-full items-center mb-3">
        <div class="flex flex-row items-center gap-2">
          <div class="bg-[#FF0053] w-[4px] h-[13px] rounded-md"></div>
          <div class="text-[20px] font-bold font-lato">{{ headingText }}</div>
        </div>
        <!-- Conditionally render button based on loading state and data -->
        <div v-if="!isLoading && blogs.length > 0">
          <Button />
        </div>
      </div>

      <!-- Loader -->
      <div v-if="isLoading" class="flex flex-row gap-3 justify-between">
        <div v-for="n in 4" :key="n" class="w-[33%] md-max:w-full">
          <div class="flex flex-col bg-white rounded-[10px] shadow-lg">
            <!-- Skeleton Image -->
            <Skeleton height="156px" width />

            <!-- Skeleton for Source & Actions -->
            <div class="flex justify-between items-center p-3">
              <Skeleton width="25%" height="12px" />
            </div>
            <!-- Skeleton for Title -->
            <div class="pl-3 pr-3">
              <Skeleton width="100%" height="20px" />
            </div>

            <!-- Skeleton for Summary -->
            <div class="pl-3 pr-3 mt-3">
              <Skeleton width="100%" height="50px" />
            </div>

            <!-- Skeleton for Category & Time -->
            <div class="px-3 pb-3 mt-2 mb-2 flex gap-1">
              <Skeleton width="25%" height="12px" />
              <Skeleton width="25%" height="12px" />
            </div>
          </div>
        </div>
      </div>

      <!-- News Content -->
      <div v-if="!isLoading && blogs.length > 0">
        <div class="flex flex-row gap-3 justify-between cursor-pointer">
          <div
            v-for="news in slicedData"
            :key="news._id"
            class="w-[33%] md-max:w-full"
          >
            <div class="flex flex-col bg-white rounded-[10px] shadow-lg">
              <div
                class="rounded-[10px]"
                @click="navigateToNewsDetail(news._id)"
              >
                <img
                  :src="news.imgixUrlHighRes"
                  class="relative z-10 h-[156px] w-full rounded-[10px] object-cover"
                  alt=""
                />
              </div>
              <div class="flex justify-between items-center p-3">
                <div class="flex gap-1 text-[#676767] text-xs">
                  <div>{{ news.source }}</div>
                </div>
                <div class="flex gap-1">
                  <span class="mdi mdi-share-variant text-[19px]"></span>
                  <span
                    :class="[
                      'mdi',
                      news.bookmarked
                        ? 'mdi-bookmark text-[#FF0053] text-[21px]'
                        : 'mdi-bookmark-outline text-[21px]',
                    ]"
                    class="cursor-pointer"
                    @click="addBookmark(news._id)"
                  ></span>
                </div>
              </div>
              <div
                class="pl-3 pr-3 text-[16px] font-semibold"
                @click="navigateToNewsDetail(news._id)"
              >
                <a class="hover:text-current font-16 multiline-truncate1">
                  {{ news.headline }}
                </a>
              </div>
              <div
                class="pl-3 pr-3 para multiline-truncate"
                @click="navigateToNewsDetail(news._id)"
              >
                {{ news.summary }}
              </div>
              <div class="px-3 pb-3 mt-2 mb-2 text-[12px] flex gap-1">
                <span class="text-red-500 bold capitalize">
                  {{
                    news.categories[0].name.toLowerCase() === "ai"
                      ? news.categories[0].name.toUpperCase()
                      : news.categories[0].name.replace(/-/g, " ")
                  }}
                </span>
                <span>
                  <div class="text-[#676767] text-xs">
                    | {{ formatPublishTime(news.publishTime) }}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import axios from "axios";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
import Button from "./ViewAll.vue";

const route = useRoute();
const router = useRouter();

const blogs = ref([]);
const relatedNews = ref([]);
const screenWidth = ref(window.innerWidth);
const headingText = ref("Latest News");
const isRelatedNews = ref(false);
const newsId = ref(route.params.id || "");
const isLoading = ref(true); // New state for loader

const fetchBlogs = async () => {
  isLoading.value = true; // Start loading
  try {
    const response = await axios.post(
      "https://api-uat.newsshield.io/news/getAllBlogsForWeb",
      {
        language: "6421a32aa020a23deacecf92",
        page: 1,
      }
    );
    blogs.value = response.data.map((news) => ({
      ...news,
      bookmarked: localStorage.getItem(`bookmark_${news._id}`) === "Enabled",
    }));
    console.log("latest", response.data[0].categories[0].name);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    isLoading.value = false; // Stop loading
  }
};

const fetchRelatedNews = async () => {
  if (!newsId.value) return;
  isLoading.value = true; // Start loading
  try {
    const response = await axios.post(
      `https://api-uat.newsshield.io/pinecone/getRelatedNews/${newsId.value}`,
      {
        language: "6421a32aa020a23deacecf92",
      }
    );
    relatedNews.value = response?.data;
    blogs.value = response.data.map((news) => ({
      ...news,
      bookmarked: localStorage.getItem(`bookmark_${news._id}`) === "Enabled",
    }));
  } catch (error) {
    console.error("Error fetching related news:", error);
  } finally {
    isLoading.value = false; // Stop loading
  }
};

const formatPublishTime = (publishTime) => {
  return moment(publishTime).fromNow();
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

const navigateToNewsDetail = (id) => {
  router.push(`/news/${id}`);
};

const addBookmark = async (id) => {
  try {
    const token = localStorage.getItem("apiDataToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const newsItem = blogs.value.find((news) => news._id === id);
    const newStatus = newsItem.bookmarked ? "Disabled" : "Enabled";

    await axios.post(
      `https://api-uat.newsshield.io/bookmark/addBookmark/${id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    newsItem.bookmarked = !newsItem.bookmarked;
    localStorage.setItem(
      `bookmark_${id}`,
      newsItem.bookmarked ? "Enabled" : "Disabled"
    );

    console.log(
      `News item ${id} bookmark status updated successfully to ${newStatus}`
    );
  } catch (error) {
    console.error(`Error updating bookmark status for news item ${id}:`, error);
  }
};

const checkRouteParam = () => {
  newsId.value = route.params.id || "";
  if (newsId.value) {
    isRelatedNews.value = true;
    headingText.value = "Related News";
    fetchRelatedNews();
  } else {
    isRelatedNews.value = false;
    headingText.value = "Latest News";
    fetchBlogs();
  }
};

const slicedData = computed(() => {
  if (screenWidth.value < 640) {
    return blogs.value.slice(0, 1);
  } else if (screenWidth.value >= 640 && screenWidth.value < 1024) {
    return blogs.value.slice(0, 3);
  } else {
    return blogs.value.slice(0, 4);
  }
});

onMounted(() => {
  checkRouteParam();
  window.addEventListener("resize", updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
</script>

<style scoped>
.multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
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
