import Link from "next/link";
import { appRoutes } from "@Components/config/routes";

const navLinks = [
  {
    link: appRoutes.home,
    title: "Home",
  },
  {
    link: appRoutes.aboutUs,
    title: "About Us",
  },
  {
    link: appRoutes.contact,
    title: "Contact",
  },
  {
    link: appRoutes.support,
    title: "Support",
  },
];
export const NavLinks = () =>
  navLinks.map(({ link, title }) => (
    <Link
      href={link}
      className="hover:underline hover:text-yellow-300 transition duration-200"
    >
      <li>{title}</li>
    </Link>
  ));
