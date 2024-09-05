<template>
  <div v-for="item in BookmarkData" :key="item._id">
    {{ item.headline }}
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const BookmarkData = ref([]);

const Bookmark = async () => {
  try {
    const token = localStorage.getItem("apiDataToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await axios.post(
      "https://api-uat.newsshield.io/bookmark/getBookmarkData",
      {
        language: "6421a32aa020a23deacecf92",
        page: 1,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    BookmarkData.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

onMounted(() => {
  Bookmark();
});
</script>
