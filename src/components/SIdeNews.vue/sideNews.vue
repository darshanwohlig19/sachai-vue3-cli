<template>
  <div class="flex-shrink-0 flex gap-[15px]">
    <!-- <div class="w-[100px]"> -->
    <img
      class="w-[58px] object-contain rounded-[8px]"
      height="56px"
      width="58px"
      :src="image"
      alt="Blog Image"
    />
    <div class="">
      <div class="headline-tuncate-right flex items-center headine-home">
        {{ headline || "No Headline" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
      default: "fallbackImageUrl", // Add your fallback image URL here
    },
    headline: {
      type: String,
      required: true,
      default: "No Headline",
    },
  },
  methods: {},
};
</script>

<style>
/* Add your styles here if needed */
.headline-tuncate-right {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
