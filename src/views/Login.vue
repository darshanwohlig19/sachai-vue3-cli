<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-4 h-[512px] w-[910px]">
      <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 mb-2">Email</label>
        <InputText
          v-model="email"
          id="email"
          type="email"
          placeholder="Enter your email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 mb-2">Password</label>
        <Password
          v-model="password"
          id="password"
          placeholder="Enter your password"
          toggleMask
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <Button
        label="Sign Up"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        @click="signUp"
      />
      <p v-if="errorMessage" class="text-red-600 mt-4 text-center">
        {{ errorMessage }}
      </p>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="flex flex-row w-[910px] h-[512px]">
      <div class="w-[50%]">
        <div class="flex justify-center items-center">
          <img
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
            class="w-[128px] h-[33px] object-cover"
          />
        </div>
        <div>
          <span class="text-[32px]">Hello !</span><br />
          <span class="text-[32px]">Login to your Account</span>
        </div>
      </div>
      <div class="w-[50%]"></div>
    </div>
  </div>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <Button
        label="Sign in with Google"
        icon="pi pi-google"
        class="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-300 mb-4"
        @click="googleLogin"
      />

      <div class="mb-4">
        <label for="email" class="block text-gray-700 mb-2">Email</label>
        <InputText
          v-model="email"
          id="email"
          type="email"
          placeholder="Enter your email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 mb-2">Password</label>
        <Password
          v-model="password"
          id="password"
          placeholder="Enter your password"
          toggleMask
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <Button
        label="Sign Up"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        @click="signUp"
      />
      <p v-if="errorMessage" class="text-red-600 mt-4 text-center">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<!-- <script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const signUp = () => {
  const auth = getAuth();

  console.log("Email:", email.value);
  console.log("Password:", password.value);

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log("User Created:", userCredential);
      router.push("/"); // Redirect to home or another page after successful signup
    })
    .catch((error) => {
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      errorMessage.value = "Sign-up failed: " + error.message;
    });
};

// const email = ref("");
// const password = ref("");
// const errorMessage = ref("");
// const router = useRouter();

// const signUp = () => {
//   const auth = getAuth();

//   createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then((userCredential) => {
//       console.log("User Created:", userCredential);
//       router.push("/"); // Redirect to home or another page after successful signup
//     })
//     .catch((error) => {
//       console.error("Error Code:", error.code);
//       console.error("Error Message:", error.message);
//       errorMessage.value = "Sign-up failed: " + error.message;
//     });
// };

const googleLogin = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Google User Signed In:", result.user);
      router.push("/"); // Redirect to home or another page after successful login
    })
    .catch((error) => {
      console.error("Google Login Error:", error);
      errorMessage.value = "Google login failed: " + error.message;
    });
};
</script> -->
<script setup>
import { ref } from "vue";
import {
  getAuth,
  //   signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";

// Reactive state
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

// Sign up function
const signUp = () => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log("User Created:", userCredential);
      router.push("/"); // Redirect after successful signup
    })
    .catch((error) => {
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      errorMessage.value = "Sign-up failed: " + error.message;
    });
};

// Google login function
const googleLogin = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Google User Signed In:", result.user);
      router.push("/"); // Redirect after successful login
    })
    .catch((error) => {
      console.error("Google Login Error:", error);
      errorMessage.value = "Google login failed: " + error.message;
    });
};
</script>

<style scoped></style>
