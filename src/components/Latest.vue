<template>
  <section>
    <div>
      <div class="flex justify-between w-full items-center mb-3">
        <div class="text-[20px] font-bold font-lato">{{ headingText }}</div>
        <div class="text-[16px] text-[#FF0053]">See all &nbsp;→</div>
      </div>
      <div class="flex flex-row flex-wrap gap-3 justify-between cursor-pointer">
        <div v-for="news in slicedData" :key="news._id">
          <div
            class="flex flex-col bg-white rounded-[10px] drop-shadow-sm w-[330px]"
            @click="navigateToNewsDetail(news._id)"
          >
            <div class="rounded-[10px]">
              <img
                :src="news.imgixUrlHighRes"
                class="relative z-10 h-[156px] w-[330px] rounded-[10px] object-cover"
                alt=""
              />
            </div>
            <div class="flex justify-between items-center p-3">
              <div class="flex gap-1 text-[#676767] text-xs">
                <div>{{ news.source }}</div>
                <div>| {{ formatPublishTime(news.publishTime) }}</div>
              </div>
              <div class="flex gap-1">
                <span class="mdi mdi-share-variant text-[19px]"></span>
                <span
                  class="mdi mdi-bookmark-outline text-[21px] cursor-pointer"
                  @click="addBookmark(news._id)"
                ></span>
              </div>
            </div>
            <div class="pl-3 pr-3 text-[16px] font-semibold">
              <a class="hover:text-current font-16 multiline-truncate1">
                {{ news.headline }}
              </a>
            </div>
            <div class="pl-3 pr-3 para multiline-truncate">
              {{ news.summary }}
            </div>
            <div class="px-3 pb-3 mt-2 mb-2 text-[12px] flex gap-1">
              <span class="text-red-500 bold">Politics</span>
              <span>| 4 min read</span>
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

const route = useRoute();
const router = useRouter();

const blogs = ref([]);
const screenWidth = ref(window.innerWidth);
const headingText = ref("Latest News");
const isRelatedNews = ref(false);
const newsId = ref(route.params.id || "");

const fetchBlogs = async () => {
  try {
    const response = await axios.post(
      "https://dev-api.askus.news/news/getAllBlogsForWeb",
      {
        language: "6421a32aa020a23deacecf92",
        page: 1,
      }
    );
    blogs.value = response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

const fetchRelatedNews = async () => {
  if (!newsId.value) return;
  try {
    const response = await axios.post(
      `https://dev-api.askus.news/pinecone/getRelatedNews/${newsId.value}`,
      {
        language: "6421a32aa020a23deacecf92",
      }
    );
    blogs.value = response.data;
  } catch (error) {
    console.error("Error fetching related news:", error);
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
    // Mobile devices
    return blogs.value.slice(0, 1);
  } else if (screenWidth.value >= 640 && screenWidth.value < 1024) {
    // Tablets
    return blogs.value.slice(0, 3);
  } else {
    // Desktop and larger devices
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
