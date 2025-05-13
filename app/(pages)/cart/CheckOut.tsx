"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ShippingAddressFormValues, shippingAddressSchema } from "./scheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { CreateCashOrder } from "@/Service/orders";
import { toast } from "sonner";
import { useState } from "react";
import { BanknoteArrowUp, Landmark } from "lucide-react";

export default function CheckOut({
  totalPrice,
  cartOwner,
  refetchCart,
}: {
  refetchCart: () => void;
  totalPrice: number;
  cartOwner: string;
}) {
  const { getToken } = useAuth();
  const form = useForm<ShippingAddressFormValues>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      shippingAddress: {
        city: "",
        phone: "",
        details: "",
      },
    },
  });
  async function onSubmit(data: ShippingAddressFormValues) {
    try {
      const res = await CreateCashOrder(getToken(), cartOwner, data);

      refetchCart();
      toast("success");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  }

  return (
    <div className="mt-8 bg-background border-b w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-6">
            <div className="border rounded-md overflow-hidden p-5">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold flex items-center gap-1  mb-4">
                  {" "}
                  Cash Order <BanknoteArrowUp />
                </h3>

                <div className="flex justify-between gap-2 mb-6">
                  <span>Total Price :</span>
                  <span>EGP {totalPrice}</span>
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="shippingAddress.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter Your City Name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter Your Phone" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress.details"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Details" rows={3} {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <div className="text-center">
                    <Button type="submit" className="w-full ">
                      Place Cash Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
