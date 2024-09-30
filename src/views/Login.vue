<template>
  <div>
    <!-- Desktop carousel -->
    <div class="flex justify-center items-center p-[100px] loginnnn">
      <div class="w-[750px] h-[512px] flex bg-white rounded-[20px] main-login">
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
              <div class="text-[32px] font-bold text-[#333333] font-lato">
                Hello !
              </div>
              <div
                class="mt-2 font-normal text-[18px] text-[#1E0627] font-lato"
              >
                Login to your account
              </div>

              <!-- Login Options -->
              <div class="flex flex-row gap-4 mt-6 w-[100%]">
                <div
                  class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center rounded-[3px]"
                  @click="loginWithGoogle"
                >
                  <img
                    src="https://ik.imagekit.io/553gmaygy/Group%20(1).png?updatedAt=1724069687283"
                    class="text-[34px] cursor-pointer"
                  />
                </div>
                <div
                  class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center rounded-[3px]"
                  @click="signInWithApple"
                >
                  <img
                    src="https://ik.imagekit.io/553gmaygy/Capa_1%20(1).png?updatedAt=1724069687282"
                    class="text-[34px] cursor-pointer"
                  />
                </div>
                <div
                  class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center rounded-[3px]"
                  @click="startPhoneVerification"
                >
                  <img
                    src="https://ik.imagekit.io/553gmaygy/fa6-solid_phone-flip.png?updatedAt=1724069817849"
                    class="text-[34px] cursor-pointer"
                  />
                </div>
              </div>

              <div
                class="text-center font-inter mt-10 text-[18px] font-medium text-[#FF0053] cursor-pointer"
              >
                <router-link to="/">Continue without login</router-link>
              </div>
            </div>

            <!-- Phone Number Verification UI -->
            <div v-else>
              <div
                class="text-center text-[#333333] font-lato font-[600] text-[20px]"
              >
                Phone Verification
              </div>

              <div v-if="!showOtpInput">
                <div class="flex justify-center mt-5">
                  <div class="relative inline-block text-left">
                    <button
                      @click="toggleDropdown"
                      class="bg-white-200 text-gray-800 px-2 py-2 border border-gray-300 rounded-l-[4px]"
                    >
                      {{ formattedCountryCode }}
                    </button>
                    <div
                      v-if="isOpen"
                      class="absolute mt-2 !w-[200px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-[300px] overflow-y-auto"
                    >
                      <ul class="list-none m-0 p-0">
                        <li
                          v-for="country in countries"
                          :key="country.code"
                          @click="selectCode(country.code)"
                          class="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        >
                          {{ country.label }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <input
                    v-model="phoneNumber"
                    type="text"
                    placeholder="Phone"
                    class="border p-2 w-[304px] rounded-r-[4px]"
                  />
                </div>

                <div class="flex justify-center">
                  <button
                    @click="loginWithPhone"
                    class="bg-[#1E0627] font-lato text-center text-[#FFFFFF] p-2 rounded-[4px] mt-4 w-[304px] h-[44px]"
                    :disabled="isLoading"
                  >
                    <span v-if="!isLoading">Send Verification Code</span>
                  </button>
                </div>

                <div v-if="isLoading" class="flex justify-center mt-4">
                  <!-- Basic spinner -->
                  <div class="loader"></div>
                </div>

                <div
                  @click="showPhoneVerification = false"
                  class="text-center font-lato text-[#878787] mt-2 cursor-pointer text-[14px] font-[400]"
                >
                  Want to select another login method?
                </div>
              </div>

              <div v-if="showOtpInput">
                <div class="card flex justify-center">
                  <div>
                    <InputOtp
                      v-model="otp"
                      :length="6"
                      integerOnly
                      class="p-2 mt-4 rounded-[4px]"
                    />
                  </div>
                </div>

                <div class="flex justify-center">
                  <button
                    @click="verifyOtp"
                    class="bg-[#1E0627] font-lato text-center text-[#FFFFFF] p-2 rounded-[4px] mt-2 w-[304px] h-[44px]"
                  >
                    Verify OTP
                  </button>
                </div>

                <div class="flex justify-between">
                  <div
                    class="text-center font-lato text-[#878787] text-[14px] mt-2 cursor-pointer"
                    @click="showOtpInput = false"
                  >
                    Edit Phone Number?
                  </div>
                  <button
                    @click="resendOtp"
                    :disabled="!resendEnabled"
                    class="text-[14px] mt-2"
                    :class="resendEnabled ? 'text-[#000]' : 'text-[#878787]'"
                  >
                    Resend OTP
                    {{ resendEnabled ? "" : `After ${resendCountdown}sec` }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[50%] login">
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
            <template v-slot:item="{ data }">
              <div>
                <div class="rounded-r-[20px]">
                  <div class="relative mx-auto h-[512px] rounded-r-[20px]">
                    <img
                      :src="
                        data.image ||
                        'https://via.placeholder.com/910x512?text=No+Image'
                      "
                      :severity="getSeverity(data.inventoryStatus)"
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
    <button id="sign-in-button" class="hidden"></button>
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
              <div class="mt-3">
                <div class="text-[24px] font-bold text-[#333333] font-lato">
                  Hello !
                </div>
                <div class="font-normal text-[16px] text-[#1E0627] font-lato">
                  Login to your account
                </div>
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
                  @click="startPhoneVerification"
                >
                  <img
                    src="https://ik.imagekit.io/553gmaygy/fa6-solid_phone-flip.png?updatedAt=1724069817849"
                    class="text-[34px] cursor-pointer"
                  />
                </div>
              </div>

              <div
                class="text-center text-[#FF0053] cursor-pointer mt-4 font-lato text-[16px]"
              >
                <router-link to="/">Continue without login</router-link>
              </div>
            </div>

            <!-- Phone Number Verification UI -->
            <div v-else>
              <div
                class="text-center text-[#333333] font-lato font-[600] text-[18px] mt-5"
              >
                Phone Verification
              </div>

              <div v-if="!showOtpInput">
                <div class="flex justify-center mt-5">
                  <div class="relative inline-block text-left">
                    <button
                      @click="toggleDropdown"
                      class="bg-white-200 text-gray-800 px-2 py-2 border border-gray-300"
                    >
                      {{ formattedCountryCode }}
                    </button>
                    <div
                      v-if="isOpen"
                      class="absolute mt-2 !w-[200px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-[300px] overflow-y-auto"
                    >
                      <ul class="list-none m-0 p-0">
                        <li
                          v-for="country in countries"
                          :key="country.code"
                          @click="selectCode(country.code)"
                          class="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        >
                          {{ country.label }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <InputText
                    v-model="phoneNumber"
                    type="text"
                    placeholder="Phone"
                    class="p-2 w-[304px] rounded-[4px] !focus:border-black"
                  />
                </div>

                <div class="flex justify-center">
                  <button
                    @click="loginWithPhone"
                    class="bg-[#1E0627] font-lato text-center text-[#FFFFFF] p-2 rounded-[8px] mt-4 w-[304px] h-[44px]"
                    :disabled="isLoading"
                  >
                    <span v-if="!isLoading">Send Verification Code</span>
                    <span v-else>Sending...</span>
                  </button>
                </div>

                <div v-if="isLoading" class="flex justify-center mt-4">
                  <!-- Add your loader component or a simple spinner here -->
                  <div class="loader"></div>
                  <!-- Example loader -->
                </div>

                <div
                  @click="showPhoneVerification = false"
                  class="text-center font-lato text-[#878787] mt-2 cursor-pointer text-[12px]"
                >
                  Want to select another login method?
                </div>
              </div>

              <div v-if="showOtpInput">
                <div class="card flex justify-center">
                  <div>
                    <InputOtp
                      v-model="otp"
                      :length="6"
                      integerOnly
                      class="p-2 mt-4 rounded-[4px]"
                    />
                  </div>
                </div>

                <div class="flex justify-center">
                  <button
                    @click="verifyOtp"
                    class="bg-[#1E0627] font-lato text-center text-[#FFFFFF] p-2 rounded-[8px] mt-3 w-[304px] h-[44px]"
                  >
                    Verify OTP
                  </button>
                </div>

                <div class="flex justify-between">
                  <div
                    class="text-center font-lato text-[#5E5E5E] text-[12px] mt-2 cursor-pointer"
                    @click="showOtpInput = false"
                  >
                    Edit Phone Number?
                  </div>
                  <button
                    @click="resendOtp"
                    :disabled="!resendEnabled"
                    class="text-[10px] mt-2"
                    :class="resendEnabled ? 'text-[#000]' : 'text-[#878787]'"
                  >
                    Resend OTP
                    {{ resendEnabled ? "" : `After${resendCountdown}sec` }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="sign-in-button"></div>
      <!-- Carousel for mobile view -->
      <Carousel
        :value="mobileProducts"
        :numVisible="1"
        :numScroll="1"
        class="carousel mobile-carousel"
        showIndicators
        circular
        :responsiveOptions="responsiveOptions"
        :autoplayInterval="2000"
      >
        <template v-slot:item="{ data }">
          <div class="w-full">
            <img
              :src="
                data.image ||
                'https://via.placeholder.com/910x512?text=No+Image'
              "
              :severity="getSeverity(data.inventoryStatus)"
              class="w-full object-cover"
            />
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { ProductService } from "../assets/service/ProductService";
import { MobileService } from "../assets/service/MobileService";
import {
  signInWithPopup,
  OAuthProvider,
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import codes from "country-calling-code";
import InputOtp from "primevue/inputotp";
import InputText from "primevue/inputtext";

const emit = defineEmits(["code-selected"]);
const isOpen = ref(false);
const selectedCountryCode = ref("91");
const countries = computed(() => {
  if (!codes || !Array.isArray(codes)) {
    console.error("Error: `codes` is not an array");
    return [];
  }
  return codes.map((country) => ({
    label: `${country.country} (${country.countryCodes[0]})`,
    code: country.countryCodes[0],
  }));
});
const formattedCountryCode = computed(() => {
  return selectedCountryCode.value ? `+${selectedCountryCode.value}` : "+91";
});
const showPhoneVerification = ref(false);
let appVerifier;

const router = useRouter();
const toast = useToast();
const desktopProducts = ref([]);
const mobileProducts = ref([]);
let resendTimer = null;
const resendCountdown = ref(0);
const resendEnabled = computed(() => resendCountdown.value === 0);
const phoneNumber = ref("");
const otp = ref("");
const isLoading = ref(false);
let confirmationResult1 = null;
const showOtpInput = ref(false);
const auth = getAuth();

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

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectCode(code) {
  selectedCountryCode.value = code;
  isOpen.value = false;
  emit("code-selected", code);
}

const getPhoneNumberFromUserInput = () => {
  const countryCode = selectedCountryCode.value;
  const number = phoneNumber.value;
  return `+${countryCode}${number}`;
};

const loginWithPhone = async () => {
  isLoading.value = true;
  try {
    if (appVerifier == null) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response) => {
          console.log(response);
        },
      });
      appVerifier = window.recaptchaVerifier;
    }
    const phoneNumber = getPhoneNumberFromUserInput();

    console.log("numberrrr", phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        confirmationResult1 = window.confirmationResult;

        showOtpInput.value = true;
        toast.add({
          severity: "success",
          summary: "OTP Sent",
          group: "success",
          life: 3000,
        });
        startResendCountdown();
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "Login Failed!",
          summary2:
            "An error occurred while sending OTP. Please try again." + error,
          group: "error",
          life: 3000,
        });
      });
  } catch (error) {
    window.recaptchaVerifier.clear();
    console.error("Phone login failed:", error);
    toast.add({
      severity: "error",
      summary: "Login Failed!",
      summary2:
        "An error occurred while sending OTP. Please try again." + error,
      group: "error",
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};

const resendOtp = () => {
  if (resendEnabled.value) {
    loginWithPhone();
  }
};

const startResendCountdown = () => {
  resendCountdown.value = 30;
  clearInterval(resendTimer);

  resendTimer = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value -= 1;
    } else {
      clearInterval(resendTimer);
    }
  }, 1000);
};

