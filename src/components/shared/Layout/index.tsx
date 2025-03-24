import { Fragment, ReactNode } from "react";
import { Container } from "@Components/ui";
import { Footer } from "@Shared/Footer";
import { Navbar } from "@Shared/Navbar";

interface LayoutInterface {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export const Layout = ({
  children,
  hideFooter,
  hideNavbar,
}: LayoutInterface) => (
  <Fragment>
    {hideNavbar ? null : <Navbar />}
    <Container
      ScreenType="full-screen"
      fullHeight
      asElement="main"
      className="mx-auto w-full flex flex-col items-center"
    >
      {children}
    </Container>
    {hideFooter ? null : <Footer />}
  </Fragment>
);
