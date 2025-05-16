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
  profileImage: string;
  setProfileImage: (value: string) => void;
  cartCount: number;
  isLoading: boolean;
  wishlist: Product[];
  cart: CartResponce;
  refetchWithlist: () => void;
  refetchCart: () => void;
  setWithlistIds: (value: string[]) => void;
  setCartCount: (value: number) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getToken } = useAuth();
  const [wishlistIds, setWithlistIds] = useState<string[]>();
  const [cartCount, setCartCount] = useState<number>();
  const [wishlist, setWithlist] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartResponce>();
  const [status, setStatus] = useState(false);
  const [cartStatus, setCartStatus] = useState(false);
  const PROFILE_IMAGE_KEY = "user_profile_image";
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);
      if (savedImage) {
        setProfileImage(savedImage);
      }
    }
  }, []);
  //  ! useEffect withlist
  useEffect(() => {
    const getWithlistData = async () => {
      setIsLoading(true);
      const data = await getWithlist(getToken());
      if (data && typeof data === "object") {
        const typedData = data as withlistType;
        setWithlist(typedData?.data);
        const withlistIdsData = typedData?.data.map((item) => item.id);
        setWithlistIds(withlistIdsData);
      }
      setIsLoading(false);
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
        setCart(typedData);
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
        setProfileImage,
        profileImage: profileImage || "",
        setCartCount,
        refetchCart,
        isLoading,
        wishlistIds: wishlistIds || [],
        cartCount: cartCount || 0,
        refetchWithlist,
        wishlist: wishlist || [],
        cart: cart || ({} as CartResponce),
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
