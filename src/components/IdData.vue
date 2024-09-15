<template>
  <Navbarrr />
  <div class="max-w-[1400px] mx-auto mt-2">
    <div class="flex flex-col lg:flex-row">
      <!-- Main Content -->
      <div class="flex-grow flex flex-col h-full max-w-[66%]">
        <div
          class="bg-white shadow-lg rounded-lg overflow-hidden flex-grow h-72 w-[913px] flex"
        >
          <!-- Combined content -->
          <div class="w-full flex p-2.5">
            <!-- Left side for the image -->
            <div class="w-1/2">
              <div class="image-container h-full">
                <img
                  :src="newsItem?.imgixUrlHighRes"
                  alt="News image"
                  class="news-image w-full h-full object-cover"
                />
              </div>
            </div>

            <!-- Right side for the content -->
            <div class="w-1/2 p-2 flex flex-col">
              <span
                class="text-lg font-source-serif text-Secondary font-semibold ml-[1px]"
              >
                {{ newsItem?.headline }}
              </span>
              <div class="flex items-center ml-[1px]">
                <span class="text-neon-pink mr-1 capitalize">
                  {{ newsItem?.categoriesName[0] }}
                </span>
                <span class="text-light-gray mr-2">|</span>
                <span class="text-light-gray mr-2">
                  {{ newsItem?.source }}
                </span>
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
                      :href="newsItem?.newsLink"
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
                  <i
                    class="mdi mdi-bookmark-outline text-black sm:h-[40px] sm:text-[22px] h-[30px] mt-[3%]"
                  ></i>
                </div>
              </div>
              <div
                class="text-[#878787] space-y-4 font-lato mt-[1%] text-sm ml-[1px] overflow-y-auto slim-scrollbar"
              >
                <p>
                  {{ newsItem?.summary }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-lg rounded-lg overflow-hidden flex-grow h-96 w-[913px] flex mt-[1%]"
        >
          <FeatureNews :category="newsItem" />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-[100%]">
          <ChatBot :category="newsItem" />
        </div>
      </div>
    </div>

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
  width: 427px;
  height: 248px; /* Set a fixed height */
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
