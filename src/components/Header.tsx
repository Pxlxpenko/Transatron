import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";
import { cn, scrollToTop } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "BusinessSuite", link: "/business-suite" },
    { name: "TransferEdge", link: "/transfer-edge" },
    { name: "Documentation", link: "/documentation" },
    { name: "Blog", link: "/blog" },
  ];

  const handleLogoClick = () => scrollToTop();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "px-10 top-0 lg:pt-0 right-0 bg-primary w-full left-0 z-30 fixed flex justify-between items-center mx-auto lg:h-20 h-25 transition-all duration-200",
        isScrolled && "backdrop-blur-xs"
      )}
    >
      <div className="flex justify-between items-center mx-auto w-full max-w-[1360px]">
        <Link href="/" className="flex items-center" onClick={handleLogoClick}>
          <Image
            src="/logo.svg"
            alt="Transatron Logo"
            width={206}
            height={40}
          />
        </Link>

        <nav className={cn("gap-5 lg:flex hidden")}>
          {navigation.map(
            (item) => (
              // item.link ? (
              <Link
                key={item.name}
                href={item.link}
                className={cn(
                  "relative hover:bg-[#0DEC89]/10 px-4 rounded-full py-2  text-white  text-center text-lg",
                  { "text-white bg-accent": item.link === pathname }
                )}
              >
                {item.name}
              </Link>
            )
            // )   <Link
            //   key={item.name}
            //   href={`/${item.href}`}
            //   className={cn(
            //     "relative hover:bg-[#0DEC89]/10 px-4 py-2 text-white active:text-primary active:bg-accent text-center text-lg",
            //     { "text-primary bg-accent": item.href === pathname }
            //   )}
            // >
            //   {item.name}
            // </Link>
          )}
        </nav>

        <div className="hidden lg:flex flex-row gap-4">
          <Button
            variant="default"
            className="hover:bg-transparent shadow-none px-4! py-3.5! border border-white hover:border-transparent rounded-full h-12 text-lg leading-5 bg-accent-dark"
            onClick={() => {}}
          >
            Request a quote
          </Button>
        </div>
      </div>
      <button
        className="lg:hidden flex justify-center items-center hover:bg-primary/30 border border-primary size-10 transition-all duration-300 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image src="/burger.svg" alt="Burger" width={20} height={20} />
      </button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="flex flex-col justify-between bg-[#0B160F] border-none! w-full!">
          <DrawerHeader>
            <DrawerTitle className="flex justify-between items-center px-6 pt-5">
              <Image
                src="/logo.svg"
                alt="Transatron Logo"
                width={206}
                height={40}
              />
              <button
                className="lg:hidden flex justify-center items-center hover:bg-primary/30 border border-primary size-10 transition-all duration-300 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <Image src="/cross.svg" alt="Cross" width={20} height={20} />
              </button>
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col justify-center items-center gap-7.5">
            {navigation.map(
              (item) => (
                // item.link ? (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "relative hover:bg-[#0DEC89]/10 px-4 rounded-full py-2 w-25 text-white active:text-primary text-center text-lg",
                    { "text-primary": item.link === pathname }
                  )}
                >
                  {item.name}
                </Link>
              )
              // ) : (
              //   <Link
              //     key={item.name}
              //     href={`/${item.href}`}
              //     onClick={() => setOpen(false)}
              //     className={cn(
              //       "relative hover:bg-[#0DEC89]/10 px-4 py-2 w-25 text-white active:text-primary text-center text-lg"
              //     )}
              //   >
              //     {item.name}
              //   </Link>
              // )
            )}
          </div>

          <DrawerFooter className="flex-col gap-4 mx-10 mt-0!">
            <Button
              variant="default"
              className="px-4! py-3.5! w-full h-12 text-lg leading-5"
              onClick={() => {}}
            >
              Request Demo
            </Button>
            <Button
              variant="destructive"
              className="px-4! py-3.5! h-12 text-lg leading-5"
              onClick={() => {}}
            >
              Under Attack?
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
