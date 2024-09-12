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
                  @click="togglePhoneVerification('Login/phone')"
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
                class="text-center text-[#333333] font-lato font-[700] text-[24px]"
              >
                Phone Verification
              </div>

              <div v-if="!verificationCodeTab">
                <div class="flex justify-center mt-4">
                  <CountryCode
                    v-model="selectedCountryCode"
                    class="border p-2 rounded-[4px]"
                    :default-country="'IN'"
                    :show-flags="true"
                    placeholder="Select Country Code"
                  />
                  <input
                    v-model="phoneNumber"
                    type="text"
                    placeholder="Phone"
                    class="border p-2 w-[304px] rounded-[4px]"
                  />
                </div>
                <div class="flex justify-center">
                  <button
                    @click="handleSendVerificationCode"
                    class="bg-[#1E0627] font-lato text-center text-[#FFFFFF] p-2 rounded-[10px] mt-2 w-[304px] h-[44px]"
                  >
                    Send Verification Code
                  </button>
                </div>
                <div
                  @click="showPhoneVerification = false"
                  class="text-center font-lato text-[#5E5E5E] mt-2 cursor-pointer"
                >
                  Want to select other login method?
                </div>
              </div>
              <div v-else>
                <div class="card flex justify-center">
                  <div>
                    <InputOtp
                      v-model="verificationCode"
                      :length="6"
                      integerOnly
                      class="p-2 mt-4 rounded-[4px]"
                    />
                  </div>
                </div>
                <div class="flex justify-center">
                  <button
                    @click="verifyCode"
                    class="bg-[#1E0627] font-lato text-center text-[#FFFFFF] p-2 rounded-[10px] mt-2 w-[304px] h-[44px]"
                  >
                    Verify OTP
                  </button>
                </div>
                <div class="flex justify-between">
                  <div
                    class="text-center font-lato text-[#5E5E5E] text-[14px] mt-2 cursor-pointer"
                    @click="verificationCodeTab = false"
                  >
                    Edit Phone Number?
                  </div>
                  <div
                    class="text-center text-[14px] font-lato text-[#5E5E5E] mt-2 cursor-pointer"
                  >
                    Resend OTP&nbsp;
                    <span
                      class="text-center text-[14px] font-lato text-[#BBBBBB] mt-2 cursor-pointer"
                      >After 30 sec</span
                    >
                  </div>
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
                  @click="togglePhoneVerification('Login/phone')"
                >
                  <img
                    src="https://ik.imagekit.io/553gmaygy/fa6-solid_phone-flip.png?updatedAt=1724069817849"
                    class="text-[34px] cursor-pointer"
                  />
                </div>
              </div>

              <div
                class="text-center text-[#FF0053] cursor-pointer mt-10 font-lato text-[18px]"
              >
                <router-link to="/">Continue without login</router-link>
              </div>
            </div>

            <!-- Phone Number Verification UI -->
            <div v-else>
              <div
                class="text-center text-[#333333] font-lato font-[700] text-[24px]"
              >
                Phone Verification
              </div>

              <div v-if="!verificationCodeTab">
                <div class="flex justify-center mt-4">
                  <CountryCode
                    v-model="selectedCountryCode"
                    class="border p-2 rounded-[4px]"
                    :default-country="'IN'"
                    :show-flags="true"
                    placeholder="Select Country Code"
                  />
                  <input
                    v-model="phoneNumber"
                    type="text"
                    placeholder="Phone"
                    class="border p-2 w-[304px] rounded-[4px]"
                  />
                </div>
                <div class="flex justify-center mt-4">
                  <button
                    @click="handleSendVerificationCode"
                    class="bg-[#1E0627] font-lato text-center text-[#FFFFFF] p-2 rounded-[10px] w-full"
                  >
                    Send Verification Code
                  </button>
                </div>
                <div
                  class="text-center font-lato text-[#5E5E5E] mt-2 cursor-pointer"
                  @click="showPhoneVerification = false"
                >
                  Want to select other login method?
                </div>
              </div>
              <div v-else>
                <div class="card flex justify-center">
                  <div>
                    <InputOtp
                      v-model="verificationCode"
                      :length="6"
                      integerOnly
                      class="p-2 mt-4 rounded-[4px]"
                    />
                  </div>
                </div>
                <div class="flex justify-center mt-4">
                  <button
                    @click="verifyCode"
                    class="bg-[#1E0627] font-lato text-center text-[#FFFFFF] p-2 rounded-[10px] w-full"
                  >
                    Verify OTP
                  </button>
                </div>
                <div class="flex justify-between mt-2">
                  <div
                    class="text-center font-lato text-[#5E5E5E] text-[14px] cursor-pointer"
                    @click="verificationCodeTab = false"
                  >
                    Edit Phone Number?
                  </div>
                  <div class="text-center text-[#5E5E5E] text-[14px]">
                    Resend OTP&nbsp;
                    <span class="text-[#BBBBBB]">After 30 sec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
