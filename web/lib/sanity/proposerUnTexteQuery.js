import groq from "groq";

export const proposerUnTexteQuery = groq`
  *[_type == "proposerUnTexte"] {
    _id,
    title,
    description,
    'slug': linkToNews->slug.current,
    soumission,
    edition,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    extraInfoTitle,
    extraInfoDescription
  }[0]
`;
