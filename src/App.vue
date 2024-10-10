<template>
  <div>
    <nav>
      <router-link to="/"></router-link>
    </nav>

    <router-view :key="routeKey" />

    <Toast
      position="top-right"
      group="success"
      @close="onClose"
      class="sm-max:w-[95%] sm-max:right-1 sm-max:left-2"
    >
      <template #message="slotProps">
        <div class="flex flex-row gap-3">
          <div>
            <div
              class="bg-[#21A67A] flex justify-center items-center w-[5px] h-[100%] rounded-[100px]"
            ></div>
          </div>
          <div class="flex justify-center items-center">
            <img src="../src/assets/svg/success.svg" alt="" />
          </div>
          <div class="flex flex-col justify-center" style="flex: 1">
            <div class="font-bold font-lato !text-[#1E0627] my-1 text-[16px]">
              {{ slotProps.message.summary }}
            </div>
            <div class="font-normal font-lato !text-[#878787] my-1 text-[16px]">
              {{ slotProps.message.summary2 }}
            </div>
          </div>
        </div>
      </template>
    </Toast>

    <Toast
      position="top-right"
      group="error"
      @close="onClose"
      class="sm-max:w-[95%] sm-max:right-1 sm-max:left-2"
    >
      <template #message="slotProps">
        <div class="flex flex-row gap-3">
          <div>
            <div
              class="bg-[#E4404D] flex justify-center items-center w-[5px] h-[100%] rounded-[100px]"
            ></div>
          </div>
          <div class="flex justify-center items-center">
            <img src="../src/assets/svg/failed.svg" alt="" />
          </div>
          <div class="flex flex-col justify-center" style="flex: 1">
            <div class="font-bold font-lato !text-[#1E0627] my-1 text-[16px]">
              {{ slotProps.message.summary }}
            </div>
            <div class="font-normal font-lato !text-[#878787] my-1 text-[16px]">
              {{ slotProps.message.summary2 }}
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <Toast
      position="top-right"
      group="warn"
      @close="onClose"
      class="sm-max:w-[95%] sm-max:right-1 sm-max:left-2"
    >
      <template #message="slotProps">
        <div class="flex flex-row gap-3">
          <div>
            <div
              class="bg-[#FF9305] flex justify-center items-center w-[5px] h-[100%] rounded-[100px]"
            ></div>
          </div>
          <div class="flex justify-center items-center">
            <div
              class="bg-[#FFE3BF] flex justify-center items-center w-[28px] h-[28px] rounded-full"
            >
              <img
                src="../src/assets/svg/warning.svg"
                alt=""
                class="w-[14px] h-[14px]"
              />
            </div>
          </div>
          <div class="flex flex-col justify-center" style="flex: 1">
            <div class="font-bold font-lato !text-[#1E0627] text-[14px] my-0">
              {{ slotProps.message.summary }}
            </div>
            <div class="font-normal font-lato !text-[#878787] text-[12px] my-0">
              {{ slotProps.message.summary2 }}
            </div>
          </div>
        </div>
      </template>
    </Toast>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const routeKey = computed(() => route.fullPath);
</script>

<style scoped></style>
