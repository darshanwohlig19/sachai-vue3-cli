<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">News Categories</h2>
    <div class="carousel_card">
      <Carousel
        :value="categories"
        :numVisible="4"
        :numScroll="4"
        :circular="true"
        :showIndicators="true"
        :showNavigators="true"
        class="custom-carousel w-full"
      >
        <template #item="slotProps">
          <div class="category-item p-2">
            <Card class="h-full w-full p-3 rounded-[10px]">
              <template #header>
                <div class="flex justify-between items-center mb-2">
                  <h3 class="font-18 capitalize">
                    {{ slotProps.data.name }}
                  </h3>
                  <a href="#" class="see-all">See all →</a>
                </div>
              </template>
              <template #content>
                <div class="flex flex-col gap-9">
                  <div
                    v-for="heading in categories"
                    :key="heading._id"
                    class="mb-3 flex gap-3 rounded-[4px] shadow-md bg-white h-[67px]"
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFcYJoetYqKxgVtDoFHN08qIF811Aglug-sw&s"
                      class="w-[67px] h-[67px] object-cover mb-2 rounded"
                    />
                    <p class="text-[14px] text-[#1E0627] fontCustom">
                      {{ heading.name }}
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

const categories = ref([]);

const fetchCategories = async () => {
  try {
    const languageId = "6421a32aa020a23deacecf92";
    const response = await axios.post(
      "https://dev-api.askus.news/category/getAllCat",
      { langauge: languageId }
    );
    categories.value = response.data.slice(8, 16).map((category) => ({
      ...category,
      name:
        category.name.toLowerCase() === "ai"
          ? category.name.toUpperCase()
          : category.name.replace(/-/g, " "),
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
@media (max-width: 480px) {
  .custom-carousel .p-carousel .p-carousel-item {
    flex: 1 0 100%;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .custom-carousel .p-carousel .p-carousel-item {
    flex: 1 0 33.33%; /* 3 items per view */
  }
}

@media (min-width: 769px) {
  .custom-carousel .p-carousel .p-carousel-item {
    flex: 1 0 25%; /* 4 items per view */
  }
}
</style>

