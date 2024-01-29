"use client";

import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/app/_components/ui/sheet";
import { Menu } from "lucide-react";
import { type Session } from "next-auth";
import UserDropdown from "./user-dropdown";
import { useSignInModal } from "./sign-in-modal";
import { ModeToggle } from "~/app/_components/mode-toggle";
import Image from "next/image";
import useScroll from "~/lib/hooks/use-scroll";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Header = ({ session }: { session: Session | null }) => {
  const scrolled = useScroll(50);
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const router = useRouter();
  const routes = [
    {
      href: "/auswahl",
      label: "Auswahl",
    },
    {
      href: "/bibliothek",
      label: "Filmbibliothek",
    },
    {
      href: "/anfrage",
      label: "Anfrage",
    },
  ];

  const routeToSignIn = () => {
    // router.push("/auth/signin");
    signIn("credentials");
  };

  return (
    <div
      className={`fixed top-0 flex w-full justify-center  ${
        scrolled ? "backdrop-blur-xl" : "bg-white/0"
      } z-30 px-4 transition-all `}
    >
      <div className="flex h-16 w-full max-w-screen-xl flex-row items-center  ">
        <Link href="/" className="font-display flex items-center text-2xl">
          <Image
            src="/logo.png"
            alt="Library Camunda Logo"
            width="50"
            height="50"
            quality={90}
            className="mr-2 rounded-sm"
          ></Image>
          <p>BlockBuster Filmverleih</p>
        </Link>
        <nav className="ml-20">
          {routes.map((route, i) => (
            <Link href={route.href} key={i}>
              <Button className="font-bold" variant={"ghost"}>
                {route.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="absolute right-40">
          {session ? (
            <UserDropdown session={session} />
          ) : (
            <Button variant="outline" onClick={routeToSignIn}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
