<template>
  <div class="flex justify-center space-x-2">
    <div
      v-for="(dot, index) in numberOfDots"
      :key="index"
      class="dot"
      :style="dotStyle(index)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    numberOfDots: {
      type: Number,
      default: 3, // Three dots like in the image
    },
    color: {
      type: String,
      default: "black", // Adjusting to match the white dots in the image
    },
    radius: {
      type: Number,
      default: 4, // Adjusted radius
    },
    innerPadding: {
      type: Number,
      default: 2, // Adjusting for closer spacing
    },
    animationDuration: {
      type: Number,
      default: 300, // Smoother animation
    },
    verticalOffset: {
      type: Number,
      default: -4, // Small offset for the "bouncing" effect
    },
  },
  data() {
    return {
      currentIndex: 0,
      intervals: [],
    };
  },
  computed: {
    dotStyle() {
      return (index) => ({
        backgroundColor: this.color,
        width: `${this.radius * 2}px`,
        height: `${this.radius * 2}px`,
        borderRadius: "50%",
        margin: `${this.innerPadding}px`,
        transform: `translateY(${
          index === this.currentIndex ? this.verticalOffset + "px" : "0"
        })`,
        transition: `transform ${this.animationDuration}ms`,
      });
    },
  },
  mounted() {
    this.startAnimation();
  },
  beforeUnmount() {
    this.clearIntervals();
  },
  methods: {
    startAnimation() {
      let i = 0;
      this.intervals.push(
        setInterval(() => {
          this.currentIndex = i;
          i = (i + 1) % this.numberOfDots;
        }, this.animationDuration * 2)
      );
    },
    clearIntervals() {
      this.intervals.forEach((interval) => clearInterval(interval));
    },
  },
};
</script>

<style scoped>
.dot {
  display: inline-block;
}
</style>
