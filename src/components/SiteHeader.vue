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
          <div>
            <a href="/">Home</a>
          </div>
          <div>
            <a href="/Astrology">Astrology</a>
          </div>

          <div v-if="showBookmarkLink" class="mb-5">
            <a href="/Bookmark">Bookmark</a>
            <div></div>
          </div>
        </div>
        <!-- Mobile Menu -->
        <div class="md:hidden flex items-end justify-end">
          <button @click="toggleMenu" class="hamburger-btn">&#9776;</button>
        </div>
      </div>
    </div>
    <div :class="['mobile-menu', { show: isMenuOpen }]">
      <div class="mb-5">
        <a href="/">Home</a>
      </div>
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
            >{{ heading.name }}</a
          >
        </div>
      </div>
      <div class="mb-5">
        <a href="Astrology">Astrology</a>
      </div>
      <div class="mb-5">
        <a
          :href="hasLocalStorageData ? '/Logout' : '/Login'"
          @click="clearApiDataToken"
          >{{ hasLocalStorageData ? "Logout" : "Login" }}</a
        >
      </div>
      <div v-if="showBookmarkLink" class="mb-5">
        <a href="/Bookmark">Bookmark</a>
        <div></div>
      </div>
    </div>

    <!-- Confirmation Popup -->
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
  </section>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { ref, onMounted, computed } from "vue";
import { useToast } from "primevue/usetoast";

export default {
  setup() {
    const isMenuOpen = ref(false);
    const isDropdownOpen = ref(false);
    const categories = ref([]);
    const activeCategoryId = ref(null);
    const showBookmarkLink = ref(false);
    const isPopupVisible = ref(false);
    const router = useRouter();
    const toast = useToast();

    const handleBackgroundClick = () => {
      hidePopup(); // Hide the popup when clicking on the background
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const clearApiDataToken = () => {
      localStorage.removeItem("apiDataToken");
      router.push("/");
    };

    const handleLogout = async () => {
      hidePopup(); // Hide the popup before logging out
      const auth = getAuth();
      try {
        if (hasLocalStorageData.value) {
          await signOut(auth);

          const apiDataToken = localStorage.getItem("apiDataToken");
          if (apiDataToken) {
            const response = await axios.post(
              "https://api-uat.newsshield.io/user/logoutEvent",
              {},
              {
                headers: {
                  Authorization: `${apiDataToken}`,
                },
              }
            );

            if (response.status === 200) {
              localStorage.removeItem("apiDataToken");
              localStorage.setItem("logoutSuccess", "true");
              location.reload();
            } else {
              console.error("Failed to log out from the external API.");
              toast.add({
                severity: "error",
                summary: "Logout Failed",
                detail: "There was an issue logging out. Please try again.",
                life: 3000,
              });
            }
          }
        } else {
          router.push("/Login");
        }
      } catch (error) {
        console.error("An error occurred during sign-out or API call:", error);
      }
    };

    const showPopup = () => {
      isPopupVisible.value = true;
    };

    const hidePopup = () => {
      isPopupVisible.value = false;
      toast.add({
        severity: "error",
        summary: "Logout Failed",
        detail: "There was an issue logging out. Please try again.",
        life: 3000,
      });
    };

    const onAuthAction = () => {
      if (hasLocalStorageData.value) {
        showPopup(); // Show popup if logging out
      } else {
        router.push("/Login"); // Redirect to login if not logged in
      }
    };

    const fetchCategories = async () => {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        const response = await axios.post(
          "https://api-uat.newsshield.io/category/getAllCat",
          { langauge: languageId }
        );
        categories.value = response.data;

        if (categories.value.length > 0) {
          activeCategoryId.value = categories.value[0]._id;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const hasLocalStorageData = computed(() => {
      return !!localStorage.getItem("apiDataToken");
    });

    fetchCategories();
    onMounted(() => {
      const storedData = localStorage.getItem("apiDataToken");
      showBookmarkLink.value = !!storedData;
      const logoutSuccess = localStorage.getItem("logoutSuccess");
      if (logoutSuccess) {
        toast.add({
          severity: "success",
          summary: "Logout Successful",
          detail: "You have been logged out successfully.",
          life: 3000,
        });
        localStorage.removeItem("logoutSuccess");
      }
      fetchCategories();
    });

    return {
      isMenuOpen,
      isDropdownOpen,
      categories,
      toggleMenu,
      showBookmarkLink,
      toggleDropdown,
      hasLocalStorageData,
      clearApiDataToken,
      showPopup,
      isPopupVisible,
      handleLogout,
      hidePopup,
      onAuthAction,
      handleBackgroundClick,
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
.pop-up-confirm {
  background-color: #000000b2;
}
@media (max-width: 768px) {
  .dropdown-content {
    display: block;
    position: static;
    box-shadow: none;
  }
}
.fixed {
  position: fixed;
}
.bg-gray-900 {
  background-color: #1a202c;
}
.bg-opacity-50 {
  background-opacity: 0.5;
}
.bg-white {
  background-color: #ffffff;
}
.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
