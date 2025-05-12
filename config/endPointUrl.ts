const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const API = {
  auth: {
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
};
export default API;
