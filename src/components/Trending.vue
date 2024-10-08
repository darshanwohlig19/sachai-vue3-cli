<template>
  <div>
    <InviteLinkDialog
      :isVisible="isDialogVisible"
      :inviteLink="inviteLink"
      @close="isDialogVisible = false"
    />
    <div
      v-if="loading"
      class="w-full md-max:!block flex sm:flex-row lg:flex-row flex-wrap justify-between relative bg-white p-3 rounded-[10px]"
    >
      <div class="w-full flex flex-wrap gap-3">
        <!-- Skeleton for Trending Carousel -->
        <div class="relative w-[100%] lg:w-[30%] md:w-[48%]">
          <div class="bg-white p-2 rounded-lg shadow-md">
            <div
              class="relative w-full h-[234px] md-max:h-[300px] rounded-lg overflow-hidden"
            >
              <Skeleton width="100%" height="100%"></Skeleton>
            </div>
          </div>
        </div>

        <!-- Skeleton for List of News -->
        <div
          class="w-[100%] lg:w-[35%] md:w-[48%] md:mt-0 lg:mt-0 justify-center flex flex-col gap-3"
        >
          <div v-for="n in 3" :key="n" class="flex gap-2">
            <div class="w-full flex flex-col gap-1">
              <Skeleton width="100%" height="30px"></Skeleton>
              <Skeleton width="100%" height="30px"></Skeleton>
              <Skeleton width="100%" height="1px"></Skeleton>
            </div>
          </div>
        </div>
        <div class="w-[1%] xl-max:!hidden flex justify-center">
          <div class="standing_divider"></div>
        </div>
        <!-- Skeleton for Blog List -->
        <div
          class="w-[100%] lg:w-[30%] mt-3 md:mt-0 md:w-[100%] flex flex-col gap-3"
        >
          <div
            v-for="b in 3"
            :key="b"
            class="shadow-md flex gap-2 w-full p-2 rounded-[8px]"
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
    </div>
    <!-- Actual Content -->
    <div
      v-else
      class="w-full md-max:!block flex sm:flex-row lg:flex-row flex-wrap justify-between bg-white p-3 rounded-[10px] mt-[75px]"
    >
      <div class="w-[100%] lg:w-[30%] md:w-[48%] h-[100%]">
        <div>
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
                  class="relative rounded-[10px] overflow-hidden h-[100%] md-max:h-[300px] bg-gradient-to-t from-black via-black/60"
                >
                  <div
                    class="relative bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <div class="relative h-[234px] w-[100%]">
                      <img
                        class="absolute inset-0 object-cover h-full w-full filter blur-sm"
                        :src="slotProps.data.imgixUrlHighRes || fallbackImage"
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
                        :src="slotProps.data.imgixUrlHighRes || fallbackImage"
                      />
                    </div>
                  </div>
                  <Tag
                    :value="slotProps.data.inventoryStatus"
                    :severity="getSeverity(slotProps.data.inventoryStatus)"
                    class="absolute top-4 left-4"
                  />
                  <div
                    class="absolute top-2 right-2 p-2 text-black flex flex-row gap-2 justify-around"
                  >
                    <div>
                      <i
                        class="mdi mdi-share-variant text-black bg-white rounded-[50%] sm:h-[23.63px] sm:w-[23.63px] sm:text-[12px] h-[23.63px] w-[23.63px] text-[14px] flex justify-center items-center icon-black"
                        style="color: black"
                        @click.stop="showDialog(slotProps.data)"
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
                          @click="navigateToTrending(slotProps.data._id)"
                          style="line-height: 1.2"
                          class="hover:text-current headine-home text-white"
                        >
                          {{ slotProps.data.headline }}
                        </a>
                      </div>
                      <div class="flex flex-row gap-3 mt-1 mb-1">
                        <div
                          class="text-white time-date-home text-[10px] md:text-[12px]"
                        >
                          {{ slotProps.data.source }}
                        </div>
                        <div class="text-[16px]">|</div>
                        <div
                          class="text-white time-date-home text-[10px] md:text-[12px]"
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
        class="w-[100%] lg:w-[35%] md:w-[48%] mt-3 sm-max:mt-3 md:mt-0 lg:mt-0 flex flex-col justify-evenly gap-3"
      >
        <div
          @click="navigateToTrending(item._id)"
          v-for="(item, index) in news.slice(0, 3)"
          :key="index"
          class="flex gap-3 mt-0 sm-max:!mt-0 cursor-pointer"
        >
          <img
            class="image-small !h-[10px] !w-[10px]"
            src="../assets/png/Group.png"
          />
          <div>
            <div class="headline-tuncate headine-home">
              {{ item.headline }}
            </div>
            <div class="summary-home text-gray-5 summary-tuncate">
              {{ item.summary }}
            </div>
            <!-- <div v-if="index < 2" class="border_11 sm-max:mt-3 mt-2"></div> -->
            <hr v-if="index < 2" class="mt-3 border-t border-gray-300" />
          </div>
        </div>
      </div>
      <div class="w-[1%] xl-max:!hidden flex justify-center">
        <div class="standing_divider"></div>
      </div>
      <div
        class="w-[100%] lg:w-[30%] md:w-[100%] lg:mt-0 mt-3 flex flex-col justify-evenly gap-3"
      >
        <div
          @click="navigateToTrending(blog._id)"
          v-for="(blog, index) in blogs.slice(0, 4)"
          :key="index"
          class=""
        >
          <div
            class="gap-4 p-2.5 drop-shadow-md border-1 rounded-[8px] items-center cursor-pointer"
            @click="navigateToTrending(blog._id)"
          >
            <BlogCard
              :headline="blog.headline"
              :image="blog.imgixUrlHighRes || fallbackImage"
            />
          </div>

          <!-- <div class="flex-shrink-0">
              <img
                class="h-[57px] object-contain rounded-[8px]"
                :src="blog.imgixUrlHighRes || fallbackImage"
                alt="Blog Image"
              />
            </div>
            <div class="font-14 p-2 h">
              <div class="headline-tuncate-right">
                {{ blog.headline || "headline" }}
              </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import moment from "moment";
