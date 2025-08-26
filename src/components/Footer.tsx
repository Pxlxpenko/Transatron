import Link from "next/link";

export default function Footer() {
  return (
    <div className="z-10 relative flex bg-primary mx-auto px-10 py-8 w-full max-w-[1360px]">
      <div className="flex md:flex-row flex-col-reverse justify-between items-center gap-4 mx-auto w-full">
        <p className="font-normal text-primary-foreground text-sm uppercase leading-none">
          Copyright © 2025 Transatron.io
        </p>
        <div className="flex gap-8">
          <Link className="text-primary-foreground" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="text-primary-foreground" href="/terms-of-service">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
