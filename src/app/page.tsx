import { Destinations } from "@Components/shared/LandingPage/Destinations";
import { HeroSection } from "@Components/shared/LandingPage/HeroSection";
import { Testimonials } from "@Components/shared/LandingPage/Testimonials";
import { WhyBookUs } from "@Components/shared/LandingPage/WhyBookUs";
import { Layout } from "@Shared/Layout";

const page = () => (
  <Layout>
    <HeroSection />
    <Destinations />
    <Testimonials />
    <WhyBookUs />
  </Layout>
);

export default page;
