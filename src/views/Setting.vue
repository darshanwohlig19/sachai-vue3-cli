<template>
  <div>
    <Navbarrr />
  </div>
  <div class="flex min-h-screen bg-gray-100 mx-2 space-x-2 mt-[75px]">
    <!-- Sidebar -->
    <div class="w-80 bg-white shadow-md rounded-lg">
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-1">Settings</h1>
        <p class="text-sm text-gray-600 mb-3">Manage your account settings</p>
        <nav>
          <ul class="space-y-2">
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              :class="{ 'border-purple-600': item.active }"
              @click="selectLanguage(item.label)"
            >
              <a
                href="#"
                class="flex items-center p-2 text-gray-700 hover:bg-purple-50"
              >
                <i :class="item.icon" class="mr-3"></i>
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <button class="w-full bg-[#1E0627] text-white py-2 rounded-md mb-3">
        Logout
      </button>
      <button class="w-full text-gray-600 hover:text-gray-900 mb-3">
        Delete Account
      </button>
      <div class="bg-[#FFFFFF] p-1 mx-2 drop-shadow-xl rounded-lg h-36">
        <div class="flex items-center space-x-2 mb-2">
          <div class="rounded-full flex items-center justify-center text-white">
            <img :src="icon" alt="Icon" class="w-10 h-10" />
          </div>
          <div>
            <h3 class="font-bold">Don't miss out.</h3>
            <p class="text-sm text-gray-600">
              Sign up for our newsletter to stay in the loop.
            </p>
          </div>
        </div>
        <div class="flex">
          <input
            v-model="email"
            type="email"
            placeholder="Email Address"
            class="flex-grow p-1 rounded-l-md border-t border-b border-l w-0"
          />
          <button
            @click="subscribe"
            class="bg-[#1E0627] text-white px-4 rounded-r-md"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-grow p-2 bg-white shadow-md rounded-lg">
      <div class="p-2">
        <h2 class="text-2xl font-bold mb-4">Select a Language</h2>
        <div class="flex space-x-4">
          <div
            v-for="(lang, index) in languages"
            :key="index"
            class="border rounded-lg p-2 pb-0 flex items-center cursor-pointer space-x-2 w-48"
            :class="{ 'border-purple-600': lang.selected }"
            @click="selectLanguage(lang.name)"
          >
            <Checkbox v-model="lang.selected" :binary="true" class="mb-2" />
            <div>
              <h3 class="font-semibold">{{ lang.name }}</h3>
              <p class="text-sm text-gray-600">{{ lang.nativeName }}</p>
            </div>
            <img :src="lang.image" :alt="lang.name" />
          </div>
        </div>

        <div class="mt-6 text-right">
          <Button label="Save" severity="primary" />
        </div>
      </div>
    </div>
  </div>
  <div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Button } from "primevue/button";
import { Checkbox } from "primevue/checkbox";
import Navbarrr from "@/components/Navbarrr.vue";
import Footer from "@/components/Footer.vue";
import Lang1 from "@/assets/svg/settinglang1.svg";
import Lang2 from "@/assets/svg/settinglang2.svg";
import Lang3 from "@/assets/svg/settinglang3.svg";
import icon from "@/assets/svg/settingicon.svg";
const email = ref("");
const menuItems = ref([
  { label: "Language", icon: "pi pi-globe", active: true },
  { label: "My Categories", icon: "pi pi-list" },
  { label: "Blocked Sources", icon: "pi pi-ban" },
  { label: "Invite Your Friends", icon: "pi pi-users" },
  { label: "Rate the App", icon: "pi pi-star" },
  { label: "Feedback", icon: "pi pi-comment" },
  { label: "Frequently Asked Questions", icon: "pi pi-question-circle" },
]);

const languages = ref([
  {
    name: "English",
    nativeName: "(English)",
    image: Lang1,
    selected: true,
  },
  {
    name: "Hindi",
    nativeName: "(हिन्दी)",
    image: Lang2,
    selected: false,
  },
  {
    name: "Gujarati",
    nativeName: "(ગુજરાતી)",
    image: Lang3,
    selected: false,
  },
]);

const selectLanguage = (langName) => {
  console.log("Selected language:", langName);
  languages.value.forEach((lang) => {
    lang.selected = lang.name === langName;
  });
};

const subscribe = () => {
  // Handle newsletter subscription
  console.log("Subscribed:", email.value);
  email.value = "";
};
</script>