// import { ProductService } from "../../src/assets/service/ProductService";
import InviteLinkDialog from "@/common/config/shareLink.vue"; // Import the dialog component
const isDialogVisible = ref(false); // State for dialog visibility
const inviteLink = ref(""); // Link to share, set this appropriately
import fallbackImage2 from "../common/config/GlobalConstants";
import BlogCard from "../components/SIdeNews.vue/sideNews.vue";

// import BlogCard from "../components/SIdeNews.vue/sideNews.vue";

const fallbackImage = fallbackImage2.variables.fallbackImage;

const blogs = ref([]);
console.log("opp", blogs);
const news = ref([]);
// const products = ref([]);
// const languageId = "6421a32aa020a23deacecf92";
const screenWidth = ref(window.innerWidth);
const loading = ref(true);
const error = ref(false);
const router = useRouter();

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

const showDialog = (news) => {
  isDialogVisible.value = true;
  inviteLink.value = news.newsLink;
};

const fetchBlogs = async () => {
  loading.value = true;
  error.value = false;
  try {
    const payload = {
      language: "6421a32aa020a23deacecf92",
      categoryId: "63d90e4098d783ac0cbe2310",
    };
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_CATEGORY_WISE_NEWS_FOR_WEB}`,
      payload
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
  router.push(`/news/${id}`);
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
<style scoped>
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
  height: 0.4px;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 100%;
}
.divider11 {
  height: 100%;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 1px;
}
.border_11 {
  border-bottom: 2px solid #f3f3f3;
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
.headline-tuncate-right {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2 !important; /* Number of lines to display */
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
