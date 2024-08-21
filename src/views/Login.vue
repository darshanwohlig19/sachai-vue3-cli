<template>
  <!-- Desktop carousel -->
  <div class="flex justify-center items-center p-[100px] loginnnn">
    <div class="w-[910px] h-[512px] flex bg-white rounded-[20px]">
      <div class="w-[50%] p-[5%]">
        <div class="flex justify-center mt-5">
          <img
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
            class="w-[128px] h-[33px] object-cover"
          />
        </div>
        <div id="recaptcha-container" class="justify-center flex"></div>

        <div class="mt-20">
          <!-- Conditionally render based on showPhoneVerification -->
          <div v-if="!showPhoneVerification">
            <div class="text-[32px] font-lato">Hello !</div>
            <div class="mt-2 text-[18px] font-lato">Login to your account</div>

            <!-- Login Options -->
            <div class="flex flex-row gap-4 mt-6 w-[100%]">
              <div
                class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center rounded-[12px]"
                @click="loginWithGoogle"
              >
                <img
                  src="https://ik.imagekit.io/553gmaygy/Group%20(1).png?updatedAt=1724069687283"
                  class="text-[34px] cursor-pointer"
                />
              </div>
              <div
                class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center rounded-[12px]"
                @click="signInWithApple"
              >
                <img
                  src="https://ik.imagekit.io/553gmaygy/Capa_1%20(1).png?updatedAt=1724069687282"
                  class="text-[34px] cursor-pointer"
                />
              </div>
              <div
                class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center rounded-[12px]"
                @click="togglePhoneVerification"
              >
                <img
                  src="https://ik.imagekit.io/553gmaygy/fa6-solid_phone-flip.png?updatedAt=1724069817849"
                  class="text-[34px] cursor-pointer"
                />
              </div>
            </div>

            <div
              class="text-center mt-10 text-[18px] text-[#FF0053] cursor-pointer"
            >
              Continue without login
            </div>
          </div>

          <!-- Phone Number Verification UI -->
          <div v-else>
            <div v-if="!verificationCodeTab">
              <input
                v-model="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                class="border p-2 mt-2 w-full"
              />
              <button
                @click="handleSendVerificationCode"
                class="bg-[#1E0627] text-white p-2 rounded mt-2 w-full"
              >
                Send Verification Code
              </button>
            </div>
            <div v-else>
              <div class="card flex justify-center">
                <div class="">
                  <InputOtp
                    v-model="verificationCode"
                    class="p-2 mt-2 w-full h-[50%]"
                    mask
                  />
                </div>
              </div>
              <button
                @click="verifyCode"
                class="bg-[#1E0627] text-white p-2 rounded mt-5 w-full h-[50%]"
              >
                Verify Code
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[50%]">
        <Carousel
          :value="desktopProducts"
          :numVisible="1"
          :numScroll="1"
          class="carousel login-carousal"
          showIndicators
          circular
          :responsiveOptions="responsiveOptions"
          :autoplayInterval="2000"
        >
          <template #item="slotProps">
            <div>
              <div class="rounded-r-[20px]">
                <div class="relative mx-auto h-[512px] rounded-r-[20px]">
                  <img
                    :src="
                      slotProps.data.image ||
                      'https://via.placeholder.com/910x512?text=No+Image'
                    "
                    :severity="getSeverity(slotProps.data.inventoryStatus)"
                    class="w-[100%] h-[100%] object-fill"
                  />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </div>

  <!-- Mobile carousel with login on top -->
  <div class="relative h-[100%] w-full mobile">
    <!-- Login Credentials -->
    <div
      class="absolute inset-0 flex items-center justify-center p-4 z-10 bg-opacity-75"
    >
      <div class="w-full max-w-[360px] p-4 bg-white rounded-lg shadow-lg">
        <div class="flex justify-center mt-5">
          <img
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
            class="w-[128px] h-[33px] object-cover"
          />
        </div>
        <div id="recaptcha-container" class="justify-center flex"></div>

        <div class="mt-2">
          <!-- Conditionally render based on showPhoneVerification -->
          <div v-if="!showPhoneVerification">
            <div class="text-[32px] font-lato text-center">Hello !</div>
            <div class="mt-2 text-[18px] font-lato text-center">
              Login to your account
            </div>

            <!-- Login Options -->
            <div class="flex flex-row gap-4 mt-6 w-full justify-center">
              <div
                class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center rounded-[12px]"
                @click="loginWithGoogle"
              >
                <img
                  src="https://ik.imagekit.io/553gmaygy/Group%20(1).png?updatedAt=1724069687283"
                  class="text-[34px] cursor-pointer"
                />
              </div>
              <div
                class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center rounded-[12px]"
                @click="signInWithApple"
              >
                <img
                  src="https://ik.imagekit.io/553gmaygy/Capa_1%20(1).png?updatedAt=1724069687282"
                  class="text-[34px] cursor-pointer"
                />
              </div>
              <div
                class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center rounded-[12px]"
                @click="togglePhoneVerification"
              >
                <img
                  src="https://ik.imagekit.io/553gmaygy/fa6-solid_phone-flip.png?updatedAt=1724069817849"
                  class="text-[34px] cursor-pointer"
                />
              </div>
            </div>

            <div
              class="text-center mt-10 text-[18px] text-[#FF0053] cursor-pointer"
            >
              Continue without login
            </div>
          </div>

          <!-- Phone Number Verification UI -->
          <div v-else>
            <div v-if="!verificationCodeTab">
              <input
                v-model="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                class="border p-2 mt-2 w-full"
              />
              <button
                @click="handleSendVerificationCode"
                class="bg-[#1E0627] text-white p-2 rounded mt-2 w-full"
              >
                Send Verification Code
              </button>
            </div>
            <div v-else>
              <div class="card flex justify-center">
                <div class="">
                  <InputOtp
                    v-model="verificationCode"
                    class="p-2 mt-2 w-full h-[50%]"
                    mask
                  />
                </div>
              </div>
              <button
                @click="verifyCode"
                class="bg-[#1E0627] text-white p-2 rounded mt-5 w-full h-[50%]"
              >
                Verify Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile carousel -->
    <Carousel
      :value="mobileProducts"
      :autoplayInterval="2000"
      :numVisible="1"
      :numScroll="1"
      class="carousel login-carousal"
      showIndicators
      circular
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps1">
        <div>
          <div class="rounded-r-[20px]">
            <div class="relative mx-auto h-full w-full">
              <img
                :src="
                  slotProps1.data.image ||
                  'https://via.placeholder.com/910x512?text=No+Image'
                "
                :severity="getSeverity(slotProps1.data.inventoryStatus)"
                class="w-[100%] h-[100%] object-fill"
              />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ProductService } from "../assets/service/ProductService";
