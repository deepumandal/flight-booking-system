import { Block, Typography } from "@Components/ui";
import { Cards } from "@Shared/LandingPage/Destinations/Cards";

export const Destinations = () => (
  <Block asElement="section" className="py-20 px-6 bg-gray-50 w-full">
    <Typography
      asElement="h2"
      className="text-4xl font-bold text-center mx-auto mb-12 w-fit"
    >
      🌍 Featured Destinations
    </Typography>
    <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
      <Cards />
    </div>
  </Block>
);
