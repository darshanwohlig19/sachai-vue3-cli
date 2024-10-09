<template>
  <Navbarrr />
  <div class="mx-[10px] mt-3">
    <div class="flex flex-col lg:flex-row mt-[75px]">
      <div
        class="flex-grow flex flex-col h-full max-w-full sm:max-w-[90%] lg:max-w-[66%]"
      >
        <div
          class="shadow-lg rounded-lg between-Laptop:!hidden between-1011-1200:!hidden overflow-hidden flex-grow flex flex-col md:flex-row h-auto md:h-[16rem] bg-white"
        >
          <div class="relative w-full md:w-1/2 overflow-hidden p-2">
            <div
              class="relative image-container w-full h-64 rounded-xl overflow-hidden"
            >
              <!-- Background Image with Blur -->
              <img
                :src="newsItem?.imgixUrlHighRes || fallbackImage"
                alt="Background"
                :class="{
                  'absolute inset-0 object-cover w-full h-full filter blur-md':
                    newsItem?.imgixUrlHighRes,
                  hidden: !newsItem?.imgixUrlHighRes,
                }"
              />

              <!-- Gradient Overlay -->
              <div
                :class="{
                  'absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75':
                    newsItem?.imgixUrlHighRes,
                  hidden: !newsItem?.imgixUrlHighRes,
                }"
              ></div>

              <!-- Foreground Image -->
              <div
                class="absolute inset-0 flex flex-col justify-between text-white"
              >
                <img
                  :src="newsItem?.imgixUrlHighRes || fallbackImage"
                  alt="News image"
                  class="relative z-10 object-contain w-full h-64 rounded-xl"
                />
                <div
                  :class="{
                    'absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 rounded-[10px]':
                      newsItem?.imgixUrlHighRes,
                    hidden: !newsItem?.imgixUrlHighRes,
                  }"
                ></div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-2 flex flex-col">
            <span class="headline-detail text-secondary pb-[5px]">
              {{ newsItem?.headline }}
            </span>
            <div
              class="flex flex-wrap items-center justify-between w-full text-xs pb-2"
            >
              <!-- Categories Name and Additional Info -->
              <div
                class="time-date-home flex items-center space-x-2 mb-[5px] mt-[5px]"
              >
                <span class="text-neon-pink capitalize">
                  {{
                    newsItem?.categoriesName?.[0]?.toLowerCase() === "ai"
                      ? newsItem.categoriesName[0].toUpperCase()
                      : newsItem?.categoriesName?.[0]?.replace(/-/g, " ") ||
                        "No Category"
                  }}
                </span>
                <span class="text-[#2A2A2A]">|</span>
                <span class="text-[#1E0627]">{{ newsItem?.source }}</span>
                <span class="text-[#2A2A2A]">|</span>
                <span class="text-[#1E0627]">{{ formattedPublishTime }}</span>
              </div>

              <!-- Social Media Links and Bookmark -->
              <div class="flex items-center space-x-2 ml-auto">
                <Button
                  @click="shareOnFacebook"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="faceBookLogo"
                    alt="Facebook Logo"
                    class="social-icon"
                  />
                </Button>
                <Button
                  @click="shareOnX"
                  target="_blank"
                  class="flex items-center"
                >
                  <img :src="xLogo" alt="X Logo" class="social-icon" />
                </Button>
                <Button
                  @click="shareOnLinkedIn"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="linkDinLogo"
                    alt="LinkedIn Logo"
                    class="social-icon"
                  />
                </Button>
                <Button
                  @click="shareOnWhatsApp"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="whatsappLogo"
                    alt="WhatsApp Logo"
                    class="social-icon"
                  />
                </Button>
                <span
                  :class="[
                    'mdi',
                    newsItem && newsItem.bookmark
                      ? 'mdi-bookmark text-[#FF0053] text-[21px]'
                      : 'mdi-bookmark-outline text-[21px]',
                  ]"
                  class="cursor-pointer"
                  @click.stop="addBookmark(newsItem._id)"
                ></span>
              </div>
            </div>

            <div
              class="text-[#878787] summary-detail space-y-4 font-lato md-hidden"
            >
              <p>{{ newsItem?.summary }}</p>
            </div>
          </div>
        </div>

        <div
          class="hidden between-Laptop:!flex between-1011-1200:!flex !flex-col shadow-lg rounded-lg overflow-hidden bg-white between-644-1024:h-[326px]"
        >
          <div class="flex flex-row">
            <div class="w-[30%] p-2 rounded-xl">
              <div
                class="relative image-container w-full h-[100%] rounded-xl overflow-hidden"
              >
                <!-- Background Image with Blur -->
                <img
                  :src="newsItem?.imgixUrlHighRes || fallbackImage"
                  alt="Background"
                  class="absolute inset-0 object-cover w-full h-full filter blur-md"
                />

                <!-- Gradient Overlay -->
                <div
                  class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
                ></div>

                <!-- Foreground Image -->
                <div
                  class="absolute inset-0 flex flex-col justify-between text-white"
                >
                  <img
                    :src="newsItem?.imgixUrlHighRes || fallbackImage"
                    alt="News image"
                    class="relative z-10 object-contain w-full h-[100%] rounded-xl"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 rounded-[10px]"
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="p-2 flex-col justify-between !w-[70%] between-Laptop:!w-[72%]"
            >
              <!-- added flex-col and justify-between -->
              <span
                class="text-lg headline-detail text-secondary font-semibold"
              >
                {{ newsItem?.headline }}
              </span>
              <div
                class="time-date-home flex flex-wrap items-center ml-1 text-[11px] w-full mt-[5px]"
              >
                <span class="text-neon-pink mr-1 capitalize">
                  {{ newsItem?.categoriesName[0] }}
                </span>
                <span class="text-light-gray mr-2">|</span>
                <span class="text-light-gray mr-2">{{ newsItem?.source }}</span>
                <span class="text-light-gray mr-2">|</span>
                <span class="text-light-gray mr-2">{{
                  formattedPublishTime
                }}</span>
              </div>
              <div
                class="ml-auto flex items-center justify-end space-x-2 mt-[1px]"
              >
                <a
                  @click="shareOnFacebook"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="faceBookLogo"
                    alt="Facebook Logo"
                    class="social-icon"
                  />
                </a>
                <a @click="shareOnX" target="_blank" class="flex items-center">
                  <img :src="xLogo" alt="X Logo" class="social-icon" />
                </a>
                <a target="_blank" class="flex items-center">
                  <img
                    @click="shareOnLinkedIn"
                    :src="linkDinLogo"
                    alt="LinkedIn Logo"
                    class="social-icon"
                  />
                </a>
                <a
                  @click="shareOnWhatsApp"
                  target="_blank"
                  class="flex items-center"
                >
                  <img
                    :src="whatsappLogo"
                    alt="WhatsApp Logo"
                    class="social-icon"
                  />
                </a>
                <span
                  :class="[
                    'mdi',
                    newsItem && newsItem.bookmark
                      ? 'mdi-bookmark-outline text-[21px]'
                      : 'mdi-bookmark-outline text-[21px]',
                  ]"
                  class="cursor-pointer"
                  @click.stop="addBookmark(newsItem._id)"
                ></span>
              </div>
            </div>
          </div>
          <div
            class="text-[#878787] summary-detail space-y-4 font-lato mx-2 mt-[2px]"
          >
            <p>{{ newsItem?.summary }}</p>
          </div>
        </div>

        <div
          class="bg-white shadow-lg rounded-lg overflow-hidden mt-2 sm:h-[390px] lg:h-[390px] md:h-[390px]"
        >
          <FeatureNews />
        </div>
      </div>

      <!-- ChatBot Section -->
      <div>
        <ChatBot
          :category="newsItem"
          :isVisible="isDialogVisible"
          @close="isDialogVisible = false"
        />
      </div>
    </div>
  </div>

  <div class="mt-1 bg-white rounded-lg mx-[10px]" v-if="newsItem?._id">
    <RelatedNewsData :category="newsItem" />
  </div>
  <div
    class="z-10 fixed bottom-8 right-8 h-[40px] w-[40px] cursor-pointer rounded-full bg-[#320A38] block lg:hidden xl:hidden xxl:hidden"
    @click.stop="showDialog()"
  >
    <span
      class="flex h-full cursor-pointer items-center justify-center text-[25px] text-white"
    >
      <i class="pi pi-comments"></i>
    </span>
  </div>

  <Footer />
