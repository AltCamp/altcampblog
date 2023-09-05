import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import config from "@/sanity/config/client-config";
import { useNextSanityImage } from "next-sanity-image";
import { createClient } from "@sanity/client";

const configuredSanityClient = createClient(config);

export function useImage(image: SanityImageSource) {
  const imageProps = useNextSanityImage(configuredSanityClient, image);
  return imageProps;
}
