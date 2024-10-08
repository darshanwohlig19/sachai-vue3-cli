<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div
      class="w-full max-w-[621px] h-auto bg-white rounded-3xl shadow-lg space-y-6 p-6 relative flex flex-col items-center"
    >
      <button
        class="absolute top-4 right-4"
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

      <h2
        class="text-xl !leading-[24px] font-semibold font-lato text-[#121212] text-center mb-2"
      >
        Your invite link
      </h2>

      <div
        class="flex items-center bg-[#F8F8F8] overflow-hidden rounded border h-[40px] w-full max-w-[475px]"
      >
        <Input
          :value="inviteLink"
          readOnly
          class="w-full h-full bg-[#F8F8F8] border-none ml-[3px] font-lato font-normal text-sm !leading-[16.8px]"
        />
        <button
          class="text-white p-2 w-[32px] h-[32px] bg-[#F8F8F8] !font-lato !font-semibold text-base !leading-[19.2px]"
          @click="copyToClipboard(inviteLink)"
          v-tooltip.top="!isCopied ? ' Copy my link' : 'Copied'"
        >
          <img :src="isCopied ? Copied : CopyLink" alt="Copy Link" />
        </button>
      </div>

      <div
        class="text-center !text-base text-[#757575] !font-lato !font-normal !leading-[20.8px]"
      >
        Or
      </div>

      <div class="flex justify-center space-x-4 mb-2 flex-wrap">
        <Button
          @click="shareOnFacebook(inviteLink)"
          size="icon"
          variant="outline"
          class="rounded-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
        >
          <img :src="faceBookLogo" alt="Facebook Logo" class="social-icon" />
        </Button>

        <Button
          @click="shareOnX(inviteLink)"
          size="icon"
          variant="outline"
          class="rounded-full bg-black text-white hover:bg-black/90"
        >
          <img :src="xLogo" alt="X Logo" class="social-icon" />
        </Button>

        <Button
          @click="shareOnWhatsApp(inviteLink)"
          size="icon"
          variant="outline"
          class="rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/90"
        >
          <img :src="whatsappLogo" alt="WhatsApp Logo" class="social-icon" />
        </Button>

        <Button
          @click="shareOnLinkedIn(inviteLink)"
          size="icon"
          variant="outline"
          class="rounded-full bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
        >
          <img :src="linkDinLogo" alt="LinkedIn Logo" class="social-icon" />
        </Button>
      </div>

      <Button
        class="w-full max-w-[194px] h-[40px] !font-semibold !font-lato text-base justify-center bg-[#1E0627] hover:[#1E0627] !text-[#FFFFFF] !leading-[19.2px]"
        @click="copyToLink(inviteLink)"
      >
        <span v-if="!isCopiedLink">Copy invite link</span>
        <span v-else>Copied.!</span>
        <img
          :src="chainLink"
          class="ml-2"
          alt="Chain Link"
          v-if="!isCopiedLink"
        />
      </Button>

      <div class="text-center">
        <button
          class="text-[#1E0627] !font-semibold text-lg font-lato"
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
import Copied from "@/assets/svg/Copied.svg";

export default {
  data() {
    return {
      faceBookLogo,
      xLogo,
      linkDinLogo,
      whatsappLogo,
      chainLink,
      CopyLink,
      Copied,
      isCopied: false,
      isCopiedLink: false,
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
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 1000);
    },
    copyToLink(text) {
      navigator.clipboard.writeText(text);
      this.isCopiedLink = true;
      setTimeout(() => {
        this.isCopiedLink = false;
      }, 1000);
    },
    navigateToInviteLink(link) {
      // Open the invite link in a new tab
      window.open(link, "_blank");
    },
    shareOnFacebook(link) {
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`;
      window.open(facebookShareUrl, "_blank");
    },
    shareOnLinkedIn(link) {
      const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        link
      )}`;
      window.open(linkedInShareUrl, "_blank");
    },
    shareOnWhatsApp(link) {
      const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
        link
      )}`;
      window.open(whatsappShareUrl, "_blank");
    },
    shareOnX(link) {
      const xShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
        link
      )}`;
      window.open(xShareUrl, "_blank");
    },
  },
};
</script>

<style scoped>
.social-icon {
  width: 30px;
  height: 30px;
}
.tooltip.top {
  margin-top: 15px;
}
</style>
