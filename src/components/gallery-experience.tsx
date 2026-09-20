"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { galleryCollections, galleryPhotos, galleryVideos, type GalleryCategory, type GalleryPhoto } from "@/lib/gallery";

type Filter = "all" | GalleryCategory;

export function GalleryExperience() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const visiblePhotos = filter === "all" ? galleryPhotos : galleryPhotos.filter(photo => photo.category === filter);
  const visibleVideos = filter === "all" ? galleryVideos : galleryVideos.filter(video => video.category === filter);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", close); lastTrigger.current?.focus(); };
  }, [selected]);

  function move(direction: number) {
    if (!selected) return;
    const index = visiblePhotos.findIndex(photo => photo.id === selected.id);
    setSelected(visiblePhotos[(index + direction + visiblePhotos.length) % visiblePhotos.length]);
  }

  return <>
    <div className="gallery-filters" role="group" aria-label="Filter gallery">
      <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All moments</button>
      {galleryCollections.map(collection => <button type="button" key={collection.id} aria-pressed={filter === collection.id} onClick={() => setFilter(collection.id)}>{collection.title}</button>)}
    </div>
    <div className="gallery-context" aria-live="polite">
      <strong>{filter === "all" ? "Life at LVR" : galleryCollections.find(item => item.id === filter)?.title}</strong>
      <span>{filter === "all" ? "Care, community and the people behind our hospital." : galleryCollections.find(item => item.id === filter)?.description}</span>
    </div>
    <div className="gallery-grid">
      {visiblePhotos.map((photo, index) => <button type="button" className={`gallery-tile gallery-tile-${index % 7 === 0 ? "wide" : index % 5 === 0 ? "tall" : "standard"}`} key={photo.id} aria-label={`Open photo: ${photo.alt}`} onClick={event => { lastTrigger.current = event.currentTarget; setSelected(photo); }}>
        <Image src={photo.thumbnail} alt={photo.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 25vw" />
        <span><Expand size={15} /> View</span>
      </button>)}
    </div>
    {visibleVideos.length > 0 && <section className="gallery-films" aria-labelledby="gallery-films-title">
      <div className="gallery-films-heading"><span>SHORT FILMS</span><h2 id="gallery-films-title">See LVR <em>in motion.</em></h2><p>Press play when you are ready. Videos do not download automatically.</p></div>
      <div className="gallery-video-grid">{visibleVideos.map(video => <article className={`gallery-video-card ${video.orientation}`} key={video.id}>
        <div className="gallery-video-frame"><video controls preload="none" playsInline poster={video.poster} aria-label={video.title}><source src={video.src} type="video/mp4" />Your browser does not support embedded video.</video><span className="gallery-video-cue"><Play size={14} fill="currentColor" /> Play video</span></div>
        <div><h3>{video.title}</h3><p>{video.description}</p></div>
      </article>)}</div>
    </section>}
    {selected && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Gallery photo viewer" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div className="gallery-lightbox-toolbar"><span>Life at LVR</span><button type="button" aria-label="Close photo viewer" onClick={() => setSelected(null)}><X size={23} /></button></div>
      <div className="gallery-lightbox-stage"><button type="button" aria-label="Previous photo" onClick={() => move(-1)}><ChevronLeft /></button><Image src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} sizes="95vw" priority /><button type="button" aria-label="Next photo" onClick={() => move(1)}><ChevronRight /></button></div>
      <p>{selected.alt}</p>
    </div>}
  </>;
}
