<template>
  <div class="relative drop-shadow-lg" @click="navigateToCategory(blog._id)">
    <div>
      <div
        class="relative sm:h-[220px] h-[180px] max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div class="relative w-full h-[100%]">
          <img
            class="absolute inset-0 object-cover h-full w-full filter blur-sm"
            :src="blog?.imgixUrlHighRes || fallbackImage"
            alt="Background"
            @click="navigateToCampingNews(blog._id)"
          />
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
          ></div>
        </div>
        <div class="absolute inset-0 flex flex-col justify-between text-white">
          <img
            class="object-contain h-full w-full"
            :src="blog?.imgixUrlHighRes || fallbackImage"
            alt="Centered Image"
            @click="navigateToCampingNews(blog._id)"
          />
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10 rounded-[10px]"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-[8px]"
    ></div>
    <div class="absolute bottom-0 p-3 w-full md:w-[405px]">
      <div class="headine-home text-white">
        {{ blog?.headline }}
      </div>
      <div
        v-if="source || publishTime"
        class="flex gap-2 text-white time-date-home text-[10px] md:text-[12px] mt-1"
      >
        <div v-if="source">{{ source }}</div>
        <div v-if="source && publishTime">|</div>
        <div v-if="publishTime">{{ formatPublishTime(publishTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    blog: {
      type: Object,
      required: true,
    },
    source: {
      type: String,
      default: null,
    },
    publishTime: {
      type: String,
      default: null,
    },
    fallbackImage: {
      type: String,
      default: "path/to/default/image.jpg", // Provide a default image path
    },
  },
  methods: {
    navigateToCategory() {
      this.$emit("navigate", this.newsId);
    },
    formatPublishTime(time) {
      // Implement your time formatting logic here
      return time; // Modify this to return the formatted time
    },
  },
};
</script>

<style scoped>
/* Add any styles specific to the BlogCard component here */
</style>
