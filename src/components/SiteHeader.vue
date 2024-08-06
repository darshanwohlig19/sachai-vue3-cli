<template>

  <section>
    <div
      class="flex justify-between mt-10 mb-10 mr-[10px] ml-[10px] sm:mr-[60px] sm:ml-[60px]"
    >
      <div class="flex justify-between w-[30%] items-center">
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
        <div class="hidden justify-between gap-4 md:flex">
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
              src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64ae7a0360c324b7e56ab783_app-store.svg"
              alt="App Store"
              width="100px"
              height="100px"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <!-- Desktop Menu -->
        <div class="hidden md:flex gap-20">
          <div><a href="/">Home</a></div>
          <div class="dropdown">
            <button class="dropbtn" @click="toggleDropdown">
              Category
              <i class="fa fa-caret-down"></i>
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
          <div><a href="">Astrology</a></div>
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
          Category
          <i class="fa fa-caret-down"></i>
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
      <div class="mb-5"><a href="">Astrology</a></div>
      <div class="mb-5"><a href="/Login">Login</a></div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    async fetchCategories() {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        const response = await axios.post(
          "https://dev-api.askus.news/category/getAllCat",
          { langauge: languageId }
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
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

  <div>
    <Carousel class="h-363" :value="cars" :numVisible="1" :numScroll="1">
      <template v-slot:item="slotProps">
        <div class="car-item">
          <img :src="slotProps.data.image" :alt="slotProps.data.brand" />
          <div class="car-detail">
            <div class="car-name">{{ slotProps.data.brand }}</div>
            <div class="car-year">{{ slotProps.data.year }}</div>
            <div class="car-color">{{ slotProps.data.color }}</div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cars: [
        {
          brand: "Audi",
          year: 2019,
          color: "Black",
          image:
            "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
      ],
    };
  },
};
</script>

<style scoped>
.car-item {
  text-align: center;
  padding: 2em;
}
.car-item img {
  width: 100%;
  display: block;
}
.car-detail {
  margin-top: 1em;
}
.car-name {
  font-size: 1.5em;
  font-weight: bold;
}
.car-year,
.car-color {
  font-size: 1.2em;
  margin-top: 0.5em;
}
</style>
