<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <SiteHeader />
    <Trending />

    <Latest />
    <BrowseByTopics />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import Latest from "@/components/Latest.vue";
import Trending from "@/components/Trending.vue";
import BrowseByTopics from "@/components/BrowseByTopics.vue";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
    SiteHeader,
    Latest,
    Trending,
    BrowseByTopics,
  },
};
</script>
<style scoped>
/* .home {
  margin: 0 80px 0 80px;
} */
</style>