const verifyOtp = async () => {
  if (!otp.value) {
    toast.add({
      severity: "error",
      summary: "OTP Required!",
      summary2: "Please enter the OTP you received.",
      group: "error",
      life: 3000,
    });
    return;
  }

  confirmationResult1
    .confirm(otp.value)
    .then((result) => {
      const user = result.user;
      const uid = user.uid;
      console.log(uid);
      sendUserDataToApi(uid);
      setTimeout(() => {
        router.push("/");
      }, 0);
      toast.add({
        severity: "success ",
        summary: "login Successfull",
        group: "success",
        life: 3000,
      });
      console.log(result.user + "USER");
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "OTP Required!",
        summary2: "Please enter the OTP you received." + error,
        group: "error",
        life: 3000,
      });
    });
};

const startPhoneVerification = () => {
  showPhoneVerification.value = true;
};

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

onMounted(async () => {
  try {
    const desktopData = await ProductService.getProductsSmall();
    desktopProducts.value = desktopData.slice(0, 9) || [];

    const mobileData = await MobileService.getProductsSmall();
    mobileProducts.value = mobileData.slice(0, 9) || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        await sendUserDataToApi(
          user.providerData[0]?.displayName,
          user.providerData[0]?.email,
          user.providerData[0]?.uid
        );

        toast.add({
          severity: "success",
          summary: "Logged in successfully!",
          summary2: "Welcome back!",
          group: "success",
          life: 3000,
        });

        setTimeout(() => {
          router.push("/");
        }, 0);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error("Google login failed:", error);
    toast.add({
      severity: "error",
      summary: "Login Failed!",
      summary2: "Incorrect username or password. Please try again.",
      group: "error",
      life: 3000,
    });
  }
};

const signInWithApple = async () => {
  try {
    const appleProvider = new OAuthProvider("apple.com");
    appleProvider.addScope("email");

    const auth = getAuth();
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;

    await sendUserDataToApi(
      user.providerData[0]?.displayName,
      user.providerData[0]?.email,
      user.providerData[0]?.uid
    );

    toast.add({
      severity: "success",
      summary: "Logged in successfully!",
      summary2: "Welcome back!",
      group: "success",
      life: 3000,
    });

    setTimeout(() => {
      router.push("/");
    }, 0);
  } catch (error) {
    console.error("Apple login failed:", error);
    toast.add({
      severity: "error",
      summary: "Login Failed!",
      summary2: "Incorrect username or password. Please try again.",
      group: "error",
      life: 3000,
    });
  }
};

const sendUserDataToApi = async (name, email, id) => {
  const apiUrl = "https://api-uat.newsshield.io/user/loginv2/";
  const payload = {
    auth0: {
      name: name,
      email: email,
      id: id,
    },
    type: "google", // This should be dynamically set based on the provider
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const responseData = await response.json();
    const token = responseData.data;
    localStorage.setItem("apiDataToken", token);
  } catch (error) {
    console.error("Failed to send data to API:", error);
  }
};
</script>

<style>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1e0627;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.main-login {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
}
.login-carousal .p-highlight {
  background-color: red !important;
  width: 25px !important;
}

.login .p-carousel-content {
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
}
.p-dropdown-trigger {
  display: none;
}
/* Desktop styles */
.loginnnn {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensures it takes the full viewport height */
}

/* Hide mobile view and show desktop view for larger screens */
@media only screen and (min-width: 768px) {
  .mobile {
    display: none;
  }
  .loginnnn {
    display: flex;
  }
}

/* Styles for mobile view */
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
  }

  /* Center the login credentials */
  .mobile .absolute {
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%; /* Adjust as needed */
    max-width: 360px; /* Adjust as needed */
  }
}

@media only screen and (max-width: 460px) {
  .mobile .absolute {
    top: 70%;
  }
}
</style>
