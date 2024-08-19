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
            <Button icon="pi pi-apple" />
            <Button icon="pi pi-phone" />
          </div>
        </div>
      </div>
      <div class="w-[50%]">2</div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { auth, provider } from "@/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export default {
  setup() {
    const router = useRouter();

    const loginWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("User Info:", result.user);
        router.push("/");
      } catch (error) {
        console.error("Google login failed:", error);
      }
    };

    return { loginWithGoogle };
  },
};
</script>
