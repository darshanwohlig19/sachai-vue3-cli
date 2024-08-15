<template>
  <section>
    <div class="flex justify-between mt-10 mb-10 mx-[20px] sm:mx-[60px]">
      <div class="flex items-center w-[30%] justify-between">
        <div>
          <img
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
            alt="Sachai Logo"
            width="100px"
          />
        </div>
        <div
          class="hidden sm:block border border-solid border-black h-[20px]"
        ></div>
        <div class="hidden md:flex gap-4">
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
      </div>
      <div class="flex items-center">
        <!-- Desktop Menu -->
        <div class="hidden md:flex gap-20">
          <div><a href="/">Home</a></div>
          <div><a href="#">Astrology</a></div>
          <div><a href="/Login">Login</a></div>
        </div>
        <!-- Mobile Menu -->
        <div class="md:hidden flex items-end justify-end">
          <button @click="toggleMenu" class="hamburger-btn">&#9776;</button>
        </div>
      </div>
    </div>
    <div :class="['mobile-menu', { show: isMenuOpen }]">
      <div class="mb-5"><a href="/">Home</a></div>
      <div class="dropdown mb-5">
        <button class="dropbtn" @click="toggleDropdown">
          Category <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content" v-if="isDropdownOpen">
          <a
            v-for="heading in categories"
            :key="heading._id"
            :href="`/categories/${heading._id}?category=${heading.name}`"
            class="nav-top"
          >
            {{ heading.name }}
          </a>
        </div>
      </div>
      <div class="mb-5"><a href="#">Astrology</a></div>
      <div class="mb-5"><a href="/Login">Login</a></div>
    </div>
  </section>

  <!-- The CategoryChips component will be used here -->
</template>

<script>
import axios from "axios";

import { ref } from "vue";

export default {
  setup() {
    const isMenuOpen = ref(false);
    const isDropdownOpen = ref(false);
    const categories = ref([]);
    const activeCategoryId = ref(null);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const fetchCategories = async () => {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        const response = await axios.post(
          "https://dev-api.askus.news/category/getAllCat",
          { langauge: languageId }
        );
        categories.value = response.data;

        // Set default category as the first one
        if (categories.value.length > 0) {
          activeCategoryId.value = categories.value[0]._id;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    return {
      isMenuOpen,
      isDropdownOpen,
      categories,
      toggleMenu,
      toggleDropdown,
    };
  },
};
</script>

<style>
.hamburger-btn {
  font-size: 1.5em;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
}
.mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}
.mobile-menu.show {
  max-height: 500px;
  padding: 1em;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0.9, 0.9, 0.9, 0.4);
  z-index: 2;
}
.dropdown-content a {
  color: black;
  padding: 6px 16px;
  text-decoration: none;
  display: block;
  border-bottom: 2px solid #f1f0f0;
}
.dropdown-content a:hover {
  background-color: #f1f1f1;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.nav-top {
  text-align: center;
}
@media (max-width: 768px) {
  .dropdown-content {
    display: block;
    position: static;
    box-shadow: none;
  }
}
</style>
