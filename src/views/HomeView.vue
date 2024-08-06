<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <SiteHeader />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import SiteHeader from "@/components/SiteHeader.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    SiteHeader,
  },
};
</script>
