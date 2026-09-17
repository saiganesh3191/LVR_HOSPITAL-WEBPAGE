/** Publish only client-approved public announcements. Dates use YYYY-MM-DD. */
export type HospitalUpdate = {
  title: string;
  summary: string;
  publishedOn: string;
  expiresOn?: string;
  href?: string;
};

export const hospitalUpdates: HospitalUpdate[] = [];

export function currentHospitalUpdates(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return hospitalUpdates
    .filter(update => update.publishedOn <= today && (!update.expiresOn || update.expiresOn >= today))
    .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}
