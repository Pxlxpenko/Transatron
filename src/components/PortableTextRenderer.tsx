/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

interface PortableTextRendererProps {
  value: any;
  className?: string;
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <div className="my-6">
          <Image
            src={value.asset?.url}
            alt={value.alt || ""}
            width={1200}
            height={800}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <p className="mt-2 text-gray-400 text-sm text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    externalImage: ({ value }) => {
      return (
        <div className="my-6">
          <Image
            src={value.url}
            alt={value.alt || ""}
            width={1200}
            height={800}
            className="rounded-lg w-full h-auto"
            unoptimized
          />
          {value.caption && (
            <p className="mt-2 text-gray-400 text-sm text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    columns: ({ value }) => {
      return (
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6">
          {value.columns?.map((column: any, index: number) => (
            <div key={index} className="space-y-4">
              <PortableText value={column.content} components={components} />
            </div>
          ))}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  // listItem: ({ children }) => <li className="text-gray-300">{children}</li>,
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-white underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em className="text-gray-200 italic">{children}</em>,
    code: ({ children }) => <code>{children}</code>,
  },
};

export default function PortableTextRenderer({
  value,
  className = "",
}: PortableTextRendererProps) {
  if (!value) return null;

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
