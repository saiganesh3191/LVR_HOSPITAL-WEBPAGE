/** Stylised editorial artwork, not anatomical diagrams or hospital photographs. */
export function CareArtwork({ specialty = "general-medicine", className = "" }: { specialty?: string; className?: string }) {
  return <svg className={`care-artwork ${className}`} viewBox="0 0 360 260" fill="none" aria-hidden="true">
    <ellipse cx="182" cy="231" rx="114" ry="12" fill="#0c4f6812" />
    <circle cx="177" cy="124" r="104" fill="#dcebf0" />
    <path d="M282 64c26 28 30 74 9 108M62 175c-15-35-9-70 14-97" stroke="#9ebdc9" strokeWidth="1.5" strokeDasharray="4 7" />
    <circle cx="288" cy="54" r="19" fill="#d1ef8a" /><path d="M288 46v16m-8-8h16" stroke="#135c78" strokeWidth="2" strokeLinecap="round" />
    <circle cx="69" cy="198" r="11" fill="#c9e5d4" />
    <g stroke="#135c78" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      {specialty === "general-medicine" && <><rect x="104" y="54" width="126" height="165" rx="18" fill="#fff" transform="rotate(-8 167 136)" /><rect x="143" y="44" width="50" height="22" rx="8" fill="#d1ef8a" /><path d="M131 104h26l12-21 17 42 13-21h16M133 153h69M133 170h44" /><circle cx="232" cy="176" r="37" fill="#d1ef8a" /><path d="M219 176h26m-13-13v26" /></>}
      {specialty === "dermatology" && <><path d="M182 51c-7 34-56 70-56 105a56 56 0 0 0 112 0c0-35-48-73-56-105Z" fill="#fff" /><path d="M143 158c0 22 16 36 36 36" stroke="#9ab7c3" /><path d="m112 67 6 17 17 6-17 6-6 17-6-17-17-6 17-6 6-17Zm132 40 6 18 18 6-18 6-6 18-6-18-18-6 18-6 6-18Z" fill="#d1ef8a" /><path d="M172 138c8-12 24-12 32 0" /></>}
      {specialty === "pediatrics" && <><path d="M101 132c0-49 34-81 80-81s80 32 80 81v56c-48 36-112 36-160 0v-56Z" fill="#fff" /><circle cx="181" cy="128" r="47" fill="#e2efd3" /><path d="M175 79c-16-9-11-24 3-23 18 1 18 16 5 19M157 125h2m44 0h2m-38 23c8 8 19 8 27 0M116 179l65 38 65-38" /><path d="m266 52 4 12 13 4-13 5-4 12-5-12-12-5 12-4 5-12Z" fill="#d1ef8a" /></>}
      {specialty === "gastroenterology" && <><path d="M162 47v59c0 21-38 11-47 48-10 44 24 72 59 51 20-12 29-25 43-22 23 4 47-6 46-40-1-35-27-62-51-55-15 5-14 23-29 19V47" fill="#fff" /><path d="M142 182c17 8 29-22 48-23 19-1 31 11 44-3" stroke="#8baeaa" /><circle cx="116" cy="76" r="22" fill="#d1ef8a" /><path d="M108 76h16m-8-8v16" /></>}
      {specialty === "nephrology" && <><path d="M142 75c-40-15-62 24-55 66 8 48 44 64 64 40 20-24-14-32-8-53 7-22 25-40-1-53Zm76 0c40-15 62 24 55 66-8 48-44 64-64 40-20-24 14-32 8-53-7-22-25-40 1-53Z" fill="#fff" /><path d="M140 142c34-9 33 51 33 67m47-67c-34-9-33 51-33 67" /><path d="M108 114c-5 19 2 37 12 47m132-47c5 19-2 37-12 47" stroke="#9bbbac" /><circle cx="181" cy="64" r="20" fill="#d1ef8a" /><path d="M174 64h14m-7-7v14" /></>}
    </g>
  </svg>;
}

export function CommunityArtwork() {
  return <svg className="community-artwork" viewBox="0 0 480 440" fill="none" aria-hidden="true"><circle cx="240" cy="217" r="179" fill="#ffffff08" /><circle cx="240" cy="217" r="146" stroke="#80abc0" strokeOpacity=".3" /><path d="M240 249s-95-53-95-110c0-53 69-68 95-22 26-46 95-31 95 22 0 57-95 110-95 110Z" fill="#d1ef8a" /><path d="m157 171 39 0 17-27 27 57 19-30h53" stroke="#135c78" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /><g stroke="#b9d7e0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><path d="M94 247c24-15 49-6 63 13l46 56c12 15 2 32-13 27l-37-29m-52-92-21 84 88 83h53v-48M386 247c-24-15-49-6-63 13l-46 56c-12 15-2 32 13 27l37-29m52-92 21 84-88 83h-53v-48" /></g><path d="M90 123v26m-13-13h26M379 84v20m-10-10h20" stroke="#d1ef8a" strokeWidth="3" strokeLinecap="round" /><circle cx="353" cy="356" r="6" fill="#d1ef8a" /></svg>;
}
