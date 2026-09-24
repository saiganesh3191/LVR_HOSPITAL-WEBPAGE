"use client";

import { useEffect } from "react";
import { teluguTranslations } from "@/lib/telugu-translations";
import { teluguReviewedTranslations } from "@/lib/telugu-reviewed-translations";

const assetPath = /^\/(?:_next|branding|fonts|images|media)\//;

function translatedRoute(href: string) {
  if (!href.startsWith("/") || href.startsWith("/te") || assetPath.test(href)) return href;
  if (/\.(?:png|jpe?g|webp|svg|mp4|xml|txt)$/i.test(href)) return href;
  return href === "/" ? "/te" : `/te${href}`;
}

function translateTree(root: ParentNode) {
  const contextual = [
    ...(root instanceof HTMLElement && root.dataset.te ? [root] : []),
    ...root.querySelectorAll<HTMLElement>("[data-te]"),
  ];
  for (const element of contextual) {
    element.textContent = element.dataset.te ?? element.textContent;
    element.dataset.noTranslate = "";
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent || parent.closest("script,style,[data-no-translate],[data-locale-switch]")) continue;
    const value = node.nodeValue ?? "";
    const key = value.trim().replace(/\s+/g, " ");
    const translation = teluguReviewedTranslations[key] ?? teluguTranslations[key];
    if (translation) node.nodeValue = `${value.match(/^\s*/)?.[0] ?? ""}${translation}${value.match(/\s*$/)?.[0] ?? ""}`;
  }
  for (const element of root.querySelectorAll<HTMLElement>("[aria-label],[placeholder],[title]")) {
    for (const attribute of ["aria-label", "placeholder", "title"] as const) {
      const value = element.getAttribute(attribute);
      const translation = value && (teluguReviewedTranslations[value] ?? teluguTranslations[value]);
      if (translation) element.setAttribute(attribute, translation);
    }
  }
  for (const link of root.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    if (link.dataset.localeSwitch !== undefined) continue;
    const href = link.getAttribute("href");
    if (href) link.setAttribute("href", translatedRoute(href));
  }
}

export function TeluguLocalizer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "te";
    translateTree(document.body);
    const followTeluguLink = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.dataset.localeSwitch !== undefined || link.target === "_blank" || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const href = link.getAttribute("href");
      if (!href?.startsWith("/te")) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(href);
    };
    document.addEventListener("click", followTeluguLink, true);
    const observer = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.parentNode) translateTree(node.parentNode);
        else if (node instanceof HTMLElement) translateTree(node);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); document.removeEventListener("click", followTeluguLink, true); };
  }, []);
  return <div className="telugu-localized" lang="te">{children}</div>;
}
