<template>
  <div class="text-[45px] font-bold font-lato mt-4 mx-[20px] sm:mx-[60px]">
    Categories
  </div>
  <div
    class="flex flex-wrap justify-center sm:justify-start gap-2 mt-4 mx-[20px] sm:mx-[60px]"
  >
    <div v-for="item in categories" :key="item._id" class="mt-2">
      <button class="chip-button" @click="selectCategory(item._id)">
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    activeCategoryId: String,
  },
  setup(props, { emit }) {
    const selectCategory = (categoryId) => {
      emit("category-selected", categoryId);
    };

    const isActiveCategory = (categoryId) =>
      categoryId === props.activeCategoryId;

    return {
      selectCategory,
      isActiveCategory,
    };
  },
};
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
  background-color: #e1e1e1;
}
.chip-button:active {
  background-color: #d1d1d1;
}
.chip-button.active {
  color: #ff0000; /* Red color for active category */
  border-color: #ff0000; /* Optional: Red border for active category */
}
</style>
