<template>
  <Navbarrr />
  <div class="mx-[20px]">
    <div class="flex flex-col lg:flex-row gap-3 mt-3">
      <div
        class="w-[100%] lg:w-[62%] flex flex-col gap-3 bg-white rounded-[10px] p-3"
      >
        <!-- Loading message -->
        <div v-if="loading" class="flex justify-center items-center h-[400px]">
          <p class="text-lg font-bold">Loading...</p>
        </div>

        <!-- No News Available message -->
        <div
          v-else-if="news && news.length === 0"
          class="flex justify-center items-center h-[400px]"
        >
          <p class="text-lg font-bold">No News Available</p>
        </div>

        <!-- Display news when available -->
        <div v-else>
          <div
            v-for="item in news"
            :key="item._id"
            class="w-full mt-3 h-[170px] bg-white drop-shadow-md flex rounded-lg"
          >
            <!-- News item layout -->
            <div class="w-full bg-white flex gap-0 rounded-lg">
              <div class="w-[40%] h-full items-center">
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
              <div class="w-[60%] ml-4 mr-2 flex flex-col justify-evenly">
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

const news = ref([]);
const loading = ref(false); // Loading state
const languageId = ref("6421a32aa020a23deacecf92");
const currentPage = ref(1); // Current page
const rowsPerPage = ref(5); // Number of items per page
const totalRecords = ref(0); // Total records from API
const fallbackImage = "path/to/fallback/image.jpg";
const router = useRouter();

// Fetch the news data from the API
// Fetch the news data from the API
const fetchNews = async (page = 1) => {
  loading.value = true;
  console.log(`Fetching news for page: ${page}`);
  try {
    const response = await axios.post(
      `https://api-uat.newsshield.io/topic/apiForTopicsForWeb/65e17ea9842874dab8c45010`,
      {
        language: languageId.value,
        page: page,
        limit: rowsPerPage.value,
      }
    );

    // Adjust this according to your API response structure
    news.value = response.data;
    totalRecords.value = response.data.length; // Assuming total count is in `response.data.total`
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    loading.value = false;
  }
};

// Handle page change event
const onPageChange = (event) => {
  currentPage.value = event.page + 1; // Update current page (Paginator's page is zero-indexed)
  fetchNews(currentPage.value); // Fetch news for the new page
  console.log("Current page:", currentPage.value); // Log current page
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
