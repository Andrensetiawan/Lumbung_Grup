"use client";

import { useMemo, useState } from "react";

interface VideoPlayerProps {
  videos?: string[];
  layoutMode?: "alternate" | "2" | "3" | "4";
}

const publicVideos = [
  "/Vidio/Vidio produk hikaru.mp4",
  "/Vidio/Vidio produk kyohikari.mp4",
  "/Vidio/Behind the quality- vidio proses menjaga kualitas.mp4",
];

const defaultVideos = publicVideos;

export default function VideoPlayer({ videos = defaultVideos, layoutMode = "2" }: VideoPlayerProps) {
  const normalizedVideos = useMemo(() => {
    const source = videos.length ? videos : defaultVideos;
    return source.filter((video) => typeof video === "string" && video.trim().length > 0);
  }, [videos]);

  const alternateVideos = normalizedVideos.length ? normalizedVideos : publicVideos;

  const [activeIndex, setActiveIndex] = useState(0);

  const activeVideo = alternateVideos[activeIndex] ?? defaultVideos[0];

  const handleVideoEnd = () => {
    if (alternateVideos.length <= 1) {
      return;
    }

    setActiveIndex((current) => (current + 1) % alternateVideos.length);
  };

  if (layoutMode === "alternate") {
    return (
      <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-100 to-stone-100 shadow-xl ring-1 ring-stone-200">
        <video
          key={activeVideo}
          className="h-full w-full object-cover"
          autoPlay
          controls
          muted
          playsInline
          preload="metadata"
          onEnded={handleVideoEnd}
        >
          <source src={activeVideo} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
    );
  }

  const columns = layoutMode === "3" ? 3 : layoutMode === "4" ? 4 : 2;
  const visibleVideos = normalizedVideos.slice(0, columns);

  return (
    <div className={`grid w-full gap-2 ${columns === 4 ? "md:grid-cols-2 xl:grid-cols-4" : columns === 3 ? "md:grid-cols-3" : "grid-cols-1"}`}>
      {visibleVideos.map((videoUrl, index) => (
        <div key={`${videoUrl}-${index}`} className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 to-stone-100 shadow-xl ring-1 ring-stone-200">
          <video
            className="h-auto w-full bg-black object-contain"
            autoPlay
            controls
            muted
            playsInline
            loop
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      ))}
    </div>
  );
}
