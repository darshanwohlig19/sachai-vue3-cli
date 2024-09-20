<template>
  <Navbarrr />
  <div class="max-w-[1400px] mx-auto mt-2">
    <div class="flex flex-col lg:flex-row">
      <!-- Main Content -->
      <div
        class="flex-grow flex flex-col h-full max-w-full sm:max-w-[90%] lg:max-w-[66%]"
      >
        <div
          class="shadow-lg rounded-lg overflow-hidden flex-grow flex flex-col md:flex-row h-auto md:h-[21rem] max-w-full md:max-w-[913px] bg-white"
        >
          <div class="relative w-full overflow-hidden rounded-lg p-2">
            <div class="image-container">
              <img
                :src="newsItem?.imgixUrlHighRes"
                alt="News image"
                class="news-image w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 p-2 flex flex-col">
            <span
              class="text-lg font-source-serif text-Secondary font-semibold ml-[1px]"
            >
              {{ newsItem?.headline }}
            </span>
            <div class="flex items-center ml-[1px] text-xs w-full pb-2">
              <!-- Categories Name -->
              <span class="text-neon-pink mr-1 capitalize">
                {{ newsItem?.categoriesName[0] }}
              </span>

              <!-- Separator -->
              <span class="text-light-gray mr-2">|</span>

              <!-- Source Name -->
              <span class="text-light-gray mr-2">
                {{ newsItem?.source }}
              </span>

              <!-- Social Icons -->
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
                <!-- Bookmark Icon -->
                <i
                  class="mdi mdi-bookmark-outline text-black sm:text-[22px] mt-0"
                ></i>
              </div>
            </div>

            <div
              class="text-[#878787] space-y-4 font-lato mt-[1%] text-sm ml-[1px]"
            >
              <p>
                {{ newsItem?.summary }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="bg-white shadow-lg rounded-lg overflow-hidden mt-[1%] max-w-full md:max-w-[913px]"
        >
          <FeatureNews />
        </div>
        <!-- Feature News Section -->
      </div>

      <div class="lg:w-[100%] ml-[1%]">
        <div class="hidden lg:block">
          <ChatBot :category="newsItem" />
        </div>
      </div>
    </div>

    <div class="mt-1 bg-white shadow-lg rounded-lg" v-if="newsItem?._id">
      <RelatedNewsData :category="newsItem" />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
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

const fetchNewsItem = async () => {
  try {
    const response = await axios.get(
      `https://api-uat.newsshield.io/news/getOneNewsForWeb/${newsId}`
    );
    newsItem.value = response.data;
  } catch (error) {
    console.error("Error fetching news item:", error);
  }
};

const formatCategoryName = (name) => {
  if (!name) return ""; // Return an empty string if name is null or undefined
  return name.toLowerCase() === "ai"
    ? name.toUpperCase()
    : name.replace(/-/g, " ");
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
  height: 327px; /* Set a fixed height */
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

.image-container {
  position: relative;
  width: 100%;
  height: 327px; /* Set a fixed height */
  overflow: hidden;
  border-radius: 0.5rem;
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
