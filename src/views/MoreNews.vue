<template>
  <div>
    <Navbarrr />
    <div class="mt-3 bg-white p-3 rounded-[10px]">
      <div class="flex flex-row items-center gap-2">
        <div class="bg-[#FF0053] w-[4px] h-[13px] rounded-md"></div>
        <div class="text-[20px] font-bold font-lato">More News</div>
      </div>

      <div class="bg-white w-[100%] flex">
        <div class="">
          <div
            v-for="(news, index) in MoreNews"
            :key="'news-left-' + index"
            class="mt-3 cursor-pointer"
            @click="navigateToMoreNews(news._id)"
          >
            <div class="flex flex-row justify-between">
              <div>
                <img class="" :src="news.imgixUrlHighRes" />
              </div>
              <div>
                <div class="font-16 more_headline">{{ news.headline }}</div>
                <div class="para summary">{{ news.summary }}</div>
              </div>
            </div>
            <div v-if="index < MoreNews.length - 1" class="divider mt-3"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Footer from "@/components/Footer.vue";
import Navbarrr from "@/components/Navbarrr.vue";
const router = useRouter();
const MoreNews = ref([]);

const navigateToMoreNews = (id) => {
  router.push(`/news/${id}`);
};

const fetchNews = async () => {
  try {
    const response = await axios.post(
      "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb",
      {
        language: "6421a32aa020a23deacecf92",
        categoryId: "63d90e4098d783ac0cbe2310",
        page: 9,
      }
    );
    MoreNews.value = response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

onMounted(fetchNews);
</script>
