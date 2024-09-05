<template>
  <div>
    <Navbarrr />
  </div>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-md">
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Settings</h1>
        <p class="text-sm text-gray-600 mb-6">Manage your account settings</p>
        <nav>
          <ul class="space-y-2">
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              :class="{
                'border-l-4 border-purple-600 bg-purple-50': item.active,
              }"
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
      <div class="p-6 border-t">
        <Button label="Logout" severity="secondary" class="w-full mb-4" />
        <a href="#" class="text-sm text-gray-600 hover:underline"
          >Delete Account</a
        >
      </div>
      <div class="p-6 border-t">
        <h2 class="text-lg font-semibold mb-2">Don't miss out.</h2>
        <p class="text-sm text-gray-600 mb-4">
          Sign up for our newsletter to stay in the loop.
        </p>
        <div class="flex">
          <InputText placeholder="EMAIL ADDRESS" class="flex-grow mr-2" />
          <Button label="SUBSCRIBE" severity="secondary" />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-grow p-8">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-6">Select a Language</h2>
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="(lang, index) in languages"
            :key="index"
            class="border rounded-lg p-4 flex items-center cursor-pointer"
            :class="{ 'border-purple-600': lang.selected }"
          >
            <img :src="lang.image" :alt="lang.name" class="w-12 h-12 mr-4" />
            <div>
              <h3 class="font-semibold">{{ lang.name }}</h3>
              <p class="text-sm text-gray-600">{{ lang.nativeName }}</p>
            </div>
            <Checkbox v-model="lang.selected" :binary="true" class="ml-auto" />
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
import { InputText } from "primevue/inputtext";
import { Checkbox } from "primevue/checkbox";
import Navbarrr from "@/components/Navbarrr.vue";
import Footer from "@/components/Footer.vue";

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
    nativeName: "English",
    image: "/placeholder.svg?height=48&width=48",
    selected: true,
  },
  {
    name: "Hindi",
    nativeName: "हिन्दी",
    image: "/placeholder.svg?height=48&width=48",
    selected: false,
  },
  {
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    image: "/placeholder.svg?height=48&width=48",
    selected: false,
  },
]);
</script>

<style>
@import "primevue/resources/themes/saga-blue/theme.css";
@import "primevue/resources/primevue.min.css";
@import "primeicons/primeicons.css";
</style>
