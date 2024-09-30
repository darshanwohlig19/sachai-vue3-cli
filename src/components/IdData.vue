<template>
  <Navbarrr />
  <div class="mx-[10px] mt-3">
    <div class="flex flex-col lg:flex-row">
      <div
        class="flex-grow flex flex-col h-full max-w-full sm:max-w-[90%] lg:max-w-[66%]"
      >
        <div
          class="shadow-lg rounded-lg between-Laptop:!hidden overflow-hidden flex-grow flex flex-col md:flex-row h-auto md:h-[16rem] bg-white"
        >
          <div class="relative w-full md:w-1/2 overflow-hidden p-2">
            <div class="image-container">
              <img
                :src="newsItem?.imgixUrlHighRes"
                alt="News image"
                class="news-image w-full h-64 object-fill rounded-xl"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 p-2 flex flex-col">
            <span
              class="text-lg font-source-serif text-secondary font-semibold pb-[5px]"
            >
              {{ newsItem?.headline }}
            </span>
            <div
              class="flex flex-wrap items-center justify-between text-xs w-full pb-2"
            >
              <!-- Categories Name and Additional Info -->
              <div class="flex items-center mr-2 pb-2">
                <span class="text-neon-pink mr-1 capitalize">
                  {{ newsItem?.categoriesName[0] }}
                </span>
                <span class="text-light-gray mr-2">|</span>
                <span class="text-light-gray mr-2">{{ newsItem?.source }}</span>
                <span class="text-light-gray mr-2">|</span>
                <span class="text-light-gray mr-2">{{
                  formattedPublishTime
                }}</span>
              </div>

              <!-- Social Media Links and Bookmark -->
              <div class="ml-auto flex items-center space-x-2">
                <a
                  :href="newsItem?.newsLink"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="faceBookLogo"
                    alt="Facebook Logo"
                    class="social-icon"
                  />
                </a>
                <a
                  :href="newsItem?.newsLink"
                  target="_blank"
                  class="flex items-center"
                >
                  <img :src="xLogo" alt="X Logo" class="social-icon" />
                </a>
                <a
                  :href="newsItem?.newsLink"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="linkDinLogo"
                    alt="LinkedIn Logo"
                    class="social-icon"
                  />
                </a>
                <a
                  :href="newsItem?.newsLink"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="whatsappLogo"
                    alt="WhatsApp Logo"
                    class="social-icon"
                  />
                </a>
                <span
                  :class="[
                    'mdi',
                    newsItem && newsItem.bookmark
                      ? 'mdi-bookmark text-[#FF0053] text-[21px]'
                      : 'mdi-bookmark-outline text-[21px]',
                  ]"
                  class="cursor-pointer"
                  @click.stop="addBookmark(newsItem._id)"
                ></span>
              </div>
            </div>

            <div
              class="text-[#878787] space-y-4 font-lato text-sm ml-1 md-hidden"
            >
              <p>{{ newsItem?.summary }}</p>
            </div>
          </div>
        </div>

        <div
          class="hidden between-Laptop:!flex !flex-col shadow-lg rounded-lg overflow-hidden bg-white h-[50vh]"
        >
          <div class="flex flex-row">
            <div class="relative w-1/2 overflow-hidden p-2">
              <img
                :src="newsItem?.imgixUrlHighRes"
                alt="News image"
                class="news-image h-[150px] w-[266px] object-cover rounded-xl mx-2 my-2"
              />
            </div>
            <div class="w-1/2 p-2 flex flex-col justify-between">
              <!-- added flex-col and justify-between -->
              <span
                class="text-lg font-source-serif text-secondary font-semibold pb-1"
              >
                {{ newsItem?.headline }}
              </span>
              <div
                class="flex flex-wrap items-center ml-1 text-[11px] w-full pb-2"
              >
                <span class="text-neon-pink mr-1 capitalize">
                  {{ newsItem?.categoriesName[0] }}
                </span>
                <span class="text-light-gray mr-2">|</span>
                <span class="text-light-gray mr-2">{{ newsItem?.source }}</span>
                <span class="text-light-gray mr-2">|</span>
                <span class="text-light-gray mr-2">{{
                  formattedPublishTime
                }}</span>
              </div>
              <div class="ml-auto flex items-center space-x-2">
                <a
                  :href="newsItem?.newsLink"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="faceBookLogo"
                    alt="Facebook Logo"
                    class="social-icon"
                  />
                </a>
                <a
                  :href="newsItem?.newsLink"
                  target="_blank"
                  class="flex items-center"
                >
                  <img :src="xLogo" alt="X Logo" class="social-icon" />
                </a>
                <a
                  :href="newsItem?.newsLink"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="linkDinLogo"
                    alt="LinkedIn Logo"
                    class="social-icon"
                  />
                </a>
                <a
                  :href="newsItem?.newsLink"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="whatsappLogo"
                    alt="WhatsApp Logo"
                    class="social-icon"
                  />
                </a>
                <span
                  :class="[
                    'mdi',
                    newsItem && newsItem.bookmark
                      ? 'mdi-bookmark-outline text-[21px]'
                      : 'mdi-bookmark-outline text-[21px]',
                  ]"
                  class="cursor-pointer"
                  @click.stop="addBookmark(newsItem._id)"
                ></span>
              </div>
            </div>
          </div>
          <div class="text-[#878787] space-y-4 font-lato text-sm mx-2">
            <p>{{ newsItem?.summary }}</p>
          </div>
        </div>

        <div
          class="bg-white shadow-lg rounded-lg overflow-hidden mt-2 sm:h-[390px] lg:h-[390px] md:h-[390px]"
        >
          <FeatureNews />
        </div>
      </div>

      <!-- ChatBot Section -->
      <div
        class="hidden lg:block ml-2 md:h-[85vh] lg:h-[88.5vh] between-Laptop:!h-[111.5vh]"
      >
        <ChatBot :category="newsItem" />
      </div>
    </div>
  </div>

  <div
    class="mt-1 bg-white shadow-lg rounded-lg mx-[10px]"
    v-if="newsItem?._id"
  >
    <RelatedNewsData :category="newsItem" />
  </div>
  <Footer />
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import axios from "axios";
import moment from "moment"; // Import moment
import Footer from "@/components/Footer.vue";
import Navbarrr from "@/components/Navbarrr.vue";
import FeatureNews from "@/components/FeaturedIdStories.vue";
import RelatedNewsData from "@/components/RelatedNews.vue";
import ChatBot from "@/components/chatbot.vue";
import faceBookLogo from "@/assets/facebook.svg";
import xLogo from "@/assets/X.svg";
import linkDinLogo from "@/assets/linkedin.svg";
import whatsappLogo from "@/assets/whatsapp.svg";
const route = useRoute();
const newsItem = ref(null);
const newsId = route.params.id;

