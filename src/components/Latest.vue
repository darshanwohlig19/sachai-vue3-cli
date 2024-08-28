<template>
  <section>
    <div class="mt-5">
      <div class="flex justify-between w-full items-center mb-5">
        <div class="text-[20px] font-bold font-lato mt-4 mt-4">Latest News</div>
        <div class="see">See all &nbsp;→</div>
      </div>
      <div class="flex flex-row flex-wrap gap-3 justify-between">
        <div v-for="news in slicedData" :key="news">
          <div
            class="flex flex-col bg-white rounded-[10px] drop-shadow-sm w-[330px]"
          >
            <div class="rounded-[10px]">
              <!-- Foreground Image -->
              <img
                :src="news.imgixUrlHighRes"
                class="relative z-10 h-[156px] w-[330px] rounded-[10px] object-cover"
                alt=""
              />
            </div>
            <div class="flex justify-between items-center p-3">
              <div class="flex gap-1 text-[#676767] text-xs">
                <div>{{ news.source }}</div>
                <div>| {{ formatPublishTime(news.publishTime) }}</div>
              </div>
              <div class="flex gap-1">
                <span class="mdi mdi-share-variant text-[19px]"></span>
                <span class="mdi mdi-bookmark-outline text-[21px]"></span>
              </div>
            </div>
            <div class="pl-3 pr-3 text-[16px] font-semibold">
              <a
                :href="`${SACHAI_NEWS_URL}${news._id}`"
                class="hover:text-current font-16 multiline-truncate1"
              >
                {{ news.headline }}
              </a>
            </div>
            <div class="pl-3 pr-3 para multiline-truncate">
              {{ news.summary }}
            </div>
            <div class="px-3 pb-3 mt-2 mb-2 text-[12px] flex gap-1">
              <span class="text-red-500 bold">Politics</span>
              <span>| 4 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      blogs: [],
      SACHAI_NEWS_URL: "https://news.sachai.io/news/",
      languageId: "6421a32aa020a23deacecf92",
      screenWidth: window.innerWidth,
    };
  },

  mounted() {
    this.fetchBlogs();
    window.addEventListener("resize", this.updateScreenWidth);
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
  },
  computed: {
    slicedData() {
      if (this.screenWidth < 640) {
        // Mobile devices
        return this.blogs.slice(0, 1);
      } else if (this.screenWidth >= 640 && this.screenWidth < 1024) {
        // Tablets
        return this.blogs.slice(0, 3);
      } else {
        // Desktop and larger devices
        return this.blogs.slice(0, 4);
      }
    },
  },
};
</script>

<style scoped>
.multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
