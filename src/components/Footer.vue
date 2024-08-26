<template>
  <div>
    <div class="h-full w-full flex flex-row gap-10 bg-white mt-10 p-4">
      <div class="info w-[30%]">
        <div>
          <img
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
            height="47px"
            width="116px"
            alt
          />
        </div>
        <div class="font-24px mt-4">New Age News App Powered by AI</div>
        <div class="font-18px mt-2">
          Get trustworthy news in an easy-to-read format, our smart chatbot
          provides a personalized and interactive news experience for you.
        </div>
        <div class="flex mt-4 gap-6">
          <div>
            <img
              src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64ae7a0360c324b7e56ab783_app-store.svg"
              alt="App Store"
              width="162px"
              height="51px"
            />
          </div>
          <div>
            <img
              src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64ae7a0360c324b7e56ab784_google-play.svg"
              alt="Play Store"
              width="162px"
              height="51px"
            />
          </div>
        </div>
        <div class="flex mt-4 gap-3">
          <div>
            <i class="mdi mdi-twitter text-[#52525B] text-[19px]"></i>
          </div>
          <div>
            <i class="mdi mdi-facebook text-[#52525B] text-[19px]"></i>
          </div>
          <div>
            <i class="mdi mdi-instagram text-[#52525B] text-[19px]"></i>
          </div>
          <div>
            <i class="mdi mdi-github text-[#52525B] text-[19px]"></i>
          </div>
        </div>
      </div>
      <div class="pop_hot flex flex-col w-[35%] gap-6">
        <div>
          <div class="font-13">Popular Categories</div>
          <div class="flex flex-row gap-5">
            <div>
              <ul>
                <li
                  class="text-[#52525B] text-[14px] text-lato pt-[8px]"
                  v-for="heading in categories.slice(0, 4)"
                  :key="heading._id"
                >
                  <a
                    style="text-transform: capitalize"
                    :href="`/categories/${heading._id}?category=${heading.name}`"
                  >
                    {{ heading.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li
                  class="text-[#52525B] text-[14px] text-lato pt-[8px]"
                  v-for="heading in categories.slice(4, 8)"
                  :key="heading._id"
                >
                  <a
                    style="text-transform: capitalize"
                    :href="`/categories/${heading._id}?category=${heading.name}`"
                  >
                    {{ heading.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li
                  class="text-[#52525B] text-[14px] text-lato pt-[8px]"
                  v-for="heading in categories.slice(8, 12)"
                  :key="heading._id"
                >
                  <a
                    style="text-transform: capitalize"
                    :href="`/categories/${heading._id}?category=${heading.name}`"
                  >
                    {{ heading.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li
                  class="text-[#52525B] text-[14px] text-lato pt-[8px]"
                  v-for="heading in categories.slice(12, 16)"
                  :key="heading._id"
                >
                  <a
                    style="text-transform: capitalize"
                    :href="`/categories/${heading._id}?category=${heading.name}`"
                  >
                    {{ heading.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div class="font-13">Hot on the Web</div>
          <div class="flex flex-row gap-6">
            <div>
              <ul>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Aloe Vera</a>
                </li>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Stree 2 Collection</a>
                </li>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Vision Test</a>
                </li>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Health Tips</a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Optical illusion</a>
                </li>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Egg Benefits</a>
                </li>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Health+ Tips</a>
                </li>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Technology News</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="let_hlp_trend flex flex-col w-[30%] gap-6">
        <div class="flex flex-row gap-[6.5rem]">
          <div class="let">
            <div class="font-13">Latest News</div>
            <div class="flex flex-row gap-5">
              <div>
                <ul>
                  <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                    <a style="text-transform: capitalize">Bharat Bandh</a>
                  </li>
                  <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                    <a style="text-transform: capitalize"
                      >Kolkata Doctor Case</a
                    >
                  </li>
                  <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                    <a style="text-transform: capitalize"
                      >NEET PG 2024 Result</a
                    >
                  </li>
                  <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                    <a style="text-transform: capitalize">PAK vs BAN Live</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="hlp">
            <div class="font-13">Help</div>
            <div>
              <ul>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">About us</a>
                </li>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Customer Support</a>
                </li>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Terms & Conditions</a>
                </li>
                <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                  <a style="text-transform: capitalize">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="font-13">Trending Topics</div>
            <div>
              <div class="flex flex-row gap-6">
                <div>
                  <ul>
                    <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                      <a style="text-transform: capitalize"
                        >Khel Khel Mein Collection</a
                      >
                    </li>
                    <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                      <a style="text-transform: capitalize"
                        >Kalki 2898 AD OTT Release</a
                      >
                    </li>
                    <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                      <a style="text-transform: capitalize"
                        >Shraddha Kapoor House</a
                      >
                    </li>
                    <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                      <a style="text-transform: capitalize">Health Tips</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                      <a style="text-transform: capitalize"
                        >Krishna Janmashtami Date</a
                      >
                    </li>
                    <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                      <a style="text-transform: capitalize"
                        >Anti Hair Fall Shampoo</a
                      >
                    </li>
                    <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                      <a style="text-transform: capitalize"
                        >World's Oldest Dinosaur</a
                      >
                    </li>
                    <li class="text-[#52525B] text-[14px] text-lato pt-[8px]">
                      <a style="text-transform: capitalize">Grrr OTT Release</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copright bg-white">
      <div class="flex justify-center item-center">
        <div class="font-15">© 2024, All Rights Reserved</div>
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

<style></style>