const formattedPublishTime = computed(() => {
  return newsItem.value?.publishTime
    ? moment(newsItem.value.publishTime).fromNow()
    : "";
});
const addBookmark = async (id) => {
  const newStatus = newsItem.value.bookmark ? "Disabled" : "Enabled";
  const payload = { status: newStatus };
  try {
    await apiService.apiCall("post", `${apiConfig.BOOKMARK}/${id}`, payload);
    newsItem.value.bookmark = !newsItem.value.bookmark;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

const fetchNewsItem = async () => {
  try {
    const response = await axios.get(
      `https://api-uat.newsshield.io/news/getOneNewsForWeb/${newsId}`
    );
    newsItem.value = response.data[0];
  } catch (error) {
    console.error("Error fetching news item:", error);
  }
};

onBeforeMount(() => {
  if (newsId) {
    fetchNewsItem();
  }
});
</script>

<style>
.fontCustom {
  font-family: "source-serif-pro-semibold";
}
.image-container {
  position: relative;
  width: 100%;
  height: 256px;
  overflow: hidden;
  border-radius: 0.5rem;
  padding: 16px; /* Adjust padding as needed */
}

.news-image {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 32px); /* Adjust for padding */
  height: calc(100% - 32px); /* Adjust for padding */
  object-fit: cover; /* This will maintain the aspect ratio */
  object-position: center;
}

.news-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* This will maintain the aspect ratio */
  object-position: center;
}

.font-semibold {
  font-family: "Source Serif Pro", serif;
  font-weight: 600;
}
</style>