import InputOtp from "primevue/inputotp";
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { auth } from "@/firebaseConfig";
import { ProductService } from "../assets/service/ProductService";
import { MobileService } from "../assets/service/MobileService";
import {
  signInWithPopup,
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

// Reactive variables for desktop and mobile products
const router = useRouter();
const toast = useToast();
const selectedCountryCode = ref("IN"); // Default to India (IN)
const phoneNumber = ref("");
const verificationCode = ref("");
const showPhoneVerification = ref(false);
const appVerifier = ref(null);
const verificationCodeTab = ref(false);
// const userName = ref("");
// const userEmail = ref("");
// const userId = ref("");
// const products = ref([]);
const desktopProducts = ref([]);
const mobileProducts = ref([]);
// const phoneNumber = ref("");
// const verificationCode = ref("");
// const showPhoneVerification = ref(false);
// const verificationCodeTab = ref(false);

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
const captcha = async () => {
  console.log("ReCAPTCHA solved:");
  const auth = getAuth();

  appVerifier.value = window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        console.log(response);
        showPhoneVerification.value = true;
      },
    }
  );
  sendVerificationCode();
};
const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log(token);
        console.log(credential);
        console.log("USER>>>>>>>>>>>");

        // Send user data to API
        await sendUserDataToApi(
          user.providerData[0]?.displayName,
          user.providerData[0]?.email,
          user.providerData[0]?.uid
        );

        // // Show toast notification after navigation
        // toast.add({
        //   severity: "success",
        //   summary: "Successfully Login",
        //   detail: "Successfully logged in with Google!",
        //   life: 3000,
        // });
        toast.add({
          severity: "success",
          summary: "Logged in successfully!",
          summary2: "Welcome back!",
          group: "success",
          life: 3000,
        });
        // Wait for navigation to complete
        setTimeout(() => {
          router.push("/");
        }, 0);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
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

const signInWithApple = async () => {
  try {
    const appleProvider = new OAuthProvider("apple.com");
    appleProvider.addScope("email");

    const auth = getAuth();
    const result = await signInWithPopup(auth, appleProvider);

    // The signed-in user info
    const user = result.user;

    // Apple credential
    // const credential = OAuthProvider.credentialFromResult(result);
    // const accessToken = credential.accessToken;
    // const idToken = credential.idToken;

    // Sending user data to your API
    await sendUserDataToApi(
      user.providerData[0]?.displayName,
      user.providerData[0]?.email,
      user.providerData[0]?.uid
    );

    // Log the user info
    console.log("Apple User Info:", user);

    // Show a success toast
    toast.add({
      severity: "success",
      summary: "Logged in successfully!",
      summary2: "Welcome back!",
      group: "success",
      life: 3000,
    });

    // Wait for navigation to complete
    setTimeout(() => {
      router.push("/");
    }, 0);
  } catch (error) {
    // Handle errors here
    console.error("Apple login failed:", error);

    // Show an error toast
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
  console.log("name", name);
  console.log("email", email);
  console.log("id", id);
  const apiUrl = "https://api-uat.newsshield.io/user/loginv2/";
  const payload = {
    auth0: {
      name: name,
      email: email,
      id: id,
    },
    type: "google",
  };
  console.log("payload", payload);

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
    console.log("API Response:", responseData);
    const token = responseData.data;

    localStorage.setItem("apiDataToken", token);
    console.log("Stored token:", localStorage.getItem("apiDataToken"));
  } catch (error) {
    console.error("Failed to send data to API:", error);
  }
};

const togglePhoneVerification = () => {
  captcha();
  showPhoneVerification.value = true;
};

const handleSendVerificationCode = () => {
  sendVerificationCode();
  verificationCodeTab.value = true;
};
const sendVerificationCode = async () => {
  try {
    console.log("Sending OTP to:", phoneNumber.value);

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber.value,
      appVerifier.value
    );

    console.log("Verification code sent to:", phoneNumber.value);
    window.confirmationResult = confirmationResult;
  } catch (error) {
    console.error("Failed to send verification code:", error.message);
    console.log(`Error: ${error.message}`);
  }
};
const verifyCode = async () => {
  try {
    const confirmationResult = window.confirmationResult;
    const result = await confirmationResult.confirm(verificationCode.value);
    console.log("User Info:", result);
    router.push("/");
  } catch (error) {
    console.error("Verification failed:", error);
  }
};
</script>
<style>
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
