<template>
  <div>
    <div
      v-for="index in 5"
      :key="index"
      class="w-full mt-3 h-[300px] sm:h-[170px] bg-white drop-shadow-md flex rounded-lg"
    >
      <div class="w-full flex flex-col sm:flex-row gap-0 rounded-lg">
        <!-- Image skeleton -->
        <div class="w-full sm:w-[40%] sm:ml-4 sm:mr-2 h-full">
          <div class="relative h-full rounded-lg shadow-lg overflow-hidden">
            <Skeleton class="h-full w-full" />
          </div>
        </div>
        <!-- Text and icon skeletons -->
        <div
          class="w-full sm:w-[60%] sm:ml-4 sm:mr-2 flex flex-col justify-evenly p-2 sm:p-0"
        >
          <!-- Source and time skeleton -->
          <div class="flex justify-between items-center mt-1">
            <div class="flex gap-1">
              <Skeleton class="w-20 h-4" /> <Skeleton class="w-10 h-4" />
            </div>
            <div class="flex gap-1">
              <Skeleton class="w-4 h-4" /> <Skeleton class="w-4 h-4" />
            </div>
          </div>
          <!-- Headline skeleton -->
          <Skeleton class="w-full h-6 mt-2" />
          <!-- Summary skeleton -->
          <Skeleton class="w-full h-4 mt-2 mb-2" />
          <!-- Category skeleton -->
          <Skeleton class="w-20 h-4 mt-1" />
        </div>
      </div>
    </div>
  </div>
</template>
