import { z } from "zod";

// Define the Zod schema for form validation
export const shippingAddressSchema = z.object({
  shippingAddress: z.object({
    city: z.string().min(1, { message: "City is required" }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .regex(/^[0-9+\s-]+$/, { message: "Please enter a valid phone number" }),
    details: z.string().min(1, { message: "Details are required" }),
  }),
});

// Infer the type from the schema
export type ShippingAddressFormValues = z.infer<typeof shippingAddressSchema>;
