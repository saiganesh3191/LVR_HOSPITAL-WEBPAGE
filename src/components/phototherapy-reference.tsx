import Image from "next/image";

export function PhototherapyReference() {
  return (
    <figure className="phototherapy-reference">
      <div className="phototherapy-reference-image">
        <Image
          src="/images/phototherapy-reference.webp"
          alt="Reference view of a whole-body phototherapy cabin with blue UV lamps"
          fill
          sizes="(max-width: 760px) calc(100vw - 40px), 240px"
        />
      </div>
      <figcaption>
        <span>PHOTOTHERAPY REFERENCE</span>
        <strong>Whole-body phototherapy cabin</strong>
        <p>Reference image — equipment design may vary.</p>
      </figcaption>
    </figure>
  );
}
