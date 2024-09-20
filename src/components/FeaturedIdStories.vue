<template>
  <div class="p-2 lg:h-[365px]">
    <div class="flex justify-between items-center w-full mb-3">
      <span
        class="text-[18px] font-bold border-l-4 border-red-500 text-[#1E0627] pl-2"
      >
        Related News
      </span>
      <Button />
    </div>
    <div
      class="flex flex-wrap lg:flex-row gap-3 justify-between cursor-pointer drop-shadow-lg"
    >
      <div
        v-for="(blog, index) in blogs.slice(0, 4)"
        :key="index"
        class="shadow-md lg:w-[48%] flex flex-row md:flex-row gap-2 border-1 p-2 rounded-[8px] cursor-pointer h-[130px]"
      >
        <img
          class="h-full w-[106px] object-cover rounded-[8px]"
          :src="blog.imgixUrlHighRes || fallbackImage"
          alt="Blog Image"
          @click="navigateToFeaturedDetail(blog._id)"
        />
        <div>
          <div class="flex justify-between items-center text-xs">
            <div class="flex gap-1">
              <span class="text-neon-pink capitalize font-lato">
                {{ blog?.source }}
              </span>
              <span> | </span>
              <span class="text-light-gray font-lato">
                {{ formatPublishTime(blog.publishTime) }}
              </span>
            </div>
            <div class="flex flex-row gap-2 pt-1">
              <div>
                <i
                  class="mdi mdi-share-variant text-black rounded-[50%] text-[19px]"
                ></i>
              </div>
              <div>
                <i
                  class="mdi mdi-bookmark-outline text-black rounded-[50%] text-[21px]"
                ></i>
              </div>
            </div>
          </div>

          <div
            class="headline-tuncate font-semibold text-base font-source-serif text-[#1E0627] cursor-pointer"
            @click="navigateToFeaturedDetail(blog._id)"
          >
            {{ blog.headline || "-" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from "vue";
import axios from "axios";
import moment from "moment";
// import { useRoute, useRouter } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import Button from "./ViewAll.vue";

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

const formatPublishTime = (publishTime) => {
  return moment(publishTime).fromNow();
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};
const navigateToFeaturedDetail = (id) => {
  router.push(`/news/${id}`);
};
// const navigateToNewsDetail = (id) => {
//   router.push(`/news/${id}`);
// };
// const addBookmark = async (id) => {
//   try {
//     const token = localStorage.getItem("apiDataToken");
//     if (!token) {
//       throw new Error("No authentication token found");
//     }

//     // Find the news item to check its current bookmark status
//     const newsItem = blogs.value.find((news) => news._id === id);

//     // Toggle the status between "Enabled" and "Disabled"
//     const newStatus = newsItem.bookmarked ? "Disabled" : "Enabled";

//     const res = await axios.post(
//       `https://api-uat.newsshield.io/bookmark/addBookmark/${newsId.value}`,
//       { status: newStatus },
//       {
//         headers: {
//           Authorization: `${token}`,
//         },
//       }
//     );
//     console.log("hiii", res);

//     // Update the local state to reflect the new bookmark status
//     newsItem.bookmarked = !newsItem.bookmarked;

//     console.log(
//       `News item ${id} bookmark status updated successfully to ${newStatus}`
//     );
//   } catch (error) {
//     if (error.response) {
//       console.error(
//         `Error updating bookmark status for news item ${id}:`,
//         error.response.data
//       );
//     } else if (error.request) {
//       console.error(
//         `Error updating bookmark status for news item ${id}: No response received`,
//         error.request
//       );
//     } else {
//       console.error(
//         `Error updating bookmark status for news item ${id}:`,
//         error.message
//       );
//     }
//   }
// };

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
//     return blogs.value.slice(0, 3);
//   }
// });
onMounted(() => {
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
