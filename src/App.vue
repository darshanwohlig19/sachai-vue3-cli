<template>
  <div>
    <nav>
      <router-link to="/"></router-link>
    </nav>

    <router-view :key="routeKey" />
    <Toast position="top-right" group="success" @close="onClose">

    <router-view />
    <Toast
      position="top-right"
      class="sm-max:w-[95%] sm-max:right-1 sm-max:left-2"
      group="success"
      @close="onClose"
    >

      <template #message="slotProps">
        <div class="flex flex-row gap-3">
          <div>
            <div
              class="bg-[#21A67A] flex justify-center items-center w-[5px] h-[100%] rounded-[100px]"
            ></div>
          </div>
          <div class="flex justify-center items-center">
            <img src="../src/assets/success.svg" alt="" />
          </div>

          <div>
            <div class="flex flex-col justify-center" style="flex: 1">
              <div class="font-bold font-lato !text-[#1E0627] my-1 text-[16px]">
                {{ slotProps.message.summary }}
              </div>
              <div
                class="font-normal font-lato !text-[#878787] my-1 text-[16px]"
              >
                {{ slotProps.message.summary2 }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <Toast
      position="top-right"
      group="error"
      class="sm-max:w-[95%] sm-max:right-1 sm-max:left-2"
      @close="onClose"
    >
      <template #message="slotProps">
        <div class="flex flex-row gap-3">
          <div>
            <div
              class="bg-[#E4404D] flex justify-center items-center w-[5px] h-[100%] rounded-[100px]"
            ></div>
          </div>
          <div class="flex justify-center items-center">
            <div class="flex justify-center items-center">
              <img src="../src/assets/failed.svg" alt="" />
            </div>
          </div>

          <div>
            <div class="flex flex-col justify-center" style="flex: 1">
              <div class="font-bold font-lato !text-[#1E0627] my-1 text-[16px]">
                {{ slotProps.message.summary }}
              </div>
              <div
                class="font-normal font-lato !text-[#878787] my-1 text-[16px]"
              >
                {{ slotProps.message.summary2 }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </Toast>
  </div>
  <!-- <Button @click="showTemplate" label="View" /> -->
</template>
<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const routeKey = computed(() => route.fullPath);
</script>

<style scoped></style>
