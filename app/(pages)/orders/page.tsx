"use client";

import Header from "@/components/shared/Header";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetOrders } from "@/Service/orders";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { verifyToken } from "@/Service/user";
import LoadingCards from "@/components/shared/loadingCards";
import { Order } from "@/types/orders";

export default function OrdersPage() {
  const { getToken } = useAuth();
  const [UserId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const data = await verifyToken(getToken());
        const id = data?.decoded?.id;
        if (id) {
          setUserId(id);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    fetchUserId();
  }, [getToken]);

  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () => GetOrders(getToken(), UserId),
    enabled: !!UserId,
  });
  console.log("🚀 ~ OrdersPage ~ data:", data);

  return (
    <>
      <Header title="Orders">
        <>
          {data?.map((order) => (
            <div
              key={order._id}
              className="border rounded-md p-5 bg-background mb-6"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-6">
                <div className="space-y-1 mb-2 md:mb-0">
                  <p className="font-semibold text-gray-700">
                    Transaction Number:{" "}
                    <span className="text-gray-900">{order._id}</span>
                  </p>
                </div>
                <div className="space-y-1 mb-2 md:mb-0">
                  <p className="font-semibold text-gray-700">
                    Placed on:{" "}
                    <span className="text-gray-900">
                      {String(order.isPaid)}
                    </span>
                  </p>
                </div>
                <div className="space-y-1 mb-2 md:mb-0">
                  <p className="font-semibold text-gray-700">
                    Payment:{" "}
                    <span className="text-gray-900">
                      {order.paymentMethodType}
                    </span>
                  </p>
                </div>
                <Button className="flex items-center gap-1">
                  <Plus /> Add New Items
                </Button>
              </div>

              {/* Order Items */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-4 max-h-[500px] overflow-y-auto space-y-6">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex border rounded-md p-3 relative"
                    >
                      <div className="w-28 h-28 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={item.product.imageCover || "/placeholder.svg"}
                          alt={item.product.title || "unknown"}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="ml-4 flex-grow">
                        <h3 className="font-semibold">{item.product.title}</h3>
                        <p className="text-sm mt-1">
                          Price per item: EGP {item.price / item.count}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.product.category.name} |{" "}
                          <span className="text-green-500">Available</span>
                        </p>
                      </div>

                      <div className="flex flex-col justify-between items-end">
                        <div className="flex items-center gap-2">
                          Count: {item.count}
                        </div>
                        <div className="text-xs text-right">
                          <p>Total Price</p>
                          <p className="font-semibold">EGP {item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 border-t pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex justify-between items-center gap-1 mb-2">
                    <p className="font-semibold">Products Quantity :</p>
                    <p>{order.cartItems.length}</p>
                  </div>
                  <div className="flex justify-between items-center gap-1 mb-2">
                    <p className="font-semibold">Shipping Price :</p>
                    <p>
                      {order.shippingPrice} <span className="text-xs">EGP</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex justify-between items-center gap-1 mb-2">
                    <p className="font-semibold">Taxes :</p>
                    <p>
                      {order.taxPrice} <span className="text-xs">EGP</span>
                    </p>
                  </div>
                  <div className="flex justify-between font-bold items-center gap-1">
                    <p>Total Order Price:</p>
                    <p>{order.totalOrderPrice} EGP</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      </Header>
    </>
  );
}
