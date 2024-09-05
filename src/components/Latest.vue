<template>
  <section>
    <div class="mt-3">
      <div class="flex justify-between w-full items-center mb-3">
        <div class="text-[20px] font-bold font-lato">{{ sectionTitle }}</div>
        <div class="text-[16px] text-[#FF0053]">See all &nbsp;→</div>
      </div>
      <div class="flex flex-row gap-3 justify-between">
        <div
          v-for="news in newsId ? newsData : slicedData"
          :key="news._id"
          class="w-[33%] sm-425:w-full"
        >
          <div class="flex flex-col bg-white rounded-[10px] drop-shadow-sm">
            <div class="rounded-[10px]">
              <img
                :src="news.imgixUrlHighRes"
                class="relative z-10 h-[156px] w-full rounded-[10px] object-cover"
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
                @click="navigateToLatestDetail(news._id)"
                class="hover:text-current font-16 multiline-truncate1"
              >
                {{ news.headline }}
              </a>
            </div>
            <div
              class="pl-3 pr-3 para multiline-truncate"
              @click="navigateToLatestDetail(news._id)"
            >
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
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import moment from "moment";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const newsId = route.params.newsId;
    const blogs = ref([]);
    const latestNews = ref([]);
    console.log("latestNews", latestNews.value);

    const languageId = "6421a32aa020a23deacecf92";
    const screenWidth = ref(window.innerWidth);

    const fetchBlogs = async () => {
      try {
        const response = await axios.post(
          "https://api-uat.newsshield.io/news/getAllBlogsForWeb",
          {
            language: languageId,
            page: 1,
          }
        );
        blogs.value = response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    const fetchRelatedNews = async () => {
      try {
        const response = await axios.post(
          `https://api-uat.newsshield.io/pinecone/getRelatedNews/${newsId}`,
          {
            language: languageId,
          }
        );
        latestNews.value = response.data;
      } catch (error) {
        console.error("Error fetching related news:", error);
      }
    };

    const truncateText = (text, maxLength) => {
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const formatPublishTime = (publishTime) => {
      return moment(publishTime).fromNow();
    };

    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };
    const navigateToLatestDetail = (id) => {
      router.push(`/news/${id}`);
    };
    onMounted(() => {
      fetchBlogs();
      if (newsId) {
        fetchRelatedNews();
      }
      window.addEventListener("resize", updateScreenWidth);
    });

    const sectionTitle = computed(() => {
      return newsId ? "Related News" : "Latest News";
    });

    return {
      blogs,
      screenWidth,
      truncateText,
      formatPublishTime,
      updateScreenWidth,
      sectionTitle,
      navigateToLatestDetail,
    };
  },

  computed: {
    newsData() {
      if (this.screenWidth < 640) {
        return this.latestNews.slice(0, 1);
      } else if (this.screenWidth >= 640 && this.screenWidth < 1024) {
        return this.latestNews.slice(0, 3);
      } else {
        return this.latestNews.slice(0, 4);
      }
    },
    slicedData() {
      if (this.screenWidth < 640) {
        return this.blogs.slice(0, 1);
      } else if (this.screenWidth >= 640 && this.screenWidth < 1024) {
        return this.blogs.slice(0, 3);
      } else {
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
