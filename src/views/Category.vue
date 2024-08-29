<template>
  <Navbarrr />
  <div class="mx-[20px]">
    <!-- <div class="flex flex-col lg:flex-row justify-between gap-5">
      <div class="w-[100%] lg:w-[50%]">
        <img
          :src="news[0]?.imgixUrlHighRes || fallbackImage"
          alt="news Img"
          class="w-full h-[290px] object-cover rounded-[20px]"
        />
        <div class="flex justify-between items-center font-lato mt-1">
          <div class="flex gap-2 text-[#676767] text-[8px] lg:text-[16px] m-2">
            <div>{{ news[0]?.source || "No source" }}</div>
            <div>|</div>
            <div>
              {{ moment(news[0]?.publishTime || new Date()).fromNow() }}
            </div>
          </div>
          <div class="flex flex-row gap-3 items-center">
            <div class="flex justify-between gap-2 text-[8px] lg:text-[16px]">
              <div class="text-[#FF0053]">Politics</div>
              <div>|</div>
              <div>4 min read</div>
            </div>
            <div class="flex gap-1 justify-evenly">
              <span
                class="material-symbols-outlined text-[14px] lg:text-[19px] cursor-pointer"
              >
                share
              </span>
              <span
                class="material-symbols-outlined text-[14px] lg:text-[19px] cursor-pointer"
              >
                bookmark
              </span>
            </div>
          </div>
        </div>
        <div
          class="text-[14px] lg:text-[32px] semi-bold fontCustom leading-1 mt-2 mb-2"
        >
          {{ news[0]?.headline || "No Headline" }}
        </div>
        <div class="text-[10px] lg:text-[16px]">
          {{ truncateText(news[0]?.summary || "No summary", 170) }}
        </div>
      </div>
      <div class="w-[100%] lg:w-[50%] flex flex-col justify-between gap-4">
        <div class="w-full h-[50%] bg-white h-[200px] flex rounded-lg">
          <div class="w-[40%] p-2">
            <a href="{`${SACHAI_NEWS_URL}${data1[1]._id}`}">
              <img
                class="w-full h-full rounded-md object-cover"
                :src="news[1]?.imgixUrlHighRes || fallbackImage"
                alt=""
              />
            </a>
          </div>
          <div class="w-[60%] ml-2 mt-2 mr-2 flex flex-col justify-between">
            <div class="flex justify-between items-center mt-1">
              <div class="flex gap-1 text-gray-400 medium">
                <div class="text-[8px] lg:text-[14px] font-lato">
                  {{ news[1]?.source || "No source" }}
                </div>
                <div class="text-[8px] lg:text-[14px]">
                  | {{ moment(news[1]?.publishTime || new Date()).fromNow() }}
                </div>
              </div>
              <div class="flex gap-1">
                <span
                  class="material-symbols-outlined text-[11px] lg:text-[19px] cursor-pointer"
                >
                  share
                </span>
                <span
                  class="material-symbols-outlined text-[11px] lg:text-[19px] cursor-pointer"
                >
                  bookmark
                </span>
              </div>
            </div>
            <div
              class="text-[12px] lg:text-[24px] fontCustom leading-1 bold mr-1"
            >
              <a
                href="{`${SACHAI_NEWS_URL}${data1[1]._id}`}"
                class="hover:text-current"
              >
                {{ news[1]?.headline || "No Headline" }}
              </a>
            </div>
            <div
              class="text-[10px] lg:text-[16px] font-lato leading-1 font-[16px] mr-1 mb-2"
            >
              <a
                href="{`${SACHAI_NEWS_URL}${data1[1]._id}`}"
                class="hover:text-current"
              >
                {{ truncateText(news[1]?.summary || "No summary", 90) }}
              </a>
            </div>
            <div class="mb-3 text-[8px] lg:text-[14px] flex gap-1">
              <span class="text-red-500">Politics</span>
              <span>| 4 min read</span>
            </div>
          </div>
        </div>
        <div class="w-full h-[50%] bg-white h-[200px] flex rounded-lg">
          <div class="w-[40%] p-2">
            <a href="{`${SACHAI_NEWS_URL}${data1[1]._id}`}">
              <img
                class="w-full h-full rounded-md object-cover"
                :src="news[2]?.imgixUrlHighRes || fallbackImage"
                alt=""
              />
            </a>
          </div>
          <div class="w-[60%] ml-2 mt-2 mr-2 flex flex-col justify-between">
            <div class="flex justify-between items-center mt-1">
              <div class="flex gap-1 text-gray-400 medium">
                <div class="text-[8px] lg:text-[14px] font-lato">
                  {{ news[2]?.source || "No source" }}
                </div>
                <div class="text-[8px] lg:text-[14px]">
                  | {{ moment(news[2]?.publishTime || new Date()).fromNow() }}
                </div>
              </div>
              <div class="flex gap-1">
                <span
                  class="material-symbols-outlined text-[11px] lg:text-[19px] cursor-pointer"
                >
                  share
                </span>
                <span
                  class="material-symbols-outlined text-[11px] lg:text-[19px] cursor-pointer"
                >
                  bookmark
                </span>
              </div>
            </div>
            <div
              class="text-[12px] lg:text-[24px] fontCustom leading-1 bold mr-1"
            >
              <a
                href="{`${SACHAI_NEWS_URL}${data1[1]._id}`}"
                class="hover:text-current"
              >
                {{ news[2]?.headline || "No Headline" }}
              </a>
            </div>
            <div
              class="text-[10px] lg:text-[16px] font-lato leading-1 font-[16px] mr-1 mb-2"
            >
              <a
                href="{`${SACHAI_NEWS_URL}${data1[1]._id}`}"
                class="hover:text-current"
              >
                {{ truncateText(news[2]?.summary || "No summary", 90) }}
              </a>
            </div>
            <div class="mb-3 text-[8px] lg:text-[14px] flex gap-1">
              <span class="text-red-500">Politics</span>
              <span>| 4 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="flex flex-col lg:flex-row gap-3 mt-3">
      <div
        class="w-[100%] lg:w-[62%] flex flex-col gap-3 bg-white rounded-[10px] p-3"
      >
        <div
          v-for="(item, index) in paginatedNews"
          :key="index"
          class="w-full h-[50%] bg-white drop-shadow-md flex rounded-lg"
        >
          <div class="w-full h-[50%] bg-white flex rounded-lg">
            <div class="w-[40%] h-[212px] items-center">
              <a :href="`${SACHAI_NEWS_URL}${item._id}`">
                <img
                  class="w-full h-full rounded-md object-cover"
                  :src="item.imgixUrlHighRes || fallbackImage"
                  alt=""
                />
              </a>
            </div>
            <div class="w-[60%] ml-4 mt-2 mr-2 flex flex-col justify-between">
              <div class="flex justify-between items-center mt-1">
                <div class="flex gap-1 text-gray-400 medium">
                  <div class="text-[8px] lg:text-[14px] font-lato">
                    {{ item?.source || "No source" }}
                  </div>
                  <div class="text-[8px] lg:text-[14px]">
                    | {{ moment(item?.publishTime || new Date()).fromNow() }}
                  </div>
                </div>
                <div class="flex gap-1">
                  <span
                    class="material-symbols-outlined text-[11px] lg:text-[19px] cursor-pointer"
                  >
                    share
                  </span>
                  <span
                    class="material-symbols-outlined text-[11px] lg:text-[19px] cursor-pointer"
                  >
                    bookmark
                  </span>
                </div>
              </div>
              <div
                class="text-[12px] lg:text-[20px] fontCustom leading-1 bold mr-1 mt-2"
              >
                <a
                  :href="`${SACHAI_NEWS_URL}${item._id}`"
                  class="hover:text-current"
                >
                  {{ truncateText(item?.headline || "No Headline", 80) }}
                </a>
              </div>
              <div
                class="text-[10px] lg:text-[14px] text-[#878787] font-lato leading-1 mr-1 mt-1 mb-3"
              >
                <a
                  :href="`${SACHAI_NEWS_URL}${item._id}`"
                  class="hover:text-current"
                >
                  {{ truncateText(item?.summary || "No summary", 140) }}
                </a>
              </div>
              <div class="text-[8px] lg:text-[14px] flex gap-3">
                <span class="text-red-500">Politics</span>
                <span>|</span>
                <span> 4 min read</span>
              </div>
            </div>
          </div>
        </div>

        <Paginator
          :rows="rowsPerPage"
          :totalRecords="totalRecords"
          :page="currentPage"
          @page="onPageChange"
        />
      </div>
      <div class="w-[100%] lg:w-[38%]">
        <HotTopics />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";

import Footer from "@/components/Footer.vue";
import HotTopics from "@/components/HotTopics.vue";
import Paginator from "primevue/paginator";
import Navbarrr from "@/components/Navbarrr.vue";

// Refs for storing news and pagination state
const news = ref([]);
const news1 = ref([]);
const currentPage = ref(0);
const rowsPerPage = ref(5);

const route = useRoute();
const categoryId = route.params.slugOrId;

// Fetching news based on category ID
const fetchNews = async () => {
  try {
    const response = await axios.post(
      "https://dev-api.askus.news/news/getCategoryWiseNewsForWeb/",
      {
        categoryId,
      }
    );
    news.value = response.data.slice(0, 3);
    news1.value = response.data.slice(4, response.data.length - 1);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

// Truncate text helper function
const truncateText = (text, length) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

// Computed property for paginated news
const paginatedNews = computed(() => {
  const start = currentPage.value * rowsPerPage.value;
  return news1.value.slice(start, start + rowsPerPage.value);
});

// Computed property for total number of records
const totalRecords = computed(() => news1.value.length);

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

<style>
.fontCustom {
  font-family: "source-serif-pro-semibold";
}
</style>
