<template>
  <div>
    <SiteHeader />
    <div>
      <img
        class="h-auto w-full"
        src="https://ik.imagekit.io/553gmaygy/Mask%20group.png?updatedAt=1724327336715"
      />
    </div>
    <div class="mt-[-30%]">
      <div class="flex justify-center">
        <div class="flex justify-between w-[80%]">
          <div>
            <div style="color: white" class="text-[26px] sm:text-[52px]">
              Darshan Gada
            </div>
            <div style="color: white" class="text-[16px] sm:text-[32px]">
              Swati 28 July 2023
            </div>
          </div>

          <div class="flex flex-col justify-center">
            <div
              class="h-[48px] w-[48px] sm:h-[77px] sm:w-[77px] rounded-[50%] bg-white flex justify-center items-center"
            >
              <i class="mdi mdi-zodiac-scorpio text-[26px] sm:text-[51px]"> </i>
            </div>
            <div
              class="text-white text-center text-[16px] sm:-text-[26px] font-lato font-semibold"
            >
              Scorpio
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-2 sm:mt-10">
        <Card class="h-[100%] w-[90%] sm:w-[85%] rounded-[50px] p-4">
          <template #title>
            <TabView>
              <TabPanel header="Today's Prediction">
                <div>
                  <div
                    class="text-[16px] sm:text-[28px] font-bold font-lato text-[#121212]"
                  >
                    Health
                  </div>
                  <div
                    class="mt-2 text-[16px] sm:text-[24px] font-lato text-[#757575]"
                  >
                    Anxiety could be the cause of some health related problems
                    today. Make sure that you get complete rest and relaxation.
                  </div>
                </div>
                <div class="mt-4">
                  <div
                    class="text-[16px] sm:text-[28px] font-bold font-lato text-[#121212]"
                  >
                    Emotions
                  </div>
                  <div
                    class="mt-2 text-[16px] sm:text-[24px] font-lato text-[#757575]"
                  >
                    Negative emotions which have been brewing since quite some
                    time shall surface today. You will become more sensitive in
                    your approach and get hurt easily.
                  </div>
                </div>
                <div class="mt-4">
                  <div
                    class="text-[16px] sm:text-[28px] font-bold font-lato text-[#121212]"
                  >
                    Profession
                  </div>
                  <div
                    class="mt-2 text-[16px] sm:text-[24px] font-lato text-[#757575]"
                  >
                    Some opposition will arise from people who are working at
                    the senior level. Keep away from associating with people who
                    will damage your reputation. At some point you may feel
                    discouraged as obstacles at work will hinder your success.
                  </div>
                </div>
                <div class="mt-4">
                  <div
                    class="text-[16px] sm:text-[28px] font-bold font-lato text-[#121212]"
                  >
                    Luck
                  </div>
                  <div
                    class="mt-2 text-[16px] sm:text-[24px] font-lato text-[#757575]"
                  >
                    Today is one of your terrible days; nothing will seem to
                    work right. Luck is not in your favor.
                  </div>
                </div>
                <div class="mt-4">
                  <div
                    class="text-[16px] sm:text-[28px] font-bold font-lato text-[#121212]"
                  >
                    Personal Life
                  </div>
                  <div
                    class="mt-2 text-[16px] sm:text-[24px] font-lato text-[#757575]"
                  >
                    You will be highly sensitive to remarks made by your
                    spouse/beloved and may react negatively. Try to bridge the
                    gap before it's too late. Domestic affairs will disturb your
                    mind.
                  </div>
                </div>
                <div class="mt-4">
                  <div
                    class="text-[16px] sm:text-[28px] font-bold font-lato text-[#121212]"
                  >
                    Travel
                  </div>
                  <div
                    class="mt-2 text-[16px] sm:text-[24px] font-lato text-[#757575]"
                  >
                    Travel only if you have to. Keep an eye on your belongings
                    when travelling.
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Advanced Predictions">
                <p class="m-0">Coming Soon</p>
              </TabPanel>
            </TabView>
          </template>
        </Card>
      </div>
    </div>

    <Footer />
  </div>
</template>
<script>
import SiteHeader from "@/components/SiteHeader.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Astrology",
  components: {
    SiteHeader,
    Footer,
  },
};
</script>

<style scoped>
/* .imagess {
  background-image: url("https://ik.imagekit.io/553gmaygy/Mask%20group.png?updatedAt=1724327336715");
  width: 100px;
} */
.astrology-page-head {
  font-size: 52px;
  font-family: lato;
}
.astrology-page-paragraph {
  font-size: 32px;
  font-family: lato;
}
/* .p-tabview-title {
  font-size: 40px !important;
} */
</style>
