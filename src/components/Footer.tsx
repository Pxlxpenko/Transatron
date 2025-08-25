import Link from "next/link";

export default function Footer() {
  return (
    <div className="z-10 relative flex bg-primary py-8">
      <div className="flex justify-between items-center gap-4 mx-auto w-full max-w-[1280px]">
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
