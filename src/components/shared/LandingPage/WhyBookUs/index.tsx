import { Block, Typography } from "@Components/ui";
import { Cards } from "@Shared/LandingPage/WhyBookUs/Cards";

export const WhyBookUs = () => (
  <Block
    asElement="section"
    className="py-16 px-6 bg-gray-100 text-center w-full"
  >
    <Typography
      asElement="h2"
      className="text-3xl font-bold mb-10 mx-auto w-fit"
    >
      🔐 Why Book With Us?
    </Typography>
    <div className="flex justify-center gap-10 flex-wrap">
      <Cards />
    </div>
  </Block>
);
