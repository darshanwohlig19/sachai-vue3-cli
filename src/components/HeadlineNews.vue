<template>
  <div class="flex items-center gap-3">
    <div class="w-[15px]">
      <img src="../assets/png/Group.png" alt="" />
    </div>
    <div
      :class="['headine-home cursor-pointer', headlineStyle]"
      @click="navigateToNews"
    >
      {{ headline || "No Headline" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadlineImage",
  props: {
    headline: {
      type: String,
      default: "No Headline",
    },
    newsId: {
      type: [String, Number],
      required: true,
    },
    headlineStyle: {
      type: String,
      default: "line-clamp-2",
    },
  },
  methods: {
    navigateToNews() {
      this.$emit("navigate", this.newsId);
    },
  },
};
</script>

<style scoped>
.headline-container {
  display: flex;
  align-items: center;
}
.headline-home {
  margin-left: 10px;
  font-size: 16px;
}
</style>
