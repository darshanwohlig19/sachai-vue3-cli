export const MobileService = {
  getProductsData() {
    return [
      {
        image:
          "https://ik.imagekit.io/553gmaygy/Group%209350.png?updatedAt=1724240425638",
      },
      {
        image:
          "https://ik.imagekit.io/553gmaygy/Group%209347.png?updatedAt=1724240425811",
      },
      {
        image:
          "https://ik.imagekit.io/553gmaygy/Group%209348.png?updatedAt=1724240425862",
      },
    ];
  },

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  },

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  },

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  },
};
