<template>
  <div class="footer">
    <!-- LOGO -->
    <div class="flex flex-col md:flex-row">
      <div class="md:w-[35%] mb-6 md:mb-0">
        <img
          src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
          alt="Sachai Logo"
          width="100px"
        />
        <span class="text-lato font-bold text-[24px] text-[#1E0627] mt-5 block">
          New Age News App Powered by AI
        </span>
        <p class="text-[18px] text-lato mt-2">
          Get trustworthy news in an easy-to-read format, our smart chatbot
          provides a personalized and interactive news experience for you.
        </p>
      </div>
      <!-- Popular Categories -->
      <div class="md:w-[35%] mb-6 md:mb-0">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold block mb-2">
          Popular Categories
        </span>
        <div class="flex flex-wrap gap-[23px]">
          <div class="w-full md:w-auto">
            <ul>
              <li
                class="text-[#52525B] text-[14px] text-lato"
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
          <div class="w-full md:w-auto">
            <ul>
              <li
                class="text-[#52525B] text-[14px] text-lato"
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
          <div class="w-full md:w-auto">
            <ul>
              <li
                class="text-[#52525B] text-[14px] text-lato"
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
          <div class="w-full md:w-auto">
            <ul>
              <li
                class="text-[#52525B] text-[14px] text-lato"
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
      <!-- Latest News -->
      <div class="md:w-[15%] mb-6 md:mb-0">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold block mb-2">
          Latest News
        </span>
        <div>
          <ul>
            <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
            <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
            <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
            <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
          </ul>
        </div>
      </div>
      <!-- HELP -->
      <div class="md:w-[15%] mb-6 md:mb-0">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold block mb-2">
          Help
        </span>
        <div>
          <ul>
            <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
            <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
            <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
            <li class="text-[#52525B] text-[14px] text-lato">Bharat Bandh</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row mt-[20px]">
      <!-- DOWNLOAD -->
      <div class="md:w-[35%] mb-6 md:mb-0">
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
      <div class="md:w-[32%] mb-6 md:mb-0">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold block mb-2">
          Hot on the Web
        </span>
        <div class="flex flex-wrap gap-[23px]">
          <div class="w-full md:w-auto">
            <ul>
              <li class="text-[#52525B] text-[14px] text-lato">Aloe Vera</li>
              <li class="text-[#52525B] text-[14px] text-lato">
                Stree 2 Collection
              </li>
              <li class="text-[#52525B] text-[14px] text-lato">Vision Test</li>
              <li class="text-[#52525B] text-[14px] text-lato">Health Tips</li>
            </ul>
          </div>
          <div class="w-full md:w-auto">
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
      <div class="md:w-[32%] mb-6 md:mb-0">
        <span class="text-[#FF0053] text-[13px] text-lato font-bold block mb-2">
          Trending Topics
        </span>
        <div class="flex flex-wrap gap-[23px]">
          <div class="w-full md:w-auto">
            <ul>
              <li class="text-[#52525B] text-[14px] text-lato">Aloe Vera</li>
              <li class="text-[#52525B] text-[14px] text-lato">
                Stree 2 Collection
              </li>
              <li class="text-[#52525B] text-[14px] text-lato">Vision Test</li>
              <li class="text-[#52525B] text-[14px] text-lato">Health Tips</li>
            </ul>
          </div>
          <div class="w-full md:w-auto">
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
    <div class="copyright flex justify-center items-center mt-6">
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
        categories.value = response.data.map((category) => ({
          ...category,
          name:
            category.name.toLowerCase() === "ai"
              ? category.name.toUpperCase()
              : category.name,
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
.footer {
  position: relative;
  width: 100%;
  padding: 0 20px;
  bottom: 0;
  left: 0;
  background-color: #fff;
  margin-top: 40px;
  padding-top: 50px !important;
}

@media (min-width: 768px) {
  .footer {
    padding: 0 50px;
  }
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.md\\:w\\-[35\\%] {
  width: 35%;
}

.md\\:w\\-[15\\%] {
  width: 15%;
}

.md\\:w\\-[32\\%] {
  width: 32%;
}

.w-full {
  width: 100%;
}

.text-lato {
  font-family: "Lato", sans-serif;
}

.mt-6 {
  margin-top: 24px;
}

.mb-6 {
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .text-[14px] {
    font-size: 12px;
  }

  .text-[18px] {
    font-size: 16px;
  }

  .text-[24px] {
    font-size: 20px;
  }
}
</style>
