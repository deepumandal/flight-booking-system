import { LogOut, Plane } from "lucide-react";
import { Button } from "@Components/ui";

export const Navbar = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Plane className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Flight Dashboard</span>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
