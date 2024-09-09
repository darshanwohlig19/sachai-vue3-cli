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
    <div
      class="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <!-- Blurred Background Image with Gradient Overlay -->
      <div class="relative w-full h-48">
        <img
          class="absolute inset-0 object-cover w-full h-full filter blur-sm"
          src="https://ik.imagekit.io/553gmaygy/gcp-non-prod/tr:w-2000,q-80,f-webp,lo-false/a35f1924-025f-4bd4-a150-0208c03fe8c3.jpg?GoogleAccessId=sachai-storage-non-prod%40proj-newsshield-non-prod-infra.iam.gserviceaccount.com&Expires=2031730030&Signature=Yfta9fwGA9lwAThV23mGvUrLgjUiXW2a4j%2BOrsk5kwsg76T%2FgE5gmtz10ef4k5ziG5ktgOaaHuOl5DtVLfx4MY8TYZhY4yJRmTEnAtiUz7h0ydtLN2YMZ2KY1Lk%2B%2BDPcgafnHdIjrE1jN0o9EFNwPZU58HphxQCK3GMnxVnCXcE7c%2FkrHryOE9%2BKqXX5yLiz3%2FdLPnANfKghSvqw91ulkcFDbBk6xHqFUWi5YGmvHFEQl1A2csEJBJT3pzgVs4kZJMQKWdQriinGbupGSuAH4qsjmHItw8VFJFN53xCXGGEBL4vrwNo5JMJcUW5GIGEeBYfQQV5m5kWudqhO4BEZwQ%3D%3D"
          alt="Background"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
        ></div>
      </div>

      <!-- Content Container -->
      <div
        class="absolute inset-0 flex flex-col justify-between p-4 text-white"
      >
        <!-- Centered Smaller Image -->
        <div class="flex justify-center items-center h-full">
          <img
            class="object-cover h-full w-full"
            src="https://ik.imagekit.io/553gmaygy/gcp-non-prod/tr:w-2000,q-80,f-webp,lo-false/a35f1924-025f-4bd4-a150-0208c03fe8c3.jpg?GoogleAccessId=sachai-storage-non-prod%40proj-newsshield-non-prod-infra.iam.gserviceaccount.com&Expires=2031730030&Signature=Yfta9fwGA9lwAThV23mGvUrLgjUiXW2a4j%2BOrsk5kwsg76T%2FgE5gmtz10ef4k5ziG5ktgOaaHuOl5DtVLfx4MY8TYZhY4yJRmTEnAtiUz7h0ydtLN2YMZ2KY1Lk%2B%2BDPcgafnHdIjrE1jN0o9EFNwPZU58HphxQCK3GMnxVnCXcE7c%2FkrHryOE9%2BKqXX5yLiz3%2FdLPnANfKghSvqw91ulkcFDbBk6xHqFUWi5YGmvHFEQl1A2csEJBJT3pzgVs4kZJMQKWdQriinGbupGSuAH4qsjmHItw8VFJFN53xCXGGEBL4vrwNo5JMJcUW5GIGEeBYfQQV5m5kWudqhO4BEZwQ%3D%3D"
            alt="Centered Image"
          />
        </div>

        <div>
          <!-- Headline -->
          <h2 class="text-xl font-semibold leading-tight">
            Democrats Overhaul Party’s Primary Calendar, Upending a Political
            Tradition
          </h2>
        </div>
        <!-- Source and Time -->
        <div class="flex items-center mt-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Logo_of_Times_of_India.svg"
            class="h-6 w-6 mr-2"
            alt="TOI Logo"
          />
          <p class="text-sm">
            Times of India <span class="mx-1">|</span> 12 min ago
          </p>
        </div>
      </div>
    </div>

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
