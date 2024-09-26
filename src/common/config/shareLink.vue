<template>
  <div>
    <Button label="Show" @click="showDialog = true" />

    <Dialog
      header="Your Invite Link"
      v-model:visible="isVisible"
      modal
      :closable="false"
    >
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-4 text-center">Your invite link</h2>

        <div class="bg-gray-100 rounded-md p-3 flex items-center mb-4">
          <input
            :value="inviteLink"
            readonly
            class="bg-transparent flex-grow outline-none text-sm"
            aria-label="Invite link"
          />
          <button
            class="ml-2 text-gray-500"
            @click="copyLink"
            aria-label="Copy link"
          >
            <!-- <CopyIcon class="w-5 h-5" /> -->
            <i class="pi pi-copy"></i>
            <!-- Example icon, replace with your CopyIcon -->
          </button>
        </div>

        <p class="text-center text-gray-600 mb-4">Or</p>

        <button
          @click="copyLink"
          class="w-full bg-[#1E0627] text-white py-2 rounded-md font-semibold mb-4 flex items-center justify-center"
          aria-label="Copy my link"
        >
          Copy my link
          <!-- <CopyIcon class="w-5 h-5 ml-2" /> -->
          <i class="pi pi-copy ml-2"></i>
          <!-- Example icon -->
        </button>

        <button
          @click="close"
          class="w-full text-gray-600 font-semibold"
          aria-label="Cancel"
        >
          Cancel
        </button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { Dialog } from "primevue/dialog";
import Button from "primevue/button"; // Import PrimeVue Button

const props = defineProps({
  inviteLink: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isVisible = ref(false); // Control dialog visibility

const showDialog = () => {
  isVisible.value = true;
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.inviteLink);
    alert("Link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const close = () => {
  emit("update:modelValue", false);
  isVisible.value = false; // Close the dialog
};
</script>

<style scoped></style>
