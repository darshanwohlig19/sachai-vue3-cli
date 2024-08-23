<template>
  <div class="footer">
    <!-- LOGO -->
    <div class="flex">
      <div class="w-[35%]">
        <img
          src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
          alt="Sachai Logo"
          width="100px"
        />
        <span class="text-lato font-bold text-[24px] text-[#1E0627] mt-5"
          >New Age News App Powered by AI</span
        >
        <p class="w-[402px] text-[18px] text-lato mt-2">
          Get trustworthy news in an easy-to-read format, our smart chatbot
          provides a personalized and interactive news experience for you.
        </p>
      </div>
      <!-- Popular Categories -->
      <div class="w-[35%]">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold"
          >Popular Categories</span
        >
        <div class="flex gap-[23px]">
          <div class>
            <ul>
              <li
                class="text-[#52525B] text-[14px] text-lato"
                v-for="heading in categories.slice(0, 4)"
                :key="heading._id"
              >
                <a
                  :href="`/categories/${heading._id}?category=${heading.name}`"
                  >{{ heading.name }}</a
                >
              </li>
            </ul>
          </div>
          <div class>
            <ul>
              <li
                class="text-[#52525B] text-[14px] text-lato"
                v-for="heading in categories.slice(5, 8)"
                :key="heading._id"
              >
                <a
                  :href="`/categories/${heading._id}?category=${heading.name}`"
                  >{{ heading.name }}</a
                >
              </li>
            </ul>
          </div>
          <div class>
            <ul>
              <li
                class="text-[#52525B] text-[14px] text-lato"
                v-for="heading in categories.slice(8, 11)"
                :key="heading._id"
              >
                <a
                  :href="`/categories/${heading._id}?category=${heading.name}`"
                  >{{ heading.name }}</a
                >
              </li>
            </ul>
          </div>
          <div class>
            <ul>
              <li
                class="text-[#52525B] text-[14px] text-lato"
                v-for="heading in categories.slice(11, 16)"
                :key="heading._id"
              >
                <a
                  :href="`/categories/${heading._id}?category=${heading.name}`"
                  >{{ heading.name }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Latest News -->
      <div class="w-[15%]">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold"
          >Latest News</span
        >
        <div>
          <div class>
            <ul>
              <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
              <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
              <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
              <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- HELP -->
      <div class="w-[15%]">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold">Help</span>
        <div>
          <div class>
            <ul>
              <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
              <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
              <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
              <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-[20px]">
      <!-- DOWNLOAD -->
      <div class="w-[35%]">
        <div class="flex gap-[23px]">
          <div>
            <img
              src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64ae7a0360c324b7e56ab783_app-store.svg"
              alt="App Store"
              width="100px"
              height="100px"
            />
          </div>
          <div>
            <img
              src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64ae7a0360c324b7e56ab784_google-play.svg"
              alt="Play Store"
              width="100px"
              height="100px"
            />
          </div>
        </div>
        <div class="flex gap-[20px] mt-[20px]">
          <i class="mdi mdi-twitter text-[#52525B] text-[19px]"></i>
          <i class="mdi mdi-facebook text-[#52525B] text-[19px]"></i>
          <i class="mdi mdi-instagram text-[#52525B] text-[19px]"></i>
          <i class="mdi mdi-github text-[#52525B] text-[19px]"></i>
        </div>
      </div>
      <!-- Hot on the Web -->
      <div class="w-[32%]">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold"
          >Hot on the Web</span
        >
        <div class="flex gap-[23px]">
          <div class>
            <ul>
              <li class="text-[#52525B] text-[14px] text-lato">Aloe Vera</li>
              <li class="text-[#52525B] text-[14px] text-lato">
                Stree 2 Collection
              </li>
              <li class="text-[#52525B] text-[14px] text-lato">Vision Test</li>
              <li class="text-[#52525B] text-[14px] text-lato">Health Tips</li>
            </ul>
          </div>
          <div class>
            <ul>
              <li class="text-[#52525B] text-[14px] text-lato">
                Optical illusion
              </li>
              <li class="text-[#52525B] text-[14px] text-lato">Egg Benefits</li>
              <li class="text-[#52525B] text-[14px] text-lato">Health+ Tips</li>
              <li class="text-[#52525B] text-[14px] text-lato">
                Technology News
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Trending Topics -->
      <div class="w-[32%]">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold"
          >Trending Topics</span
        >
        <div class="flex gap-[23px]">
          <div class>
            <ul>
              <li class="text-[#52525B] text-[14px] text-lato">Aloe Vera</li>
              <li class="text-[#52525B] text-[14px] text-lato">
                Stree 2 Collection
              </li>
              <li class="text-[#52525B] text-[14px] text-lato">Vision Test</li>
              <li class="text-[#52525B] text-[14px] text-lato">Health Tips</li>
            </ul>
          </div>
          <div class>
            <ul>
              <li class="text-[#52525B] text-[14px] text-lato">
                Optical illusion
              </li>
              <li class="text-[#52525B] text-[14px] text-lato">Egg Benefits</li>
              <li class="text-[#52525B] text-[14px] text-lato">Health+ Tips</li>
              <li class="text-[#52525B] text-[14px] text-lato">
                Technology News
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright flex justify-center items-center">
      <span class="text-[#52525B] text-[15px]"
        >© 2024, All Rights Reserved</span
      >
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
        categories.value = response.data;
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

<style>
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.copyright {
  margin-top: 40px;
}
</style>
