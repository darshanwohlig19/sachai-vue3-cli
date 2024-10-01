<template>
  <div class="backgroundddd">
    <div class="relative z-1">
      <Navbarrr />
    </div>

    <div class="">
      <div class="w-[100%] mt-5 p-3 flex">
        <div
          class="w-[100%] sm:flex sm:flex-row sm:relative flex flex-col-reverse relative bg-white rounded-[10px]"
        >
          <div
            class="w-[100%] sm:top-0 between-lg-max-md-max:w-[60%] between-md-max-sm-max:w-[50%] md:w-[70%] p-3 between-xs-max-sm-max:!pt-[155px]"
          >
            <div
              class="font-lato font-[700] text-[18px] sm:text-[20px] text-[#1e0627]"
            >
              Welcome to sachai!
            </div>
            <div
              class="font-lato text-[14px] sm:text-[16px] text-[#878787] mt-2"
            >
              At sachai, we are firm believers in the power of truth. In today's
              world flooded with information, distinguishing fact from fiction
              has become increasingly challenging. Our primary goal is to cut
              through this noise and offer our readers credible, reliable, and
              unbiased information.
            </div>
          </div>
          <div
            class="w-[30%] between-lg-max-md-max:w-[40%] between-md-max-sm-max:w-[50%] -mt-0 sm:-mt-6"
          >
            <div
              class="!absolute !right-0 -top-16 sm:-top-0px sm:absolute w-[253px] h-[170px] sm:w-[313px] sm:h-[204px] mt-[20px] md:mt-[0px]"
            >
              <img
                class="relative sm:absolute"
                width="100%"
                height="100%"
                src="../assets/svg/about-us.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-[100%] p-3 flex flex-col sm:flex sm:flex-row gap-4">
        <div class="w-[100%] sm:w-[40%] p-3 rounded-[12px] bg-white">
          <div
            class="font-lato font-[700] text-[18px] sm:text-[20px] text-[#1e0627]"
          >
            Who We Are
          </div>
          <div class="font-lato text-[14px] sm:text-[16px] text-[#878787] mt-2">
            We are a team of passionate individuals committed to the pursuit of
            truth. Our expertise spans journalism, technology, research, and
            academia. Together, we bring diverse perspectives and knowledge to
            the table, enabling us to address complex issues with clarity and
            insight.
          </div>
        </div>
        <div class="w-[100%] sm:w-[60%] p-3 rounded-[12px] bg-white">
          <div
            class="font-lato font-[700] text-[18px] sm:text-[20px] text-[#1e0627]"
          >
            What We Do
          </div>
          <div class="font-lato text-[14px] sm:text-[16px] text-[#878787] mt-2">
            At sachai, our aim is to deliver top-notch content that informs,
            educates, and inspires. From breaking news to in-depth analysis, we
            cover a broad spectrum of topics including politics, science,
            culture, and more. Our dedication to accuracy and integrity ensures
            that you can rely on us for factual information, free from bias or
            hidden agendas.
          </div>
        </div>
      </div>
      <div class="w-[100%] p-3 flex flex-col sm:flex sm:flex-row gap-4">
        <div class="w-[100%] sm:w-[50%] p-3 rounded-[12px] bg-white">
          <div
            class="font-lato font-[700] text-[18px] sm:text-[20px] text-[#1e0627]"
          >
            Why Choose Us
          </div>
          <div class="font-lato text-[14px] sm:text-[16px] text-[#878787] mt-2">
            In an era plagued by misinformation, sachai stands out as a beacon
            of truth. Our adherence to journalistic principles and unwavering
            commitment to transparency set us apart. When you visit sachai, you
            can trust that you're receiving the complete story, supported by
            thorough research and meticulous fact-checking.
          </div>
        </div>
        <div class="w-[100%] sm:w-[50%] p-3 rounded-[12px] bg-white">
          <div
            class="font-lato font-[700] text-[18px] sm:text-[20px] text-[#1e0627]"
          >
            Get Involved
          </div>
          <div class="font-lato text-[14px] sm:text-[16px] text-[#878787] mt-2">
            We believe that seeking truth is a collaborative endeavor.
            Therefore, we encourage our readers to engage with us, share their
            insights, and participate in discussions. Whether you have a tip to
            offer, a question to pose, or a story to share, we want to hear from
            you. Together, we can contribute to a more informed and enlightened
            society.
          </div>
        </div>
      </div>
      <div
        class="mt-4 flex justify-center text-center font-lato sm:text-[20px] text-[14px] text-[#878787]"
      >
        “Thank you for choosing Sachai. We eagerly anticipate serving you and
        becoming your trusted source for<br />
        news and information.”
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Navbarrr from "@/components/Navbarrr.vue";
import Footer from "@/components/Footer.vue";
</script>
<style scoped>
body {
  background-color: #f1f1f1;
}
.heading {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  color: black;
}
.para {
  font-family: lato;
  font-size: 28px;
  color: #757575;
}
.last-heading {
  color: black;
  font-size: 28px;
  font-weight: 700;
}
.backgroundddd {
  background-image: url(@/assets/svg/Ellipse.svg/);
  background-repeat: no-repeat;
  background-size: 100% 350px;
}

@media screen and (max-width: 576px) {
  .backgroundddd {
    background-image: url(@/assets/svg/mobile-image.png/);
    background-repeat: no-repeat;
    /* width: 100%; */
    background-size: 100%;
  }
}
</style>
