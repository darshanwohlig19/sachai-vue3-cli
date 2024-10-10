<template>
  <div class="!mt-[10px]">
    <div
      class="h-full w-full flex flex-col md:flex-row gap-6 md:gap-10 mob_des bg-white p-6"
    >
      <div class="info w-full md:w-[30%] mb-4">
        <div>
          <img
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
            height="47px"
            width="116px"
            alt
          />
        </div>
        <div class="text-[18px] font-bold font-lato text-[#1E0627] mt-4">
          New Age News App Powered by AI
        </div>
        <div class="text-[18px] mt-2 text-[#878787]">
          Get trustworthy news in an easy-to-read format, our smart chatbot
          provides a personalized and interactive news experience for you.
        </div>
        <div class="flex mt-4 gap-4 md:gap-6">
          <div>
            <a
              href="https://apps.apple.com/us/app/sachai/id6448037673?platform=iphone"
            >
              <img
                src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64ae7a0360c324b7e56ab783_app-store.svg"
                alt="App Store"
                class="w-36 md:w-40"
              />
            </a>
          </div>
          <div>
            <a
              href="https://play.google.com/store/search?q=sachai&c=apps&hl=en-IN"
            >
              <img
                src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64ae7a0360c324b7e56ab784_google-play.svg"
                alt="Play Store"
                class="w-36 md:w-40"
              />
            </a>
          </div>
        </div>
        <div class="flex mt-4 gap-3">
          <a href=""
            ><i class="mdi mdi-twitter text-[#878787] text-[19px]"></i
          ></a>
          <a href=""
            ><i class="mdi mdi-facebook text-[#878787] text-[19px]"></i
          ></a>
          <a
            href="https://www.instagram.com/sachai.io/?igshid=MzRlODBiNWFlZA%3D%3D"
            ><i class="mdi mdi-instagram text-[#878787] text-[19px]"></i
          ></a>
          <a href=""
            ><i class="mdi mdi-github text-[#878787] text-[19px]"></i
          ></a>
        </div>
      </div>
      <div class="pop_hot w-full md:w-[35%] flex flex-col justify-between">
        <div>
          <div class="footer-heads ml-[-10px] text-sm">Popular Categories</div>
          <div v-if="loading">
            <p class="footer-links text-[#878787] text-[14px] pt-3">
              Loading...
            </p>
          </div>
          <div v-else-if="categories.length == 0">
            <p class="footer-links text-[#878787] text-[14px] pt-3">
              No Catogries Availabe
            </p>
          </div>
          <div
            class="grid grid-cols-2 xl:grid-cols-4 md:grid-cols-3 pt-2"
            style="column-gap: 17px"
          >
            <ul v-for="heading in categories.slice(0, 16)" :key="heading._id">
              <li class="footer-links text-[#878787] text-[14px] pt-3">
                <a
                  :href="`/categories/${heading._id}?category=${heading.name}`"
                  class="capitalize leading-normal"
                  >{{ heading.name }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-5">
          <div class="footer-heads ml-[-10px] text-sm">Hot on the Web</div>
          <div>
            <div v-if="loading">
              <p class="footer-links text-[#878787] text-[14px] pt-3">
                Loading...
              </p>
            </div>
            <div v-else-if="hotOnTheWeb.length == 0">
              <p class="footer-links text-[#878787] text-[14px] pt-3">
                No Headline Availabe
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 xl:grid-cols-2 md:grid-cols-3 pt-2">
            <ul v-for="item in hotOnTheWeb" :key="item.id">
              <li class="footer-links text-[#878787] text-sm pt-3">
                <a :href="`/NewsByTopics/${item}`">
                  <div class="cursor-pointer capitalize leading-normal">
                    {{ item }}
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="let_hlp_trend w-full md:w-[30%] flex flex-col justify-between"
      >
        <div class="flex gap-5 justify-around mt-6 ml-[-10px] md:mt-0">
          <div class="let w-full md:w-auto">
            <div class="footer-heads text-sm">Latest News</div>
            <div>
              <div v-if="loading">
                <p class="footer-links text-[#878787] text-[14px] pt-3">
                  Loading...
                </p>
              </div>
              <div v-else-if="latestNews.length == 0">
                <p class="footer-links text-[#878787] text-[14px] pt-3">
                  No Headline Availabe
                </p>
              </div>
            </div>
            <ul>
              <li
                v-for="news in latestNews"
                :key="news.id"
                class="footer-links text-[#878787] text-sm pt-3"
              >
                <a :href="`/NewsByTopics/${news}`">
                  <div class="cursor-pointer capitalize leading-normal">
                    {{ news }}
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div class="hlp w-full md:w-auto">
            <div class="footer-heads text-sm">Help</div>
            <ul>
              <li class="footer-links text-[#878787] text-sm pt-3">
                <a href="/AboutUs" class="capitalize">About us</a>
              </li>
              <li class="footer-links text-[#878787] text-sm pt-3">
                <a class="capitalize line">Customer Support</a>
              </li>
              <li class="footer-links text-[#878787] text-sm pt-3">
                <a class="capitalize line">Terms & Conditions</a>
              </li>
              <li class="footer-links text-[#878787] text-sm pt-3">
                <a class="capitalize">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="trend">
          <div class="footer-heads ml-[-10px] text-sm">Trending Topics</div>
          <div>
            <div v-if="loading">
              <p class="footer-links text-[#878787] text-[14px] pt-3">
                Loading...
              </p>
            </div>
            <div v-else-if="trendingTopics.length == 0">
              <p class="footer-links text-[#878787] text-[14px] pt-3">
                No Headline Availabe
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 xl:grid-cols-2 md:grid-cols-3 pt-2">
            <ul v-for="topic in trendingTopics" :key="topic.id">
              <li class="footer-links text-[#878787] text-sm pt-3">
                <a :href="`/NewsByTopics/${topic}`">
                  <div class="cursor-pointer capitalize leading-normal">
                    {{ topic }}
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- TABLET -->

    <div class="tablet1 bg-white flex flex-row justify-between p-6">
      <div class="info mb-4 flex flex-col justify-center items-center">
        <div>
          <img
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
            height="47px"
            width="116px"
            alt
          />
        </div>
        <div class="text-[18px] font-bold font-lato text-[#1E0627] mt-4">
          New Age News App Powered by AI
        </div>
        <div class="text-[18px] mt-2 text-[#878787]">
          Get trustworthy news in an easy-to-read format, our smart chatbot
          provides a personalized and interactive news experience for you.
        </div>
        <div class="flex mt-4 gap-4 md:gap-6">
          <div>
            <a
              href="https://apps.apple.com/us/app/sachai/id6448037673?platform=iphone"
            >
              <img
                src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64ae7a0360c324b7e56ab783_app-store.svg"
                alt="App Store"
                class="w-36 md:w-40"
              />
            </a>
          </div>
          <div>
            <a
              href="https://play.google.com/store/search?q=sachai&c=apps&hl=en-IN"
            >
              <img
                src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64ae7a0360c324b7e56ab784_google-play.svg"
                alt="Play Store"
                class="w-36 md:w-40"
              />
            </a>
          </div>
        </div>
        <div class="flex mt-4 gap-3">
          <a href=""
            ><i class="mdi mdi-twitter text-[#878787] text-[19px]"></i
          ></a>
          <a href=""
            ><i class="mdi mdi-facebook text-[#878787] text-[19px]"></i
          ></a>
          <a
            href="https://www.instagram.com/sachai.io/?igshid=MzRlODBiNWFlZA%3D%3D"
            ><i class="mdi mdi-instagram text-[#878787] text-[19px]"></i
          ></a>
          <a href=""
            ><i class="mdi mdi-github text-[#878787] text-[19px]"></i
          ></a>
        </div>
      </div>

      <div class="">
        <div v-if="loading">
          <p class="footer-links text-[#878787] text-[14px] pt-3">Loading...</p>
        </div>
        <div v-else-if="categories.length == 0">
          <p class="footer-links text-[#878787] text-[14px] pt-3">
            No Catogries Availabe
          </p>
        </div>
        <div class="pop_hot lex flex-col gap-6">
          <div>
            <div class="footer-heads ml-[-10px] text-sm">
              Popular Categories
            </div>
            <div class="grid grid-cols-4 pt-2">
              <ul v-for="heading in categories.slice(0, 16)" :key="heading._id">
                <li class="footer-links text-[#878787] text-sm pt-3">
                  <a
                    :href="`/categories/${heading._id}?category=${heading.name}`"
                    class="capitalize leading-normal"
                    >{{ heading.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="let_hlp_trend flex flex-col gap-6">
          <div class="flex mt-5 ml-[-10px] gap-7">
            <div class="let">
              <div>
                <div v-if="loading">
                  <p class="footer-links text-[#878787] text-[14px] pt-3">
                    Loading...
                  </p>
                </div>
                <div v-else-if="latestNews.length == 0">
                  <p class="footer-links text-[#878787] text-[14px] pt-3">
                    No Headline Availabe
                  </p>
                </div>
              </div>
              <div class="footer-heads text-sm">Latest News</div>
              <ul>
                <li
                  v-for="news in latestNews"
                  :key="news.id"
                  class="footer-links text-[#878787] text-sm pt-3"
                >
                  <a :href="`/NewsByTopics/${news}`">
                    <div class="cursor-pointer capitalize leading-normal">
                      {{ news }}
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div class="hlp">
              <div class="footer-heads text-sm">Help</div>
              <ul>
                <li class="footer-links text-[#878787] text-sm pt-3">
                  <a class="capitalize" href="/About-us">About us</a>
                </li>
                <li class="footer-links text-[#878787] text-sm pt-3">
                  <a class="capitalize">Customer Support</a>
                </li>
                <li class="footer-links text-[#878787] text-sm pt-3">
                  <a class="capitalize">Terms & Conditions</a>
                </li>
                <li class="footer-links text-[#878787] text-sm pt-3">
                  <a class="capitalize">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <div v-if="loading">
                <p class="footer-links text-[#878787] text-[14px] pt-3">
                  Loading...
                </p>
              </div>
              <div v-else-if="hotOnTheWeb.length == 0">
                <p class="footer-links text-[#878787] text-[14px] pt-3">
                  No Headline Availabe
                </p>
              </div>
            </div>

            <div>
              <div class="footer-heads ml-[-10px] text-sm">Hot on the Web</div>
              <div class="grid grid-cols-2 pt-2">
                <ul v-for="item in hotOnTheWeb" :key="item.id">
                  <li class="footer-links text-[#878787] text-sm pt-3 mr-6">
                    <a :href="`/NewsByTopics/${item}`">
                      <div class="cursor-pointer capitalize leading-normal">
                        {{ item }}
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <!-- <div class="footer-heads ml-[-10px] text-sm">Trending Topics</div>
            <div class="grid grid-cols-2 pt-2">
              <div>
                <ul v-for="topic in trendingTopics" :key="topic.id">
                  <li class="footer-links text-[#878787] text-sm pt-3">
                    <a class="capitalize">{{ topic }}</a>
                  </li>
                </ul>
              </div>
              <div></div>
            </div> -->

            <div>
              <div class="footer-heads ml-[-10px] text-sm">Trending Topics</div>
              <div>
                <div v-if="loading">
                  <p class="footer-links text-[#878787] text-[14px] pt-3">
                    Loading...
                  </p>
                </div>
                <div v-if="trendingTopics.length == 0">
                  <p class="footer-links text-[#878787] text-[14px] pt-3">
                    No Headline Availabe
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 pt-2">
                <ul v-for="item in trendingTopics" :key="item.id">
                  <li class="footer-links text-[#878787] text-sm pt-3 mr-6">
                    <a :href="`/NewsByTopics/${item}`">
                      <div class="cursor-pointer capitalize leading-normal">
                        {{ item }}
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-[#fff] text-[#878787] text-lato text-[15px] text-center py-4 px-4 md:px-6"
    >
      <div class="flex flex-col text-center md:flex-row justify-center">
        <div>© 2024, All Rights Reserved</div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";

export default {
  setup() {
    const categories = ref([]);
    const latestNews = ref([]);
    console.log(latestNews, "LatestNews");
    const hotOnTheWeb = ref([]);
    const trendingTopics = ref([]);
    const loading = ref(true);
    const hasError = ref(false);

    const fetchCategories = async () => {
      const languageId = "6421a32aa020a23deacecf92";

      const payload = {
        langauge: languageId,
      };
      try {
        const response = await apiService.apiCall(
          "post",
          `${apiConfig.GET_ALL_CATEGORY}`,
          payload
        );
        // const response = await axios.post(
        //   "https://api-uat.newsshield.io/category/getAllCat"
        // );
        categories.value = response.data.map((category) => ({
          ...category,
          name:
            category?.name?.toLowerCase() === "ai"
              ? category.name.toUpperCase()
              : category.name.replace(/-/g, " "),
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
        hasError.value = true;
      } finally {
        loading.value = false;
      }
    };

    const fetchNewsTopics = async () => {
      // const payload = {
      //   langauge: languageId,
      // };
      try {
        const response = await apiService.apiCall(
          "get",
          `${apiConfig.GET_TRENDING_TOPICS}`
        );
        // const response = await axios.get(
        //   "https://api-uat.newsshield.io/news/getTrendingTopics"
        // );
        console.log(response.data);
        latestNews.value = response.data.slice(0, 4);
        hotOnTheWeb.value = response.data.slice(5, 12);
        trendingTopics.value = response.data.slice(12, 20);
        console.log("latest", latestNews);
      } catch (error) {
        console.error("Error fetching footer news:", error);
        hasError.value = true;
      } finally {
        loading.value = false;
      }
    };

    const LatestNews = () => {
      console.log("News", latestNews);
    };

    onMounted(() => {
      fetchCategories();
      fetchNewsTopics();
    });

    return {
      categories,
      latestNews,
      hotOnTheWeb,
      trendingTopics,
      loading,
      hasError,
      LatestNews,
    };
  },
};
</script>

<style scoped>
.trend {
  margin-top: 0px;
}
.tablet1 {
  display: none !important;
}
@media screen and (max-width: 950px) {
  .trend {
    margin-top: 20%;
  }
  .tablet1 {
    display: block !important;
  }
  .mob_des {
    display: none !important;
  }
}
@media screen and (max-width: 500px) {
  .tablet1 {
    display: none !important;
  }
  .mob_des {
    display: block !important;
  }
}
@media screen and (max-width: 425px) {
  .line {
    line-height: 20px;
  }
}
</style>
