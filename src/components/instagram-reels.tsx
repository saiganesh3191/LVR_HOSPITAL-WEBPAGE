"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, Play } from "lucide-react";
import { hospital } from "@/lib/hospital";
import { Eyebrow } from "./ui";

type InstagramVideo = {
  title: string;
  published: string;
  image: string;
  href: string;
};

// Add each new group of five here in oldest-to-newest order. The website moves
// to the next available group every Monday at 12:00 AM India time.
const weeklyVideoBatches: readonly (readonly InstagramVideo[])[] = [
  [
    { title: "When a cough brings up blood", published: "9 December 2024", image: "/media/instagram/week-01-1.jpg", href: "https://www.instagram.com/p/DDXDLjJzuVD/" },
    { title: "Free community medical camp", published: "10 December 2024", image: "/media/instagram/week-01-2.jpg", href: "https://www.instagram.com/p/DDZfjO6TKR_/" },
    { title: "Understanding thyroid symptoms", published: "11 December 2024", image: "/media/instagram/week-01-3.jpg", href: "https://www.instagram.com/p/DDbzxcDJwCh/" },
    { title: "Dizziness and vertigo", published: "12 December 2024", image: "/media/instagram/week-01-4.jpg", href: "https://www.instagram.com/p/DDecm18JxUX/" },
    { title: "Christmas wishes from LVR", published: "24 December 2024", image: "/media/instagram/week-01-5.jpg", href: "https://www.instagram.com/p/DD-6LDpP9g3/" },
  ],
];

const firstMondayUtc = Date.UTC(2026, 9, 4, 18, 30); // 5 October 2026, 12:00 AM IST
const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;

function availableBatchIndex(now: number) {
  const elapsedWeeks = Math.max(0, Math.floor((now - firstMondayUtc) / millisecondsPerWeek));
  return Math.min(elapsedWeeks, weeklyVideoBatches.length - 1);
}

export function InstagramReels() {
  const [batchIndex, setBatchIndex] = useState(0);

  useEffect(() => {
    const updateBatch = () => setBatchIndex(availableBatchIndex(Date.now()));
    updateBatch();
    const timer = window.setInterval(updateBatch, 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const videos = weeklyVideoBatches[batchIndex];

  return <section className="section instagram-reels-section" aria-labelledby="instagram-reels-title">
    <div className="container">
      <div className="section-heading instagram-reels-heading">
        <div>
          <Eyebrow>THIS WEEK ON INSTAGRAM</Eyebrow>
          <h2 id="instagram-reels-title">Health, community<br /><em>and care.</em></h2>
        </div>
        <div className="section-heading-aside">
          <p>Five selected updates from LVR Hospital&rsquo;s Instagram, with health information and moments from our community.</p>
          <a className="text-link" href={hospital.instagram} target="_blank" rel="noopener noreferrer">
            Follow LVR on Instagram <ArrowUpRight size={19} />
          </a>
        </div>
      </div>

      <div className="instagram-reels-grid">
        {videos.map((video) => <a
          className="instagram-reel-card"
          href={video.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${video.title}, Instagram video from ${video.published}`}
          key={video.href}
        >
          <Image src={video.image} alt="" fill sizes="(max-width: 760px) 78vw, (max-width: 1000px) 33vw, 20vw" />
          <span className="instagram-reel-shade" />
          <span className="instagram-reel-icon" aria-hidden="true"><Play size={19} fill="currentColor" /></span>
          <span className="instagram-reel-copy"><strong>{video.title}</strong><span>{video.published}</span><small>Watch on Instagram <ArrowUpRight size={14} /></small></span>
        </a>)}
      </div>

      <a className="button button-outline instagram-reels-button" href={hospital.instagram} target="_blank" rel="noopener noreferrer">
        <Instagram size={18} /> View Instagram
      </a>
    </div>
  </section>;
}
