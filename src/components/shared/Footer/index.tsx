import { Block, Button, Container, Typography } from "@Components/ui";
import { NavLinks } from "./NavLinks";

export const Footer = () => (
  <Container
    ScreenType="full-screen"
    asElement="footer"
    className="bg-blue-700 text-white py-12 px-6 font-sans"
  >
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
      <Block asElement="div">
        <Typography
          asElement="h3"
          className="text-2xl font-bold mb-2 text-white"
        >
          SkyFly
        </Typography>
        <Typography
          asElement="p"
          className="text-sm text-blue-100 leading-relaxed"
        >
          Your trusted partner for exploring the skies. Affordable, fast, and
          reliable. Join thousands of happy travelers today.
        </Typography>
      </Block>

      <Block>
        <Typography
          asElement="h4"
          className="text-lg font-semibold mb-3 text-white"
        >
          Quick Links
        </Typography>
        <ul className="space-y-2 text-sm">
          <NavLinks />
        </ul>
      </Block>

      <Block>
        <Typography
          asElement="h4"
          className="text-lg font-semibold mb-3 text-white"
        >
          Stay Connected
        </Typography>
        <Typography asElement="p" className="text-sm text-blue-100">
          Subscribe for the latest flight deals and updates.
        </Typography>
        <div className="mt-4">
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <Button className="mt-3 bg-yellow-300 hover:bg-yellow-400 text-blue-900 w-full py-2 rounded font-semibold transition duration-300">
            Subscribe
          </Button>
        </div>
      </Block>
    </div>
    <p className="text-center text-xs mt-10 text-blue-100">
      © {new Date().getFullYear()} SkyFly. All rights reserved.
    </p>
  </Container>
);
