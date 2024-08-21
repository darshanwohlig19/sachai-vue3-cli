<template>
  <div class="flex justify-center items-center p-[100px]">
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
                class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center"
                @click="loginWithGoogle"
              >
                <img
                  src="https://ik.imagekit.io/553gmaygy/Group%20(1).png?updatedAt=1724069687283"
                  class="text-[34px] cursor-pointer"
                />
              </div>
              <div
                class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center"
                @click="signInWithApple"
              >
                <img
                  src="https://ik.imagekit.io/553gmaygy/Capa_1%20(1).png?updatedAt=1724069687282"
                  class="text-[34px] cursor-pointer"
                />
              </div>
              <div
                class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center"
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
          :value="products"
          :numVisible="1"
          :numScroll="1"
          class="carousel login-carousal"
          showIndicators
          circular
          :responsiveOptions="responsiveOptions"
        >
          <!-- :autoplayInterval="2000" -->

          <template #item="slotProps">
            <div>
              <div class="rounded-r-[20px]">
                <div class="relative mx-auto h-[512px] rounded-r-[20px]">
                  <img
                    :src="slotProps.data.image"
                    :severity="getSeverity(slotProps.data.inventoryStatus)"
                    class="w-[100%] h-[100%] object-fill rounded-r-[20px]"
                  />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>
<!-- <script setup>
import { ref, onMounted } from "vue";
import { ProductService } from "../assets/service/ProductService";

onMounted(() => {
  ProductService.getProductsSmall().then(
    (data) => (products.value = data.slice(0, 9))
  );
});

const products = ref();
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
</script> -->

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/firebaseConfig";
import { ProductService } from "../assets/service/ProductService";
import {
  signInWithPopup,
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";

export default {
  setup() {
    const router = useRouter();
    const phoneNumber = ref("");
    const verificationCode = ref("");
    const showPhoneVerification = ref(false);
    // var recaptchaVerifier = ref(null);
    var appVerifier = ref(null);
    const verificationCodeTab = ref(false);
    const userName = ref("");
    const userEmail = ref("");
    const userId = ref("");
    // Initialize reCAPTCHA verifier
    onMounted(() => {
      ProductService.getProductsSmall().then(
        (data) => (products.value = data.slice(0, 9))
      );
    });
    const products = ref();

    const captcha = async () => {
      console.log("ReCAPTCHA solved:");
      const auth = getAuth();
      //   if (showPhoneVerification.value) {
      appVerifier = window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log(response);
            showPhoneVerification.value = true;
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
          },
        }
      );
      sendVerificationCode();
      //   }
    };

    const loginWithGoogle = async () => {
      try {
        const googleProvider = new OAuthProvider("google.com");
        googleProvider.addScope("email");
        const result = await signInWithPopup(auth, googleProvider);

        // Storing the user information in variables
        userName.value = result.user.displayName;
        userEmail.value = result.user.email;
        userId.value = result.user.uid;

        console.log("Google User Info:", {
          userName: userName.value,
          userEmail: userEmail.value,
          userId: userId.value,
        });

        // Send the data to your API
        sendUserDataToApi(userName.value, userEmail.value, userId.value);

        router.push("/").then(() => {
          // window.location.reload();
        });
      } catch (error) {
        console.error("Google login failed:", error);
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
        type: "google",
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
        console.log("API Response:", responseData);
        const token = responseData.data;

        // Store the `data` field in local storage
        localStorage.setItem("apiDataToken", token);

        // Optionally, log the stored token to confirm
        console.log("Stored token:", localStorage.getItem("apiDataToken"));
        // Handle response data here if needed
      } catch (error) {
        console.error("Failed to send data to API:", error);
      }
    };

    const signInWithApple = async () => {
      try {
        const appleProvider = new OAuthProvider("apple.com");
        appleProvider.addScope("email");
        const result = await signInWithPopup(auth, appleProvider);
        console.log("Apple User Info:", result.user);
        router.push("/").then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Apple login failed:", error);
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
        // if (!recaptchaVerifier.value) {
        //   console.error("ReCAPTCHA verifier is not initialized.");
        //   return;
        // }

        console.log("Sending OTP to:", phoneNumber.value);

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber.value,
          appVerifier
        );

        console.log("Verification code sent to:", phoneNumber.value);
        window.confirmationResult = confirmationResult;
      } catch (error) {
        console.error("Failed to send verification code:", error.message);
        console.log(`Error: ${error.message}`); // Alert the user if there's an issue
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

    return {
      phoneNumber,
      verificationCode,
      showPhoneVerification,
      sendVerificationCode,
      verifyCode,
      loginWithGoogle,
      signInWithApple,
      togglePhoneVerification,
      verificationCodeTab,
      handleSendVerificationCode,
      captcha,
    };
  },
};
</script>
<style>
.login-carousal .p-highlight {
  background-color: red !important;
  width: 25px !important;
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
  height: 8px ip !important;
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
</style>