import { MobileService } from "../assets/service/MobileService";
import InputOtp from "vue-input-otp"; // Ensure you have this component installed

// Reactive variables for desktop and mobile products
const desktopProducts = ref([]);
const mobileProducts = ref([]);
const phoneNumber = ref("");
const verificationCode = ref("");
const showPhoneVerification = ref(false);
const verificationCodeTab = ref(false);

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

// Function to get the severity level for inventory status
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

// Lifecycle hook to fetch data when component is mounted
onMounted(async () => {
  try {
    // Fetching products for desktop
    const desktopData = await ProductService.getProductsSmall();
    desktopProducts.value = desktopData.slice(0, 9) || []; // Fallback to empty array if no data

    // Fetching products for mobile
    const mobileData = await MobileService.getProductsSmall();
    mobileProducts.value = mobileData.slice(0, 9) || []; // Fallback to empty array if no data
  } catch (error) {
    console.error("Error fetching products:", error);
    // You might also set a state to show an error message or a default view
  }
});

// Function to handle login with Google
const loginWithGoogle = () => {
  // Your Google login logic here
};

// Function to handle login with Apple
const signInWithApple = () => {
  // Your Apple login logic here
};

// Function to toggle phone verification
const togglePhoneVerification = () => {
  showPhoneVerification.value = !showPhoneVerification.value;
  verificationCodeTab.value = false;
};

// Function to handle sending verification code
const handleSendVerificationCode = () => {
  // Your logic to send verification code here
  verificationCodeTab.value = true;
};

// Function to handle code verification
const verifyCode = () => {
  // Your logic to verify the code here
};
</script>
<style>
/* Styles for the login carousel and indicators */
.login-carousal .p-highlight {
  background-color: red !important;
  width: 25px !important;
}
.loginnnn {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.p-carousel-content {
  border-radius: 0 20px 20px 0 !important;
}
.login-carousal .p-carousel-indicator {
  color: green;
  background-color: white;
  position: relative !important;
  bottom: 30px;
  height: 8px;
  width: 10px;
  border-radius: 10px;
}
.p-carousel-indicator {
  margin-top: -20px;
  height: 8px !important;
}
.login-carousel .p-highlight {
  background-color: red !important;
  width: 25px !important;
}
.login-carousel .p-carousel-indicator {
  color: green;
  background-color: white;
  position: relative !important;
  bottom: 25px;
  width: 10px;
  height: 8px;
  border-radius: 10px;
}
.p-carousel-next .p-link {
  display: none !important;
} /* Desktop styles */
.loginnnn {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensures it
takes the full viewport height */
} /* Hide mobile view and show desktop view
for larger screens */
@media only screen and (min-width: 768px) {
  .mobile {
    display: none;
  }
  .loginnnn {
    display: flex;
  }
} /* Styles for mobile view */
.mobile {
  display: none;
}
@media only screen and (max-width: 600px) {
  .loginnnn {
    display: none !important;
  }
  .mobile {
    display: block;
    position: relative;
  }
  .p-carousel-content {
    border-radius: 0 0 0 0 !important;
  } /* Center the login
credentials */
  .mobile .absolute {
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%; /* Adjust as needed */
    max-width: 360px; /*
Adjust as needed */
  }
}
@media only screen and (max-width: 460px) {
  .mobile .absolute {
    top: 70%;
  }
}
</style>
