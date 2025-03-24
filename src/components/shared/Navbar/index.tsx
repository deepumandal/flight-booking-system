import { Block, Container, Flex, Typography } from "@Components/ui";
import { Hamburger } from "@Shared/Navbar/Hamburger";
import { NavLinks, SignupLink } from "@Shared/Navbar/NavLinks";

export const Navbar = () => (
  <Container
    asElement="header"
    ScreenType="full-screen"
    className="bg-white shadow-md sticky top-0 z-50 font-sans"
  >
    <Flex
      asElement="div"
      className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center"
    >
      <Typography
        asElement="h1"
        className="text-3xl font-extrabold text-blue-700 tracking-tight"
      >
        ✈️ SkyFly
      </Typography>
      <Block asElement="nav" className="space-x-6 hidden md:flex items-center">
        <NavLinks />
        <SignupLink />
      </Block>

      <Hamburger />
    </Flex>
  </Container>
);
