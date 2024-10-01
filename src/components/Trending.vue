<template>
  <div
    class="w-full md-max:!block flex sm:flex-row lg:flex-row flex-wrap justify-between mt-3 relative bg-white p-3 rounded-[10px]"
  >
    <div class="relative w-[100%] lg:w-[30%] md:w-[48%]">
      <div v-if="loading" class="text-center py-5 bg-white rounded-[10px]">
        Loading...
      </div>
      <div v-else-if="error" class="text-center py-5 bg-white rounded-[10px]">
        No News Available
      </div>

      <div v-else>
        <div class="trendingCarousel">
          <Carousel
            :value="blogs"
            :numVisible="1"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
            class="carousel w-full h-full custom-carousal-custom"
            showIndicators
            circular
            :autoplayInterval="2000"
          >
            <template #item="slotProps">
              <div
                class="relative rounded-[10px] overflow-hidden h-[234px] md-max:h-[300px] bg-gradient-to-t from-black via-black/60"
              >
                <div
                  class="relative bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div class="relative h-[234px] w-[100%]">
                    <img
                      class="absolute inset-0 object-cover h-full w-full filter blur-sm"
                      :src="slotProps.data.imgixUrlHighRes"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
                    ></div>
                  </div>
                  <div
                    class="absolute inset-0 flex flex-col justify-between text-white"
                  >
                    <img
                      class="object-contain h-full w-[100%]"
                      :src="slotProps.data.imgixUrlHighRes"
                    />
                  </div>
                </div>
                <Tag
                  :value="slotProps.data.inventoryStatus"
                  :severity="getSeverity(slotProps.data.inventoryStatus)"
                  class="absolute top-4 left-4"
                />
                <div
                  class="absolute top-2 right-4 p-2 text-black flex flex-row gap-2 justify-around"
                >
                  <div>
                    <i
                      class="mdi mdi-share-variant text-black bg-white rounded-[50%] sm:h-[23.63px] sm:w-[23.63px] sm:text-[12px] h-[23.63px] w-[23.63px] text-[14px] flex justify-center items-center icon-black"
                      style="color: black"
                    ></i>
                  </div>
                  <div>
                    <div
                      class="bg-white rounded-[50%] sm:h-[23.63px] sm:w-[23.63px] sm:text-[12px] h-[23.63px] w-[23.63px] text-[14px] flex justify-center items-center icon-black"
                    >
                      <span
                        :class="[
                          'mdi',
                          'mdi-bookmark text-[11px] lg:text-[17px] cursor-pointer',
                          getBookmarkColor(slotProps.data.isBookmarked),
                        ]"
                        @click="addBookmark(slotProps.data)"
                      >
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black via-black/60 to-transparent text-white"
                >
                  <div class="gap-1 text-white text-xs ml-3 mb-2">
                    <div class="leading-3 sm:w-full md:w-full">
                      <a
                        :href="`${SACHAI_NEWS_URL}${slotProps.data._id}`"
                        style="line-height: 1.2"
                        class="hover:text-current text-[14px] sm:text-[16px] md:text-[16px] fontCustom text-white"
                      >
                        {{ slotProps.data.headline }}
                      </a>
                    </div>
                    <div class="flex flex-row gap-3 mt-3 mb-1">
                      <div
                        class="text-white text-[10px] sm:text-[12px] md:text-[12px] font-lato"
                      >
                        {{ slotProps.data.source }}
                      </div>
                      <div class="text-[16px]">|</div>
                      <div
                        class="text-white text-[10px] sm:text-[12px] md:text-[12px] font-lato"
                      >
                        {{ formatPublishTime(slotProps.data.publishTime) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
    </div>

    <div
      class="w-[100%] lg:w-[35%] md:w-[48%] mt-3 sm-max:mt-3 md:mt-0 lg:mt-0 flex flex-col gap-3"
    >
      <div
        @click="navigateToTrending(item._id)"
        v-for="(item, index) in news.slice(0, 3)"
        :key="index"
        class="flex gap-2 mt-0 sm-max:!mt-0 cursor-pointer"
      >
        <div class="flex w-[50px]">
          <img class="image-small" src="../assets/Group.png" />
        </div>
        <div>
          <div class="font-16 headline-tuncate">{{ item.headline }}</div>
          <div class="font-133 summary-tuncate">{{ item.summary }}</div>
          <div v-if="index < 2" class="border-1 sm-max:mt-3 mt-2"></div>
        </div>
      </div>
    </div>
    <div class="w-[1%] xl-max:!hidden flex justify-center">
      <div class="divider11"></div>
    </div>
    <div
      class="w-[100%] lg:w-[30%] md:w-[100%] lg:mt-0 mt-3 flex flex-col justify-between"
    >
      <div
        @click="navigateToTrending(blog._id)"
        v-for="(blog, index) in blogs.slice(0, 4)"
        :key="index"
        class="shadow-md flex flex-row gap-2 w-full border-1 p-2 rounded-[8px] cursor-pointer"
      >
        <div class="flex-shrink-0">
          <img
            class="h-[57px] w-[78px] object-cover rounded-[8px]"
            :src="blog.imgixUrlHighRes || fallbackImage"
            alt="Blog Image"
          />
        </div>
        <div class="font-14 p-2 h">
          <div class="headline-tuncate">
            {{ blog.headline || "headline" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import moment from "moment";
// import { ProductService } from "../../src/assets/service/ProductService";

const blogs = ref([]);
console.log("opp", blogs);
const news = ref([]);
// const products = ref([]);
const SACHAI_NEWS_URL = "https://news.sachai.io/news/";
const languageId = "6421a32aa020a23deacecf92";
const screenWidth = ref(window.innerWidth);
const loading = ref(true);
const error = ref(false);
const responsiveOptions = [
  {
    breakpoint: "1400px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
];

const fetchBlogs = async () => {
  loading.value = true;
  error.value = false;
  try {
    const token = localStorage.getItem("apiDataToken");
    const response = await axios.post(
      "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb",
      {
        language: languageId,
        categoryId: "63d90e4098d783ac0cbe2310",
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.data.length === 0) {
      error.value = true;
    } else {
      blogs.value = response.data.slice(0, 3);
      news.value = response.data.slice(6, 12);
    }
  } catch (err) {
    error.value = true;
  } finally {
    loading.value = false;
  }
};
const getBookmarkColor = (isBookmarked) => {
  return isBookmarked === "Enabled" ? "text-[#FF0053]" : "mdi-bookmark-outline";
};
const addBookmark = async (news) => {
  const token = localStorage.getItem("apiDataToken");
  try {
    const currentStatus =
      news.isBookmarked === "Enabled" ? "Disabled" : "Enabled";

    const response = await axios.post(
      `https://api-uat.newsshield.io/bookmark/addBookmark/${news._id}`,
      {
        status: currentStatus,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    news.isBookmarked = currentStatus;
    blogs.value.isBookmarked = currentStatus;
    return response.data;
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

const getSeverity = (inventoryStatus) => {
  switch (inventoryStatus) {
    case "INSTOCK":
      return "success";
    case "LOWSTOCK":
      return "warning";
    case "OUTOFSTOCK":
      return "danger";
    default:
      return null;
  }
};

const formatPublishTime = (publishTime) => {
  return moment(publishTime).fromNow();
};

const navigateToTrending = (id) => {
  window.location.href = `${SACHAI_NEWS_URL}${id}`;
};

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  fetchBlogs();
  getBookmarkColor();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style>
.p-carousel-content {
  border-radius: 0 10px 10px 0 !important;
}
.custom-carousal-custom {
  position: relative !important;
}
.custom-carousal-custom .p-highlight {
  background-color: red !important;
  width: 25px !important;
}
.custom-carousal-custom .p-carousel-indicator {
  color: green;
  background-color: white;
  position: relative !important;
  bottom: 12px;
  width: 10px;
  border-radius: 100px;
}

.custom-carousal-custom .p-carousel-indicators {
  position: absolute;
  right: 15px;
  bottom: -8px;
}
.trendingCarousel .p-carousel {
  position: relative;
  width: 100% !important;
}
.image-small {
  height: 10px;
  width: 10px;
  margin-top: 6px;
  object-fit: contain; /* Ensures the image fits within the specified dimensions */
}
.dividerrr {
  height: 1px;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 100%;
}
.divider11 {
  height: 100%;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 1px;
}
.summary-tuncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.headline-tuncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (max-width: 1200px) {
  .p-carousel {
    position: relative;
    width: 45vh !important;
  }
}
@media (max-width: 768px) {
  .p-carousel {
    position: relative;
    width: 100% !important;
  }
}
</style>
