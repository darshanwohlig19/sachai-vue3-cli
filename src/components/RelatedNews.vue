<template>
  <div class="p-3 mt-3">
    <div class="flex justify-between w-full items-center">
      <span
        class="text-[18px] font-bold mb-3 border-l-4 border-red-500 text-[#1E0627] pl-2"
      >
        Featured News
      </span>
      <button
        className="text-[#FF0053] bg-[#fff0f5] px-3 py-1  text-sm font-medium flex items-center rounded-md"
      >
        View all &nbsp;→
      </button>
    </div>
    <div
      class="flex flex-row gap-3 justify-between cursor-pointer drop-shadow-lg"
    >
      <div
        v-for="news in featuredNewsItem.slice(0, 4)"
        :key="news._id"
        class="w-[33%] md-max:w-full"
      >
        <div class="flex flex-col bg-white rounded-[10px] drop-shadow-sm">
          <div class="rounded-[10px]">
            <img
              :src="news.imgixUrlHighRes"
              class="relative z-10 h-[170px] w-full rounded-[10px] object-fill"
              alt=""
            />
          </div>
          <div class="flex justify-between items-center p-3">
            <div class="flex gap-1 text-[#676767] text-xs font-medium">
              <div>{{ news.source }}</div>
              <div>| {{ formatPublishTime(news.publishTime) }}</div>
            </div>
            <div class="flex gap-1">
              <span class="mdi mdi-share-variant text-[19px]"></span>
              <span
                :class="[
                  'mdi',
                  news.bookmarked
                    ? 'mdi-bookmark text-red-500'
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
            <a
              class="hover:text-current font-semibold multiline-truncate1 text-[#1E0627]"
            >
              {{ news?.headline }}
            </a>
          </div>
          <div class="pl-3 pr-3 para multiline-truncate text-[#878787]">
            {{ news?.summary }}
          </div>
          <div class="px-3 pb-3 mt-2 mb-2 text-[12px] flex gap-1">
            <span class="text-neon-pink bold">{{ news?.source }}</span>
            <span>| 4 min read</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  defineProps,
  // toRefs,
} from "vue";
import axios from "axios";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const featuredNewsItem = ref([]);
const props = defineProps(
  ["category"]
  //   {category: {
  //     type: Object,
  //     required: true,
  //   },
  // }
);
console.log("props", props, props.category);

const categoryId = computed(() => {
  console.log("props---", props.value);
  console.log("props?.category--", props?.category);
  console.log("props?.category?.categoriesId", props?.category?.categoriesId);
  return props?.category?.categoriesId[0];
});
const blogs = ref([]);
console.log("blogs", blogs);
const screenWidth = ref(window.innerWidth);
const newsId = ref(route.params.id || "");
const fetchBlogs = async () => {
  const payload = {
    categoryId: categoryId.value,
  };
  console.log("payload", payload);
  try {
    const response = await axios.post(
      `https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb`,
      payload
    );
    featuredNewsItem.value = response.data;
    console.log(" featuredNewsItem.value----", featuredNewsItem.value);
    blogs.value = response.data.map((news) => ({
      ...news,
      bookmarked: false,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
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

    // Find the news item to check its current bookmark status
    const newsItem = blogs.value.find((news) => news._id === id);

    // Toggle the status between "Enabled" and "Disabled"
    const newStatus = newsItem.bookmarked ? "Disabled" : "Enabled";

    const res = await axios.post(
      `https://api-uat.newsshield.io/bookmark/addBookmark/${newsId.value}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log("hiii", res);

    // Update the local state to reflect the new bookmark status
    newsItem.bookmarked = !newsItem.bookmarked;

    console.log(
      `News item ${id} bookmark status updated successfully to ${newStatus}`
    );
  } catch (error) {
    if (error.response) {
      console.error(
        `Error updating bookmark status for news item ${id}:`,
        error.response.data
      );
    } else if (error.request) {
      console.error(
        `Error updating bookmark status for news item ${id}: No response received`,
        error.request
      );
    } else {
      console.error(
        `Error updating bookmark status for news item ${id}:`,
        error.message
      );
    }
  }
};

const checkRouteParam = () => {
  newsId.value = route.params.id || "";
};

// const slicedData = computed(() => {
//   if (screenWidth.value < 640) {
//     // Mobile devices
//     return blogs.value.slice(0, 1);
//   } else if (screenWidth.value >= 640 && screenWidth.value < 1024) {
//     // Tablets
//     return blogs.value.slice(0, 3);
//   } else {
//     // Desktop and larger devices
//     return blogs.value.slice(0, 4);
//   }
// });

onMounted(async () => {
  console.log("children----", categoryId);
  await checkRouteParam();
  await fetchBlogs();
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
.headline-tuncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
