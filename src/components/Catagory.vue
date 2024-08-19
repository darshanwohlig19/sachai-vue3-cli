<template>
  <div class="ml-[20px] mr-[20px] sm:mr-[60px] sm:ml-[60px]">
    <div class="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
      <div v-for="item in navcategories3" :key="item._id" class="mt-2">
        <button
          class="chip-button"
          :class="{ active: selectedCategoryId === item._id }"
          @click="selectCategory(item._id, item.name)"
        >
          {{ item.name }}
        </button>
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

const selectCategory = (categoryId, name) => {
  selectedCategoryId.value = categoryId; // Set the selected category
  emit("categorySelected", categoryId, name);
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.chip-button {
  background-color: #f1f1f1;
  border: 1px solid #676767;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  color: #676767;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, color 0.3s;
  text-transform: capitalize;
}
.chip-button:hover {
  background-color: #f1f1f1;
}
.chip-button:active {
  background-color: #f1f1f1;
}
.chip-button.active {
  color: #ff0000; /* Red color for active category */
  border-color: #ff0000; /* Optional: Red border for active category */
}
.news-section-categories {
  flex-direction: row;
  margin-top: 50px;
}
</style>
