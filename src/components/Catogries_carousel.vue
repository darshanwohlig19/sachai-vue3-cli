<template>
  <h2 class="text-2xl font-bold mb-4">News Categories</h2>
  <div class="card">
    <Carousel
      :value="categories"
      :numVisible="4"
      :numScroll="4"
      :circular="true"
      :showIndicators="true"
      :autoplayInterval="5000"
      :showNavigators="true"
      class="custom-carousel w-full"
    >
      <template #item="slotProps">
        <div class="category-item p-2">
          <Card class="h-full w-full p-3 rounded-[10px]">
            <template #header>
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-18">
                  {{ slotProps.data.name }}
                </h3>
                <a href="#" class="see-all">See all →</a>
              </div>
            </template>
            <template #content>
              <div class="flex flex-col gap-9">
                <div
                  v-for="(article, index) in slotProps.data.articles"
                  :key="index"
                  class="mb-3 flex gap-3 rounded-[4px] shadow-md bg-white h-[67px]"
                >
                  <img
                    :src="article.image"
                    class="w-[67px] h-[67px] object-cover mb-2 rounded"
                  />
                  <p class="text-[14px] text-[#1E0627] fontCustom">
                    {{ article.title }}
                  </p>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Carousel from "primevue/carousel";
import Card from "primevue/card";
import "primevue/resources/themes/saga-blue/theme.css"; // Theme CSS
import "primevue/resources/primevue.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons CSS
const categories = ref([
  {
    name: "Sports",
    articles: [
      {
        title: "Sports Headline 1",
        image: "path_to_sports_image1.jpg",
      },
      {
        title: "Sports Headline 2",
        image: "path_to_sports_image2.jpg",
      },
      {
        title: "Sports Headline 3",
        image: "path_to_sports_image3.jpg",
      },
      {
        title: "Sports Headline 4",
        image: "path_to_sports_image4.jpg",
      },
    ],
  },
  {
    name: "Science",
    articles: [
      {
        title: "Science Headline 1",
        image: "path_to_science_image1.jpg",
      },
      {
        title: "Science Headline 2",
        image: "path_to_science_image2.jpg",
      },
      {
        title: "Science Headline 3",
        image: "path_to_science_image3.jpg",
      },
      {
        title: "Science Headline 4",
        image: "path_to_science_image4.jpg",
      },
    ],
  },
  {
    name: "Health",
    articles: [
      {
        title: "Health Headline 1",
        image: "path_to_health_image1.jpg",
      },
      {
        title: "Health Headline 2",
        image: "path_to_health_image2.jpg",
      },
      {
        title: "Health Headline 3",
        image: "path_to_health_image3.jpg",
      },
      {
        title: "Health Headline 4",
        image: "path_to_health_image4.jpg",
      },
    ],
  },
  {
    name: "Finance",
    articles: [
      {
        title: "Finance Headline 1",
        image: "path_to_finance_image1.jpg",
      },
      {
        title: "Finance Headline 2",
        image: "path_to_finance_image2.jpg",
      },
      {
        title: "Finance Headline 3",
        image: "path_to_finance_image3.jpg",
      },
      {
        title: "Finance Headline 4",
        image: "path_to_finance_image4.jpg",
      },
    ],
  },
  {
    name: "Technology",
    articles: [
      {
        title: "Technology Headline 1",
        image: "path_to_technology_image1.jpg",
      },
      {
        title: "Technology Headline 2",
        image: "path_to_technology_image2.jpg",
      },
      {
        title: "Technology Headline 3",
        image: "path_to_technology_image3.jpg",
      },
      {
        title: "Technology Headline 4",
        image: "path_to_technology_image4.jpg",
      },
    ],
  },
  {
    name: "Business",
    articles: [
      {
        title: "Business Headline 1",
        image: "path_to_business_image1.jpg",
      },
      {
        title: "Business Headline 2",
        image: "path_to_business_image2.jpg",
      },
      {
        title: "Business Headline 3",
        image: "path_to_business_image3.jpg",
      },
      {
        title: "Business Headline 4",
        image: "path_to_business_image4.jpg",
      },
    ],
  },
  {
    name: "Entertainment",
    articles: [
      {
        title: "Entertainment Headline 1",
        image: "path_to_entertainment_image1.jpg",
      },
      {
        title: "Entertainment Headline 2",
        image: "path_to_entertainment_image2.jpg",
      },
      {
        title: "Entertainment Headline 3",
        image: "path_to_entertainment_image3.jpg",
      },
      {
        title: "Entertainment Headline 4",
        image: "path_to_entertainment_image4.jpg",
      },
    ],
  },
  {
    name: "Travel",
    articles: [
      {
        title: "Travel Headline 1",
        image: "path_to_travel_image1.jpg",
      },
      {
        title: "Travel Headline 2",
        image: "path_to_travel_image2.jpg",
      },
      {
        title: "Travel Headline 3",
        image: "path_to_travel_image3.jpg",
      },
      {
        title: "Travel Headline 4",
        image: "path_to_travel_image4.jpg",
      },
    ],
  },
]);
</script>
