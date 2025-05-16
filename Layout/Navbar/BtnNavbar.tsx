import { Button } from "@/components/ui/button";
import Link from "next/link";

const BtnNavbar = ({
  Count,
  icon,
  name,
}: {
  name: string;
  Count?: number;
  icon: React.ReactNode;
}) => (
  <Link href={name} className="flex items-center gap-2">
    <div className="relative">
      <Button variant="outline" size="icon">
        {icon}
      </Button>
      {Count !== undefined && Count > 0 && (
        <span className="absolute top-0 right-0 px-1 min-w-4 translate-x-1/2 -translate-y-1/2 origin-center flex items-center justify-center rounded-full text-xs bg-destructive text-white">
          {Count}
        </span>
      )}
    </div>
  </Link>
);

export default BtnNavbar;
