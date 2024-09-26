<template>
  <div class="p-2 mt-3">
    <div class="flex justify-between items-center w-full mb-2 rounded-2xl">
      <div class="flex items-center">
        <span
          class="border-l-4 border-[#FF0053] h-[13px] rounded-2xl mr-1"
        ></span>
        <span class="text-lg font-bold text-[#1E0627] font-Lato ml-0"
          >Featured News</span
        >
      </div>

      <Button />
    </div>

    <div
      class="flex flex-col lg:flex-row md:grid md:grid-cols-2 gap-3 justify-between cursor-pointer drop-shadow-lg md:h-[350px]"
    >
      <div
        v-for="news in slicedData"
        :key="news._id"
        class="w-full lg:w-[33%] sm:w-[48%] md:w-[32%] h-[336px]"
      >
        <div
          class="flex flex-col bg-white rounded-[10px] h-full drop-shadow-sm"
        >
          <div class="rounded-[10px]">
            <img
              :src="news.imgixUrlHighRes"
              class="relative z-10 h-[170px] w-full rounded-[10px] object-fill"
              alt=""
              @click="navigateToFeaturedDetail(news._id)"
            />
          </div>
          <div class="flex justify-between items-center p-3 py-0 !pt-[3%]">
            <div class="flex gap-1 text-[#676767] text-xs font-medium">
              <div @click="navigateToFeaturedDetail(news._id)">
                {{ news.source }}
              </div>
              <div @click="navigateToFeaturedDetail(news._id)">
                | {{ formatPublishTime(news.publishTime) }}
              </div>
            </div>
            <div class="flex gap-1">
              <span
                class="mdi mdi-share-variant text-[19px] cursor-pointer"
                @click="openInviteDialog(news)"
              ></span>
              <span
                :class="[
                  'mdi',
                  news.isBookmarked
                    ? 'mdi-bookmark-outline text-[21px]'
                    : 'mdi-bookmark-outline text-[21px]',
                ]"
                class="cursor-pointer"
                @click.stop="addBookmark(news._id)"
              >
              </span>
            </div>
          </div>
          <div class="p-3 py-0 text-[16px] font-semibold">
            <a
              @click="navigateToNewsDetail(news._id)"
              class="hover:text-current font-semibold multiline-truncate1 text-[#1E0627]"
            >
              {{ news?.headline }}
            </a>
          </div>
          <div
            class="p-3 para multiline-truncate py-0 !pt-[2%] text-[#878787]"
            @click="navigateToNewsDetail(news._id)"
          >
            {{ news?.summary }}
          </div>
        </div>
      </div>
    </div>
    <!-- <shareLink :inviteLink="yourInviteLink" v-model="isDialogVisible" /> -->
  </div>
</template>

<!-- The rest of your code remains unchanged -->

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  defineProps,
  // toRefs,
} from "vue";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
import Button from "./ViewAll.vue";
// import shareLink from "@/common/config/shareLink.vue";
const route = useRoute();
const router = useRouter();
const featuredNewsItem = ref([]);
const newsItems = ref([]);

const props = defineProps(
  ["category"]
  //   {category: {
  //     type: Object,
  //     required: true,
  //   },
  // }
);
const isDialogVisible = ref(true); // Control the dialog visibility
const inviteLink = ref(""); // Store the invite link
console.log("props", props, props.category);

const openInviteDialog = (newsItem) => {
  inviteLink.value = `https://example.com/invite/${newsItem._id}`;
  isDialogVisible.value = true; // This will trigger the dialog to open
};

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
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_CATEGORY_WISE_NEWS_FOR_WEB}`,
      payload
    );
    featuredNewsItem.value = response.data;
    console.log(" featuredNewsItem.value----", featuredNewsItem.value);
    blogs.value = response.data.map((news) => ({
      ...news,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

const navigateToFeaturedDetail = (id) => {
  router.push(`/news/${id}`);
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
  const newStatus = newsItems.value.bookmark ? "Disabled" : "Enabled";
  const payload = { status: newStatus };
  try {
    await apiService.apiCall("post", `${apiConfig.BOOKMARK}/${id}`, payload);
    newsItems.value.bookmark = !newsItems.value.bookmark;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

const checkRouteParam = () => {
  newsId.value = route.params.id || "";
};

const slicedData = computed(() => {
  if (screenWidth.value <= 640) {
    // Mobile devices
    return featuredNewsItem.value.slice(0, 4);
  } else if (screenWidth.value > 425 && screenWidth.value < 1024) {
    // Tablet devices
    return featuredNewsItem.value.slice(0, 4);
  } else {
    // Desktop and larger devices
    return featuredNewsItem.value.slice(0, 4);
  }
});

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
