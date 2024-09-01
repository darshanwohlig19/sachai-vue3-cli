<template>
  <div class="bg-white mt-3 rounded-[10px] p-3">
    <div class="w-[100%] flex justify-between">
      <div class="flex flex-row items-center gap-2">
        <div class="bg-[#FF0053] w-[4px] h-[10px] rounded-md"></div>
        <div class="heads">Campaign</div>
      </div>
      <div class="see-all">See all →</div>
    </div>
    <div class="w-[100%] flex flex-col md:flex-row gap-4 mt-3">
      <div
        class="w-[100%] sm:w-[64%] md-max:w-[100%] flex justify-between gap-3"
      >
        <div class="w-[32%] between-sm-md:w-[50%] below-sm:w-[100%]">
          <div>
            <img
              class="w-[100%] h-[182px] rounded-[8px]"
              :src="campaigns[0]?.imgixUrlHighRes || fallbackImage"
            />
          </div>
          <div class="p-2 shadow-lg rounded-b-[8px]">
            <div class="font-16 lines2">
              {{ campaigns[0]?.headline || "No Headline" }}
            </div>
          </div>
        </div>
        <div class="w-[32%] between-sm-md:w-[50%] below-sm:hidden">
          <div>
            <img
              class="w-[100%] h-[182px] rounded-[8px]"
              :src="campaigns[1]?.imgixUrlHighRes || fallbackImage"
            />
          </div>
          <div class="p-2 shadow-lg rounded-b-[8px]">
            <div class="font-16 lines2">
              {{ campaigns[1]?.headline || "No Headline" }}
            </div>
          </div>
        </div>
        <div class="w-[32%] between-sm-md:hidden below-sm:hidden">
          <div>
            <img
              class="w-[100%] h-[182px] rounded-[8px]"
              :src="campaigns[2]?.imgixUrlHighRes || fallbackImage"
            />
          </div>
          <div class="p-2 shadow-lg rounded-b-[8px]">
            <div class="font-16 lines2">
              {{ campaigns[2]?.headline || "No Headline" }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="divider1"></div>
      </div>
      <div
        class="w-[100%] sm:w-[36%] md-max:w-[100%] flex flex-col justify-between md-max:gap-5"
      >
        <div class="flex flex-row gap-2.5 items-center">
          <div class="w-[10px]">
            <img src="../assets/Group.png" alt="" />
          </div>
          <div class="font-14">
            {{ campaigns1[0]?.headline || "No Headline" }}
          </div>
        </div>
        <div class="block divider"></div>
        <div class="flex flex-row gap-2.5 items-center">
          <div class="w-[15px]">
            <img src="../assets/Group.png" alt="" />
          </div>
          <div class="font-14">
            {{ campaigns1[1]?.headline || "No Headline" }}
          </div>
        </div>
        <div class="block divider"></div>
        <div class="flex flex-row gap-2.5 items-center">
          <div class="w-[15px]">
            <img src="../assets/Group.png" alt="" />
          </div>
          <div class="font-14">
            {{ campaigns1[2]?.headline || "No Headline" }}
          </div>
        </div>
        <div class="hidden md:block divider"></div>
        <div class="hidden md:flex flex-row gap-2.5 items-center">
          <div class="w-[15px]">
            <img src="../assets/Group.png" alt="" />
          </div>
          <div class="font-14">
            {{ campaigns1[3]?.headline || "No Headline" }}
          </div>
        </div>
        <div class="hidden md:block divider"></div>
        <div class="hidden md:flex flex-row gap-2.5 items-center">
          <div class="w-[15px]">
            <img src="../assets/Group.png" alt="" />
          </div>
          <div class="font-14">
            {{ campaigns1[4]?.headline || "No Headline" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
// import moment from "moment";

const campaigns = ref([]);
const campaigns1 = ref([]);
const languageId = ref("6421a32aa020a23deacecf92"); // Assuming you have a languageId, adjust this as needed
// function formatPublishTime(publishTime) {
//   return moment(publishTime).fromNow();
// }

async function fetchBlogs() {
  try {
    const response = await axios.post(
      "https://dev-api.askus.news/news/getAllBlogsForWeb",
      {
        language: languageId.value,
        page: 1,
      }
    );
    campaigns.value = response.data.slice(0, 3);
    campaigns1.value = response.data.slice(3, 8);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

fetchBlogs();
</script>
<style scoped>
.divider {
  height: 1px;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 100%;
}
.divider1 {
  height: 100%;
  background-color: #e5e7eb; /* This is a light gray color, you can adjust as needed */
  width: 1px;
}
.lines2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
