<template>
  <ThemeSwitcher />
  <div
    class="text-[45px] mt-4 font-bold mr-[10px] ml-[10px] sm:mr-[60px] sm:ml-[60px]"
  >
    Trending Headlines
  </div>
  <div class="card">
    <Carousel
      v-for="blog in slicedData"
      :key="blog._id"
      :value="products"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      class="carousel"
      showIndicators
    >
      <template #item="slotProps">
        <div class="relative rounded-[20px] m-2 h-[363px] overflow-hiddenn">
          <img
            :src="blog.imgixUrlHighRes"
            :alt="slotProps.data.name"
            class="w-[100%] h-full object-fit rounded-[20px]"
          />
          <Tag
            :value="slotProps.data.inventoryStatus"
            :severity="getSeverity(slotProps.data.inventoryStatus)"
            class="absolute top-4 left-4"
          />
          <div
            class="absolute top-2 right-4 p-2 text-black w-[10%] flex justify-around"
          >
            <div>
              <i
                class="pi pi-share-alt text-black bg-white rounded-[50%] h-[40px] w-[40px] text-[22px] flex justify-center items-center"
              ></i>
            </div>
            <div>
              <i
                class="pi pi-bookmark text-black bg-white rounded-[50%] h-[40px] w-[40px] text-[22px] flex justify-center items-center"
              ></i>
            </div>
          </div>
          <div
            class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black via-black/60 to-transparent text-white"
          >
            <div class="gap-1 text-white text-xs">
              <div class="leading-3 w-[60%]">
                <a
                  :href="`${SACHAI_NEWS_URL}${blog._id}`"
                  style="line-height: 1.2"
                  class="hover:text-current text-[20px]"
                >
                  {{ blog.headline }}
                </a>
              </div>
              <div class="flex w-[20%] mt-3 mb-1 justify-between">
                <div class="text-[16px]">{{ blog.source }}</div>
                <div class="text-[16px]">|</div>
                <div class="text-[16px]">
                  {{ formatPublishTime(blog.publishTime) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
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
</style>
