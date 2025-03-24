import { Block, Typography } from "@Components/ui";
import { Cards } from "@Shared/LandingPage/Testimonials/Cards";

export const Testimonials = () => (
  <Block asElement="section" className="bg-white py-20 px-6 w-full">
    <Typography
      asElement="h2"
      className="text-4xl font-bold text-center mb-12 mx-auto w-fit"
    >
      💬 What Our Travelers Say
    </Typography>
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
      <Cards />
    </div>
  </Block>
);
