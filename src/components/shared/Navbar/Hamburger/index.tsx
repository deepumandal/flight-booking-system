import { Menu } from "lucide-react";
import { Block } from "@Components/ui";
import {
  Sidebar,
  SidebarClose,
  SidebarContent,
  SidebarDescription,
  SidebarFooter,
  SidebarHeader,
  SidebarTitle,
  SidebarTrigger,
} from "@Components/ui/Sidebar";
import { Logout, NavLinks, SignupLink } from "../NavLinks";

export const Hamburger = () => (
  <Block className="md:hidden">
    <Sidebar>
      <SidebarTrigger asChild>
        <button className="text-blue-700">
          <Menu size={28} />
        </button>
      </SidebarTrigger>
      <SidebarContent side="right" className="w-72 sm:w-80">
        <SidebarHeader className="mb-6">
          <SidebarTitle className="text-blue-700 text-xl font-bold">
            SkyFly
          </SidebarTitle>
        </SidebarHeader>
        <SidebarDescription></SidebarDescription>
        <div className="grid gap-4 py-2">
          <NavLinks />
        </div>
        <Logout />
        <SidebarFooter className="mt-6">
          <SidebarClose asChild>
            <SignupLink className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-md font-semibold" />
          </SidebarClose>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  </Block>
);
