<template>
  <div class="mt-3 rounded-[10px]">
    <div v-for="category in categories" :key="category._id" class="mb-3">
      <div class="bg-white p-3 rounded-[10px]">
        <div>
          <div class="w-[100%] flex justify-between mb-3">
            <div class="flex flex-row items-center gap-2">
              <div class="bg-[#FF0053] w-[4px] h-[10px] rounded-md"></div>
              <div class="heads1 capitalize">{{ category.name }}</div>
            </div>
            <a :href="`/categories/${category._id}?category=${category.name}`">
              <Button />
            </a>
          </div>
          <div class="flex flex-col lg:flex-row gap-3 lg:gap-4">
            <div class="w-[100%] lg:w-[65%]">
              <div class="flex flex-col gap-5">
                <div class="flex sm:flex-row flex-col gap-3 h-[100%]">
                  <div class="md:w-[70%] w-[100%]">
                    <div
                      v-for="news in category.news.slice(0, 1)"
                      :key="news._id"
                    >
                      <div
                        class="relative sm:h-[220px] h-[180px] max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
                      >
                        <div class="relative w-full h-[100%]">
                          <img
                            class="absolute inset-0 object-cover h-full w-full filter blur-sm"
                            :src="news.imgixUrlHighRes || fallbackImage"
                            alt="Background"
                          />
                          <div
                            class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
                          ></div>
                        </div>
                        <div
                          class="absolute inset-0 flex flex-col justify-between text-white"
                        >
                          <img
                            class="object-contain h-full w-full"
                            :src="news.imgixUrlHighRes || fallbackImage"
                            alt="Centered Image"
                          />
                        </div>
                      </div>
                      <!-- <div class="relative drop-shadow-lg">
                        <img
                          :src="news.imgixUrlHighRes || fallbackImage"
                          class="rounded-[8px] w-full h-[30vh]"
                          alt=""
                        />
                        <div
                          class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-[8px]"
                        ></div>
                        <div class="absolute bottom-0 p-3 w-full md:w-[405px]">
                          <div
                            class="multiline-truncate1 text-[16px] sm:text-[14px] md:text-[16px] fontCustom text-white w-full md:w-auto"
                            :style="{ width: 'calc(100% - 30px)' }"
                          >
                            {{ news.headline || "No Headline" }}
                          </div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                  <div
                    class="sm:w-[70%] w-[100%] flex flex-col justify-between gap-3 sm:gap-0"
                  >
                    <div
                      v-for="news in displayedNews(category.news)"
                      :key="news._id"
                      class=""
                    >
                      <div class="flex flex-row gap-2 items-center">
                        <div class="w-[15px]">
                          <img src="../assets/Group.png" alt="" />
                        </div>
                        <div class="font-14 one-line">
                          <a :href="`${SACHAI_NEWS_URL}${news._id}`">
                            {{ news.headline }}
                          </a>
                        </div>
                      </div>
                      <div class="divider-horizontal mt-2"></div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-row h-[10%] gap-3">
                  <div
                    v-for="(news, index) in getDisplayedNews(category.news)"
                    :key="news._id"
                    class="flex flex-row gap-1 w-[50%] md:w-[30%]"
                  >
                    <div class="multiline-truncate1 font-14 w-[100%]">
                      {{ news.headline }}
                    </div>
                    <div
                      v-if="index < getDisplayedNews(category.news).length - 1"
                      class="divider-vertical"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider-vertical"></div>
            <div
              class="w-[100%] lg:w-[35%] flex flex-col justify-between gap-3 sm:gap-3"
            >
              <div v-for="news in category.news.slice(9, 13)" :key="news._id">
                <div
                  class="flex flex-row gap-4 p-2.5 drop-shadow-md border-1 rounded-[8px] items-center"
                >
                  <div class="">
                    <img
                      class="rounded-[6px] h-[47px]"
                      :src="news.imgixUrlHighRes"
                      alt=""
                    />
                  </div>
                  <div class="font-14 w-[70%] two-line">
                    {{ news.headline }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import axios from "axios";
import Button from "./ViewAll.vue";

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  // data() {
  //   return {
  //     SACHAI_NEWS_URL: "https://news.sachai.io/news/",
  //     // screenWidth: window.innerWidth,
  //   };
  // },

  components: {
    Button,
  },

  setup() {
    const categories = ref({});
    const isMobileOrTablet = ref(window.innerWidth < 768);
    const screenWidth = ref(window.innerWidth);

    const fetchNewsForCategory = async (categoryId) => {
      try {
        const response = await axios.post(
          "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb/",
          { categoryId }
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching news for category ${categoryId}:`, error);
        return [];
      }
    };

    const displayedNews = computed(() => {
      return (news) => {
        return screenWidth.value > 1600 ? news.slice(1, 5) : news.slice(1, 4);
      };
    });

    const fetchCategories = async () => {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        const response = await axios.post(
          "https://api-uat.newsshield.io/category/getAllCat",
          { langauge: languageId }
        );
        const categoriesData = response.data.slice(0, 16).map((category) => ({
          ...category,
          name:
            category.name.toLowerCase() === "ai"
              ? category.name.toUpperCase()
              : category.name.replace(/-/g, " "),
        }));

        for (let category of categoriesData) {
          category.news = await fetchNewsForCategory(category._id);
          if (category.news && category.news.length > 0) {
            console.log(
              "CATEGORY DATA STORED GLOBALLY",
              category.news.slice(0, 5)
            );
            localStorage.setItem(
              `news-${category._id}`,
              JSON.stringify(category.news.slice(0, 5))
            );
          } else {
            console.warn(`No news items found for category: ${category._id}`);
          }
        }

        categories.value = categoriesData;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const getDisplayedNews = (news) => {
      if (!news || !Array.isArray(news)) {
        return [];
      }
      return isMobileOrTablet.value ? news.slice(5, 7) : news.slice(5, 9);
    };

    const handleResize = () => {
      isMobileOrTablet.value = window.innerWidth < 768;
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      fetchCategories();
      window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      categories,
      getDisplayedNews,
      displayedNews,
      screenWidth,
      Button,
    };
  },
};
</script>

<style>
.one-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.two-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.divider-vertical {
  height: auto;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 1px;
}
.divider-horizontal {
  height: 1px;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 100%;
}
</style>
