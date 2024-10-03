<template>
  <div class="p-2 lg:h-full">
    <div class="flex justify-between items-center w-full mb-2 rounded-2xl">
      <div class="flex items-center">
        <span
          class="border-l-4 border-[#FF0053] h-[13px] rounded-2xl mr-1"
        ></span>
        <span class="text-lg font-bold text-[#1E0627] font-Lato ml-0"
          >Related News</span
        >
      </div>

      <Button />
    </div>

    <div
      class="flex flex-wrap lg:flex-row md:flex-row gap-3 justify-around cursor-pointer drop-shadow-lg"
    >
      <div
        v-for="(blog, index) in slicedData"
        :key="index"
        class="shadow-md between-Laptop-small:w-[100%] between-644-1024:!w-[100%] sm:w-[48%] flex flex-row gap-2 border-1 p-2 rounded-[8px] cursor-pointer flex-grow h-[156px]"
      >
        <img
          class="w-[106px] object-contain rounded-[8px]"
          :src="blog.imgixUrlHighRes || fallbackImage"
          alt="Blog Image"
          @click="navigateToFeaturedDetail(blog._id)"
        />
        <div>
          <div
            class="flex flex-wrap items-center justify-between text-xs w-full mb-1"
          >
            <div class="flex gap-1 mb-[1px]">
              <span class="text-[#1E0627] capitalize font-lato">
                {{ blog?.source }}
              </span>
              <span class="text-[#1E0627]"> | </span>
              <span class="text-[#1E0627] font-lato">
                {{ formatPublishTime(blog.publishTime) }}
              </span>
            </div>
            <div
              class="flex-row gap-1 pt-1 ml-auto flex items-center space-x-2"
            >
              <div>
                <i
                  class="mdi mdi-share-variant text-black rounded-[50%] text-[19px]"
                ></i>
              </div>
              <div>
                <span
                  :class="[
                    'mdi',
                    blogs && blog.bookmark
                      ? 'mdi-bookmark text-[#FF0053] text-[21px]'
                      : 'mdi-bookmark-outline text-[21px]',
                  ]"
                  class="cursor-pointer"
                  @click.stop="addBookmark(blog._id)"
                ></span>
              </div>
            </div>
          </div>

          <div
            class="headline-tuncate font-semibold text-base font-source-serif text-[#1E0627] cursor-pointer mb-[1px]"
            @click="navigateToFeaturedDetail(blog._id)"
          >
            {{ blog.headline || "-" }}
          </div>
          <div
            class="headline-truncate-single-line pt-[1px] font-normal text-base font-source-serif text-[#1E0627] cursor-pointer mb-[1px]"
            @click="navigateToFeaturedDetail(blog._id)"
          >
            {{ blog.summary || "-" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  onBeforeUnmount,
  defineProps,
  computed,
} from "vue";
import axios from "axios";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import moment from "moment";
// import { useRoute, useRouter } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import Button from "./ViewAll.vue";
import fallbackImage2 from "../common/config/GlobalConstants";
const fallbackImage = fallbackImage2.variables.fallbackImage;
const router = useRouter();

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});
console.log("category", props);

const route = useRoute();
// const router = useRouter();

const blogs = ref([]);
console.log("blogs", blogs);
const screenWidth = ref(window.innerWidth);
const newsId = ref(route.params.id || "");

const fetchBlogs = async () => {
  try {
    const languageId = "6421a32aa020a23deacecf92";
    const response = await axios.post(
      `https://api-uat.newsshield.io/pinecone/getRelatedNews/${newsId.value}`,
      { languageId: languageId }
    );
    blogs.value = response.data.map((news) => ({
      ...news,
      bookmarked: false, // Initialize with 'false'
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};
const addBookmark = async (id) => {
  const newStatus = blogs.value.bookmark ? "Disabled" : "Enabled";
  const payload = { status: newStatus };
  try {
    await apiService.apiCall("post", `${apiConfig.BOOKMARK}/${id}`, payload);
    blogs.value.bookmark = !blogs.value.bookmark;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

const formatPublishTime = (publishTime) => {
  return moment(publishTime).fromNow();
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};
const navigateToFeaturedDetail = (id) => {
  router.push(`/news/${id}`);
};

const checkRouteParam = () => {
  newsId.value = route.params.id || "";
};

const slicedData = computed(() => {
  if (screenWidth.value < 640) {
    // Mobile devices
    return blogs.value.slice(0, 2);
  } else if (screenWidth.value >= 640 && screenWidth.value < 1024) {
    // Tablets
    return blogs.value.slice(0, 4);
  } else if (screenWidth.value >= 640 && screenWidth.value < 1025) {
    // Width between 640 and 1024
    return blogs.value.slice(0, 2);
  } else if (screenWidth.value >= 1024 && screenWidth.value < 860) {
    // Tablets
    return blogs.value.slice(0, 3);
  } else if (screenWidth.value >= 1024 && screenWidth.value <= 1400) {
    // Tablets
    return blogs.value.slice(0, 4);
  } else if (screenWidth.value >= 1400 && screenWidth.value <= 1600) {
    // Tablets
    return blogs.value.slice(0, 8);
  } else {
    // Desktop and larger devices
    return blogs.value.slice(0, 8);
  }
});
onBeforeMount(() => {
  fetchBlogs();
  checkRouteParam();
  window.addEventListener("resize", updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
</script>

<style scoped>
.headline-tuncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.headline-truncate-single-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
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
.multiline-truncate-one-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
