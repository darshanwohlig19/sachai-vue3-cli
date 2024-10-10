<template>
  <div class="mt-3">
    <div class="carousel_card">
      <!-- Loader -->
      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-[3px] mt-3"
      >
        <div
          v-for="n in numberOfItems"
          :key="n"
          class="p-4 bg-white rounded-lg shadow"
        >
          <div class="flex justify-between mb-4">
            <!-- Skeleton for title and "View All" button -->
            <Skeleton width="40%" height="1.5rem" />
            <Skeleton width="20%" height="1.5rem" />
          </div>

          <!-- Skeleton for the list of items -->
          <div class="space-y-4">
            <div v-for="n in 4" :key="n" class="flex items-center space-x-4">
              <!-- Skeleton for image -->
              <Skeleton width="4rem" height="4rem" borderRadius="8px" />
              <!-- Skeleton for text -->
              <div class="w-full">
                <Skeleton width="100%" height="1.5rem" class="mb-2" />
                <Skeleton width="75%" height="1.5rem" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel -->
      <Carousel
        v-else
        :value="categories"
        :numVisible="4"
        :numScroll="4"
        :circular="true"
        :showIndicators="true"
        :showNavigators="true"
        :responsiveOptions="responsiveOptions"
        :autoplayInterval="3000"
        class="custom-carousel w-full"
      >
        <template #item="slotProps">
          <div class="category-item mx-2">
            <Card class="h-full p-3 rounded-[10px]">
              <template #header>
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-1">
                    <div class="bg-[#FF0053] w-[4px] h-[13px] rounded-md"></div>
                    <h3 class="font-18 capitalize !text-[#1e0627]">
                      {{ slotProps.data.name }}
                    </h3>
                  </div>
                  <a
                    :href="`/categories/${slotProps.data._id}?category=${slotProps.data.name}`"
                  >
                    <Button />
                  </a>
                </div>
              </template>
              <template #content>
                <div class="flex flex-col gap-3 cursor-pointer w-[100%] h-[]">
                  <div
                    @click="navigateToCategoryDetail(news._id)"
                    v-for="(news, index) in slotProps.data.news.slice(0, 4)"
                    :key="index"
                    class="!flex items-center p-2 rounded-[4px] gap-3"
                    style="box-shadow: 0px 0px 5px 2px #0000000f"
                  >
                    <!-- <BlogCard
              :headline="blog.headline"
              :image="blog.imgixUrlHighRes || fallbackImage"
              height="57px"
            /> -->
                    <div class="flex-shrink-0">
                      <img
                        class="h-[58px] w-[55px] object-contain rounded"
                        :src="news.imgixUrlHighRes || fallbackImage"
                        alt="Blog Image"
                      />
                    </div>
                    <div class="">
                      <div
                        class="headline-tuncate-right text-[#1E0627] headine-home leading-4"
                      >
                        {{ news.headline || "headline" }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
// import axios from "axios";
import Carousel from "primevue/carousel";
import Card from "primevue/card";
import "primevue/resources/themes/saga-blue/theme.css"; // Theme CSS
import "primevue/resources/primevue.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons CSS
import Button from "./ViewAll.vue";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import { useRouter } from "vue-router";
import fallbackImage2 from "../common/config/GlobalConstants";

const categories = ref([]);
const router = useRouter();
const loading = ref(true);
const noNews = ref(false); // Optional: Use this if you need to track if no news is found
const fallbackImage = fallbackImage2.variables.fallbackImage;
const numberOfItems = ref(4); // Default to 4 for large screens

const navigateToCategoryDetail = (id) => {
  router.push(`/news/${id}`);
};
const updateNumberOfItems = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 640) {
    numberOfItems.value = 1; // Mobile devices
  } else if (screenWidth >= 640 && screenWidth < 1024) {
    numberOfItems.value = 2; // Tablet devices
  } else {
    numberOfItems.value = 4; // Laptop and larger devices
  }
};

onMounted(() => {
  updateNumberOfItems(); // Set the initial number of items based on the screen size
  window.addEventListener("resize", updateNumberOfItems); // Listen for screen resize events
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateNumberOfItems); // Cleanup event listener when component is destroyed
});

const fetchNewsForCategory = async (categoryId) => {
  const payload = {
    categoryId,
  };
  try {
    // const { data } = await axios.post(
    //   "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb/",
    //   { categoryId }
    // );
    const { data } = await apiService.apiCall(
      "post",
      `${apiConfig.GET_CATEGORY_WISE_NEWS_FOR_WEB}`,
      payload
    );
    return data;
  } catch (error) {
    console.error(`Error fetching news for category ${categoryId}:`, error);
    return [];
  }
};

const fetchCategories = async () => {
  const languageId = "6421a32aa020a23deacecf92";
  const payload = {
    langauge: languageId,
  };
  try {
    // const { data } = await axios.post(
    //   "https://api-uat.newsshield.io/category/getAllCat"
    // );
    const { data } = await apiService.apiCall(
      "post",
      `${apiConfig.GET_ALL_CATEGORY}`,
      payload
    );
    const categoriesData = data.slice(8, 16).map((category) => ({
      ...category,
      name:
        category?.name?.toLowerCase() === "ai"
          ? category.name.toUpperCase()
          : category.name.replace(/-/g, " "),
    }));

    for (let category of categoriesData) {
      category.news = await fetchNewsForCategory(category._id);
    }

    categories.value = categoriesData;
    noNews.value = categoriesData.every((cat) => cat.news.length === 0);
  } catch (error) {
    console.error("Error fetching categories:", error);
  } finally {
    loading.value = false;
  }
};

const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: "625px",
    numVisible: 1,
    numScroll: 1,
  },
];

onMounted(() => {
  fetchCategories();
});
</script>

<style>
.loader {
  text-align: center;
  font-size: 1.5em;
  margin: 2em 0;
}

.custom-carousel .p-carousel .p-carousel-item {
  flex: 1 0 auto;
}

.category-item .p-card {
  box-shadow: none;
}

.category-item .p-card-content,
.category-item .p-card-body {
  padding: 0 !important;
}
.headline-tuncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.two-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
