import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import Image from "next/image";
import { cn, scrollToTop } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "top-0 right-0 left-0 z-30 sticky flex justify-between items-center mx-auto px-4 md:px-10 lg:pt-0 w-full h-18 md:h-25 lg:h-20 transition-all duration-200",
        scrolled
          ? "bg-primary/75 supports-[backdrop-filter]:bg-primary/60 backdrop-blur-lg border-b border-white/10"
          : "bg-primary"
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
            (item, i) => (
              // item.link ? (
              <Link
                onClick={(e) => {
                  if (i === 0) {
                    e.preventDefault();
                  }
                }}
                key={item.name}
                href={item.link}
                target={item.target}
                className={cn(
                  "relative hover:bg-accent! px-4 py-2 rounded-full text-white text-lg text-center",
                  { "text-white bg-accent": item.link === pathname },
                  { "cursor-not-allowed": i === 0 }
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
            className="hover:bg-[#1E1E1E] shadow-none px-4! py-3.5! border border-white rounded-full h-12 text-lg leading-5 bg-accent-dark"
            onClick={() => setQuoteDialogOpen(true)}
          >
            Request a quote
          </Button>
        </div>
      </div>
      <button
        className="lg:hidden flex justify-center items-center hover:bg-primary/30 border border border-primary border-white size-10 size-10 transition-all duration-300 cursor-pointer shrink-0"
        onClick={() => setOpen(true)}
      >
        <BurgerSvg className="text-white" />
      </button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="flex flex-col justify-center items-center bg-primary border-none! w-full!">
          <button
            className="lg:hidden top-5 right-5 absolute flex justify-center items-center hover:bg-primary/30 ml-auto border border border-primary border-white size-10 transition-all duration-300 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <Image src="/cross.svg" alt="Cross" width={20} height={20} />
          </button>

          <div className="flex flex-col justify-center items-center gap-7.5">
            {navigation.map(
              (item, i) => (
                // item.link ? (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={(e) => {
                    if (i === 0) {
                      e.preventDefault();
                      return;
                    }
                    setOpen(false);
                  }}
                  className={cn(
                    "relative hover:bg-accent px-4 py-2 rounded-full text-white active:text-white text-2xl text-center",
                    { "text-white": item.link === pathname },
                    { "cursor-not-allowed": i === 0 }
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
            <Button
              variant="default"
              className="hover:bg-[#1E1E1E] shadow-none px-8! py-3.5! border border-white rounded-full h-14! text-2xl leading-5 bg-accent-dark"
              onClick={() => {
                setOpen(false);
                setQuoteDialogOpen(true);
              }}
            >
              Request a quote
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
      <QuoteDialog open={quoteDialogOpen} setOpen={setQuoteDialogOpen} />
    </header>
  );
}
