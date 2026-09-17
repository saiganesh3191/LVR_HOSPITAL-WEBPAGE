"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Expand, X, ZoomIn, ZoomOut } from "lucide-react";

export function PhotoViewer({ src, alt, title, width, height, className = "" }: { src: string; alt: string; title: string; width: number; height: number; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const previousOverflow = useRef("");
  function close() { dialog.current?.close(); }
  function restore() { document.body.style.overflow = previousOverflow.current; setZoomed(false); trigger.current?.focus(); }
  return <>
    <button ref={trigger} type="button" className={`photo-viewer-trigger ${className}`} aria-label={`Enlarge ${title}`} onClick={() => { previousOverflow.current = document.body.style.overflow; document.body.style.overflow = "hidden"; dialog.current?.showModal(); }}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 760px) 90vw, 50vw" />
      <span className="photo-expand"><Expand size={15} /> View image</span>
    </button>
    <dialog ref={dialog} className="photo-viewer-dialog" aria-label={title} onClose={restore} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="photo-viewer-toolbar"><span>{title}</span><div><button type="button" aria-label={zoomed ? "Fit image to screen" : "Zoom in"} aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? <ZoomOut size={22} /> : <ZoomIn size={22} />}</button><button type="button" autoFocus aria-label="Close image viewer" onClick={close}><X size={23} /></button></div></div>
      <div className={`photo-viewer-stage${zoomed ? " is-zoomed" : ""}`}><Image src={src} alt={alt} width={width} height={height} sizes="100vw" /></div>
    </dialog>
  </>;
}
