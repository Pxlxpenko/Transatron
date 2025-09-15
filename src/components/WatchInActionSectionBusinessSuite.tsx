import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import { openCalendlyPopup } from "@/lib/utils";
import PlaySvg from "public/play.svg?react";

type VideoItem = {
  id: string;
  title: string;
  thumbnailUrl?: string;
};

const defaultVideos: VideoItem[] = [
  { id: "v1", title: "Significant Cost Savings" },
  { id: "v2", title: "Significant Cost Savings" },
];

function splitIntoBalancedRows(items: VideoItem[]): VideoItem[][] {
  const rows: VideoItem[][] = [];
  let startIndex = 0;

  while (startIndex < items.length) {
    const remaining = items.length - startIndex;
    let take = Math.min(3, remaining);

    if (remaining === 4 || (remaining % 3 === 1 && remaining !== 1)) {
      take = 2;
    }

    rows.push(items.slice(startIndex, startIndex + take));
    startIndex += take;
  }

  return rows;
}

export default function WatchInActionSectionBusinessSuite({
  videos = defaultVideos,
}: {
  videos?: VideoItem[];
}) {
  const rows = splitIntoBalancedRows(videos);

  return (
    <div
      id="watch-in-action"
      className="flex flex-col justify-center items-center py-15 w-full min-h-screen bg-accent-dark scroll-mt-[72px] snap-start"
    >
      <FadeInSection
        triggerOnMount
        className="relative flex flex-col items-center gap-16 mx-auto px-2.5 pb-5 w-full max-w-[1360px]"
      >
        <h1 className="font-black text-[48px] text-white md:text-8xl! text-center uppercase leading-none">
          WATCH IT IN ACTION
        </h1>
        <div className="flex flex-col gap-10 w-full">
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className={`grid gap-10 w-full ${
                row.length === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : row.length === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
              }`}
            >
              {row.map((video) => (
                <div
                  key={video.id}
                  className="flex flex-col gap-4 bg-white p-2.5 md:p-10 pb-5 rounded-[40px] w-full"
                >
                  <div className="flex justify-center items-center bg-[#DDD4FF] rounded-[30px] w-full h-[309px]">
                    <PlaySvg />
                  </div>
                  <p className="font-bold text-[#313131] text-[18px] md:text-[32px] text-center leading-[130%]">
                    {video.title}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Button
          variant="default"
          className="hover:bg-[#1E1E1E] shadow-none px-12! border border-white rounded-full w-fit h-14! text-2xl bg-accent-dark"
          onClick={() =>
            openCalendlyPopup("https://calendly.com/transatron/30min")
          }
        >
          Book a demo
        </Button>
      </FadeInSection>
    </div>
  );
}
