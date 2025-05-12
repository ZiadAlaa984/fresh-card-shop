"use client";
import { useAuth } from "@/hooks/useAuth";
import { getCart } from "@/Service/cart";
import { getWithlist } from "@/Service/wthlist";
import { CartResponce } from "@/types/Cart";
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
  cartIds: string[];
  refetchWithlist: () => void;
  refetchCart: () => void;
  setWithlistIds: (value: string[]) => void;
  setCartCount: (value: number) => void;
  setCartIds: (value: string[]) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getToken } = useAuth();
  const [wishlistIds, setWithlistIds] = useState<string[]>();
  const [cartCount, setCartCount] = useState<number>();
  const [wishlist, setWithlist] = useState<Product[]>();
  const [cartIds, setCartIds] = useState<string[]>();
  const [status, setStatus] = useState(false);
  const [cartStatus, setCartStatus] = useState(false);
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
        setCartCount(typedData.numOfCartItems);
      }
    };
    getCartData();
  }, [cartStatus]);
  const refetchCart = () => {
    setCartStatus(!cartStatus);
  };

  return (
    <UserContext.Provider
      value={{
        setWithlistIds,
        setCartCount,
        setCartIds,
        refetchCart,
        wishlistIds: wishlistIds || [],
        cartCount: cartCount || 0,
        refetchWithlist,
        wishlist: wishlist || [],
        cartIds: cartIds || [],
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
