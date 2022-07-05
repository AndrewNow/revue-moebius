import groq from "groq";

export const equipeQuery = groq`
  *[_type == "equipe"] | order(category desc) {
    _id,
    category,
    membres[] {
      ...,
      "imageUrl": portrait.asset->url,
      "lqip": portrait.asset->metadata.lqip,
    }
  }
`;
