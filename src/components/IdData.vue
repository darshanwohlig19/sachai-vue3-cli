<template>
  <Navbarrr />
  <div class="container mx-auto mt-4">
    <div class="flex flex-col lg:flex-row lg:space-x-8">
      <div class="lg:w-2/3 flex-grow">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="p-4">
            <h1 class="text-3xl font-bold mb-4">
              {{ newsItem?.headline }}
            </h1>

            <img
              :src="newsItem?.imgixUrlHighRes"
              alt="Person kayaking on a lake with mountains in the background"
              class="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
            />

            <div class="flex items-center mb-4 flex-wrap text-sm">
              <span class="text-gray-600 mr-2">{{ newsItem?.source }}</span>
              <span class="text-gray-400 mr-2">|</span>
              <span class="text-gray-600">{{ formattedPublishTime() }}</span>
              <span class="text-gray-400 mx-2">|</span>
              <span class="text-red-500">{{ newsItem?.categories[0] }}</span>
              <!-- <span class="text-gray-400 mx-2">|</span> -->
              <!-- <span class="text-gray-600">4 min read</span> -->
            </div>

            <h2 class="text-2xl font-semibold mb-4">
              {{ newsItem?.author }}
            </h2>

            <div class="text-gray-700 space-y-4">
              <p>
                {{ newsItem?.fullContent }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:w-1/3 mt-8 lg:mt-0 flex-shrink-0 flex flex-col space-y-8">
        <ChatBot class="flex-grow" />
        <FeatureNews class="flex-grow" />
      </div>
    </div>
    <div><LatestNews /></div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";
import Footer from "@/components/Footer.vue";
import Navbarrr from "@/components/Navbarrr.vue";
import FeatureNews from "@/components/FeaturedIdStories.vue";
import LatestNews from "@/components/Latest.vue";
import ChatBot from "@/components/chatbot.vue";

const route = useRoute();
const newsItem = ref(null);
const newsId = route.params.id;

const fetchNewsItem = async () => {
  try {
    const response = await axios.get(
      `https://dev-api.askus.news/news/getOneNewsForWeb/${newsId}`
    );
    newsItem.value = response.data;
  } catch (error) {
    console.error("Error fetching news item:", error);
  }
};
const formattedPublishTime = () => {
  return moment(newsItem.value?.publishtime).fromNow();
};
// Fetch news when the component is mounted
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
