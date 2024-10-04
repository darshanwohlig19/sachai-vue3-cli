<template>
  <div class="mx-[20px] my-[20px]">
    <div class="flex items-center gap-2">
      <div>
        <a href="javascript: history.go(-1)">
          <img src="../assets/svg/Left.svg" alt="" />
        </a>
      </div>
      <div class="w-full relative">
        <!-- @click="expandInput" -->
        <input
          type="text"
          id="fname"
          ref="searchInput"
          :class="inputClass"
          v-model="searchQuery"
          @input="onInput"
          name="fname"
          autocomplete="off"
          placeholder="Search"
          class="pr-10 pl-3 py-2 w-full rounded-[100px] text-[12px] font-lato border-1"
        />
        <img
          src="../assets/svg/search.svg"
          class="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
    <div
      v-if="searchResults && searchResults.length"
      ref="searchResultsDropdown"
      class="w-[100%] bg-white p-2 border border-gray-300 rounded-md mt-2 h-full"
    >
      <div
        v-if="loading"
        class="text-center py-2 text-gray-500 rounded-md overflow-y-hidden"
      >
        <div class="flex flex-col gap-[13px] overflow-y-hidden">
          <div
            v-for="b in 4"
            :key="b"
            class="shadow-md flex gap-3 shadow-custom border-custom overflow-y-hidden w-full p-2 rounded-[8px] border-1"
          >
            <div class="flex-shrink-0">
              <Skeleton width="78px" height="57px"></Skeleton>
            </div>
            <div class="flex justify-center flex-col w-full">
              <Skeleton width="100%" height="25px"></Skeleton>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        v-for="(result, index) in searchResults"
        :key="index"
        class="flex gap-3 flex-row p-2 cursor-pointer hover:bg-gray-100 overflow-y-auto"
        @click="navigateToNewsDetail(result._id)"
      >
        <div
          class="w-[100%] flex flex-row justify-between items-center gap-3 shadow-custom border-custom rounded-[6px] p-2 border-1"
          @click="navigateToNewsDetail(result._id)"
        >
          <div class="w-[25%] xxss:w-[15%]">
            <img
              :src="result.imgixUrlHighRes || fallbackImage"
              class="h-[54px] w-[100%] object-contain rounded-[8px] bg-[#454545]"
            />
          </div>
          <div
            class="w-[80%] flex justify-start items-center text-start font-light font-source-serif text-[12px] font-600 two_line"
          >
            {{ result.headline }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onBeforeUnmount, onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import fallbackImage2 from "../common/config/GlobalConstants";
import axios from "axios";
export default {
  setup() {
    const router = useRouter();
    const fallbackImage = fallbackImage2.variables.fallbackImage;
    const searchQuery = ref("");
    const searchResults = ref([]);
    const searchResultsDropdown = ref(null);
    const isExpanded = ref(false);
    const searchInput = ref(null);
    const categories = ref([]);
    const loading = ref(false);

    let timeout = null;

    const navigateToNewsDetail = (id) => {
      router.push(`/news/${id}`);
      console.log("Navigating to news detail with ID:", id);
    };

    // Debounced input handler
    const onInput = () => {
      clearTimeout(timeout); // Clear any existing timeout

      // Set a new timeout to detect when the user stops typing (500ms)
      timeout = setTimeout(() => {
        onStopTyping();
      }, 500);
    };

    // Called when the user stops typing
    const onStopTyping = () => {
      console.log("User stopped typing. Final input:");
      handleSearch();
      // Handle your logic here, such as making an API call
    };

    const handleSearch = async () => {
      // if (
      //   searchQuery.value.trim().length >= 4 &&
      //   searchQuery.value.trim().length % 4 === 0
      // ) {
      try {
        console.log("API CALLED");
        loading.value = true;
        const payload = {
          language: "6421a32aa020a23deacecf92",
          search: searchQuery.value,
        };
        const response = await apiService.apiCall(
          "post",
          `${apiConfig.SEARCH_NEWS_FROM_WEB}`,
          payload
        );
        // const response = await axios.post(
        //   "https://api-uat.newsshield.io/news/searchNewsFromWeb"
        // );
        searchResults.value = response.data;
        loading.value = false;
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        loading.value = false;
      }
      // } else if (searchQuery.value.trim().length < 4) {
      //   searchResults.value = [];
      // }
    };

    // const handleSearch = async () => {
    //   if (searchQuery.value.trim().length >= 4) {
    //     console.log("Search query:", searchQuery.value); // Log the search query
    //     try {
    //       const response = await axios.post(
    //         "https://api-uat.newsshield.io/news/searchNewsFromWeb",
    //         {
    //           language: "6421a32aa020a23deacecf92",
    //           search: searchQuery.value,
    //         }
    //       );
    //       console.log("API Response:", response.data); // Log the API response
    //       searchResults.value = response.data;
    //     } catch (error) {
    //       console.error("Error fetching search results:", error); // Log any errors
    //     }
    //   } else {
    //     searchResults.value = [];
    //   }
    // };

    const fetchCategories = async () => {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        const response = await axios.post(
          "https://api-uat.newsshield.io/category/getAllCat",
          { langauge: languageId }
        );
        categories.value = response.data.map((category) => ({
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

    const expandInput = () => {
      isExpanded.value = true;
    };

    const collapseInput = (event) => {
      if (
        searchResultsDropdown.value &&
        !searchResultsDropdown.value.contains(event.target) &&
        searchInput.value &&
        !searchInput.value.contains(event.target)
      ) {
        isExpanded.value = false;
        searchResults.value = [];
        searchQuery.value = "";
      }
    };
    onMounted(() => {
      fetchCategories();
      document.addEventListener("mousedown", collapseInput);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("mousedown", collapseInput);
    });

    const inputClass = computed(() =>
      isExpanded.value
        ? "w-[441px] py-2 transition-all duration-300"
        : "w-[220px] py-2 transition-all duration-300"
    );

    watch(searchQuery, () => {
      // if (newValue.trim().length >= 4 && newValue.trim().length % 4 === 0) {
      onInput();
      // } else if (newValue.trim().length < 4) {
      //   searchResults.value = [];
      // }
    });
    return {
      isExpanded,
      searchInput,
      expandInput,
      inputClass,
      categories,
      searchQuery,
      handleSearch,
      searchResults,
      fallbackImage,
      searchResultsDropdown,
      navigateToNewsDetail,
    };
  },
};
</script>
