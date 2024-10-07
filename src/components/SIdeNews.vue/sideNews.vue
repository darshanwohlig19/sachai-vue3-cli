<template>
  <div class="flex-shrink-0 flex" @click="navigateToTrending(_id)">
    <!-- <div class="w-[100px]"> -->
    <img
      :style="{ height: height }"
      class="relative w-[78px] object-contain rounded-[8px]"
      :src="image"
      alt="Blog Image"
    />
    <!-- </div> -->
    <!-- <div
      class="relative w-[100px] h-[100px] max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <img
        class="object-cover h-full w-full filter blur-md"
        :src="image"
        alt="Background"
      />
      <div class="absolute inset-0 text-white">
        <img
          class="object-contain h-[100%] w-full"
          :src="image"
          alt="Centered Image"
        />
      </div>
    </div> -->
    <div class="font-14 p-2">
      <div class="headline-tuncate-right">
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
    height: {
      type: String,
      required: true,
      default: "57px",
    },
  },
  methods: {
    navigateToTrending(id) {
      this.$router.push(`/news/${id}`);
    },
  },
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
