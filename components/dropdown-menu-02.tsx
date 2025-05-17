"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserIMG from "@/public/imgs/download.png";
import { useUserContext } from "@/app/context/UserContext";
import { useAuth } from "@/hooks/useAuth";

export default function DropdownMenuWithIcon({ token }: { token: string }) {
  const { profileImage } = useUserContext();
  const { logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none  rounded-full">
        <Avatar>
          <AvatarFallback className="bg-background border rounded-md">
            {profileImage ? (
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={UserIMG || "/placeholder.svg"}
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {token ? (
          <>
            <DropdownMenuItem>
              <Link
                href={"/profile"}
                className="flex  w-full item-center gap-1"
              >
                <User className="h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={logout}
              className="text-destructive  w-full cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link
                href={"/auth/login"}
                className="flex item-center w-full gap-1"
              >
                <LogIn className="h-4 w-4" /> Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={"/auth/signup"}
                className="flex item-center  w-full gap-1"
              >
                <LogIn className="h-4 w-4" /> Sign Up
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
