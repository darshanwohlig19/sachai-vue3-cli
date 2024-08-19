<template>
  <div v-if="blogs.length > 0">
    <div class="text-[45px] font-bold font-lato mt-4">Featured</div>
    <div class="card">
      <Carousel
        :value="blogs"
        :numVisible="1"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        class="carousel mt-4"
        showIndicators
        circular
      >
        <template #item="slotProps">
          <div
            class="flex justify-between flex-wrap w-[100%] h-auto mr-[30px] ml-[30px]"
          >
            <div class="sm:w-[48%] w-[100%]">
              <img
                class="h-[396px] w-[100%] rounded-[20px] object-cover"
                :src="slotProps.data.imgixUrlHighRes"
                :alt="slotProps.data.name"
              />
            </div>
            <div class="sm:w-[100%] md:w-[48%]">
              <div class="flex justify-between w-[90%] mt-4 sm:mt-0">
                <div class="flex flex-row gap-3 font-lato">
                  <div>{{ slotProps.data.source }}</div>
                  <div>|</div>
                  <div>{{ formatPublishTime(slotProps.data.publishTime) }}</div>
                </div>
                <div class="flex flex-row gap-2 justify-between">
                  <div>
                    <i
                      class="mdi mdi-share-variant text-black rounded-[50%] text-[19px]"
                    ></i>
                  </div>
                  <div>
                    <i
                      class="mdi mdi-bookmark-outline text-black rounded-[50%] text-[21px]"
                    ></i>
                  </div>
                </div>
              </div>
              <div
                class="sm:text-[38px] text-[30px] w-[90%] sm:mt-4 mt-2 fontCustom"
                style="line-height: 1.1"
              >
                {{ slotProps.data.headline }}
              </div>
              <div class="text-[16px] font-lato w-[90%] sm:mt-4 mt-2">
                {{ slotProps.data.summary }}
              </div>
              <div class="flex flex-row gap-3 sm:mt-4 mt-2">
                <div>Politics</div>
                <div>|</div>
                <div>{{ formatPublishTime(slotProps.data.publishTime) }}</div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
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
        this.blogs = response.data;
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
<style scoped>
.carousel .p-carousel-indicators {
  bottom: 10px; /* Adjust the position of the indicators */
  display: flex;
  justify-content: center;
}

.carousel .p-carousel-indicator {
  width: 10px;
  height: 10px;
  background-color: #000; /* Set the background color of the indicators */
  border-radius: 50%; /* Make the indicators round */
  margin: 0 4px;
}

.carousel .p-carousel-indicator.p-highlight {
  background-color: #fff; /* Highlighted indicator color */
}
.fontCustom {
  font-family: "source-serif-pro-semibold";
}
</style>
