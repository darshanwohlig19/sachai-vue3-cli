<template>
  <div>
    <Navbarrr />
    <div class="mx-[20px] mt-2 min-h-screen flex flex-col">
      <div class="flex flex-col gap-2 bg-white rounded-[10px] p-3 flex-grow">
        <div class="flex flex-row items-center gap-2">
          <div class="bg-[#FF0053] w-[4px] h-[10px] rounded-md"></div>
          <div class="text-[18px] font-lato font-[700] text-[#1E0627]">
            Bookmarks
          </div>
        </div>

        <div v-if="paginatedData.length > 0" class="flex flex-col gap-3">
          <div v-for="item in paginatedData" :key="item._id">
            <div
              class="w-full h-[174px] bg-white flex rounded-lg border-1 drop-shadow-md"
            >
              <div class="w-[25%] h-full items-center">
                <div
                  class="relative h-full bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div class="relative w-[100%] h-[100%]">
                    <img
                      class="absolute inset-0 object-cover h-full w-full filter blur-sm cursor-pointer"
                      :src="item?.imgixUrlHighRes || fallbackImage"
                      @click="navigateToNewsDetail(item._id)"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
                    ></div>
                  </div>
                  <div
                    class="absolute inset-0 flex flex-col justify-between text-white"
                  >
                    <img
                      class="object-contain h-full w-[100%] cursor-pointer"
                      :src="item?.imgixUrlHighRes || fallbackImage"
                      @click="navigateToNewsDetail(item._id)"
                    />
                  </div>
                </div>
              </div>
              <div class="w-[80%] ml-3 mr-3 flex flex-col justify-around">
                <div class="flex justify-between items-center mt-3">
                  <div class="flex gap-1 text-[#1E0627] medium">
                    <div class="xs-max:text-[9px] text-[12px] font-lato">
                      {{ item.source || "No source" }}
                    </div>
                    <div class="xs-max:text-[9px] text-[12px]">
                      | {{ moment(item.publishTime || new Date()).fromNow() }}
                    </div>
                  </div>
                  <div class="flex gap-1">
                    <span
                      class="material-symbols-outlined text-[14px] lg:text-[19px] cursor-pointer"
                      >share</span
                    >
                  </div>
                </div>
                <div
                  class="text-[14px] md:text-[20px] fontCustom title-md-multiline-truncate leading-1 bold mr-1 cursor-pointer mt-1"
                  @click="navigateToNewsDetail(item._id)"
                >
                  {{ item.headline || "No Headline" }}
                </div>
                <div
                  class="text-[12px] md:text-[14px] text-[#878787] md-multiline-truncate lg:multiline-truncate font-lato leading-1 mr-1 mt-1 mb-1 cursor-pointer"
                  @click="navigateToNewsDetail(item.newsId)"
                >
                  {{ item.summary || "No summary" }}
                </div>
                <div class="flex justify-between mt-2 mb-2 items-end">
                  <div
                    class="xs-max:text-[9px] text-[12px] h-[100%] items-center flex gap-2"
                  >
                    <span class="text-red-500">Politics</span>
                    <span>|</span>
                    <span>4 min read</span>
                  </div>
                  <div class="font-12">
                    <div
                      class="text-[#FF0053] h-[28px] items-center flex justify-between gap-1 font-bold bg-[#FF00530F] cursor-pointer rounded-[4px] xs-max:text-[9px] text-[12px] p-2"
                    >
                      <div @click="removeBookmark(item.newsId)">Remove</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="flex-grow flex justify-center items-center text-center font-24 h-full"
        >
          No Bookmarks
        </div>

        <!-- Paginator -->
        <Paginator
          v-if="BookmarkData.length > 0"
          :first="first"
          :rows="rowsPerPage"
          :totalRecords="BookmarkData.length"
          :totalPages="totalPages"
          @page="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import { ref, onMounted } from "vue";
import moment from "moment";
import Navbarrr from "@/components/Navbarrr.vue";
import { useRouter } from "vue-router";
import Paginator from "primevue/paginator";
import { useToast } from "primevue/usetoast"; // Import the toast composable

const router = useRouter();
const toast = useToast(); // Create a toast instance

const BookmarkData = ref([]);
const paginatedData = ref([]);
const rowsPerPage = 5;
const first = ref(0);
const navigateToNewsDetail = (id) => {
  router.push(`/news/${id}`);
};

const Bookmark = async () => {
  try {
    const payload = {
      language: "English",
      page: 1,
    };
    const token = localStorage.getItem("apiDataToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_BOOKMARK_DATA}`,
      payload
    );
    // const response = await axios.post(
    //   "https://api-uat.newsshield.io/bookmark/getBookmarkData",
    // );
    console.log("data", response);
    BookmarkData.value = response.data;
    updatePaginatedData();
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
  }
};
const totalPages = Math.ceil(BookmarkData.value.length / rowsPerPage);

const updatePaginatedData = () => {
  const endIndex = Math.min(
    first.value + rowsPerPage,
    BookmarkData.value.length
  );
  paginatedData.value = BookmarkData.value.slice(first.value, endIndex);
};

const onPageChange = (event) => {
  first.value = event.first;
  updatePaginatedData();
};

const removeBookmark = async (id) => {
  const newStatus = "Disabled";
  const payload = {
    status: newStatus,
  };
  try {
    const token = localStorage.getItem("apiDataToken");

    if (!token) {
      throw new Error("No authentication token found");
    }

    console.log("This is id", id);
    const res = await apiService.apiCall(
      "post",
      `${apiConfig.ADD_BOOKMARK}/${id}`,
      payload
    );
    // const res = await axios.post(
    //   `https://api-uat.newsshield.io/bookmark/addBookmark/${id}`
    // );
    if (res.status === 200) {
      BookmarkData.value = BookmarkData.value.filter((item) => item._id !== id);
      localStorage.removeItem(`bookmark_${id}`);
      updatePaginatedData();
      toast.add({
        severity: "success",
        summary: "Bookmark Removed",
        group: "success",
        life: 3000,
      });
      Bookmark();
    }
  } catch (error) {
    console.error(`Error removing bookmark for news item ${id}:`, error);
    toast.add({
      severity: "error",
      summary: "Failed!",
      group: "error",
      life: 3000,
    });
  }
};

onMounted(() => {
  Bookmark();
});
</script>

<style>
.title-md-multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.md-multiline-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
