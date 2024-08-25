<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" />  -->
    <!-- <SiteHeader />  -->
    <!-- <CategoryChips
    <SiteHeader />
    <CategoryChips

 <HelloWorld msg="Welcome to Your Vue.js App" />
   <SiteHeader /> 
   <CategoryChips

      :categories="categories"
      :activeCategoryId="activeCategoryId"
      @category-selected="selectCategory"
    /> -->

    <!-- <Trending /> -->
    <!-- <Featured /> -->
    <!-- <Latest /> -->
    <!-- <BrowseByTopics /> -->

    <!-- <Careousel /> -->
    <!-- <Trending />
    <Featured />
    <Latest />
    <BrowseByTopics />s
    <Footer1 /> -->
    <Navbarrr />
    <div class="mx-[30px]">
      <FeaturedNews />
      <Campaign />
    </div>
    <Footer1 />
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
// import SiteHeader from "@/components/SiteHeader.vue";
// import Latest from "@/components/Latest.vue";
// import Trending from "@/components/Trending.vue";
// import BrowseByTopics from "@/components/BrowseByTopics.vue";
import Footer1 from "@/components/Footer.vue";
// import Featured from "@/components/Featured.vue";

// import Careousel from "@/components/Carousel_Catogries.vue";

import Campaign from "@/components/Campaign.vue";
import Navbarrr from "@/components/Navbarrr.vue";

import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
// import CategoryChips from "@/components/CategoryChips.vue";

import FeaturedNews from "@/components/FeaturedNews.vue";

export default {
  name: "HomeView",
  components: {
    // Careousel,

    // HelloWorld,
    // SiteHeader,

    Campaign,

    // HelloWorld,
    // SiteHeader,
    Navbarrr,

    // Latest,
    // Trending,
    // BrowseByTopics,
    Footer1,
    // Featured,
    // CategoryChips,

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
          "https://dev-api.askus.news/category/getAllCat",
          { langauge: languageId }
        );
        categories.value = response.data;

        // Set default category as the first one
        if (categories.value.length > 0) {
          activeCategoryId.value = categories.value[0]._id;
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

<style scoped>
/* .home {
  margin: 0 80px 0 80px;
} */
</style>
