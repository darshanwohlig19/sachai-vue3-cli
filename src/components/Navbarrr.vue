<template>
  <div>
    <div
      class="w-[100%] h-[67px] bg-white rounded-b-[20px] shadow-[0px_4px_6px_rgba(240,0,0,0.2)] flex justify-between items-center pl-4 pr-4"
    >
      <div>
        <img
          class="h-[20px] w-[78px] object-cover"
          src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
        />
      </div>
      <div class="flex gap-4 items-center justify-center">
        <div class="hidden lg:flex head-navs">
          <!-- <a href="/">Home</a> -->
          <RouterLink class="nav-items" active-class="active-link" to="/"
            >Home</RouterLink
          >
        </div>
        <div class="hidden lg:flex head-navs">
          <RouterLink
            class="nav-items"
            active-class="active-link"
            to="/Astrology"
            >Astrology</RouterLink
          >
          <!-- Astrology -->
        </div>
        <div class="hidden lg:flex head-navs">
          <RouterLink
            class="nav-items"
            active-class="active-link"
            to="/Category"
            >Category</RouterLink
          >
        </div>
        <div class="hidden lg:flex head-navs">
          <RouterLink
            class="nav-items"
            active-class="active-link"
            to="/Bookmark"
            >Bookmark</RouterLink
          >
        </div>

        <div class="hidden lg:flex head-navs">
          <a href="#" class="nav-items" @click="handleAuthAction">
            {{ isLoggedIn ? "Logout" : "Login" }}
          </a>
        </div>

        <div class="relative">
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Search"
            class="pr-10 pl-3 py-2 rounded-[100px] text-[14px] w-full border-1"
          />
          <svg
            width="14"
            height="14"
            viewBox="0 0 15 15"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2352_4463)">
              <path
                d="M14.8577 14.1839L10.9849 10.3731C11.9991 9.27122 12.6222 7.81401 12.6222 6.21051C12.6217 2.78032 9.79636 0 6.31085 0C2.82535 0 0 2.78032 0 6.21051C0 9.6407 2.82535 12.421 6.31085 12.421C7.81683 12.421 9.19808 11.9001 10.283 11.0341L14.1708 14.86C14.3603 15.0466 14.6678 15.0466 14.8572 14.86C15.0471 14.6734 15.0471 14.3705 14.8577 14.1839ZM6.31085 11.4655C3.36173 11.4655 0.971014 9.11277 0.971014 6.21051C0.971014 3.30825 3.36173 0.955524 6.31085 0.955524C9.26 0.955524 11.6507 3.30825 11.6507 6.21051C11.6507 9.11277 9.26 11.4655 6.31085 11.4655Z"
                fill="#ACACAC"
              />
            </g>
            <defs>
              <clipPath id="clip0_2352_4463">
                <rect width="15" height="15" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div
          class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
        >
          <i>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.75095 1.2776e-06C7.95675 1.2776e-06 8.14085 0.128101 8.21015 0.319901L8.70435 1.6898C8.88145 1.7339 9.03335 1.778 9.16215 1.8242C9.30285 1.8746 9.48415 1.9509 9.70815 2.0552L10.8589 1.4462C10.9529 1.39644 11.0604 1.37847 11.1654 1.39501C11.2704 1.41154 11.3673 1.46168 11.4414 1.5379L12.4535 2.5844C12.5879 2.7237 12.6258 2.9274 12.5501 3.1052L12.0105 4.3701C12.1 4.5346 12.1715 4.6753 12.2261 4.7929C12.2849 4.921 12.3577 5.0974 12.4445 5.3249L13.7023 5.8639C13.8913 5.9444 14.0083 6.1334 13.9957 6.3357L13.9033 7.7882C13.8969 7.88256 13.8631 7.973 13.8058 8.04828C13.7486 8.12356 13.6705 8.18039 13.5813 8.2117L12.3898 8.6352C12.3555 8.7997 12.3199 8.9404 12.2821 9.0594C12.2211 9.24318 12.1515 9.42398 12.0735 9.6012L12.672 10.9242C12.7142 11.0172 12.7256 11.1212 12.7044 11.2211C12.6832 11.321 12.6307 11.4115 12.5544 11.4793L11.4162 12.4957C11.3412 12.5624 11.2477 12.6045 11.1481 12.6165C11.0485 12.6285 10.9476 12.6098 10.8589 12.5629L9.68575 11.9413C9.5022 12.0385 9.31284 12.1243 9.11875 12.1982L8.60635 12.39L8.15135 13.65C8.11763 13.7423 8.05681 13.8222 7.97686 13.8793C7.89691 13.9364 7.80157 13.968 7.70335 13.9699L6.37335 14C6.27252 14.0026 6.17336 13.974 6.08949 13.9179C6.00563 13.8619 5.94119 13.7813 5.90505 13.6871L5.36885 12.2682C5.1859 12.2057 5.00476 12.138 4.82565 12.0652C4.67915 12.0018 4.53487 11.9334 4.39305 11.8601L3.06305 12.4285C2.97542 12.4659 2.8788 12.477 2.78497 12.4605C2.69114 12.4439 2.60413 12.4005 2.53455 12.3354L1.55035 11.4121C1.47708 11.3437 1.42717 11.2539 1.4077 11.1556C1.38823 11.0572 1.40018 10.9552 1.44185 10.864L2.01375 9.618C1.93769 9.47042 1.86718 9.32005 1.80235 9.1672C1.72668 8.98011 1.65665 8.79079 1.59235 8.5995L0.339351 8.218C0.237501 8.18722 0.148667 8.12366 0.0866438 8.03721C0.0246206 7.95076 -0.00712016 7.84624 -0.00364902 7.7399L0.045351 6.3952C0.0488388 6.30746 0.0762466 6.22235 0.124611 6.14906C0.172974 6.07578 0.240454 6.01711 0.319751 5.9794L1.63435 5.348C1.69525 5.1247 1.74845 4.9511 1.79535 4.8244C1.86139 4.65517 1.93472 4.48888 2.01515 4.326L1.44535 3.122C1.40211 3.03057 1.38898 2.92778 1.40784 2.82841C1.42671 2.72904 1.47661 2.63822 1.55035 2.569L2.53315 1.6408C2.60205 1.57582 2.68825 1.53214 2.78139 1.515C2.87453 1.49786 2.97064 1.508 3.05815 1.5442L4.38675 2.093C4.53375 1.995 4.66675 1.9159 4.78715 1.8522C4.93065 1.7759 5.12245 1.6961 5.36395 1.61L5.82595 0.321301C5.86011 0.226989 5.92254 0.145518 6.00473 0.088013C6.08691 0.0305079 6.18484 -0.000228376 6.28515 1.2776e-06H7.75095ZM7.01315 4.9133C5.84625 4.9133 4.90055 5.8478 4.90055 7.0014C4.90055 8.155 5.84625 9.0902 7.01315 9.0902C8.17935 9.0902 9.12505 8.155 9.12505 7.0014C9.12505 5.8478 8.18005 4.9133 7.01315 4.9133Z"
                fill="#A5A5A5"
              />
            </svg>
          </i>
        </div>
        <div
          class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
        >
          <i>
            <svg
              width="14"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.7918 13.9994C1.59961 13.9994 0.631641 13.0342 0.628906 11.842C0.628906 11.5111 0.705469 11.183 0.850391 10.8849C2.48281 7.59002 6.475 6.24471 9.76719 7.8744C11.0742 8.51971 12.1297 9.57791 12.7777 10.8849C13.3055 11.9541 12.8652 13.2502 11.7961 13.7779C11.498 13.9256 11.1699 14.0021 10.8391 13.9994H2.7918Z"
                fill="#A5A5A5"
              />
              <path
                d="M10.8427 13.8353C12.322 13.8353 13.2927 12.2822 12.6364 10.9561C11.045 7.74316 7.15126 6.43066 3.9411 8.02207C2.66689 8.65371 1.63603 9.68457 1.00712 10.9561C0.348135 12.2822 1.31884 13.8353 2.79814 13.8353H10.8427Z"
                fill="#A5A5A5"
              />
              <path
                d="M6.81875 6.33232C8.56751 6.33232 9.98516 4.91468 9.98516 3.16592C9.98516 1.41716 8.56751 -0.000488281 6.81875 -0.000488281C5.06999 -0.000488281 3.65234 1.41716 3.65234 3.16592C3.65234 4.91468 5.06999 6.33232 6.81875 6.33232Z"
                fill="#A5A5A5"
              />
              <path
                d="M6.81484 6.16826C8.47299 6.16826 9.81719 4.82407 9.81719 3.16592C9.81719 1.50777 8.47299 0.163574 6.81484 0.163574C5.1567 0.163574 3.8125 1.50777 3.8125 3.16592C3.8125 4.82407 5.1567 6.16826 6.81484 6.16826Z"
                fill="#A5A5A5"
              />
            </svg>
          </i>
        </div>
        <div
          class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md lg:hidden"
          @click="toggleCardDropdown"
        >
          <i class="pi pi-bars"></i>
        </div>
      </div>
    </div>
    <div
      v-if="isCardDropdownOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
    >
      <div class="py-1">
        <RouterLink
          to="/"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 nav-items"
          active-class="active-link"
          >Home</RouterLink
        >
        <RouterLink
          to="/Astrology"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 nav-items"
          active-class="active-link"
          >Astrology</RouterLink
        >
        <RouterLink
          to="/Category"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 nav-items"
          active-class="active-link"
          >Category</RouterLink
        >
        <RouterLink
          to="/Bookmark"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 nav-items"
          active-class="active-link"
          >Bookmark</RouterLink
        >
        <a
          @click="handleLogout"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer nav-items"
          >Logout</a
        >
      </div>
    </div>
    <div
      class="w-full h-[67px] mt-1 flex justify-between bg-white items-center relative lg:overflow-x-hidden"
    >
      <!-- Icons for mobile and tablet screens -->
      <i
        class="pi pi-angle-left ml-2 cursor-pointer block md:hidden"
        @click="scrollLeft"
      ></i>
      <div
        class="flex items-center space-x-3 px-2 flex-1 overflow-x-auto lg:overflow-x-hidden whitespace-nowrap"
        ref="categoriesContainer"
      >
        <div
          v-for="heading in categories"
          :key="heading._id"
          class="flex-shrink-0"
        >
          <a
            :href="`/categories/${heading._id}?category=${heading.name}`"
            class="no-underline"
          >
            <Chip
              class="bg-transparent border-1 border-[#D4D4D4] capitalize head-cat"
              :label="heading.name"
            />
          </a>
        </div>
      </div>

      <i
        class="pi pi-angle-right mr-2 cursor-pointer block md:hidden"
        @click="scrollRight"
      ></i>
    </div>

    <!-- Popup Confirmation -->
    <div
      v-if="isPopupVisible"
      class="fixed inset-0 flex items-center justify-center pop-up-confirm bg-opacity-50 z-50"
      @click="handleBackgroundClick"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg" @click.stop>
        <h3 class="text-lg font-bold">Confirm Logout</h3>
        <p class="mt-2">Are you sure you want to log out?</p>
        <div class="flex justify-center mt-4">
          <button
            @click="handleLogout"
            class="bg-[#e44949] text-white px-4 py-2 rounded mr-2"
          >
            Logout
          </button>
          <button
            @click="hidePopup"
            class="bg-[#1E0627] text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";

