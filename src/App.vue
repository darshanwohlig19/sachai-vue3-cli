<template>
  <nav><router-link to="/"></router-link></nav>
  <router-view />
  <Toast position="top-right" group="bc" @close="onClose">
    <template #message="slotProps">
      <div class="flex flex-row gap-4">
        <div>
          <div
            class="bg-[#21A67A] flex justify-center items-center w-[8px] h-[100%] rounded-md"
          ></div>
        </div>
        <div>
          <div class="flex flex-column align-items-start" style="flex: 1">
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

<style lang="scss"></style>
