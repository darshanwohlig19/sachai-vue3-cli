<template>
  <Navbarrr />
  <div class="mx-[10px] mt-[75px]">
    <div class="flex flex-col lg:flex-row gap-3 mt-3">
      <div
        class="w-[100%] lg:w-[62%] flex flex-col bg-white rounded-[10px] p-3"
      >
        <div class="flex flex-row items-center gap-1">
          <div class="bg-[#FF0053] w-[4px] h-[12px] rounded-md"></div>
          <div class="heads1 capitalize">
            {{
              categoryName === "Breaking-News"
                ? "Breaking News"
                : categoryName || "Error"
            }}
          </div>
        </div>

        <!-- Loading message -->
        <div v-if="loading">
          <Skeleton />
        </div>

        <!-- No News Available message -->
        <div
          v-else-if="!news.length"
          class="flex justify-center items-center h-[400px]"
        >
          <p class="text-lg font-bold">No News Available</p>
        </div>

        <!-- Display news when available -->
        <div>
          <div
            v-for="(item, index) in paginatedNews"
            :key="index"
            class="w-full mt-3 h-[300px] sm:h-[170px] bg-white drop-shadow-md flex rounded-lg"
          >
            <div
              class="w-full bg-white flex flex-col sm:flex-row gap-0 rounded-lg"
            >
              <div class="w-[100%] sm:w-[40%] h-full items-center">
                <div
                  class="relative h-full bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div class="relative w-[100%] h-[100%]">
                    <img
                      class="absolute inset-0 object-cover h-full w-full filter blur-sm"
                      :src="item?.imgixUrlHighRes || fallbackImage"
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
                      :src="item?.imgixUrlHighRes || fallbackImage"
                    />
                  </div>
                </div>
              </div>
              <div
                class="w-[100%] sm:w-[60%] ml-0 mr-0 sm:ml-4 sm:mr-2flex flex-col justify-evenly p-2 sm:p-0"
              >
                <div class="flex justify-between items-center mt-1">
                  <div class="flex gap-1 text-[##1E0627] medium">
                    <div class="text-[8px] lg:text-[12px] font-lato">
                      {{ item?.source || "No source" }}
                    </div>
                    <div class="text-[8px] lg:text-[12px]">
                      | {{ moment(item?.publishTime || new Date()).fromNow() }}
                    </div>
                  </div>
                  <div class="flex gap-1">
                    <span
                      class="mdi mdi-share-variant text-[11px] lg:text-[17px]"
                    ></span>
                    <span
                      :class="[
                        'mdi',
                        'mdi-bookmark text-[11px] lg:text-[17px] cursor-pointer',
                        getBookmarkColor(item.isBookmarked),
                      ]"
                      @click="addBookmark(item)"
                    >
                    </span>
                  </div>
                </div>
                <div
                  class="text-[12px] lg:text-[16px] fontCustom leading-1 bold mr-1 mt-1"
                >
                  <div
                    @click="navigateToMoreNews(item._id)"
                    class="cursor-pointer multiline-truncate1"
                  >
                    {{ item?.headline || "No Headline" }}
                  </div>
                </div>
                <div
                  class="text-[10px] lg:text-[12px] text-[#878787] font-lato leading-1 mr-1 mt-1 mb-1"
                >
                  <div
                    @click="navigateToMoreNews(item._id)"
                    class="cursor-pointer multiline-truncate"
                  >
                    {{ item?.summary || "No summary" }}
                  </div>
                </div>
                <div class="text-[8px] lg:text-[12px] flex gap-3 mb-3">
                  <span class="text-red-500 capitalize">
                    {{
                      item.categories &&
                      item.categories.length > 0 &&
                      item.categories[0].name
                        ? item.categories[0].name.replace(/-/g, " ")
                        : item.categories.name
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Paginator
            :rows="rowsPerPage"
            :totalRecords="totalRecords"
            :page="currentPage"
            @page="onPageChange"
            :class="{ hidden: isLoading, visible: !isLoading }"
          />
        </div>
      </div>
      <div class="w-[100%] lg:w-[38%]">
        <HotTopics />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Skeleton from "../common/config/common_skeleton.vue";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios";
import moment from "moment";
import Footer from "@/components/Footer.vue";
import HotTopics from "@/components/HotTopics.vue";
import Paginator from "primevue/paginator";
import Navbarrr from "@/components/Navbarrr.vue";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import { useToast } from "primevue/usetoast";
import fallbackImage2 from "../common/config/GlobalConstants";
const fallbackImage = fallbackImage2.variables.fallbackImage;
const news = ref([]);
const loading = ref(true); // Add loading state
const currentPage = ref(0);
const rowsPerPage = ref(5);
const route = useRoute();
const router = useRouter();
const categoryId = route.params.slugOrId;
const categoryName = route.query.category;
const toast = useToast();
const navigateToMoreNews = (id) => {
  router.push(`/news/${id}`);
};

// Fetching news based on category ID
const fetchNews = async () => {
  const payload = {
    categoryId,
  };
  try {
    loading.value = true; // Set loading to true before fetching news
    const token = localStorage.getItem("apiDataToken");
    let response;

    if (token == null) {
      response = await apiService.apiCall(
        "post",
        `${apiConfig.GET_CATEGORY_WISE_NEWS_FOR_WEB}`,
        payload
      );
      // response = await axios.post(
      //   "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb/",
      //   {
      //     categoryId,
      //   }
      // );
    } else {
      response = await apiService.apiCall(
        "post",
        `${apiConfig.GET_CATEGORY_WISE_NEWS_FOR_WEB}`,
        payload
      );
    }
    console.log(response);
    news.value = response.data; // Set the news data
  } catch (error) {
    console.error("Error fetching news:", error);
    news.value = []; // If there's an error, set news to an empty array
  } finally {
    loading.value = false; // Set loading to false after fetching is complete
  }
};

const getBookmarkColor = (isBookmarked) => {
  return isBookmarked === "Enabled" ? "text-[#FF0053]" : "mdi-bookmark-outline";
};

const addBookmark = async (news) => {
  const token = localStorage.getItem("apiDataToken");
  try {
    const currentStatus =
      news.isBookmarked === "Enabled" ? "Disabled" : "Enabled";

    const response = await axios.post(
      `https://api-uat.newsshield.io/bookmark/addBookmark/${news._id}`,
      {
        status: currentStatus,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (currentStatus === "Enabled") {
      toast.add({
        severity: "success",
        summary: "Bookmark Added",
        group: "success",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "success",
        summary: "Bookmark Removed",
        group: "success",
        life: 3000,
      });
    }
    news.isBookmarked = currentStatus;
    return response.data;
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

// Computed property for paginated news
const paginatedNews = computed(() => {
  const start = currentPage.value * rowsPerPage.value;
  return news.value.slice(start, start + rowsPerPage.value);
});

// Computed property for total number of records
const totalRecords = computed(() => news.value.length);

// Method to handle page change
const onPageChange = (event) => {
  currentPage.value = event.page;
  rowsPerPage.value = event.rows;
};

// Fetch news when the component is mounted
onMounted(() => {
  if (categoryId) {
    fetchNews();
  }
});
</script>

<style scoped>
.fontCustom {
  font-family: "source-serif-pro-semibold";
  color: #1e0627;
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
</style>
