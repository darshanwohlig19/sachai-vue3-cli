<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div
      class="!w-[621px] !h-[404px] bg-white rounded-3xl shadow-lg space-y-6 relative flex flex-col items-center justify-center"
    >
      <button
        class="absolute top-4 right-4 h-[10px]"
        @click="$emit('close')"
        aria-label="Close"
      >
        <div class="border border-[#121212] rounded-full inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="text-[#121212] hover:text-gray-800 h-[27px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </button>

      <h2 class="text-2xl font-bold font-lato text-[#121212] text-center mb-2">
        Your invite link
      </h2>

      <div
        class="flex items-center bg-[#F8F8F8] overflow-hidden rounded border h-[40px] w-[475px]"
      >
        <Input
          :value="inviteLink"
          readOnly
          class="w-full h-full ml-[1px] bg-[#F8F8F8]"
        />
        <button
          class="text-white p-2 w-[32px] h-[32px] bg-[#F8F8F8]"
          @click="copyToClipboard(inviteLink)"
        >
          <img :src="CopyLink" />
        </button>
      </div>

      <div class="text-center font-normal text-base text-[#757575]">Or</div>

      <div class="flex justify-center space-x-4 mb-2">
        <Button
          size="icon"
          variant="outline"
          class="rounded-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
        >
          <img :src="faceBookLogo" alt="Facebook Logo" class="social-icon" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          class="rounded-full bg-black text-white hover:bg-black/90"
        >
          <img :src="xLogo" alt="X Logo" class="social-icon" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          class="rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/90"
        >
          <img :src="whatsappLogo" alt="WhatsApp Logo" class="social-icon" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          class="rounded-full bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
        >
          <img :src="linkDinLogo" alt="LinkedIn Logo" class="social-icon" />
        </Button>
      </div>

      <Button
        class="w-[194px] h-[40px] font-bold font-lato text-base justify-center bg-[#1E0627] hover:[#1E0627] text-[#FFFFFF]"
        @click="copyToClipboard(inviteLink)"
      >
        Copy my link
        <img :src="chainLink" class="ml-2" />
      </Button>

      <div class="text-center">
        <button
          class="text-[#1E0627] font-semibold text-lg font-lato"
          @click="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import faceBookLogo from "@/assets/svg/facebook.svg";
import xLogo from "@/assets/svg/x.svg";
import linkDinLogo from "@/assets/svg/linkdin.svg";
import whatsappLogo from "@/assets/svg/whatsapp.svg";
import chainLink from "@/assets/svg/chain.svg";
import CopyLink from "@/assets/svg/copy.svg";

export default {
  data() {
    return {
      faceBookLogo,
      xLogo,
      linkDinLogo,
      whatsappLogo,
      chainLink,
      CopyLink,
    };
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    inviteLink: {
      type: String,
      required: true,
    },
  },

  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
  },
};
</script>

<style scoped>
.social-icon {
  width: 24px;
  height: 24px;
}
</style>
