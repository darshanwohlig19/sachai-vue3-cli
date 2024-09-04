<template>
  <div class="mt-3">
    <div class="carousel_card">
      <Carousel
        :value="categories"
        :numVisible="4"
        :numScroll="4"
        :circular="true"
        :showIndicators="true"
        :showNavigators="true"
        :responsiveOptions="responsiveOptions"
        class="custom-carousel w-full"
        :autoplayInterval="5000"
      >
        <template #item="slotProps">
          <div class="category-item mx-2">
            <Card class="h-full p-3 rounded-[10px]">
              <template #header>
                <div class="flex justify-between items-center mb-3">
                  <div class="flex flex-row items-center gap-1">
                    <div class="bg-[#FF0053] w-[4px] h-[10px] rounded-md"></div>
                    <h3 class="font-18 capitalize">
                      {{ slotProps.data.name }}
                    </h3>
                  </div>
                  <a href="#" class="see-all">See all →</a>
                </div>
              </template>
              <template #content>
                <div class="flex flex-col gap-3 cursor-pointer">
                  <div
                    v-for="news in slotProps.data.news.slice(0, 5)"
                    :key="news._id"
                    class="flex gap-3 rounded-[4px] drop-shadow-sm bg-white h-[67px]"
                    @click="navigateToCategoryDetail(news._id)"
                  >
                    <img
                      :src="news.imgixUrlHighRes"
                      class="w-[67px] h-[67px] object-cover rounded"
                    />
                    <p
                      class="text-[14px] text-[#1E0627] multiline-truncate fontCustom"
                    >
                      {{ news.headline }}
                    </p>
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
import { ref, onMounted } from "vue";
import axios from "axios";
import Carousel from "primevue/carousel";
import Card from "primevue/card";
import "primevue/resources/themes/saga-blue/theme.css"; // Theme CSS
import "primevue/resources/primevue.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons CSS
import { useRouter } from "vue-router";

const categories = ref([]);
const router = useRouter(); // Use Vue Router

const navigateToCategoryDetail = (id) => {
  router.push(`/news/${id}`);
};
const fetchNewsForCategory = async (categoryId) => {
  try {
    const response = await axios.post(
      "https://dev-api.askus.news/news/getCategoryWiseNewsForWeb/",
      { categoryId }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching news for category ${categoryId}:`, error);
    return [];
  }
};

const fetchCategories = async () => {
  try {
    const languageId = "6421a32aa020a23deacecf92";
    const response = await axios.post(
      "https://dev-api.askus.news/category/getAllCat",
      { langauge: languageId }
    );
    const categoriesData = response.data.slice(8, 16).map((category) => ({
      ...category,
      name:
        category.name.toLowerCase() === "ai"
          ? category.name.toUpperCase()
          : category.name.replace(/-/g, " "),
    }));

    for (let category of categoriesData) {
      category.news = await fetchNewsForCategory(category._id);
    }

    categories.value = categoriesData;
  } catch (error) {
    console.error("Error fetching categories:", error);
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
.custom-carousel .p-carousel .p-carousel-item {
  flex: 1 0 auto;
}
.multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.category-item .p-card {
  box-shadow: none;
}
.category-item .p-card-content {
  padding: 0px !important;
}
.category-item .p-card-body {
  padding: 0px !important;
}
</style>
