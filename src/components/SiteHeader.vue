<template>
  <ThemeSwitcher />
  <div class="card">
    <Carousel
      :value="products"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      class="carousel"
      showIndicators
    >
      <template #item="slotProps">
        <div class="relative rounded-[20px] m-2 h-[363px] overflow-hidden">
          <img
            :src="
              'https://primefaces.org/cdn/primevue/images/product/' +
              slotProps.data.image
            "
            :alt="slotProps.data.name"
            class="w-full h-full object-fill rounded-[20px]"
          />
          <Tag
            :value="slotProps.data.inventoryStatus"
            :severity="getSeverity(slotProps.data.inventoryStatus)"
            class="absolute top-4 left-4"
          />
          <div
            class="absolute top-2 right-4 p-2 text-black w-[8%] flex justify-around"
          >
            <div>
              <i
                class="pi pi-share-alt text-black bg-white rounded-[50%] h-[40px] w-[40px] text-[22px] flex justify-center items-center"
              ></i>
            </div>
            <div>
              <i
                class="pi pi-bookmark text-black bg-white rounded-[50%] h-[40px] w-[40px] text-[22px] flex justify-center items-center"
              ></i>
            </div>
          </div>
          <div
            class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black via-black/60 to-transparent text-white"
          >
            <div class="text-lg">HELLO GUYS WELCOME BACK</div>
            <div class="text-lg">HELLO GUYS WELCOME BACK</div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ProductService } from "../../src/assets/service/ProductService";

onMounted(() => {
  ProductService.getProductsSmall().then(
    (data) => (products.value = data.slice(0, 9))
  );
});

const products = ref([]);
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const getSeverity = (status) => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warn";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};
</script>

<style scoped>
.carousel .p-carousel-indicators {
  bottom: 10px; /* Adjust the position of the indicators */
  display: flex;
  justify-content: center;
}

.carousel .p-carousel-indicator {
  width: 10px;
  height: 10px;
  background-color: #000; /* Set the background color of the indicators */
  border-radius: 50%; /* Make the indicators round */
  margin: 0 4px;
}

.carousel .p-carousel-indicator.p-highlight {
  background-color: #fff; /* Highlighted indicator color */
}
</style>
