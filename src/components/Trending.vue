<template>
  <div v-if="blogs.length > 0">
    <div
      class="text-[45px] font-bold font-lato mt-4 mr-[20px] ml-[20px] sm:mr-[60px] sm:ml-[60px]"
    >
      Trending Headlines
    </div>

    <Carousel
      :value="blogs"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      class="carousel mt-4 custom-carousal mr-[20px] ml-[20px]"
      showIndicators
      circular
    >
      <template #item="slotProps">
        <div
          class="relative rounded-[20px] m-2 h-[170px] sm:h-[363px] overflow-hidden"
        >
          <img
            :src="slotProps.data.imgixUrlHighRes"
            :alt="slotProps.data.name"
            class="w-[100%] h-full object-cover rounded-[20px]"
          />
          <Tag
            :value="slotProps.data.inventoryStatus"
            :severity="getSeverity(slotProps.data.inventoryStatus)"
            class="absolute top-4 left-4"
          />
          <div
            class="absolute top-2 right-4 p-2 text-black flex flex-row gap-2 sm:gap-3 justify-around"
          >
            <div>
              <i
                class="mdi mdi-share-variant text-black bg-white rounded-[50%] h-[27px] w-[27px] sm:h-[40px] sm:w-[40px] text-[13px] sm:text-[22px] flex justify-center items-center icon-black"
                style="color: black"
              ></i>
            </div>
            <div>
              <i
                class="mdi mdi-bookmark-outline text-black bg-white rounded-[50%] h-[27px] w-[27px] sm:h-[40px] sm:w-[40px] text-[13px] sm:text-[22px] flex justify-center items-center"
              ></i>
            </div>
          </div>
          <div
            class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black via-black/60 to-transparent text-white"
          >
            <div class="gap-1 text-white text-xs ml-2 sm:ml-4 mb-4">
              <div class="leading-3 sm:w-[100%] md:w-[60%]">
                <a
                  :href="`${SACHAI_NEWS_URL}${slotProps.data._id}`"
                  style="line-height: 1.2"
                  class="hover:text-current text-[14px] sm:text-[20px]"
                >
                  {{ slotProps.data.headline }}
                </a>
              </div>
              <div class="flex flex-row gap-3 mt-1 sm:mt-3 mb-1">
                <div class="text-[12px] sm:text-[16px]">
                  {{ slotProps.data.source }}
                </div>
                <div class="text-[12px] sm:text-[16px]">|</div>
                <div class="text-[12px] sm:text-[16px]">
                  {{ formatPublishTime(slotProps.data.publishTime) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
  <div v-else>
    <!-- <p>Loading...</p> -->
    <!-- Or show a placeholder if no data is available -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { ProductService } from "../../src/assets/service/ProductService";
export default {
  data() {
    return {
      blogs: [],
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
          "https://dev-api.askus.news/news/getAllBlogsForWeb",
          {
            language: this.languageId,
            page: 1,
          }
        );
        this.blogs = response.data.slice(0, 5);
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
.custom-carousal {
  position: relative !important;
}
.custom-carousal .p-highlight {
  background-color: red !important;
  width: 25px !important;
}
.custom-carousal .p-carousel-indicator {
  color: green;
  background-color: white;
  position: relative !important;
  bottom: 25px;
  width: 10px;
  border-radius: 10px;
}
.p-carousel-content {
  position: relative;
}
.custom-carousal .p-carousel-next,
.custom-carousal .p-carousel-prev {
  display: none !important;
}
</style>
