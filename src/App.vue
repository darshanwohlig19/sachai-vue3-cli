<template>
  <nav><router-link to="/"></router-link></nav>
  <router-view />
  <Toast position="top-right" group="success" @close="onClose">
    <template #message="slotProps">
      <div class="flex flex-row gap-3">
        <div>
          <div
            class="bg-[#21A67A] flex justify-center items-center w-[8px] h-[100%] rounded-md"
          ></div>
        </div>
        <div class="flex justify-center items-center">
          <div
            class="bg-[#21A67A] flex justify-center items-center w-[28px] h-[28px] rounded-full"
          >
            <i class="mdi mdi-check text-white"></i>
          </div>
        </div>

        <div>
          <div class="flex flex-col justify-center" style="flex: 1">
            <div class="font-medium text-lg my-1 text-900">
              {{ slotProps.message.summary }}
            </div>
            <div class="font-medium text-lg mt-1 text-900">
              {{ slotProps.message.summary2 }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </Toast>
  <!-- <Button @click="showTemplate" label="View" /> -->
</template>
<script setup></script>

<style></style>
