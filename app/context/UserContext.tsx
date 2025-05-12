"use client";
import { useAuth } from "@/hooks/useAuth";
import { getCart } from "@/Service/cart";
import { getWithlist } from "@/Service/wthlist";
import { CartProduct, CartResponce, WishlistItem } from "@/types/Cart";
import { Product, withlistType } from "@/types/Products";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface UserContextProps {
  wishlistIds: string[];
  cartCount: number;
  wishlist: Product[];
  cart: WishlistItem[];
  refetchWithlist: () => void;
  setWithlistIds: (value: string[]) => void;
  setCartCount: (value: number) => void;
  setCart: (value: WishlistItem[] | any[]) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getToken } = useAuth();
  const [wishlistIds, setWithlistIds] = useState<string[]>();
  const [cartCount, setCartCount] = useState<number>();
  const [wishlist, setWithlist] = useState<Product[]>();
  const [cart, setCart] = useState<WishlistItem[]>();
  const [status, setStatus] = useState(false);
  //  ! useEffect withlist
  useEffect(() => {
    const getWithlistData = async () => {
      const data = await getWithlist(getToken());
      if (data && typeof data === "object") {
        const typedData = data as withlistType;
        setWithlist(typedData?.data);
        const withlistIdsData = typedData?.data.map((item) => item.id);
        setWithlistIds(withlistIdsData);
      }
    };
    getWithlistData();
  }, [status]);
  const refetchWithlist = () => {
    setStatus(!status);
  };
  //  ! useEffect cart
  useEffect(() => {
    const getCartData = async () => {
      const data = await getCart(getToken());
      if (data && typeof data === "object") {
        const typedData = data as CartResponce;
        setCart(typedData?.data.products || []);
        setCartCount(typedData.numOfCartItems);
      }
    };
    getCartData();
  }, []);
  // const refetchCart = () => {
  //   setStatus(!status);
  // };

  return (
    <UserContext.Provider
      value={{
        setWithlistIds,
        setCartCount,
        setCart,
        wishlistIds: wishlistIds || [],
        cartCount: cartCount || 0,
        refetchWithlist,
        wishlist: wishlist || [],
        cart: cart || [],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
