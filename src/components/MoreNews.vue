<template>
  <div class="mt-3 bg-white p-3 rounded-[10px]">
    <div class="flex justify-between w-full items-center">
      <div class="flex flex-row items-center gap-2">
        <div class="bg-[#FF0053] w-[4px] h-[13px] rounded-md"></div>
        <div class="text-[20px] font-bold font-lato">More News</div>
      </div>
      <!-- Conditionally render button based on loading and error states -->
      <div v-if="!loading && !error">
        <a href="/MoreNews">
          <Button />
        </a>
      </div>
    </div>

    <div v-if="loading" class="mt-3">
      <div>
        <div class="bg-white w-[100%] flex justify-center">
          <!-- First Column -->
          <div
            class="w-[30%] sm-425:w-[100%] sm-max:w-[50%] between-sm-md:w-[50%] below-sm:w-[100%]"
          >
            <div>
              <div>
                <Skeleton width="100%" height="5rem"></Skeleton>
                <div class="divider mt-3"></div>
              </div>
              <div>
                <Skeleton width="100%" height="5rem"></Skeleton>
                <div class="divider mt-3"></div>
              </div>
              <div>
                <Skeleton width="100%" height="5rem"></Skeleton>
              </div>
            </div>
          </div>

          <!-- Divider Column -->
          <div class="w-[3%] flex justify-center sm-425:hidden divider_loader">
            <div class="divider1 sm-425:hidden"></div>
          </div>

          <!-- Second Column -->
          <div
            class="w-[30%] sm-max:w-[50%] between-sm-md:w-[50%] sm-425:hidden"
          >
            <div>
              <div>
                <Skeleton width="100%" height="5rem"></Skeleton>
                <div class="divider mt-3"></div>
              </div>
              <div>
                <Skeleton width="100%" height="5rem"></Skeleton>
                <div class="divider mt-3"></div>
              </div>
              <div>
                <Skeleton width="100%" height="5rem"></Skeleton>
              </div>
            </div>
          </div>

          <!-- Divider Column -->
          <div class="w-[3%] flex justify-center divider_loader">
            <div class="divider1 sm-max:hidden"></div>
          </div>

          <!-- Third Column -->
          <div class="w-[30%] sm-max:hidden">
            <div>
              <div>
                <Skeleton width="100%" height="5rem"></Skeleton>
                <div class="divider mt-3"></div>
              </div>
              <div>
                <Skeleton width="100%" height="5rem"></Skeleton>
                <div class="divider mt-3"></div>
              </div>
              <div>
                <Skeleton width="100%" height="5rem"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-white w-[100%] flex">
      <!-- First Column -->
      <div
        class="w-[30%] sm-425:w-[100%] sm-max:w-[50%] between-sm-md:w-[50%] below-sm:w-[100%]"
      >
        <div
          v-for="(news, index) in leftColumnNews"
          :key="'news-left-' + index"
          class="mt-3"
          @click="navigateToMoreNews(news._id)"
        >
          <div class="flex flex-row gap-3 cursor-pointer">
            <div class="w-[50px]">
              <img class="small-img" src="@/assets/png/Group.png" />
            </div>
            <div>
              <div class="font-16 more_headline">{{ news.headline }}</div>
              <div class="para summary">{{ news.summary }}</div>
            </div>
          </div>
          <div
            v-if="index < leftColumnNews.length - 1"
            class="divider mt-3"
          ></div>
        </div>
      </div>

      <!-- Divider Column -->
      <div class="w-[3%] flex justify-center sm-425:hidden">
        <div class="divider1 sm-425:hidden"></div>
      </div>

      <!-- Second Column -->
      <div class="w-[30%] sm-max:w-[50%] between-sm-md:w-[50%] sm-425:hidden">
        <div
          v-for="(news, index) in middleColumnNews"
          :key="'news-middle-' + index"
          class="mt-3"
          @click="navigateToMoreNews(news._id)"
        >
          <div class="flex flex-row gap-3 cursor-pointer">
            <div class="w-[50px]">
              <img class="small-img" src="@/assets/png/Group.png" />
            </div>
            <div>
              <div class="font-16 more_headline">{{ news.headline }}</div>
              <div class="para summary">{{ news.summary }}</div>
            </div>
          </div>
          <div
            v-if="index < middleColumnNews.length - 1"
            class="divider mt-3"
          ></div>
        </div>
      </div>

      <!-- Divider Column -->
      <div class="w-[3%] flex justify-center">
        <div class="divider1 sm-max:hidden"></div>
      </div>

      <!-- Third Column -->
      <div class="w-[30%] sm-max:hidden">
        <div
          v-for="(news, index) in rightColumnNews"
          :key="'news-right-' + index"
          class="mt-3"
          @click="navigateToMoreNews(news._id)"
        >
          <div class="flex flex-row gap-3 cursor-pointer">
            <div class="w-[50px]">
              <img class="small-img" src="@/assets/png/Group.png" />
            </div>
            <div>
              <div class="font-16 more_headline">{{ news.headline }}</div>
              <div class="para summary">{{ news.summary }}</div>
            </div>
          </div>
          <div
            v-if="index < rightColumnNews.length - 1"
            class="divider mt-3"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "./ViewAll.vue";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";

const allNews = ref([]);
const loading = ref(true);
const error = ref(false);

const leftColumnNews = computed(() => allNews.value.slice(0, 3));
const middleColumnNews = computed(() => allNews.value.slice(3, 6));
const rightColumnNews = computed(() => allNews.value.slice(6, 9));

const navigateToMoreNews = (id) => {
  router.push(`/news/${id}`);
};

const fetchNews = async () => {
  const payload = {
    language: "6421a32aa020a23deacecf92",
    categoryId: "63d90e4098d783ac0cbe2310",
    page: 9,
  };
  try {
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_CATEGORY_WISE_NEWS_FOR_WEB}`,
      payload
    );
    // const response = await axios.post(
    //   "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb",

    // );
    allNews.value = response.data.slice(0, 9);
    error.value = allNews.value.length === 0;
  } catch (e) {
    console.error("Error fetching news:", e);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const router = useRouter();

onMounted(fetchNews);
</script>

<style scoped>
.small-img {
  height: 10px;
  width: 10px;
  margin-top: 6px;
  object-fit: contain;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
  width: 100%;
}

.divider1 {
  height: 100%;
  background-color: #e5e7eb;
  width: 1px;
}

.font-16 {
  font-size: 16px;
}

.para {
  color: #6b7280;
}

.summary {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #6b7280;
}

.more_headline {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1e0627;
}

.multiline-truncate1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
@media screen and (max-width: 425px) {
  .divider_loader {
    display: none !important;
  }
}
</style>
