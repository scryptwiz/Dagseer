import Image from "next/image";
// import { Button } from "../ui/button";
import Link from "next/link";
import ConnectionButton from "@/features/web3/connection-button";

const navLinks = [
  { name: "Position", href: "/my-positions" },
  { name: "Markets", href: "/markets" },
];

export function Header() {
  return (
    <>
      <div className="p-4 fixed top-0 w-full z-50 ">
        <div className="mx-auto grid grid-cols-2 md:grid-cols-3 w-full px-4 sm:px-6 h-16 rounded-full backdrop-blur-md bg-white/20 shadow-lg dark:bg-black/60 dark:border-white/20">
          {/* first */}
          <div className="gap-2 items-center hidden md:flex">
            <nav>
              <ul className="flex gap-4">
                {navLinks.map((link) => (
                  <li key={link.name} className=" px-2 py-1">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* middle */}
          <Link
            href={"/"}
            className="flex gap-2 items-center md:place-self-center"
            role="button"
          >
            <Image src={"/icon.svg"} alt="logo" width={40} height={40} />

            <p className="font-bold text-2xl md:text-3xl">DAGSeer</p>
          </Link>

          {/* last */}
          <div className="md:flex items-center justify-end hidden">
            {/* <Button variant="default">Connect Wallet</Button> */}
            <ConnectionButton />
          </div>
        </div>
      </div>

      <div className="mt-28"></div>
    </>
  );
}
