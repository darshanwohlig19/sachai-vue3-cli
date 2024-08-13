<template>
  <div>
    <h1>Category News</h1>
    <ul>
      <li v-for="item in news" :key="item.id">{{ item.headline }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const news = ref([]);
const news1 = ref([]);

const route = useRoute();
const categoryId = route.params.slugOrId;
const fetchNews = async () => {
  try {
    const response = await axios.post(
      "https://dev-api.askus.news/news/getCategoryWiseNewsForWeb/",
      {
        categoryId,
      }
    );
    news.value = response.data.slice(0, 3);
    news1.value = response.data.slice(4, length - 1);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

onMounted(() => {
  if (categoryId) {
    fetchNews();
  }
});
</script>

<style>
/* Add your styles here */
</style>
