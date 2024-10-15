<template>
  <div
    class="line-clamp-3 headine-home w-[100%] cursor-pointer"
    @click="handleClick"
  >
    {{ headline }}
  </div>
</template>

<script>
export default {
  props: {
    headline: {
      type: String,
      required: true,
    },
    newsId: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit("navigate", this.newsId);
    },
  },
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
