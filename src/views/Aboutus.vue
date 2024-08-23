<template>
  <SiteHeader />
  <div class="mb-40">
    <div class="w-full h-full">
      <img src="../assets/Ellipse 62.png" alt="" />
    </div>
    <div class="flex justify-center mt-[-20%] h-auto rounded-[50px]">
      <Card
        class="text-center px-20 rounded-[50px] w-[85%] h-[100%] py-10 shadow-black shadow-md"
      >
        <template #content>
          <div class="mb-20">
            <div class="heading">Welcome to sachai!</div>
            <div class="para">
              At sachai, we are firm believers in the power of truth. In today's
              world flooded with information, distinguishing fact from fiction
              has become increasingly challenging. Our primary goal is to cut
              through this noise and offer our readers credible, reliable, and
              unbiased information.
            </div>
          </div>
          <div class="mb-20">
            <div class="heading">Who We Are</div>
            <div class="para">
              We are a team of passionate individuals committed to the pursuit
              of truth. Our expertise spans journalism, technology, research,
              and academia. Together, we bring diverse perspectives and
              knowledge to the table, enabling us to address complex issues with
              clarity and insight.
            </div>
          </div>
          <div class="mb-20">
            <div class="heading">What We Do</div>
            <div class="para">
              At sachai, our aim is to deliver top-notch content that informs,
              educates, and inspires. From breaking news to in-depth analysis,
              we cover a broad spectrum of topics including politics, science,
              culture, and more. Our dedication to accuracy and integrity
              ensures that you can rely on us for factual information, free from
              bias or hidden agendas.
            </div>
          </div>
          <div class="mb-20">
            <div class="heading">Why Choose Us</div>
            <div class="para">
              In an era plagued by misinformation, sachai stands out as a beacon
              of truth. Our adherence to journalistic principles and unwavering
              commitment to transparency set us apart. When you visit sachai,
              you can trust that you're receiving the complete story, supported
              by thorough research and meticulous fact-checking.
            </div>
          </div>
          <div class="mb-20">
            <div class="heading">Get Involved</div>
            <div class="para">
              We believe that seeking truth is a collaborative endeavor.
              Therefore, we encourage our readers to engage with us, share their
              insights, and participate in discussions. Whether you have a tip
              to offer, a question to pose, or a story to share, we want to hear
              from you. Together, we can contribute to a more informed and
              enlightened society.
            </div>
          </div>
          <div class="last-heading">
            Thank you for choosing Sachai. We eagerly anticipate serving you and
            becoming your trusted source for news and information.
          </div>
        </template>
      </Card>
    </div>
  </div>
  <Footer />
</template>
<script setup>
import SiteHeader from "@/components/SiteHeader.vue";
import Footer from "@/components/Footer.vue";
import Card from "primevue/card";
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
</style>
