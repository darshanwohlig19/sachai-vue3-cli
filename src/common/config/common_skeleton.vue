<template>
  <div>
    <div
      v-for="n in 5"
      :key="n"
      class="w-full mt-3 h-[300px] sm:h-[170px] bg-white drop-shadow-md flex rounded-lg"
    >
      <div class="w-full bg-white flex flex-col sm:flex-row gap-0 rounded-lg">
        <!-- Skeleton for Image Section -->
        <div class="w-[100%] sm:w-[40%] h-full items-center">
          <div
            class="relative h-full bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Skeleton class="w-full h-full" shape="rectangle" />
          </div>
        </div>

        <!-- Skeleton for Text Section -->
        <div
          class="w-[100%] sm:w-[60%] ml-0 mr-0 sm:ml-4 sm:mr-2 flex flex-col justify-evenly p-2 sm:p-0"
        >
          <!-- Source and Time Skeleton -->
          <div class="flex justify-between items-center gap-3 mt-1 w-full">
            <div class="w-[75%] sm:w-[90%] flex gap-2">
              <Skeleton class="h-[12px]" width="70px" shape="rectangle" />
              <div class="w-[1%] xl-max:!hidden flex justify-center">
                <div class="standing_divider"></div>
              </div>
              <Skeleton class="h-[12px]" width="70px" shape="rectangle" />
            </div>
            <div class="flex gap-2 w-[25%] justify-end sm:w-[10%] mr-[5px]">
              <Skeleton shape="circle" size="20px" />
              <Skeleton shape="circle" size="20px" />
            </div>
          </div>

          <!-- Headline Skeleton -->
          <div
            class="text-[12px] lg:text-[16px] fontCustom leading-1 bold mr-1 mt-1"
          >
            <Skeleton class="w-full" height="30px" shape="rectangle" />
          </div>

          <!-- Summary Skeleton -->
          <div
            class="text-[10px] lg:text-[12px] text-[#878787] font-lato leading-1 mr-1 mt-1 mb-1"
          >
            <Skeleton class="w-full" height="10px" shape="rectangle" />
            <Skeleton class="w-full mt-2" height="10px" shape="rectangle" />
            <Skeleton class="w-full mt-2" height="10px" shape="rectangle" />
          </div>

          <!-- Categories Skeleton -->
          <div class="text-[8px] lg:text-[12px] flex gap-3 mt-2 sm:mt-0">
            <Skeleton height="12px" width="70px" shape="rectangle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
