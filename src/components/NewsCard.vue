<template>
  <div
    @click="navigateToTrending(item._id)"
    class="flex gap-3 mt-0 between-md-sm:mt-2 cursor-pointer"
  >
    <img
      class="image-small !h-[10px] !w-[10px]"
      src="../assets/png/Group.png"
      alt="news image"
    />
    <div>
      <div :class="[' headine-home', headlineClass]">
        {{ item.headline }}
      </div>
      <div :class="['summary-home text-gray-5', summaryClass]">
        {{ item.summary }}
      </div>
      <hr v-if="showDivider" class="mt-3 border-t border-gray-300" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
    showDivider: {
      type: Boolean,
      default: false,
    },
    summaryClass: {
      type: String,
      default: "line-clamp-1",
    },
    headlineClass: {
      type: String,
      default: "line-clamp-2",
    },
  },
  methods: {
    navigateToTrending(id) {
      this.$emit("navigate", id); // Emit event for parent to handle navigation
    },
  },
};
</script>

<style scoped>
/* Add any necessary styling specific to this component */
.image-small {
  height: 10px;
  width: 10px;
  margin-top: 6px;
  object-fit: contain; /* Ensures the image fits within the specified dimensions */
}
</style>
