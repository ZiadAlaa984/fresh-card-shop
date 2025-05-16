import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phone: z.string().min(10, "Phone number is too short"),
});

export const useInfoScheme = () => {
  return useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(formSchema),
  });
};