</template>

<script setup>
import { ref, onBeforeMount, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import axios from "axios";
import moment from "moment"; // Import moment
import Footer from "@/components/Footer.vue";
import Navbarrr from "@/components/Navbarrr.vue";
import FeatureNews from "@/components/FeaturedIdStories.vue";
import RelatedNewsData from "@/components/RelatedNews.vue";
import ChatBot from "@/components/chatbot.vue";
import faceBookLogo from "@/assets/svg/facebook.svg";
import xLogo from "@/assets/svg/x.svg";
import linkDinLogo from "@/assets/svg/linkdin.svg";
import whatsappLogo from "@/assets/svg/whatsapp.svg";
import fallbackImage2 from "../common/config/GlobalConstants";

const fallbackImage = fallbackImage2.variables.fallbackImage;

const route = useRoute();
const newsItem = ref(null);
const newsId = route.params.id;
const isDialogVisible = ref(false); // State for dialog visibility

const showDialog = () => {
  isDialogVisible.value = true;
};
const shareOnFacebook = () => {
  const link = newsItem.value?.newsLink; // Get the news link from newsItem
  if (link) {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      link
    )}`;
    window.open(facebookShareUrl, "_blank");
  }
};

const shareOnWhatsApp = () => {
  const link = newsItem.value?.newsLink; // Get the news link from newsItem
  if (link) {
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(link)}`;
    window.open(whatsappShareUrl, "_blank");
  }
};
const shareOnLinkedIn = () => {
  const link = newsItem.value?.newsLink; // Get the news link from newsItem
  if (link) {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      link
    )}`;
    window.open(linkedInShareUrl, "_blank");
  }
};
const shareOnX = () => {
  const link = newsItem.value?.newsLink; // Get the news link from newsItem
  if (link) {
    const xShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
      link
    )}`;
    window.open(xShareUrl, "_blank");
  }
};