export default {
  components: {},
  setup() {
    const isMenuOpen = ref(false);
    const isDropdownOpen = ref(false);
    const categories = ref([]);
    const isLoggedIn = ref(!!localStorage.getItem("apiDataToken"));
    const showBookmarkLink = ref(true);
    const isPopupVisible = ref(false);
    const router = useRouter();
    const toast = useToast();
    const categoriesContainer = ref(null);
    const isCardDropdownOpen = ref(false);

    const toggleCardDropdown = () => {
      isCardDropdownOpen.value = !isCardDropdownOpen.value;
      console.log("Dropdown is now:", isCardDropdownOpen.value);
    };
    const scrollLeft = () => {
      if (categoriesContainer.value) {
        categoriesContainer.value.scrollBy({
          left: -100, // Adjust the scroll distance as needed
          behavior: "smooth",
        });
      }
    };

    const scrollRight = () => {
      if (categoriesContainer.value) {
        categoriesContainer.value.scrollBy({
          left: 100, // Adjust the scroll distance as needed
          behavior: "smooth",
        });
      }
    };
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const handleBackgroundClick = () => {
      hidePopup(); // Hide the popup when clicking on the background
    };

    const handleAuthAction = async () => {
      if (isLoggedIn.value) {
        showPopup(); // Show popup for confirmation
      } else {
        router.push("/Login"); // Redirect to login page
      }
    };

    const showPopup = () => {
      isPopupVisible.value = true;
    };

    const hidePopup = () => {
      isPopupVisible.value = false;
    };

    const handleLogout = async () => {
      try {
        // Sign out from Firebase
        const auth = getAuth();
        await signOut(auth);

        // Call logout API
        const apiDataToken = localStorage.getItem("apiDataToken");
        if (apiDataToken) {
          const response = await axios.post(
            "https://api-uat.newsshield.io/user/logoutEvent",
            {},
            {
              headers: { Authorization: `${apiDataToken}` },
            }
          );

          if (response.status === 200) {
            localStorage.removeItem("apiDataToken");
            localStorage.setItem("logoutSuccess", "true");
            isLoggedIn.value = false;
            router.push("/");

            // Show success toaster notification
            toast.add({
              severity: "success",
              summary: "Logout Successful",
              detail: "You have been logged out successfully.",
            });
          } else {
            throw new Error("Failed to logout, unexpected response status");
          }
        }
      } catch (error) {
        console.error("Error during logout:", error);
        toast.add({
          severity: "error",
          summary: "Logout Error",
          detail: "Failed to log out",
        });
      } finally {
        hidePopup();
      }
    };

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
      isMenuOpen,
      isDropdownOpen,
      categories,
      isLoggedIn,
      showBookmarkLink,
      isPopupVisible,
      toggleMenu,
      toggleDropdown,
      handleAuthAction,
      handleBackgroundClick,
      hidePopup,
      handleLogout,
      scrollRight,
      scrollLeft,
      categoriesContainer,
      isCardDropdownOpen,
      toggleCardDropdown,
    };
  },
};
</script>
<style scoped>
.nav-items.active-link {
  color: #ff0053; /* Color for active navigation item */
}

.nav-items:active {
  color: #ff0053; /* Color for active state */
}
.card-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
}
.chip-button {
  background-color: #fff;
  border: 1px solid #d4d4d4;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  color: #676767;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, color 0.3s;
  text-transform: capitalize;
}
</style>
