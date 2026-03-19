export const BASE_URL = "http://localhost:6500/api/"; // change this
// export const BASE_URL = "http://srv1291603.hstgr.cloud:6500/api/"; // change this
export const endpoints = {
  getAllCategories: "get-all-categories",
  getAllProducts: "get-all-products", 
  getProductsByCategoryId:"get-products-by-categoryId",
  getSingleProduct: "get-products-by-id",
  singleCart: "single-cart",
  getCart:"get-cart",
  login: "login",
  register: "register",
  createShippingAddress: "create-shipping-address",
  getAddressByUserId:"get-address-by-user",
  createOrder: "create-order",
  getMyOrders: "get-my-orders",
  getOrderById: "get-order-by-id",
  changeOrderStatus:"change-order-status",
  getAllOrders:"get-all-orders"
}
