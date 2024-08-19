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
        <div class="mt-20">
          <div class="text-[32px] font-lato">Hello !</div>
          <div class="mt-2 text-[18px] font-lato">Login to your account</div>
          <div class="flex flex-row gap-4 mt-6 w-[100%]">
            <div
              class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center"
              @click="loginWithGoogle"
            >
              <img
                src="https://ik.imagekit.io/553gmaygy/Group%20(1).png?updatedAt=1724069687283"
                class="text-[34px]"
              />
            </div>
            <div
              class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center"
            >
              <img
                src="https://ik.imagekit.io/553gmaygy/Capa_1%20(1).png?updatedAt=1724069687282"
                class="text-[34px]"
                @click="signInWithApple"
              />
            </div>
            <div
              class="bg-[#F7F7F7] w-[98px] h-[52px] flex items-center justify-center"
            >
              <img
                src="https://ik.imagekit.io/553gmaygy/fa6-solid_phone-flip.png?updatedAt=1724069817849"
                class="text-[34px]"
                @click="togglePhoneVerification"
              />
            </div>
          </div>
          <div class="text-center mt-10 text-[18px] text-[#FF0053]">
            Continue without login
          </div>
          <div
            id="recaptcha-container"
            v-if="showPhoneVerification"
            class="mt-4"
          ></div>
          <div v-if="showPhoneVerification" class="mt-4">
            <input
              v-model="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
              class="border p-2 mt-2"
            />
            <button
              @click="sendVerificationCode"
              class="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Send Verification Code
            </button>
            <input
              v-model="verificationCode"
              type="text"
              placeholder="Enter verification code"
              class="border p-2 mt-2"
            />
            <button
              @click="verifyCode"
              class="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Verify Code
            </button>
          </div>
        </div>
      </div>
      <div class="w-[50%]">
        <img
          src="https://ik.imagekit.io/553gmaygy/17.png?updatedAt=1724067776564"
          class="h-[100%] w-[100%] rounded-r-[20px]"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<!-- <script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/firebaseConfig";
import {
  signInWithPopup,
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default {
  setup() {
    const router = useRouter();
    const phoneNumber = ref("");
    const verificationCode = ref("");
    const showPhoneVerification = ref(false);
    const recaptchaVerifier = ref(null);

    // Initialize reCAPTCHA verifier
    onMounted(() => {
      recaptchaVerifier.value = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("ReCAPTCHA solved:", response);
            showPhoneVerification.value = true;
          },
          "expired-callback": () => {
            console.log("ReCAPTCHA expired.");
          },
        }
      );
    });

    const loginWithGoogle = async () => {
      try {
        const googleProvider = new OAuthProvider("google.com");
        googleProvider.addScope("email");
        const result = await signInWithPopup(auth, googleProvider);
        console.log("User Info:", result.user);
        router.push("/");
      } catch (error) {
        console.error("Google login failed:", error);
      }
    };

    const signInWithApple = async () => {
      try {
        const appleProvider = new OAuthProvider("apple.com");
        appleProvider.addScope("email");
        const result = await signInWithPopup(auth, appleProvider);
        console.log("Apple User Info:", result.user);
        router.push("/");
      } catch (error) {
        console.error("Apple login failed:", error);
      }
    };

    const togglePhoneVerification = () => {
      showPhoneVerification.value = true;
    };

    const sendVerificationCode = async () => {
      try {
        if (!recaptchaVerifier.value) {
          console.error("ReCAPTCHA verifier is not initialized.");
          return;
        }

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber.value,
          recaptchaVerifier.value
        );

        console.log("Verification code sent to:", phoneNumber.value);
        window.confirmationResult = confirmationResult; // Store confirmationResult for later use
      } catch (error) {
        console.error("Failed to send verification code:", error);
      }
    };

    const verifyCode = async () => {
      try {
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(verificationCode.value);
        console.log("User Info:", result.user);
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
    };
  },
};
</script> -->
<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/firebaseConfig";
import {
  signInWithPopup,
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default {
  setup() {
    const router = useRouter();
    const phoneNumber = ref("");
    const verificationCode = ref("");
    const showPhoneVerification = ref(false);
    const recaptchaVerifier = ref(null);

    // Initialize reCAPTCHA verifier
    onMounted(() => {
      recaptchaVerifier.value = new RecaptchaVerifier(
        "recaptcha-container", // Changed order of parameters
        {
          size: "invisible",
          callback: (response) => {
            console.log("ReCAPTCHA solved:", response);
            showPhoneVerification.value = true;
          },
          "expired-callback": () => {
            console.log("ReCAPTCHA expired.");
          },
        },
        auth // auth should be the third parameter
      );
    });

    const loginWithGoogle = async () => {
      try {
        const googleProvider = new OAuthProvider("google.com");
        googleProvider.addScope("email");
        const result = await signInWithPopup(auth, googleProvider);
        console.log("User Info:", result.user);
        router.push("/").then(() => {
          window.location.reload(); // Force reload
        });
      } catch (error) {
        console.error("Google login failed:", error);
      }
    };

    const signInWithApple = async () => {
      try {
        const appleProvider = new OAuthProvider("apple.com");
        appleProvider.addScope("email");
        const result = await signInWithPopup(auth, appleProvider);
        console.log("Apple User Info:", result.user);
        router.push("/").then(() => {
          window.location.reload(); // Force reload
        });
      } catch (error) {
        console.error("Apple login failed:", error);
      }
    };

    const togglePhoneVerification = () => {
      showPhoneVerification.value = true;
    };

    const sendVerificationCode = async () => {
      try {
        if (!recaptchaVerifier.value) {
          console.error("ReCAPTCHA verifier is not initialized.");
          return;
        }

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber.value,
          recaptchaVerifier.value
        );

        console.log("Verification code sent to:", phoneNumber.value);
        window.confirmationResult = confirmationResult; // Store confirmationResult for later use
      } catch (error) {
        console.error("Failed to send verification code:", error);
      }
    };

    const verifyCode = async () => {
      try {
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(verificationCode.value);
        console.log("User Info:", result.user);
        router.push("/"); // Ensure this triggers navigation
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
    };
  },
};
</script>
