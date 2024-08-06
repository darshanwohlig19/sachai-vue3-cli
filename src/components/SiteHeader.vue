<template>
  <div>
    <Carousel class="h-363" :value="cars" :numVisible="1" :numScroll="1">
      <template v-slot:item="slotProps">
        <div class="car-item">
          <img :src="slotProps.data.image" :alt="slotProps.data.brand" />
          <div class="car-detail">
            <div class="car-name">{{ slotProps.data.brand }}</div>
            <div class="car-year">{{ slotProps.data.year }}</div>
            <div class="car-color">{{ slotProps.data.color }}</div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cars: [
        {
          brand: "Audi",
          year: 2019,
          color: "Black",
          image:
            "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
        {
          brand: "BMW",
          year: 2020,
          color: "White",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGyYdElOtXEtR4QfcmwgstoarnId4Ph0f1jOWJMced1utLJwJ6yJTq2IGe9YqWkBxt9Q&usqp=CAU",
        },
      ],
    };
  },
};
</script>

<style scoped>
.car-item {
  text-align: center;
  padding: 2em;
}
.car-item img {
  width: 100%;
  display: block;
}
.car-detail {
  margin-top: 1em;
}
.car-name {
  font-size: 1.5em;
  font-weight: bold;
}
.car-year,
.car-color {
  font-size: 1.2em;
  margin-top: 0.5em;
}
</style>
