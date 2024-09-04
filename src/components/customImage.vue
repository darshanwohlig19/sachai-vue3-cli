<template>
  <div class="bg-image-container">
    <div class="bg-image"></div>
    <img
      class="overlay-image"
      src="https://t4.ftcdn.net/jpg/01/43/23/83/360_F_143238306_lh0ap42wgot36y44WybfQpvsJB5A1CHc.jpg"
      alt="Overlay Image"
    />
  </div>
</template>

<style scoped>
.bg-image-container {
  width: 150px;
  height: 150px;
  position: relative;
  margin: auto;
}

.bg-image {
  background-image: url("https://t4.ftcdn.net/jpg/01/43/23/83/360_F_143238306_lh0ap42wgot36y44WybfQpvsJB5A1CHc.jpg");
  filter: blur(0px);
  -webkit-filter: blur(2px);
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.overlay-image {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  /* border-radius: 50%; Optional: to make the overlay image circular */
}

.bg-text {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 80%;
  padding: 20px;
  text-align: center;
}
</style>