const checkWindowSize = () => {
  if (window.innerWidth >= 1024) {
    isDialogVisible.value = false;
  }
};
const formattedPublishTime = computed(() => {
  return newsItem.value?.publishTime
    ? moment(newsItem.value.publishTime).fromNow()
    : "";
});
const addBookmark = async (id) => {
  const newStatus = newsItem.value.bookmark ? "Disabled" : "Enabled";
  const payload = { status: newStatus };
  try {
    await apiService.apiCall("post", `${apiConfig.BOOKMARK}/${id}`, payload);
    newsItem.value.bookmark = !newsItem.value.bookmark;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

const fetchNewsItem = async () => {
  try {
    const response = await axios.get(
      `https://api-uat.newsshield.io/news/getOneNewsForWeb/${newsId}`
    );
    newsItem.value = response.data[0];
  } catch (error) {
    console.error("Error fetching news item:", error);
  }
};

onBeforeMount(() => {
  if (newsId) {
    fetchNewsItem();
  }
  window.removeEventListener("resize", checkWindowSize);
});
onMounted(() => {
  window.addEventListener("resize", checkWindowSize);
});
</script>

<style>
.fontCustom {
  font-family: "source-serif-pro-semibold";
}
.image-container {
  position: relative;
  width: 100%;
  height: 256px;
  overflow: hidden;
  border-radius: 0.5rem;
  padding: 16px; /* Adjust padding as needed */
}

.font-semibold {
  font-family: "Source Serif Pro", serif;
  font-weight: 600;
}
</style>
