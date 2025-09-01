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
import { useState } from "react";
import BurgerSvg from "public/burger.svg?react";
import QuoteDialog from "./QuoteDialog";

export default function Header() {
  const navigation = [
    { name: "BusinessSuite", link: "/business-suite" },
    { name: "TransferEdge", link: "/transfer-edge" },
    {
      name: "Documentation",
      link: "https://docs.transatron.io",
      target: "_blank",
    },
    { name: "Blog", link: "/blog" },
  ];

  const handleLogoClick = () => scrollToTop();
  const [open, setOpen] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "top-0 right-0 left-0 z-30 sticky flex justify-between items-center bg-primary mx-auto px-4 md:px-10 lg:pt-0 w-full h-25 lg:h-20 transition-all duration-200"
      )}
    >
      <div className="flex justify-between items-center gap-4 mx-auto w-full max-w-[1360px]">
        <Link href="/" className="flex items-center" onClick={handleLogoClick}>
          <Image
            src="/logo.svg"
            alt="Transatron Logo"
            width={206}
            height={40}
          />
        </Link>

        <nav className={cn("hidden lg:flex gap-5")}>
          {navigation.map(
            (item) => (
              // item.link ? (
              <Link
                key={item.name}
                href={item.link}
                target={item.target}
                className={cn(
                  "relative hover:bg-accent! px-4 py-2 rounded-full text-white text-lg text-center",
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
            //     "relative hover:bg-[#0DEC89]/10 px-4 py-2 text-white active:text-white active:bg-accent text-center text-lg",
            //     { "text-white bg-accent": item.href === pathname }
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
            onClick={() => setQuoteDialogOpen(true)}
          >
            Request a quote
          </Button>
        </div>
      </div>
      <button
        className="lg:hidden flex justify-center items-center hover:bg-primary/30 border border-primary size-10 transition-all duration-300 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <BurgerSvg className="text-white" />
      </button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="flex flex-col justify-between bg-primary border-none! w-full!">
          <DrawerHeader>
            <DrawerTitle className="flex justify-between items-center pt-5">
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
                    "relative hover:bg-accent px-4 py-2 rounded-full text-white active:text-white text-lg text-center",
                    { "text-white": item.link === pathname }
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
              //       "relative hover:bg-[#0DEC89]/10 px-4 py-2 w-25 text-white active:text-white text-center text-lg"
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
              className="hover:bg-transparent shadow-none px-4! py-3.5! border border-white hover:border-transparent rounded-full h-12 text-lg leading-5 bg-accent-dark"
              onClick={() => {
                setOpen(false);
                setQuoteDialogOpen(true);
              }}
            >
              Request a quote
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <QuoteDialog open={quoteDialogOpen} setOpen={setQuoteDialogOpen} />
    </header>
  );
}
