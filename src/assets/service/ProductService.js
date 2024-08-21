export const ProductService = {
  getProductsData() {
    return [
      {
        image:
          "https://ik.imagekit.io/553gmaygy/10%20(2).png?updatedAt=1724162343075",
      },
      {
        image:
          "https://ik.imagekit.io/553gmaygy/18.png?updatedAt=1724162350656",
      },
      {
        image:
          "https://ik.imagekit.io/553gmaygy/17.png?updatedAt=1724067776564",
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
