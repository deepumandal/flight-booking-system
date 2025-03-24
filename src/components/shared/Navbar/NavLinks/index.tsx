import Link from "next/link";
import { appRoutes } from "@Components/config/routes";

const navLinks = [
  {
    link: appRoutes.home,
    title: "Home",
  },
  {
    link: appRoutes.destinations,
    title: "Destinations",
  },
  {
    link: appRoutes.testimonials,
    title: "Testimonials",
  },
  {
    link: appRoutes.login,
    title: "Login",
  },
];
export const NavLinks = () =>
  navLinks.map(({ link, title }) => (
    <Link
      href={link}
      className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
    >
      {title}
    </Link>
  ));

export const SignupLink = () => (
  <Link
    href={appRoutes.signup}
    key={"sign-up-route"}
    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md shadow font-semibold transition duration-300"
  >
    Signup
  </Link>
);
