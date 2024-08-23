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
      <div class="flex gap-6 items-center justify-center">
        <div class="head-navs">Home</div>
        <div class="head-navs">Astrology</div>
        <div class="head-navs">Category</div>
        <div class="head-navs">Login</div>
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
      </div>
    </div>
    <div class="w-full h-[80px] mt-3 flex justify-around">
      <div v-for="category in navcategories3" :key="category._id" class="">
        <Chip
          class="bg-transparent border-1 border-[#D4D4D4] capitalize head-cat gap-5"
          :label="category.name"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineEmits, defineProps } from "vue";
import axios from "axios";

const props = defineProps({
  defaultCategoryId: {
    type: String,
    default: null,
  },
});

const languageId = ref("6421a32aa020a23deacecf92");
const navcategories3 = ref([]);
const selectedCategoryId = ref(props.defaultCategoryId); // Use default category ID from props
const emit = defineEmits(["categorySelected"]);

const fetchCategories = async () => {
  try {
    const response = await axios.post(
      "https://dev-api.askus.news/category/getAllCat",
      {
        langauge: languageId.value,
      }
    );

    navcategories3.value = response.data.slice(0, 16);
    if (!selectedCategoryId.value && navcategories3.value.length > 0) {
      // Set the first category as selected if no category is set
      selectedCategoryId.value = navcategories3.value[0]._id;
      emit(
        "categorySelected",
        selectedCategoryId.value,
        navcategories3.value[0].name
      );
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>
