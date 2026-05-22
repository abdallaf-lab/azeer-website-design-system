import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Sanity CMS client scaffold.
 *
 * Wiring only — there are no schemas or queries yet. Configuration is read from
 * env vars (see `.env.example`); copy them into `.env.local` before fetching.
 * `NEXT_PUBLIC_*` vars are safe to expose to the browser (project id + dataset
 * are public); the read token stays server-only and is consumed where queries
 * are added later.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // Cached, edge-served responses for published content. Flip off (and pass a
  // token) when fetching drafts/preview content.
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/** Build an image URL from a Sanity image reference (asset, ref, or object). */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
