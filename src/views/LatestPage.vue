<template>
  <Navbarrr />
  <div class="mx-[10px] mt-[75px]">
    <div class="flex flex-col lg:flex-row gap-3 mt-3">
      <div
        class="w-[100%] lg:w-[62%] flex flex-col bg-white rounded-[10px] p-3"
      >
        <div class="flex flex-row items-center gap-1">
          <div class="bg-[#FF0053] w-[4px] h-[12px] rounded-md"></div>
          <div class="heads1 capitalize">Latest News</div>
        </div>
        <!-- Loading message -->
        <div v-if="loading" class="flex justify-center items-center h-[400px]">
          <p class="text-lg font-bold">Loading...</p>
        </div>

        <!-- No News Available message -->
        <div
          v-else-if="paginatedNews && paginatedNews.length === 0"
          class="flex justify-center items-center h-[400px]"
        >
          <p class="text-lg font-bold">No News Available</p>
        </div>

        <!-- Display news when available -->
        <div v-else>
          <div
            v-for="item in paginatedNews"
            :key="item._id"
            class="w-full mt-3 h-[300px] sm:h-[170px] bg-white drop-shadow-md flex rounded-lg"
          >
            <!-- News item layout -->
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
                class="w-[100%] sm:w-[60%] ml-0 mr-0 sm:ml-4 sm:mr-2 flex flex-col justify-evenly p-2 sm:p-0"
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

          <!-- Paginator -->
          <Paginator
            :rows="rowsPerPage"
            :totalRecords="totalRecords"
            :page="currentPage"
            @page="onPageChange"
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import moment from "moment";
import Footer from "@/components/Footer.vue";
import HotTopics from "@/components/HotTopics.vue";
import Navbarrr from "@/components/Navbarrr.vue";
import Paginator from "primevue/paginator"; // Ensure PrimeVue paginator is imported
import { useToast } from "primevue/usetoast";
import fallbackImage2 from "../common/config/GlobalConstants";
const fallbackImage = fallbackImage2.variables.fallbackImage;
const toast = useToast();
const paginatedNews = ref([]); // Holds the news items for the current page
const loading = ref(false); // Loading state
const languageId = ref("6421a32aa020a23deacecf92");
const currentPage = ref(1); // Current page (UI page)
const rowsPerPage = ref(5); // Number of items per page
const totalRecords = ref(0); // Total news records in API
const router = useRouter();
let newsCache = []; // Holds fetched news

// Fetch the news data from the API
const fetchNews = async (page = 1) => {
  loading.value = true;
  try {
    const response = await axios.post(
      "https://api-uat.newsshield.io/news/getAllBlogsForWeb",
      {
        language: languageId.value,
        page: page,
        pageLimit: 5,
      }
    );
    console.log("API response:", response.data); // Check the response here
    newsCache = response.data; // Cache the fetched news
    updatePaginatedNews(); // Update paginated news for display
    totalRecords.value = response.data.length;
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    loading.value = false;
  }
};

// Update paginated news based on the current page
const updatePaginatedNews = () => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  console.log("News Cache:", newsCache);
  console.log("Paginated News:", newsCache.slice(start, end));
  paginatedNews.value = newsCache.slice(start, end);
};

// Handle page change event in the paginator
const onPageChange = async (event) => {
  const uiPage = event.page + 1; // Convert to 1-based index
  if (uiPage > Math.ceil(newsCache.length / rowsPerPage.value)) {
    // If we're at the end of cached data, fetch the next set of 20 news
    await fetchNews(currentPage.value + 1);
    currentPage.value = 1;
  } else {
    currentPage.value = uiPage;
    updatePaginatedNews();
  }
};

// Navigation method for "More News"
const navigateToMoreNews = (id) => {
  router.push(`/news/${id}`);
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

// Fetch news on component mount
onMounted(() => {
  fetchNews();
});
</script>
