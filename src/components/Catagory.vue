<template>
  <div class="ml-[20px] mr-[20px] sm:mr-[60px] sm:ml-[60px]">
    <div class="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
      <div v-for="item in navcategories3" :key="item._id" class="mt-2">
        <button
          class="chip-button"
          @click="selectCategory(item._id, item.name)"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import axios from "axios";

const languageId = ref("6421a32aa020a23deacecf92");
const navcategories3 = ref([]);
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
  } catch (error) {
    console.error(error);
  }
};

const selectCategory = (categoryId, name) => {
  emit("categorySelected", categoryId, name);
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.see-all-style {
  color: #ff0053;
  text-decoration: none;
}
.chip-button {
  background-color: #fff;
  border: 1px solid #676767;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 14px;
  color: #676767;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
  text-transform: capitalize;
}
.chip-button:hover {
  background-color: #e0e0e0;
}
.chip-button:active {
  background-color: #d0d0d0;
}
.news-section-categories {
  flex-direction: row;
  margin-top: 50px;
}
</style>
