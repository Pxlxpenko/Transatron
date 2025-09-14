import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import { openCalendlyPopup } from "@/lib/utils";

type VideoItem = {
  id: string;
  embedSrc: string;
  title?: string;
  thumbnailUrl?: string;
};

const defaultVideos: VideoItem[] = [
  {
    id: "wY4lgTpgkB4",

    title: "How to Transact on Tron for Free with Transatron",
    embedSrc: "https://www.youtube.com/embed/wY4lgTpgkB4?si=75-yoJjU1ajVldYt",
  },
  {
    id: "5RWmVCa2abw",
    title: "How to handle Insufficient TRX issue with Transatron Bot",
    embedSrc: "https://www.youtube.com/embed/5RWmVCa2abw?si=CWlzDUZBIX0F3WB8",
  },
  {
    id: "WJ507JiXuF8",
    title: "How to Move USDT from Your Mobile Wallet with Transatron Bot",
    embedSrc: "https://www.youtube.com/embed/WJ507JiXuF8?si=BFtmk2F1u64VfWJx",
  },
  {
    id: "NjjVCP0haJQ",
    title: "Save on Tron Fees with Transatron RPC and TronLink! 🚀",
    embedSrc: "https://www.youtube.com/embed/NjjVCP0haJQ?si=PuoqUgSDB6hnaapm",
  },
  {
    id: "-DLQIQTvseA",
    title: "How to stake TRX and make more with Transatron",
    embedSrc: "https://www.youtube.com/embed/-DLQIQTvseA?si=PsF4cLPIMsdZCPIh",
  },
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

export default function WatchInActionSectionTransferEdge({
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
        <h1 className="font-black text-[48px] text-white md:text-8xl! text-center uppercase">
          WATCH IN ACTION
        </h1>

        <div className="flex flex-col gap-10 w-full">
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className={`flex md:flex-wrap flex-col md:flex-row gap-10 w-full items-center justify-center`}
            >
              {row.map((video) => (
                <div
                  key={video.id}
                  className="flex flex-col gap-5 bg-primary pb-[55px] rounded-[40px] max-w-[380px]"
                >
                  <div className="bg-[#DDD4FF] rounded-t-[30px] w-full h-[240px] overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={video.embedSrc}
                      title={video.title ?? "YouTube video player"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  {video.title && (
                    <p className="px-7.5 font-semibold text-[25px] text-white leading-[100%]">
                      {video.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <Button
          variant="default"
          className="hover:bg-[#1E1E1E] shadow-none px-12! border border-white rounded-full w-fit h-14! text-2xl bg-accent-dark"
          onClick={() =>
            openCalendlyPopup("https://calendly.com/mtiutin/30min")
          }
        >
          Book a demo
        </Button>
      </FadeInSection>
    </div>
  );
}
