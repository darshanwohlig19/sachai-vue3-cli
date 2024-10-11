<template>
  <div>
    <InviteLinkDialog
      :isVisible="isDialogVisible"
      :inviteLink="inviteLink"
      @close="isDialogVisible = false"
    />
    <div>
      <Navbarrr />
      <div class="mx-[20px] mt-[85px] min-h-screen flex flex-col">
        <div
          class="flex flex-col gap-2 bg-white rounded-[10px] px-3 py-2 flex-grow"
        >
          <div class="flex flex-row items-center gap-1">
            <div class="bg-[#FF0053] w-[4px] h-[13px] rounded-md"></div>
            <div class="text-[18px] font-lato font-[700] text-[#1E0627]">
              Bookmarks
            </div>
          </div>

          <div v-if="loading">
            <Skeleton />
          </div>
          <div v-else-if="paginatedData.length > 0" class="flex flex-col gap-3">
            <div v-for="item in paginatedData" :key="item._id">
              <div
                class="w-full h-[300px] sm:h-[170px] bg-white flex flex-col sm:flex-row rounded-lg border-1 drop-shadow-md"
              >
                <div class="w-[100%] sm:w-[25%] h-full items-center">
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
                <div
                  class="w-[100%] sm:w-[80%] sm:ml-3 sm:mr-3 py-2 sm:py-2 px-3 sm:px-0 sm:p-0 flex flex-col sm:justify-between"
                >
                  <div class="">
                    <div class="flex justify-between items-center">
                      <div class="flex gap-1 text-[#1E0627] time-date-home">
                        <div class="">
                          {{ item.source || "No source" }}
                        </div>
                        <div class="">
                          |
                          {{ moment(item.publishTime || new Date()).fromNow() }}
                        </div>
                      </div>
                      <div class="flex gap-1">
                        <span
                          class="mdi mdi-share-variant text-[18px]"
                          @click.stop="showDialog(item)"
                        ></span>
                      </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-1 w-[85%]">
                      <div
                        class="headine-home title-md-multiline-truncate mr-1 cursor-pointer"
                        @click="navigateToNewsDetail(item._id)"
                      >
                        {{ item.headline || "No Headline" }}
                      </div>
                      <div
                        class="multiline-truncate leading-1 mr-1 cursor-pointer summary-home text-[#878787]"
                        @click="navigateToNewsDetail(item.newsId)"
                      >
                        {{ item.summary || "No summary" }}
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between items-end sm:mb-2">
                    <div
                      class="flex h-full items-center justify-between gap-2 time-date-home"
                    >
                      <span class="text-red-500 capitalize">
                        {{
                          item.categories &&
                          item.categories.length > 0 &&
                          item.categories[0]
                            ? item.categories[0].replace(/-/g, " ")
                            : item.categories
                        }}
                      </span>
                    </div>
                    <div class="font-12">
                      <div
                        class="text-[#FF0053] h-[28px] items-center flex justify-between gap-1 bg-[#FF00530F] cursor-pointer rounded-[4px] xs-max:text-[9px] Button-detail p-2"
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
  </div>
</template>

<script setup>
import Skeleton from "../common/config/Bookmark_loader.vue";
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import { ref, onMounted } from "vue";
import moment from "moment";
import Navbarrr from "@/components/Navbarrr.vue";
import { useRouter } from "vue-router";
import Paginator from "primevue/paginator";
import InviteLinkDialog from "@/common/config/shareLink.vue"; // Import the dialog component
import { useToast } from "primevue/usetoast"; // Import the toast composable
import fallbackImage2 from "../common/config/GlobalConstants";
const fallbackImage = fallbackImage2.variables.fallbackImage;
const loading = ref(true); // Add loading state
const router = useRouter();
const toast = useToast(); // Create a toast instance
const BookmarkData = ref([]);
const paginatedData = ref([]);
const rowsPerPage = 5;
const first = ref(0);
const isDialogVisible = ref(false); // State for dialog visibility
const inviteLink = ref(""); // Link to share, set this appropriately
const navigateToNewsDetail = (id) => {
  router.push(`/news/${id}`);
};
const showDialog = (item) => {
  isDialogVisible.value = true;
  inviteLink.value = item.newsLink;
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
  } finally {
    loading.value = false; // Set loading to false after fetching is complete
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
.p-paginator .p-highlight {
  background-color: #ff0053ed !important; /* Set background color to red */
  color: white !important; /* Ensure text color is visible */
  border-radius: 100px !important; /* Add rounded corners */
  padding: 5px 10px; /* Optional: Add some padding for better visual appearance */
}

.p-paginator .p-highlight a {
  color: white !important; /* Ensure the link text is white for contrast */
}
</style>
