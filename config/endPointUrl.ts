const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const API = {
  auth: {
    verifyToken: `${apiUrl}/auth/verifyToken`,
    login: `${apiUrl}/auth/signin`,
    signup: `${apiUrl}/auth/signup`,
  },
  categorys: {
    url: `${apiUrl}/categories`,
  },
  brands: {
    url: `${apiUrl}/brands`,
  },
  Products: {
    url: `${apiUrl}/products`,
  },
  wishlist: {
    url: `${apiUrl}/wishlist`,
  },
  cart: {
    url: `${apiUrl}/cart`,
  },
  orders: {
    cash: `${apiUrl}/orders`,
    checkout: `${apiUrl}/orders/checkout-session`,
  },
  user: {
    url: `${apiUrl}/users`,
    update: `${apiUrl}/users/updateMe/`,
  },
};
export default API;
