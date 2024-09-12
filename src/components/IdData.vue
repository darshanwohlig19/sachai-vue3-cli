<template>
  <Navbarrr />
  <div class="max-w-[1400px] mx-auto mt-2">
    <div class="flex flex-col lg:flex-row lg:space-x-4">
      <!-- Main Content -->
      <div class="flex-grow flex flex-col h-full">
        <div
          class="bg-white shadow-lg rounded-lg overflow-hidden flex-grow h-[682px]"
        >
          <div class="p-2">
            <div class="image-container">
              <img
                :src="newsItem?.imgixUrlHighRes"
                alt="News image"
                class="news-image"
              />
            </div>

            <div class="flex items-center">
              <span class="text-neon-pink mr-2">
                {{ newsItem?.categoriesName[0] }}
              </span>
              <span class="text-light-gray mr-2">|</span>
              <span class="text-light-gray mr-2">
                {{ newsItem?.source }}
              </span>
              <span class="text-light-gray mr-2">|</span>
              <span class="text-light-gray"> 2 min ago </span>
              <div class="ml-auto flex items-center space-x-2">
                <a
                  href="https://www.facebook.com"
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
                  href="https://www.twitter.com"
                  target="_blank"
                  class="flex items-center"
                >
                  <img :src="xLogo" alt="X Logo" class="social-icon" />
                </a>
                <a
                  href="https://www.linkedin.com"
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
                  href="https://www.whatsapp.com"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="whatsappLogo"
                    alt="WhatsApp Logo"
                    class="social-icon"
                  />
                </a>
                <i
                  class="mdi mdi-bookmark-outline text-black sm:h-[40px] sm:w-[40px] sm:text-[22px] h-[30px] mt-[3%]"
                ></i>
              </div>
            </div>

            <span
              class="text-2xl font-sourceSerifPro text-Secondary font-semibold mb-1"
            >
              {{ newsItem?.headline }}
            </span>
            <div class="text-gray-5 space-y-4 mb-4 font-lato mt-[1%]">
              <p>
                {{ newsItem?.summary }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:w-1/2 mt-8 lg:mt-0 flex-shrink-0">
        <div class="flex flex-col lg:flex-row lg:space-x-4">
          <div class="lg:w-1/2">
            <ChatBot :category="newsItem" />
          </div>
          <div class="lg:w-1/2">
            <FeatureNews :category="newsItem" />
          </div>
        </div>
      </div>
    </div>

    <!-- Latest News -->
    <div class="mt-1 bg-white shadow-lg rounded-lg">
      <RelatedNewsData />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Footer from "@/components/Footer.vue";
import Navbarrr from "@/components/Navbarrr.vue";
import FeatureNews from "@/components/FeaturedIdStories.vue";
import RelatedNewsData from "@/components/RelatedNews.vue";
import ChatBot from "@/components/chatbot.vue";
import faceBookLogo from "@/assets/png/facebook.png";
import xLogo from "@/assets/png/x.png";
import linkDinLogo from "@/assets/png/linkDin.png";
import whatsappLogo from "@/assets/png/whatsapp.png";

const route = useRoute();
const newsItem = ref(null);
console.log("newsItem", newsItem);
const newsId = route.params.id;
console.log("newsId", newsId);
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

onMounted(() => {
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
  padding-top: 56.25%;
  overflow: hidden;
  border-radius: 0.5rem;
}

.news-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: center;
}
</style>
