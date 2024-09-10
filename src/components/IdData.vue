<template>
  <Navbarrr />
  <div class="container mx-auto mt-4">
    <div class="flex flex-col lg:flex-row lg:space-x-8">
      <!-- Main Content -->
      <div class="lg:w-2/3 flex-grow flex flex-col">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden flex-grow">
          <div class="p-4">
            <h1 class="text-3xl font-sourcePro mb-4">
              {{ newsItem?.headline }}
            </h1>

            <img
              :src="newsItem?.imgixUrlHighRes"
              alt="Person kayaking on a lake with mountains in the background"
              class="w-full h-64 md:h-96 rounded-lg mb-4"
            />

            <div class="flex items-center mb-4 flex-wrap text-sm">
              <span class="text-light-gray mr-1">{{ newsItem?.source }}</span>
              <span class="text-light-gray mr-1">|</span>
              <span class="text-light-gray">2 min ago</span>
              <span class="text-[#000000] mx-1">•</span>
              <span class="text-pink-10">{{ newsItem?.categories[0] }}</span>
              <span class="text-light-gray mx-1">|</span>
              <span class="text-light-gray">1 min read</span>
            </div>

            <h2 class="text-2xl font-semibold text-Old-Burgundy mb-4">
              {{ newsItem?.author }}
            </h2>

            <div class="text-gray-5 space-y-4">
              <p>
                {{ newsItem?.summary }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:w-1/3 mt-8 lg:mt-0 flex-shrink-0 flex flex-col">
        <div class="flex-grow">
          <ChatBot :category="newsItem" />
        </div>
        <!-- <div class="flex-grow">
          <FeatureNews :category="newsItem" />
        </div> -->
      </div>
    </div>

    <!-- Latest News -->
    <div class="mt-8">
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
// import FeatureNews from "@/components/FeaturedIdStories.vue";
import RelatedNewsData from "@/components/RelatedNews.vue";
import ChatBot from "@/components/chatbot.vue";

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
</style>
