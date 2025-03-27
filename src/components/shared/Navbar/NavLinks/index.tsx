"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { appRoutes } from "@Components/config/routes";
import { useAuthService } from "@Components/hooks/useAuthService";
import { Button } from "@Components/ui";
import { ClassType, cn } from "@Utils/ClassName";

const navLinks = [
  {
    link: appRoutes.home,
    title: "Home",
  },
  {
    link: appRoutes.flights,
    title: "Flights",
  },
  {
    link: appRoutes.dashboard,
    title: "Dashboard",
  },
  {
    link: appRoutes.auth,
    title: "Login",
    isUserExist: true,
  },
];

export const NavLinks = () => {
  const { user } = useAuthService();

  return navLinks.map(({ link, title, isUserExist }) =>
    isUserExist === Boolean(user) ? null : (
      <Link
        key={link}
        href={link}
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
      >
        {title}
      </Link>
    )
  );
};

export const SignupLink = ({ className }: { className?: ClassType }) => {
  const { user } = useAuthService();

  if (user) return null;

  return (
    <Link
      href={appRoutes.auth}
      key={"sign-up-route"}
      className={cn(
        className
          ? className
          : "bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md shadow font-semibold transition duration-300"
      )}
    >
      Signup
    </Link>
  );
};

export const Logout = () => {
  const { logout, isAuthenticated } = useAuthService();

  if (!isAuthenticated) return null;

  return (
    <div className="flex items-center">
      <Button
        onClick={logout}
        variant="ghost"
        className="flex items-center space-x-2"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </Button>
    </div>
  );
};
