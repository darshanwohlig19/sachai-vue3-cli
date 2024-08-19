<template>
  <div class="flex justify-center items-center p-[100px]">
    <div class="w-[910px] h-[512px] flex bg-white rounded-[20px]">
      <div class="w-[50%] p-[5%]">
        <div class="flex justify-center">
          <img
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
            class="w-[128px] h-[33px] object-cover"
          />
        </div>
        <div class="mt-10">
          <div>Hello !</div>
          <div class="mt-2">Login to your account</div>
          <div class="flex flex-row gap-4 mt-3">
            <Button icon="pi pi-google" @click="loginWithGoogle" />
            <Button icon="pi pi-apple" @click="signInWithApple" />
            <Button icon="pi pi-phone" />
          </div>
          <div id="recaptcha-container"></div>
          <div class="mt-4">
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
      <div class="w-[50%]">2</div>
      <div id="recaptcha-container" class="justify-center flex"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/firebaseConfig"; // Ensure this path is correct
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
    const recaptchaVerifier = ref(null); // Use reactive state

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

    const sendVerificationCode = async () => {
      //   const initiatePhoneLogin = () => {
      var appVerifier;
      const auth = getAuth();
      if (!showPhoneVerification.value) {
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
      }
      signInWithPhoneNumber(auth, phoneNumber.value, appVerifier).then(
        (confirmationResult) => {
          console.log("NUMBER: " + phoneNumber.value);

          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        }
      );
      //     .catch((error) => {
      //       console.log(error);
      //     });
      if (!recaptchaVerifier.value) {
        console.error("ReCAPTCHA verifier is not initialized.");
        return;
      }
      try {
        // const appVerifier = recaptchaVerifier.value;
        // const confirmationResult = await signInWithPhoneNumber(
        //   auth,
        //   phoneNumber.value,
        //   appVerifier
        // );
        // window.confirmationResult = confirmationResult; // Store confirmationResult for later use
        // console.log("Verification code sent to:", phoneNumber.value);
      } catch (error) {
        console.error("Failed to send verification code:", error);
      }
    };

    const verifyCode = async () => {
      try {
        // Ensure the confirmationResult is available
        const confirmationResult = window.confirmationResult;
        if (!confirmationResult) {
          throw new Error("No confirmation result found.");
        }

        // Confirm the verification code
        const result = await confirmationResult.confirm(verificationCode.value);

        // Successful verification
        console.log("User Info:", result.user);
        router.push("/"); // Redirect to the home page
      } catch (error) {
        console.error("Verification failed:", error);
      }
    };

    return {
      phoneNumber,
      verificationCode,
      showPhoneVerification,
      //   initiatePhoneLogin,
      sendVerificationCode,
      verifyCode,
      loginWithGoogle,
      signInWithApple,
    };
  },
};
</script>
