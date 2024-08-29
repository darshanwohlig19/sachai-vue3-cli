<template>
  <div class="mt-3">
    <div
      class="h-full w-full flex flex-col md:flex-row gap-6 md:gap-10 mob_des bg-white mt-10 p-6"
    >
      <!-- Info Section -->
      <div class="info w-full md:w-[30%] mb-4">
        <div>
          <img
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
            height="47px"
            width="116px"
            alt
          />
        </div>
        <div class="font-24 mt-4">New Age News App Powered by AI</div>
        <div class="font-18 mt-2">
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
          <i class="mdi mdi-twitter text-[#52525B] text-[19px]"></i>
          <i class="mdi mdi-facebook text-[#52525B] text-[19px]"></i>
          <i class="mdi mdi-instagram text-[#52525B] text-[19px]"></i>
          <i class="mdi mdi-github text-[#52525B] text-[19px]"></i>
        </div>
      </div>

      <!-- Popular Categories and Hot on the Web -->
      <div class="pop_hot w-full md:w-[35%] flex flex-col gap-6">
        <div>
          <div class="footer-heads ml-[-10px] text-sm">Popular Categories</div>
          <div class="grid grid-cols-2 xl:grid-cols-3 md:grid-cols-3 pt-2">
            <ul v-for="heading in categories.slice(0, 16)" :key="heading._id">
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a
                  :href="`/categories/${heading._id}?category=${heading.name}`"
                  class="capitalize"
                  >{{ heading.name }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div class="footer-heads ml-[-10px] text-sm">Hot on the Web</div>
          <div class="grid grid-cols-2 md:flex md:flex-row md:gap-5 pt-3">
            <div>
              <ul>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Aloe Vera</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Stree 2 Collection</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Vision Test</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Health Tips</a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Aloe Vera</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Stree 2 Collection</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Vision Test</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Health Tips</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Latest News, Help, and Trending Topics -->
      <div class="let_hlp_trend w-full md:w-[30%] flex flex-col gap-6">
        <div
          class="flex flex-wrap gap-5 justify-between mt-6 ml-[-10px] md:mt-0"
        >
          <!-- Latest News -->
          <div class="let w-full md:w-auto">
            <div class="footer-heads text-sm">Latest News</div>
            <ul>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Bharat Bandh</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Kolkata Doctor Case</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">NEET PG 2024 Result</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">PAK vs BAN Live</a>
              </li>
            </ul>
          </div>

          <!-- Help -->
          <div class="hlp w-full mt-4 md:mt-0 md:w-auto">
            <div class="footer-heads text-sm">Help</div>
            <ul>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">About us</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Customer Support</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Terms & Conditions</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Trending Topics -->
        <div>
          <div class="footer-heads ml-[-10px] text-sm">Trending Topics</div>
          <div class="grid grid-cols-2 gap-4 pt-3">
            <ul>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Khel Khel Mein Collection</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Kalki 2898 AD OTT Release</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Women Who Chose the Sword</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Salman Khan Diet</a>
              </li>
            </ul>
            <ul>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Vicky Kaushal Katrina Kaif Wedding</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Sania Mirza Retirement</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">Bengaluru Metro Expansion</a>
              </li>
              <li class="footer-links text-[#52525B] text-sm pt-3">
                <a class="capitalize">2024 Budget Predictions</a>
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
        <div class="font-24 mt-4">New Age News App Powered by AI</div>
        <div class="font-18 mt-2">
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
          <i class="mdi mdi-twitter text-[#52525B] text-[19px]"></i>
          <i class="mdi mdi-facebook text-[#52525B] text-[19px]"></i>
          <i class="mdi mdi-instagram text-[#52525B] text-[19px]"></i>
          <i class="mdi mdi-github text-[#52525B] text-[19px]"></i>
        </div>
      </div>
      <div class="">
        <div class="pop_hot lex flex-col gap-6">
          <div>
            <div class="footer-heads ml-[-10px] text-sm">
              Popular Categories
            </div>
            <div class="grid grid-cols-4 pt-2">
              <ul v-for="heading in categories.slice(0, 16)" :key="heading._id">
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a
                    :href="`/categories/${heading._id}?category=${heading.name}`"
                    class="capitalize"
                    >{{ heading.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Latest News, Help, and Trending Topics -->
        <div class="let_hlp_trend flex flex-col gap-6">
          <div class="flex mt-5 ml-[-10px] gap-7">
            <!-- Latest News -->
            <div class="let w-full md:w-auto">
              <div class="footer-heads text-sm">Latest News</div>
              <ul>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Bharat Bandh</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Kolkata Doctor Case</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">NEET PG 2024 Result</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">PAK vs BAN Live</a>
                </li>
              </ul>
            </div>

            <!-- Help -->
            <div class="hlp w-full md:w-auto">
              <div class="footer-heads text-sm">Help</div>
              <ul>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">About us</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Customer Support</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Terms & Conditions</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- HOT -->
          <div>
            <div class="footer-heads ml-[-10px] text-sm">Hot on the Web</div>
            <div class="grid grid-cols-2 md:flex md:flex-row md:gap-5 pt-3">
              <div>
                <ul>
                  <li class="footer-links text-[#52525B] text-sm pt-3">
                    <a class="capitalize">Aloe Vera</a>
                  </li>
                  <li class="footer-links text-[#52525B] text-sm pt-3">
                    <a class="capitalize">Stree 2 Collection</a>
                  </li>
                  <li class="footer-links text-[#52525B] text-sm pt-3">
                    <a class="capitalize">Vision Test</a>
                  </li>
                  <li class="footer-links text-[#52525B] text-sm pt-3">
                    <a class="capitalize">Health Tips</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li class="footer-links text-[#52525B] text-sm pt-3">
                    <a class="capitalize">Aloe Vera</a>
                  </li>
                  <li class="footer-links text-[#52525B] text-sm pt-3">
                    <a class="capitalize">Stree 2 Collection</a>
                  </li>
                  <li class="footer-links text-[#52525B] text-sm pt-3">
                    <a class="capitalize">Vision Test</a>
                  </li>
                  <li class="footer-links text-[#52525B] text-sm pt-3">
                    <a class="capitalize">Health Tips</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Trending Topics -->
          <div>
            <div class="footer-heads ml-[-10px] text-sm">Trending Topics</div>
            <div class="grid grid-cols-2 gap-4 pt-3">
              <ul>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Khel Khel Mein Collection</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Kalki 2898 AD OTT Release</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Women Who Chose the Sword</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Salman Khan Diet</a>
                </li>
              </ul>
              <ul>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Vicky Kaushal Katrina Kaif Wedding</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Sania Mirza Retirement</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">Bengaluru Metro Expansion</a>
                </li>
                <li class="footer-links text-[#52525B] text-sm pt-3">
                  <a class="capitalize">2024 Budget Predictions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom Section -->
    <div
      class="bg-[#fff] text-[#52525B] text-lato text-[15px] text-center py-4 px-4 md:px-6"
    >
      <div class="flex flex-col text-center md:flex-row justify-center">
        <div>© 2024, All Rights Reserved</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const categories = ref([]);

    const fetchCategories = async () => {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        const response = await axios.post(
          "https://dev-api.askus.news/category/getAllCat",
          { langauge: languageId }
        );
        categories.value = response.data.map((category) => ({
          ...category,
          name:
            category.name.toLowerCase() === "ai"
              ? category.name.toUpperCase()
              : category.name.replace(/-/g, " "),
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      categories,
    };
  },
};
</script>

<style scoped>
.tablet1 {
  display: none !important;
}
@media screen and (max-width: 950px) {
  .tablet1 {
    display: block !important;
  }
  .mob_des {
    display: none !important;
  }
}
@media screen and (max-width: 425px) {
  .tablet1 {
    display: none !important;
  }
  .mob_des {
    display: block !important;
  }
}
</style>
