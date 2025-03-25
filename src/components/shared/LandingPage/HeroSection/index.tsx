import { Block, Typography } from "@Components/ui";
import { FlightSearch } from "@Shared/LandingPage/HeroSection/FlightSearch";

export const HeroSection = () => (
  <Block
    className="relative text-white py-28 px-6 text-center w-full"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <Block className="bg-black bg-opacity-60 p-10 rounded-xl max-w-4xl mx-auto">
      <Typography asElement="h1" className="text-5xl font-bold mb-4 text-white">
        Fly Anywhere, Anytime
      </Typography>
      <Typography asElement="p" className="text-xl mb-8 text-white">
        Book flights to your dream destinations
      </Typography>

      <FlightSearch />
    </Block>
  </Block>
);
