"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { useState } from "react";
import { Login, SignUp } from "@/components";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  // console.log(pathname, "pathname");

  const menuItems = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Protected",
      to: "/protected",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Next Auth</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" color={pathname == "/" ? "primary" : "foreground"}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname == "/protected"}>
          <Link
            href="/protected"
            color={pathname == "/protected" ? "primary" : "foreground"}
            aria-current="page"
          >
            Protected
          </Link>
        </NavbarItem>
      </NavbarContent>
      {5 > 4 ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Login />
          </NavbarItem>
          <NavbarItem>
            <SignUp />
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button variant="flat" color="danger">
              Log out
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={pathname == item.to ? "primary" : "foreground"}
              className="w-full"
              href={item.to}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <Login />
      </NavbarMenu>
    </Navbar>
  );
}
