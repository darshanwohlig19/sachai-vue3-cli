<template>
  <div class="home">
    <Navbarrr />
    <div class="mx-[30px]">
      <FeaturedNews />

      <Trending />

      <Latest />

      <Campaign />
      <CategoryNews />
      <CarouselCat />

      <MoreNews />
    </div>
    <Footer1 />
    <!-- <customImage /> -->
  </div>
</template>

<script>
import Trending from "@/components/Trending.vue";
import Latest from "@/components/Latest.vue";
import CategoryNews from "@/components/CategoryNews.vue";
import Footer1 from "@/components/Footer.vue";
import MoreNews from "@/components/MoreNews.vue";
import CarouselCat from "@/components/Catogries_carousel.vue";
import Campaign from "@/components/Campaign.vue";
import Navbarrr from "@/components/Navbarrr.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import FeaturedNews from "@/components/FeaturedNews.vue";

export default {
  name: "HomeView",
  components: {
    MoreNews,
    CategoryNews,
    CarouselCat,
    Trending,
    Campaign,
    Navbarrr,
    Latest,
    Footer1,
    FeaturedNews,
  },
  setup() {
    const router = useRouter();
    const isMenuOpen = ref(false);
    const isDropdownOpen = ref(false);
    const categories = ref([]);
    const activeCategoryId = ref(null);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const fetchCategories = async () => {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        const response = await axios.post(
          "https://api-uat.newsshield.io/category/getAllCat",
          { langauge: languageId }
        );
        categories.value = response.data;

        // Set default category as the first one
        if (categories.value.length > 0) {
          activeCategoryId.value = categories?.value[0]?._id;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const selectCategory = (categoryId) => {
      activeCategoryId.value = categoryId;
      router.push({ name: "Category", params: { slugOrId: categoryId } });
    };

    onMounted(fetchCategories);

    return {
      isMenuOpen,
      isDropdownOpen,
      categories,
      toggleMenu,
      toggleDropdown,
      selectCategory,
      activeCategoryId,
    };
  },
};
</script>

<style scoped></style>
