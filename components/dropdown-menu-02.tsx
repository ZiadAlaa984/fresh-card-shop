import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, Settings, User } from "lucide-react";

export default function DropdownMenuWithIcon({ token }: { token: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none  rounded-full">
        <Avatar>
          <AvatarFallback className="bg-background border rounded-md">
            AB
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {token ? (
          <>
            <DropdownMenuItem>
              <User className="h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4" /> Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <LogIn className="h-4 w-4" /> Login
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogIn className="h-4 w-4" /> Sign Up
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
