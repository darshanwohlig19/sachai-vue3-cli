<template>
  <div class="w-full md-max:!block flex gap-4 justify-between mt-6 relative">
    <div class="relative">
      <Carousel
        :value="blogs"
        :numVisible="1"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        class="carousel w-full h-full custom-carousal-custom"
        showIndicators
        circular
      >
        <template #item="slotProps">
          <div
            class="relative rounded-[20px] ml-2 mr-2 overflow-hidden h-[421px] md-max:h-[300px] bg-gradient-to-t from-black via-black/60"
          >
            <img
              :src="slotProps.data.imgixUrlHighRes"
              :alt="slotProps.data.name"
              class="w-full h-full object-contain rounded-[20px]"
            />
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
                  class="mdi mdi-share-variant text-black bg-white rounded-[50%] sm:h-[40px] sm:w-[40px] sm:text-[22px] h-[30px] w-[30px] text-[14px] flex justify-center items-center icon-black"
                  style="color: black"
                ></i>
              </div>
              <div>
                <i
                  class="mdi mdi-bookmark-outline text-black bg-white rounded-[50%] sm:h-[40px] sm:w-[40px] sm:text-[22px] h-[30px] w-[30px] text-[14px] flex justify-center items-center"
                ></i>
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
                    class="hover:text-current font-20 sm:font-16-16"
                  >
                    {{ slotProps.data.headline }}
                  </a>
                </div>
                <div class="flex flex-row gap-3 mt-3 mb-1">
                  <div class="text-[16px]">{{ slotProps.data.source }}</div>
                  <div class="text-[16px]">|</div>
                  <div class="text-[16px]">
                    {{ formatPublishTime(slotProps.data.publishTime) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
    <div
      class="w-[100%] md-max:w-[100%] sm:w-[65%] sm-max:w-[100%] rounded-[10px] bg-white relative mt-4 md:mt-0 sm:mt-4 flex justify-between p-4"
    >
      <div class="w-[48%] xl-max:w-[100%] flex flex-col gap-5">
        <div
          @click="navigateToTrending(item._id)"
          v-for="(item, index) in news.slice(0, 3)"
          :key="index"
          class="flex gap-2 mt-0 sm-max:!mt-4 cursor-pointer"
        >
          <div class="flex w-[50px]">
            <img class="image-small" src="../assets/Group.png" />
          </div>
          <div>
            <div class="font-16 headline-tuncate">{{ item.headline }}</div>
            <div class="font-133 summary-tuncate">{{ item.summary }}</div>
            <div v-if="index < 2" class="border-1 sm-max:mt-3 mt-3"></div>
          </div>
        </div>
      </div>
      <div class="w-[1%] xl-max:!hidden flex justify-center">
        <div class="divider11"></div>
      </div>
      <div class="w-[48%] xl-max:!hidden flex flex-col justify-between">
        <div
          @click="navigateToTrending(blog._id)"
          v-for="(blog, index) in blogs.slice(0, 4)"
          :key="index"
          class="shadow-md flex flex-row gap-2 w-full border-1 p-2 rounded-[8px] mt-3 cursor-pointer"
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
  </div>
  <div>
    <div
      class="xl-max:w-[100%] xl-max:bg-white xl-max:!mt-2 hidden xl-max:!block justify-between"
    >
      <div
        v-for="(blog, index) in blogs.slice(0, 4)"
        :key="index"
        class="shadow-md flex flex-row gap-2 w-full border-1 p-2 rounded-[8px] mt-3"
      >
        <div class="flex-shrink-0">
          <img
            class="h-[57px] w-[78px] object-cover rounded-[8px]"
            :src="blog.imgixUrlHighRes || fallbackImage"
            alt="Blog Image"
          />
        </div>
        <div class="font-14 p-2 h">
          <div class="headline-tuncate">{{ blog.headline || "headline" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import moment from "moment";
import { ProductService } from "../../src/assets/service/ProductService";
const blogs = ref([]);
export default {
  data() {
    return {
      blogs: [],
      news: [],
      products: [],
      SACHAI_NEWS_URL: "https://news.sachai.io/news/",
      languageId: "6421a32aa020a23deacecf92",
      screenWidth: window.innerWidth,
      responsiveOptions: [
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
      ],
    };
  },
  computed: {
    slicedData() {
      if (this.screenWidth < 640) {
        return this.blogs.slice(0, 2);
      }
      return this.blogs.slice(0, 4);
    },
  },
  mounted() {
    this.fetchBlogs();
    window.addEventListener("resize", this.updateScreenWidth);
    ProductService.getProductsSmall().then((data) => {
      this.products = data.slice(0, 9);
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  methods: {
    async fetchBlogs() {
      try {
        const response = await axios.post(
          "https://api-uat.newsshield.io/news/getAllBlogsForWeb",
          {
            language: this.languageId,
            page: 1,
          }
        );
        this.blogs = response.data.slice(0, 5);
        this.news = response.data.slice(6, 12);
        console.log(blogs.value, "blogs-news");
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      }
      return text;
    },
    formatPublishTime(publishTime) {
      return moment(publishTime).fromNow();
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    navigateToTrending(id) {
      if (id) {
        this.$router.push(`/news/${id}`); //
      }
    },
    getSeverity(status) {
      switch (status) {
        case "INSTOCK":
          return "success";
        case "LOWSTOCK":
          return "warn";
        case "OUTOFSTOCK":
          return "danger";
        default:
          return null;
      }
    },
  },
};
</script>
<style>
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
  border-radius: 10px;
}

.custom-carousal-custom .p-carousel-indicators {
  position: absolute;
  right: 10px;
  bottom: 0px;
}
.p-carousel {
  position: relative;
  width: 35vw !important;
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
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.headline-tuncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
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
