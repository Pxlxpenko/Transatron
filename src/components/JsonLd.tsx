import Head from "next/head";

type Props = {
  schema: Record<string, unknown>;
};

export default function JsonLd({ schema }: Props) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
