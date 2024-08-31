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
            <div class="see-all">See all →</div>
          </div>
          <div class="flex flex-col md:flex-row gap-5">
            <div class="md-max:w-[100%] w-[60%]">
              <div class="flex flex-col gap-5">
                <div class="flex sm:flex-row flex-col gap-5 h-[80%]">
                  <div class="sm:w-[35%] w-[100%]">
                    <div
                      v-for="news in category.news.slice(0, 1)"
                      :key="news._id"
                    >
                      <div class="relative drop-shadow-lg">
                        <img
                          :src="news.imgixUrlHighRes || fallbackImage"
                          class="rounded-[8px] w-full"
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
                      </div>
                    </div>
                  </div>
                  <div
                    class="sm:w-[65%] w-[100%] flex flex-col justify-between gap-3 sm:gap-0"
                  >
                    <div
                      v-for="news in category.news.slice(1, 5)"
                      :key="news._id"
                      class=""
                    >
                      <div class="flex flex-row gap-2 items-center">
                        <div>
                          <img src="../assets/Group.png" alt="" />
                        </div>
                        <div class="font-14 one-line">
                          {{ news.headline }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-row h-[10%] gap-3">
                  <div
                    v-for="news in getDisplayedNews(category.news)"
                    :key="news._id"
                    class="flex flex-col w-[30%]"
                  >
                    <div class="multiline-truncate1 font-14 w-[100%]">
                      {{ news.headline }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="md-max:w-[100%] w-[40%] flex flex-col justify-between gap-3 sm:gap-0"
            >
              <div v-for="news in category.news.slice(9, 12)" :key="news._id">
                <div
                  class="flex flex-row gap-4 p-2.5 drop-shadow-md border-1 rounded-[8px] items-center"
                >
                  <div class="w-[20%]">
                    <img
                      class="rounded-[6px] h-[47px]"
                      :src="news.imgixUrlHighRes"
                      alt=""
                    />
                  </div>
                  <div class="font-14 w-[70%] multiline-truncate">
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const categories = ref([]);
    const isMobileOrTablet = ref(window.innerWidth < 768);

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
        const categoriesData = response.data.slice(0, 6).map((category) => ({
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

    const getDisplayedNews = (news) => {
      if (!news || !Array.isArray(news)) {
        return [];
      }
      return isMobileOrTablet.value ? news.slice(5, 8) : news.slice(5, 9);
    };

    const handleResize = () => {
      isMobileOrTablet.value = window.innerWidth < 768;
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
    };
  },
};
</script>

<style>
.one-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
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
</style>
