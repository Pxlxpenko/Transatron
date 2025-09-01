import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  description?: string;
  path?: string;
  imageUrl?: string;
  noIndex?: boolean;
};

export default function SeoHead({
  title,
  description,
  path,
  imageUrl,
  noIndex,
}: Props) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://transatron.io";
  const canonicalPath = path ?? router.asPath ?? "/";
  const canonicalUrl = `${siteUrl}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;
  const finalTitle = title ? `${title} | Transatron` : "Transatron";
  const previewTitle = "Transatron";
  const finalDescription =
    description ?? "Enable cheap transactions in your wallet.";
  const ogImage = imageUrl ?? `${siteUrl}/logo.jpg`;

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={previewTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={previewTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
